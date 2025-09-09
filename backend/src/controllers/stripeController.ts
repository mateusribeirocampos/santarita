import { Request, Response } from 'express';
import Stripe from 'stripe';
import he from 'he';
import { handleError, ValidationError } from '@/utils/errors';
import { successResponse } from '@/utils/response';
import { StripeCheckoutRequest, StripeCheckoutResponse } from '@/types';

export class StripeController {
  private stripe: Stripe | null;

  constructor() {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    
    // Check if Stripe key is properly configured (not just placeholder values)
    if (!stripeKey || 
        stripeKey === 'sk_test_sua_chave_secreta' || 
        stripeKey === 'sk_test_your_stripe_secret_key' ||
        stripeKey.startsWith('sk_test_your_') ||
        stripeKey.length < 20) {
      console.warn('⚠️  STRIPE_SECRET_KEY not properly configured. Stripe functionality will be disabled.');
      this.stripe = null;
      return;
    }
    
    try {
      this.stripe = new Stripe(stripeKey);
      console.log('✅ Stripe initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize Stripe:', error);
      this.stripe = null;
    }
  }

  async createCheckoutSession(req: Request, res: Response): Promise<void> {
    try {
      if (!this.stripe) {
        throw new ValidationError('Stripe payment system is not configured. Please contact the administrator to set up payment processing.');
      }

      const { amount, donationType }: StripeCheckoutRequest = req.body;
      
      if (!amount || !donationType) {
        throw new ValidationError('Amount and donationType are required');
      }

      const amountInCents = Math.round(parseFloat(String(amount)) * 100);
      
      if (isNaN(amountInCents) || amountInCents <= 0) {
        throw new ValidationError('Invalid amount value');
      }

      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'brl',
              product_data: {
                name: donationType === 'monthly' ? 'Dízimo Mensal' : 'Dízimo Único',
                description: 'Dízimo para Igreja Santa Rita',
              },
              unit_amount: amountInCents,
              recurring: donationType === 'monthly' ? { interval: 'month' } : undefined,
            },
            quantity: 1,
          },
        ],
        mode: donationType === 'monthly' ? 'subscription' : 'payment',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/tithe`,
      });

      const response: StripeCheckoutResponse = { id: session.id };
      res.json(response);
    } catch (error: any) {
      console.error('Erro ao criar sessão:', error);
      handleError(error, res);
    }
  }

  async handleWebhook(req: Request, res: Response): Promise<void> {
    try {
      if (!this.stripe) {
        throw new ValidationError('Stripe payment system is not configured. Please contact the administrator to set up payment processing.');
      }

      const sig = req.headers['stripe-signature'];
      const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
      
      if (!sig || !endpointSecret) {
        throw new ValidationError('Missing webhook signature or secret');
      }
      
      let event: Stripe.Event;
      
      try {
        event = this.stripe.webhooks.constructEvent(
          req.body, 
          sig as string, 
          endpointSecret
        );
      } catch (err: any) {
        console.error(`Erro de webhook: ${err.message}`);
        res.status(400).send(`Webhook Error: ${he.escape(err.message)}`);
        return;
      }
      
      switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object as Stripe.Checkout.Session;
          console.log(`Pagamento bem-sucedido: ${session.id}`);
          break;
          
        case 'invoice.paid':
          const invoice = event.data.object as Stripe.Invoice;
          console.log(`Fatura paga: ${invoice.id}`);
          break;
          
        default:
          console.log(`Evento não tratado: ${event.type}`);
      }
      
      res.json({ received: true });
    } catch (error: any) {
      console.error('Webhook error:', error);
      handleError(error, res);
    }
  }
}

export default new StripeController();