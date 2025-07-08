import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Loader2, AlertCircle } from 'lucide-react';
import { apiService, ApiNews } from '../services/api';

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<ApiNews | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      if (!id) {
        setError('ID da notícia não encontrado');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log('🔍 [NewsDetail] Buscando notícia com ID:', id);
        const newsData = await apiService.getNewsById(id);
        console.log('✅ [NewsDetail] Notícia carregada:', newsData);
        setNews(newsData);
        setError(null);
      } catch (err) {
        console.error('❌ [NewsDetail] Erro ao carregar notícia:', err);
        setError('Erro ao carregar a notícia. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-700 mr-3" />
          <span className="text-lg text-gray-600">Carregando notícia...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !news) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Notícia não encontrada</h1>
          <p className="text-gray-600 mb-6">{error || 'A notícia que você está procurando não existe ou foi removida.'}</p>
          <Link 
            to="/news" 
            className="inline-flex items-center px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Notícias
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Back button */}
      <div className="mb-6">
        <Link 
          to="/news" 
          className="inline-flex items-center text-blue-700 hover:text-blue-800 font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para Notícias
        </Link>
      </div>

      {/* Article */}
      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Hero image */}
        {news.image && (
          <div className="relative h-96">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/assets/igreja.png';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-8">
          {/* Category badge */}
          {news.category && (
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                <Tag className="h-3 w-3 mr-1" />
                {news.category.name}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {news.title}
          </h1>

          {/* Meta info */}
          <div className="flex items-center text-sm text-gray-600 mb-6 space-x-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {news.publishedAt ? formatDate(news.publishedAt) : 'Não publicado'}
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              Igreja Santa Rita
            </div>
          </div>

          {/* Summary */}
          {news.summary && (
            <div className="bg-gray-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-lg text-gray-700 font-medium italic">
                {news.summary}
              </p>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {news.content.includes('<') ? (
              // Render HTML content
              <div 
                dangerouslySetInnerHTML={{ __html: news.content }}
                className="text-gray-700 leading-relaxed"
              />
            ) : (
              // Render plain text with line breaks
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {news.content}
              </div>
            )}
          </div>

          {/* Publication status */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Atualizado em: {formatDate(news.updatedAt)}
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  news.isPublished 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {news.isPublished ? 'Publicado' : 'Rascunho'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related/Back to news */}
      <div className="mt-8 text-center">
        <Link 
          to="/news" 
          className="inline-flex items-center px-6 py-3 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors font-medium"
        >
          Ver Todas as Notícias
        </Link>
      </div>
    </div>
  );
};

export default NewsDetail;