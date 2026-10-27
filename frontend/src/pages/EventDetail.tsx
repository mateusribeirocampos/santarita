import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowLeft, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { apiService } from '../services/api';
import { Event } from '../types';
import { getSafeImageUrlWithFallback } from '../utils/imageUtils';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const apiEvent = await apiService.getEventById(id);
        
        // Sanitizar URL da imagem
        const sanitizeImageUrl = (url: string | undefined): string => {
          if (!url) return '/assets/igreja.png'; // fallback
          
          // Permitir URLs relativas seguras
          if (url.startsWith('/uploads/') || url.startsWith('/assets/')) {
            return url;
          }
          
          // Permitir URLs do backend em produção
          if (url.startsWith('https://santa-rita-backend.onrender.com/uploads/')) {
            return url;
          }
          
          // Se for URL externa não autorizada, usar fallback
          return '/assets/igreja.png';
        };

        const transformedEvent: Event = {
          id: apiEvent.id,
          title: apiEvent.title,
          description: apiEvent.description,
          fullDescription: apiEvent.fullDescription,
          date: new Date(apiEvent.date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          }),
          time: apiEvent.time,
          location: apiEvent.location,
          image: sanitizeImageUrl(apiEvent.image),
          type: apiEvent.type,
          category: apiEvent.category
        };
        
        setEvent(transformedEvent);
      } catch (err) {
        console.error('Erro ao carregar evento:', err);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-wine mr-3" />
          <span className="text-lg text-ink-soft">Carregando evento...</span>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
        <h1 className="font-serif text-2xl font-semibold text-ink mb-4">Evento não encontrado</h1>
        <Link to="/eventos" className="text-wine hover:underline inline-flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para eventos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <Link to="/eventos" className="text-wine hover:underline inline-flex items-center mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar para eventos
      </Link>

      <div className="border border-line overflow-hidden">
        <div className="h-64 sm:h-96 w-full">
          <img
            src={getSafeImageUrlWithFallback(event.image)}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 md:p-8">
          <div className="text-sm text-wine font-semibold mb-2">
            {event.type}
          </div>

          <h1 className="font-serif text-3xl font-semibold text-ink mb-4">
            {event.title}
          </h1>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-ink-soft">
              <Calendar className="h-5 w-5 mr-2" strokeWidth={1.5} />
              {event.date}
            </div>
            <div className="flex items-center text-ink-soft">
              <Clock className="h-5 w-5 mr-2" strokeWidth={1.5} />
              {event.time}
            </div>
            {event.location && (
              <div className="flex items-center text-ink-soft">
                <MapPin className="h-5 w-5 mr-2" strokeWidth={1.5} />
                {event.location}
              </div>
            )}
          </div>

          <div className="prose max-w-none text-ink-soft">
            <p>{event.description}</p>
            {event.fullDescription && (
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(event.fullDescription) }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;