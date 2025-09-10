import { Newspaper, Bell, Search, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNews } from '../hooks/useNews';
import { getSafeImageUrlWithFallback } from '../utils/imageUtils';

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { news, loading, error,  refetch } = useNews({ 
    published: true,
    category: selectedCategory,
    search: searchTerm || undefined,
    limit: 10
  });
  
  // Debug: console.log('🗞️ [News] Estado atual:', { news: news?.length, loading, error });

  const categories = ["Todos", "Anúncios", "Notícias da Paróquia", "Jovens", "Comunidade", "Eventos"];

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category === "Todos" ? undefined : category);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;
    setSearchTerm(search);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Notícias e atualizações da paróquia</h1>
        <p className="text-xl text-gray-600">Mantenha-se informado sobre a nossa comunidade paroquial</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <form onSubmit={handleSearch} className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              name="search"
              type="text"
              placeholder="Pesquisar notícias..."
              defaultValue={searchTerm}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </form>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  (category === "Todos" && !selectedCategory) || category === selectedCategory
                    ? "bg-blue-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-700 mr-3" />
          <span className="text-lg text-gray-600">Carregando notícias...</span>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center mb-8">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">Erro ao carregar notícias</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={refetch}
            className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Tentar novamente
          </button>
        </div>
      )}

      {/* News Content */}
      {/* Debug render conditions */}
      {!loading && !error && news.length > 0 && (
        <>
          {/* Featured News */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
            <div className="relative h-96">
              <img
                src={getSafeImageUrlWithFallback(news[0].image, '/assets/semanaSanta.jpg')}
                alt={news[0].title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/assets/semanaSanta.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex items-center mb-2">
                  <Bell className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">
                    {typeof news[0].category === 'string' ? news[0].category : news[0].category?.name}
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-2">{news[0].title}</h2>
                <p className="text-lg mb-4">{news[0].summary}</p>
                <Link to={`/news/${news[0].id}`}>
                  <button className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors">
                    Leia mais →
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* News Grid */}
          {news.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.slice(1).map((item) => (
                <div key={item.id} className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
                  <img
                    src={getSafeImageUrlWithFallback(item.image, '/assets/semanaSanta.jpg')}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/assets/semanaSanta.jpg';
                    }}
                  />
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <Newspaper className="h-4 w-4 text-blue-700 mr-2" />
                      <span className="text-sm font-medium text-blue-700">
                        {typeof item.category === 'string' ? item.category : item.category?.name}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.summary}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{item.date}</span>
                      <Link to={`/news/${item.id}`} className="text-blue-700 font-medium hover:text-blue-800">
                        Leia mais →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {!loading && !error && news.length === 0 && (
        <div className="text-center py-12">
          <Newspaper className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhuma notícia encontrada</h3>
          <p className="text-gray-500">
            {searchTerm || selectedCategory 
              ? 'Tente ajustar os filtros de busca.'
              : 'Não há notícias disponíveis no momento. Volte em breve!'
            }
          </p>
        </div>
      )}

      {/* Newsletter Signup */}
      <div className="mt-12 bg-gray-50 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-semibold mb-4">Inscreva-se na nossa Newsletter</h3>
        <p className="text-gray-600 mb-6">Fique atualizado com as últimas notícias e anúncios</p>
        <div className="max-w-md mx-auto flex gap-4">
          <input
            type="email"
            placeholder="Digite seu email"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          <button className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors">
            Inscreva-se
          </button>
        </div>
      </div>
    </div>
  );
};

export default News;