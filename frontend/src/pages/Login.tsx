import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Lock, Mail, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const { isAuthenticated, login, loading: authLoading, error: authError } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const success = await login(formData.email, formData.password);
      
      if (!success) {
        setError(authError || 'Email ou senha incorretos');
      }
    } catch {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-parchment">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-wine"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-parchment py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 border border-line p-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full border border-wine">
            <User className="h-5 w-5 text-wine" strokeWidth={1.5} />
          </div>
          <h2 className="mt-6 text-center font-serif text-2xl font-semibold text-ink">
            Área Administrativa
          </h2>
          <p className="mt-2 text-center text-sm text-ink-soft">
            Igreja Santa Rita de Cássia
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-ink-soft" strokeWidth={1.5} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="relative block w-full px-3 py-2 pl-10 border border-line placeholder-ink-soft text-ink focus:outline-none focus:ring-1 focus:ring-wine focus:border-wine sm:text-sm"
                  placeholder="Email administrativo"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-ink-soft" strokeWidth={1.5} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="relative block w-full px-3 py-2 pl-10 border border-line placeholder-ink-soft text-ink focus:outline-none focus:ring-1 focus:ring-wine focus:border-wine sm:text-sm"
                  placeholder="Senha"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-wine text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 text-sm font-medium text-parchment bg-wine hover:bg-wine-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wine disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-parchment"></div>
              ) : (
                'Entrar'
              )}
            </button>
          </div>

          <div className="text-center">
            <div className="text-sm text-ink-soft bg-parchment-dim border border-line p-4">
              <p className="font-medium text-ink mb-2">Credenciais de demonstração:</p>
              <p><strong>Admin:</strong> admin@santarita.com / admin123</p>
              <p><strong>Editor:</strong> padre@santarita.com / padre123</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;