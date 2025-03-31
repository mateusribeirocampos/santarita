import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Success = () => {
  const [sessionInfo, setSessionInfo] = useState<{ id: string } | null>(null);
  const location = useLocation();
  
  useEffect(() => {
    const sessionId = new URLSearchParams(location.search).get('session_id');
    
    if (sessionId) {
      // Opcionalmente, você pode verificar os detalhes da sessão no backend
      // fetch(`/api/checkout-session?sessionId=${sessionId}`)
      //   .then(res => res.json())
      //   .then(data => setSessionInfo(data));
      
      setSessionInfo({ id: sessionId });
    }
  }, [location]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Pagamento Realizado com Sucesso!</h1>
        <p className="text-gray-600 mb-6">
          Obrigado por seu dízimo. Sua contribuição é muito importante para nossa comunidade.
        </p>
        {sessionInfo && (
          <p className="text-sm text-gray-500 mb-6">
            ID da transação: {sessionInfo.id}
          </p>
        )}
        <Link 
          to="/" 
          className="inline-block py-3 px-6 bg-blue-700 text-white rounded-md hover:bg-blue-800"
        >
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
};

export default Success;
