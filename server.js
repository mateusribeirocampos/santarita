// Exemplo de servidor backend para processar pagamentos do Stripe
const express = require('express');
const he = require('he');
const stripe = require('stripe')(STRIPE_SECRET_KEY);
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' })); // Ajuste para a URL do seu frontend

app.post('/api/create-checkout-session', async (req, res) => {
  const { amount, donationType } = req.body;
  
  try {
    // Converter para centavos (Stripe trabalha com a menor unidade monetária)
    const amountInCents = Math.round(parseFloat(amount) * 100);
    
    const session = await stripe.checkout.sessions.create({
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

    res.json({ id: session.id });
  } catch (error) {
    console.error('Erro ao criar sessão:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para verificar detalhes da sessão (opcional)
app.get('/api/checkout-session', async (req, res) => {
  const { sessionId } = req.query;
  
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.json(session);
  } catch (error) {
    console.error('Erro ao recuperar sessão:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook para receber eventos do Stripe (importante para processar pagamentos assíncronos)
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = STRIPE_WEBHOOK_SECRET;
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error(`Erro de webhook: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${he.escape(err.message)}`);
  }
  
  // Lidar com o evento
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      // Aqui você pode atualizar seu banco de dados, enviar e-mails, etc.
      console.log(`Pagamento bem-sucedido: ${session.id}`);
      break;
    case 'invoice.paid':
      // Lidar com pagamentos de assinatura
      const invoice = event.data.object;
      console.log(`Fatura paga: ${invoice.id}`);
      break;
    default:
      console.log(`Evento não tratado: ${event.type}`);
  }
  
  res.json({ received: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// Para iniciar este servidor:
// 1. Instale as dependências: npm install express stripe cors
// 2. Substitua 'sk_test_sua_chave_secreta' pela sua chave secreta do Stripe
// 3. Substitua 'whsec_seu_webhook_secret' pelo seu segredo de webhook do Stripe
// 4. Execute: node server.js
