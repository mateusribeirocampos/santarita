import { useState, useEffect } from 'react';
import { apiService, ApiNews } from '../services/api';
import { News, UseNewsReturn } from '../types';

// Função para converter ApiNews para News
const transformApiNews = (apiNews: ApiNews): News => {
  console.log('🔄 [transformApiNews] Transformando:', apiNews);
  const transformed = {
    id: apiNews.id,
    title: apiNews.title,
    summary: apiNews.summary,
    content: apiNews.content,
    image: apiNews.image,
    publishedAt: apiNews.publishedAt,
    date: apiNews.publishedAt ? new Date(apiNews.publishedAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }) : undefined,
    category: apiNews.category
  };
  console.log('✅ [transformApiNews] Resultado:', transformed);
  return transformed;
};

export function useNews(params?: {
  category?: string;
  published?: boolean;
  page?: number;
  limit?: number;
  search?: string;
}): UseNewsReturn {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<UseNewsReturn['pagination']>(null);

  const fetchNews = async () => {
    console.log('🔍 [useNews] Iniciando fetchNews com params:', params);
    try {
      setLoading(true);
      setError(null);
      
      console.log('📡 [useNews] Chamando apiService.getNews...');
      const response = await apiService.getNews(params);
      console.log('✅ [useNews] Resposta da API recebida:', response);
      
      const transformedNews = response.news.map(transformApiNews);
      console.log('🔄 [useNews] Dados transformados:', transformedNews);
      
      setNews(transformedNews);
      setPagination(response.pagination);
      console.log('✅ [useNews] Estado atualizado com sucesso');
    } catch (err) {
      console.error('❌ [useNews] Erro ao carregar notícias:', err);
      console.error('❌ [useNews] Detalhes do erro:', {
        message: err instanceof Error ? err.message : 'Erro desconhecido',
        stack: err instanceof Error ? err.stack : 'Sem stack trace'
      });
      setError('Erro ao carregar notícias. Tente novamente mais tarde.');
      setNews([]);
      setPagination(null);
    } finally {
      setLoading(false);
      console.log('🏁 [useNews] fetchNews finalizado');
    }
  };

  useEffect(() => {
    fetchNews();
  }, [params?.category, params?.published, params?.page, params?.limit, params?.search]);

  return {
    news,
    loading,
    error,
    pagination,
    refetch: fetchNews
  };
}