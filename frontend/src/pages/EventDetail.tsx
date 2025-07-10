import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowLeft, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { apiService } from '../services/api';
import { Event } from '../types';

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
          <Loader2 className="h-8 w-8 animate-spin text-blue-700 mr-3" />
          <span className="text-lg text-gray-600">Carregando evento...</span>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Evento não encontrado</h1>
        <Link to="/eventos" className="text-blue-700 hover:underline inline-flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para eventos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <Link to="/eventos" className="text-blue-700 hover:underline inline-flex items-center mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar para eventos
      </Link>
      
      <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden">
        <div className="h-64 sm:h-96 w-full">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-6 md:p-8">
          <div className="uppercase tracking-wide text-sm text-blue-700 font-semibold mb-2">
            {event.type}
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {event.title}
          </h1>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-2" />
              {event.date}
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-2" />
              {event.time}
            </div>
            {event.location && (
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                {event.location}
              </div>
            )}
          </div>
          
          <div className="prose max-w-none text-gray-700">
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