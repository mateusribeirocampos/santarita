import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

interface SessionInfo {
  id: string;
  payment_status?: string;
  amount_total?: number;
  currency?: string;
  customer_details?: {
    email?: string;
  };
}

const Success = () => {
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    const sessionId = new URLSearchParams(location.search).get('session_id');
    
    if (sessionId) {
      // Verificar os detalhes da sessão no backend
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      fetch(`${API_BASE_URL}/api/checkout-session?sessionId=${sessionId}`)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then(data => {
          setSessionInfo(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Erro ao buscar sessão:', error);
          setSessionInfo({ id: sessionId });
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [location]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="border border-line p-8">
          <h1 className="font-serif text-2xl font-semibold text-ink mb-4">Verificando pagamento...</h1>
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-wine mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!sessionInfo) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="border border-line p-8">
          <h1 className="font-serif text-2xl font-semibold text-wine mb-4">Erro ao verificar pagamento</h1>
          <p className="text-ink-soft mb-6">
            Não foi possível verificar o status do seu pagamento. Entre em contato conosco se precisar de ajuda.
          </p>
          <Link
            to="/tithe"
            className="inline-block py-3 px-6 border border-wine text-wine hover:bg-wine hover:text-parchment mr-4 transition-colors"
          >
            Tentar Novamente
          </Link>
          <Link
            to="/"
            className="inline-block py-3 px-6 border border-ink text-ink hover:bg-ink hover:text-parchment transition-colors"
          >
            Página Inicial
          </Link>
        </div>
      </div>
    );
  }

  const formatAmount = (amount: number | undefined, currency: string | undefined) => {
    if (!amount) return 'N/A';
    const value = amount / 100; // Stripe returns in cents
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency || 'BRL'
    }).format(value);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <div className="border border-line p-8">
        <h1 className="font-serif text-3xl font-semibold text-wine mb-4">Pagamento realizado com sucesso</h1>
        <p className="text-ink-soft mb-6">
          Obrigado por seu dízimo. Sua contribuição é muito importante para nossa comunidade.
        </p>

        <div className="bg-parchment-dim border border-line p-6 mb-6">
          <h2 className="font-serif text-lg font-semibold mb-4 text-ink">Detalhes da doação</h2>
          <div className="space-y-2 text-left max-w-md mx-auto text-ink">
            <div className="flex justify-between">
              <span>ID da transação:</span>
              <span className="font-mono text-sm">{sessionInfo.id.substring(0, 20)}...</span>
            </div>
            {sessionInfo.amount_total && (
              <div className="flex justify-between">
                <span>Valor:</span>
                <span className="font-semibold text-wine">
                  {formatAmount(sessionInfo.amount_total, sessionInfo.currency)}
                </span>
              </div>
            )}
            {sessionInfo.payment_status && (
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="font-semibold capitalize">
                  {sessionInfo.payment_status === 'paid' ? 'Pago' : sessionInfo.payment_status}
                </span>
              </div>
            )}
            {sessionInfo.customer_details?.email && (
              <div className="flex justify-between">
                <span>Email:</span>
                <span>{sessionInfo.customer_details.email}</span>
              </div>
            )}
          </div>
        </div>

        <p className="text-sm text-ink-soft mb-6">
          Um email de confirmação será enviado para você em breve.
        </p>

        <Link
          to="/"
          className="inline-block py-3 px-6 border border-ink text-ink hover:bg-ink hover:text-parchment transition-colors"
        >
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
};

export default Success;
