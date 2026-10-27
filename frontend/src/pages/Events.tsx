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
        <h1 className="font-serif text-4xl font-semibold text-ink mb-4">Próximos eventos</h1>
        <p className="text-xl text-ink-soft">Junte-se a nós em nossas reuniões e celebrações comunitárias</p>
      </div>

      {/* Event Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="border border-line p-6 text-center">
          <Calendar className="h-9 w-9 mx-auto text-wine mb-4" strokeWidth={1.5} />
          <h3 className="font-serif text-xl font-semibold mb-2 text-ink">Eventos litúrgicos</h3>
          <p className="text-ink-soft">Missas especiais e celebrações religiosas</p>
        </div>
        <div className="border border-line p-6 text-center">
          <Users className="h-9 w-9 mx-auto text-wine mb-4" strokeWidth={1.5} />
          <h3 className="font-serif text-xl font-semibold mb-2 text-ink">Eventos da Comunidade</h3>
          <p className="text-ink-soft">Reuniões comunitárias</p>
        </div>
        <div className="border border-line p-6 text-center">
          <Music className="h-9 w-9 mx-auto text-wine mb-4" strokeWidth={1.5} />
          <h3 className="font-serif text-xl font-semibold mb-2 text-ink">Eventos Culturais</h3>
          <p className="text-ink-soft">Música, arte, e celebrações culturais</p>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-wine mr-3" />
          <span className="text-lg text-ink-soft">Carregando eventos...</span>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="border border-wine/40 bg-wine-light p-6 text-center">
          <AlertCircle className="h-10 w-10 text-wine mx-auto mb-4" strokeWidth={1.5} />
          <h3 className="font-serif text-lg font-semibold text-wine mb-2">Erro ao carregar eventos</h3>
          <p className="text-ink-soft mb-4">{error}</p>
          <button
            onClick={refetch}
            className="inline-flex items-center border border-wine text-wine px-4 py-2 hover:bg-wine hover:text-parchment transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Tentar novamente
          </button>
        </div>
      )}

      {/* Event List */}
      {/* Debug render conditions */}
      {!loading && !error && (
        <div className="space-y-6">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="border border-line overflow-hidden">
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
                    <div className="text-sm text-wine font-semibold">
                      {event.type}
                    </div>
                    <h2 className="font-serif block mt-1 text-2xl font-semibold text-ink">
                      {event.title}
                    </h2>
                    <div className="mt-2 text-ink-soft">
                      <p className="font-medium">{event.date} às {event.time}</p>
                      {event.location && (
                        <p className="text-sm text-ink-soft">📍 {event.location}</p>
                      )}
                      <p className="mt-2">{event.description}</p>
                    </div>
                    <div className="mt-4">
                      <Link to={`/eventos/${event.id}`}>
                        <button className="border border-ink text-ink px-4 py-2 hover:bg-ink hover:text-parchment transition-colors">
                          Leia mais
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 border border-line">
              <Calendar className="h-12 w-12 text-ink-soft mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="font-serif text-xl font-semibold text-ink mb-2">Nenhum evento encontrado</h3>
              <p className="text-ink-soft">Não há eventos agendados no momento. Volte em breve!</p>
            </div>
          )}
        </div>
      )}

      {/* Calendar Download */}
      <div className="mt-12 text-center">
        <button className="inline-flex items-center border border-line text-ink px-6 py-3 hover:border-wine hover:text-wine transition-colors">
          <Calendar className="h-5 w-5 mr-2" strokeWidth={1.5} />
          Baixar calendário completo
        </button>
      </div>
    </div>
  );
};

export default Events;