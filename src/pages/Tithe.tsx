import { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';

const Donate = () => {
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const predefinedAmounts = [10, 25, 50, 100];

  const handleDonation = async () => {
    setIsProcessing(true);
    // Note: In a real implementation, you would:
    // 1. Call your backend to create a Stripe session
    // 2. Redirect to Stripe checkout
    // 3. Handle the success/failure redirect
    alert('In a real implementation, this would redirect to Stripe checkout');
    setIsProcessing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Apoie nossa Igreja</h1>
        <p className="text-gray-600">
        Seus generosos dízimos nos ajudam a manter nossa igreja e apoiar nossos programas comunitários.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Selecione o valor</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {predefinedAmounts.map((preset) => (
              <button
                key={preset}
                onClick={() => setAmount(preset.toString())}
                className={`p-4 rounded-md border ${
                  amount === preset.toString()
                    ? 'border-blue-700 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-blue-700 hover:bg-blue-50'
                }`}
              >
                R$ {preset}
              </button>
            ))}
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder=" Entre com o valor que deseja"
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Selecione o tipo de dízimo</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              className="p-4 rounded-md border border-blue-700 bg-blue-50 text-blue-700"
              onClick={() => alert('Seleção de dízimo único!')}
            >
              Uma vez
            </button>
            <button 
              className="p-4 rounded-md border border-gray-300 hover:border-blue-700 hover:bg-blue-50"
              onClick={() => alert('Função de dízimo mensal em breve!')}
            >
              Mensal
            </button>
          </div>
        </div>

        <button
          onClick={handleDonation}
          disabled={!amount || isProcessing}
          className={`w-full py-3 px-4 rounded-md text-white font-medium ${
            !amount || isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-700 hover:bg-blue-800'
          }`}
        >
          {isProcessing ? 'Processing...' : `Dízimo R$ ${amount || '0'}`}
        </button>

        <div className="mt-6 text-center text-sm text-gray-500">
          Secure payments powered by Stripe
        </div>
      </div>

      <div className="mt-12 bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-4">Outras maneiras de fazer o dízimo</h2>
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-md">
            <h3 className="font-medium mb-2">Por Pix</h3>
            <img src="assets/qrcode-pix.png" alt="Pix payment option" />
          </div>
          <div className="p-4 border border-gray-200 rounded-md">
            <h3 className="font-medium mb-2">Em pessoa</h3>
            <p className="text-gray-600">
            Coloque seu dízimo na cesta de coleta durante a missa ou na secretaria paroquial durante o horário comercial.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Para mais informações, entre em contato com a secretaria paroquial.</p>
      </div>
    </div>
  );
};

export default Donate;