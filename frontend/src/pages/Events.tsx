import { Calendar, Users, Music, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents';
import { getSafeImageUrlWithFallback } from '../utils/imageUtils';

const Events = () => {
  const { events, loading, error, refetch } = useEvents({ active: true });
  
  // Debug: console.log('📅 [Events] Estado atual:', { events: events?.length, loading, error });
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Próximos eventos</h1>
        <p className="text-xl text-gray-600">Junte-se a nós em nossas reuniões e celebrações comunitárias</p>
      </div>

      {/* Event Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
          <Calendar className="h-12 w-12 mx-auto text-blue-700 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Eventos litúrgicos</h3>
          <p className="text-gray-600">Missas especiais e celebrações religiosas</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
          <Users className="h-12 w-12 mx-auto text-blue-700 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Eventos da Comunidade</h3>
          <p className="text-gray-600">Reuniões comunitárias</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
          <Music className="h-12 w-12 mx-auto text-blue-700 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Eventos Culturais</h3>
          <p className="text-gray-600">Música, arte, e celebrações culturais</p>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-700 mr-3" />
          <span className="text-lg text-gray-600">Carregando eventos...</span>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">Erro ao carregar eventos</h3>
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

      {/* Event List */}
      {/* Debug render conditions */}
      {!loading && !error && (
        <div className="space-y-8">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0">
                    <img
                      className="h-48 w-full object-cover md:w-48"
                      src={getSafeImageUrlWithFallback(event.image)}
                      alt={event.title}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/assets/igreja.png';
                      }}
                    />
                  </div>
                  <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-blue-700 font-semibold">
                      {event.type}
                    </div>
                    <h2 className="block mt-1 text-2xl font-semibold text-gray-900">
                      {event.title}
                    </h2>
                    <div className="mt-2 text-gray-600">
                      <p className="font-medium">{event.date} às {event.time}</p>
                      {event.location && (
                        <p className="text-sm text-gray-500">📍 {event.location}</p>
                      )}
                      <p className="mt-2">{event.description}</p>
                    </div>
                    <div className="mt-4">
                      <Link to={`/eventos/${event.id}`}>                
                        <button className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors">
                          Leia mais
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum evento encontrado</h3>
              <p className="text-gray-500">Não há eventos agendados no momento. Volte em breve!</p>
            </div>
          )}
        </div>
      )}

      {/* Calendar Download */}
      <div className="mt-12 text-center">
        <button className="inline-flex items-center bg-gray-100 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors">
          <Calendar className="h-5 w-5 mr-2" />
          Baixar calendário completo
        </button>
      </div>
    </div>
  );
};

export default Events;