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
      
      // Fallback para dados mock em caso de erro
      const mockNews: News[] = [
        {
          id: 1,
          title: "Anunciado o calendário da Semana Santa",
          date: "15 de Março, 2025",
          category: "Anúncios",
          image: "assets/semanaSanta.jpg",
          summary: "Participe de nossas celebrações da Semana Santa começando com o Domingo de Ramos.",
          content: "Temos o prazer de anunciar nossa programação da Semana Santa, com serviços especiais do Domingo de Ramos até o Domingo de Páscoa..."
        },
        {
          id: 2,
          title: "Lançamento de novo programa do Ministério Jovem",
          date: "10 de Março, 2025",
          category: "Jovens",
          image: "assets/youthCatholic.jpg",
          summary: "Nosso ministério jovem apresenta novas atividades semanais focadas na formação da fé e na construção da comunidade.",
          content: "A partir do próximo mês, nosso ministério jovem começará um emocionante novo programa com atividades semanais..."
        },
        {
          id: 3,
          title: "Atualização do Projeto de Renovação da Igreja",
          date: "5 de Março, 2025",
          category: "Notícias da Paróquia",
          image: "assets/virgemmariaRenovacao.jpg",
          summary: "A primeira fase do projeto de renovação da nossa igreja foi concluída. Veja o progresso e os próximos planos.",
          content: "Estamos empolgados em anunciar que a primeira fase do nosso projeto de renovação foi concluída com sucesso..."
        }
      ];
      
      console.log('⚠️ [useNews] Usando dados mock devido ao erro:', mockNews);
      setNews(mockNews);
      setPagination({
        page: 1,
        limit: 10,
        total: mockNews.length,
        totalPages: 1,
        hasNext: false,
        hasPrev: false
      });
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