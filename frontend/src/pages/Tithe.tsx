import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
//import {PaymentElement} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY ?? '');

const Donate = () => {
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [donationType, setDonationType] = useState('once'); // 'once' ou 'monthly'

  const predefinedAmounts = [10, 25, 50, 100];

  const handleDonation = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Por favor, insira um valor válido');
      return;
    }

    setIsProcessing(true);
    
    try {
      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Falha ao carregar Stripe');
      }

      // Chamar backend para criar sessão de checkout
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${API_BASE_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: parseFloat(amount), 
          donationType: donationType 
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const session = await response.json();
      
      // Redirecionar para Stripe Checkout
      const { error } = await stripe.redirectToCheckout({ 
        sessionId: session.id 
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      alert('Ocorreu um erro ao processar seu pagamento. Por favor, tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl font-semibold text-ink mb-4">Apoie nossa Igreja</h1>
        <p className="text-ink-soft">
        Seus generosos dízimos nos ajudam a manter nossa igreja e apoiar nossos programas comunitários.
        </p>
      </div>

      <div className="border border-line p-8">
        <div className="mb-8">
          <h2 className="font-serif text-xl font-semibold mb-4 text-ink">Selecione o valor</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {predefinedAmounts.map((preset) => (
              <button
                key={preset}
                onClick={() => setAmount(preset.toString())}
                className={`p-4 border ${
                  amount === preset.toString()
                    ? 'border-wine bg-wine-light text-wine'
                    : 'border-line text-ink hover:border-wine'
                }`}
              >
                R$ {preset}
              </button>
            ))}
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-soft">R$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder=" Entre com o valor que deseja"
              className="w-full pl-8 pr-4 py-2 border border-line focus:ring-1 focus:ring-wine focus:border-wine outline-none"
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="font-serif text-xl font-semibold mb-4 text-ink">Selecione o tipo de dízimo</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              className={`p-4 border ${
                donationType === 'once'
                  ? 'border-wine bg-wine-light text-wine'
                  : 'border-line text-ink hover:border-wine'
              }`}
              onClick={() => setDonationType('once')}
            >
              Uma vez
            </button>
            <button
              className={`p-4 border ${
                donationType === 'monthly'
                  ? 'border-wine bg-wine-light text-wine'
                  : 'border-line text-ink hover:border-wine'
              }`}
              onClick={() => setDonationType('monthly')}
            >
              Mensal
            </button>
          </div>
        </div>

        <button
          onClick={handleDonation}
          disabled={!amount || isProcessing}
          className={`w-full py-3 px-4 font-medium ${
            !amount || isProcessing
              ? 'bg-line text-ink-soft cursor-not-allowed'
              : 'bg-wine text-parchment hover:bg-wine-dark'
          }`}
        >
          {isProcessing ? 'Processando...' : `Dízimo R$ ${amount || '0'}`}
        </button>

        <div className="mt-6 text-center text-sm text-ink-soft">
          Pagamentos seguros processados por Stripe
        </div>
      </div>

      <div className="mt-12 border border-line p-8">
        <h2 className="font-serif text-xl font-semibold mb-4 text-ink">Outras maneiras de fazer o dízimo</h2>
        <div className="space-y-4">
          <div className="p-4 border border-line">
            <h3 className="font-medium mb-2 text-ink">Por Pix</h3>
            <img src="assets/qrcode-pix.png" alt="Pix payment option" />
          </div>
          <div className="p-4 border border-line">
            <h3 className="font-medium mb-2 text-ink">Em pessoa</h3>
            <p className="text-ink-soft">
            Coloque seu dízimo na cesta de coleta durante a missa ou na secretaria paroquial durante o horário comercial.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center text-sm text-ink-soft">
        <p>Para mais informações, entre em contato com a secretaria paroquial.</p>
      </div>
    </div>
  );
};

export default Donate;
