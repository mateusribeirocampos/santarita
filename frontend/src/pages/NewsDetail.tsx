import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Loader2, AlertCircle } from 'lucide-react';
import DOMPurify from 'dompurify';
import { apiService, ApiNews } from '../services/api';
import { getSafeImageUrlWithFallback } from '../utils/imageUtils';

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
          <Loader2 className="h-8 w-8 animate-spin text-wine mr-3" />
          <span className="text-lg text-ink-soft">Carregando notícia...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !news) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-wine mx-auto mb-4" strokeWidth={1.5} />
          <h1 className="font-serif text-2xl font-semibold text-ink mb-2">Notícia não encontrada</h1>
          <p className="text-ink-soft mb-6">{error || 'A notícia que você está procurando não existe ou foi removida.'}</p>
          <Link
            to="/news"
            className="inline-flex items-center px-4 py-2 border border-ink text-ink hover:bg-ink hover:text-parchment transition-colors"
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
          className="inline-flex items-center text-wine hover:underline font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para Notícias
        </Link>
      </div>

      {/* Article */}
      <article className="border border-line overflow-hidden">
        {/* Hero image */}
        {news.image && (
          <div className="relative h-96">
            <img
              src={getSafeImageUrlWithFallback(news.image)}
              alt={news.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/assets/igreja.png';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-8">
          {/* Category badge */}
          {news.category && (
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border border-wine/40 bg-wine-light text-wine">
                <Tag className="h-3 w-3 mr-1" />
                {news.category.name}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="font-serif text-3xl font-semibold text-ink mb-4">
            {news.title}
          </h1>

          {/* Meta info */}
          <div className="flex items-center text-sm text-ink-soft mb-6 space-x-4">
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
            <div className="bg-parchment-dim border-l-2 border-wine p-4 mb-6">
              <p className="text-lg text-ink font-medium italic">
                {news.summary}
              </p>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {news.content.includes('<') ? (
              // Render HTML content
              <div
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(news.content) }}
                className="text-ink-soft leading-relaxed"
              />
            ) : (
              // Render plain text with line breaks
              <div className="text-ink-soft leading-relaxed whitespace-pre-line">
                {news.content}
              </div>
            )}
          </div>

          {/* Publication status */}
          <div className="mt-8 pt-6 border-t border-line">
            <div className="flex items-center justify-between">
              <div className="text-sm text-ink-soft">
                Atualizado em: {formatDate(news.updatedAt)}
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                  news.isPublished
                    ? 'border-line text-ink-soft'
                    : 'border-gold/50 bg-gold-light text-gold'
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
          className="inline-flex items-center px-6 py-3 border border-ink text-ink hover:bg-ink hover:text-parchment transition-colors font-medium"
        >
          Ver Todas as Notícias
        </Link>
      </div>
    </div>
  );
};

export default NewsDetail;