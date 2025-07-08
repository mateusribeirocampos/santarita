import { useState, useEffect } from 'react';
import { apiService, ApiEvent } from '../services/api';
import { Event, UseEventsReturn } from '../types';

// Função para converter ApiEvent para Event
const transformApiEvent = (apiEvent: ApiEvent): Event => {
  console.log('🔄 [transformApiEvent] Transformando:', apiEvent);
  const transformed = {
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
    image: apiEvent.image,
    type: apiEvent.type,
    category: apiEvent.category
  };
  console.log('✅ [transformApiEvent] Resultado:', transformed);
  return transformed;
};

export function useEvents(params?: {
  category?: string;
  type?: string;
  active?: boolean;
}): UseEventsReturn {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    console.log('🔍 [useEvents] Iniciando fetchEvents com params:', params);
    try {
      setLoading(true);
      setError(null);
      
      console.log('📡 [useEvents] Chamando apiService.getEvents...');
      const apiEvents = await apiService.getEvents(params);
      console.log('✅ [useEvents] Resposta da API recebida:', apiEvents);
      
      const transformedEvents = apiEvents.map(transformApiEvent);
      console.log('🔄 [useEvents] Dados transformados:', transformedEvents);
      
      setEvents(transformedEvents);
      console.log('✅ [useEvents] Estado atualizado com sucesso');
    } catch (err) {
      console.error('❌ [useEvents] Erro ao carregar eventos:', err);
      console.error('❌ [useEvents] Detalhes do erro:', {
        message: err instanceof Error ? err.message : 'Erro desconhecido',
        stack: err instanceof Error ? err.stack : 'Sem stack trace'
      });
      setError('Erro ao carregar eventos. Tente novamente mais tarde.');
      setEvents([]);
    } finally {
      setLoading(false);
      console.log('🏁 [useEvents] fetchEvents finalizado');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [params?.category, params?.type, params?.active]);

  return {
    events,
    loading,
    error,
    refetch: fetchEvents
  };
}