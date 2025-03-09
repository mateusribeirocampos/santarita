import { useParams, Link } from 'react-router-dom';
import { upcomingEvents } from '../constants/upcomingEvents.ts';
import { Calendar, MapPin, Clock, ArrowLeft } from 'lucide-react';

const EventDetail = () => {
  const { id } = useParams();
  const event = upcomingEvents.find(event => event.id.toString() === id);

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
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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
              <div dangerouslySetInnerHTML={{ __html: event.fullDescription }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;