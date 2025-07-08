import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { Event } from '../types';
import { apiService } from '../services/api';
import ImageUpload from './ImageUpload';

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  event?: Event | null;
}

interface CategoryOption {
  id: string;
  name: string;
}

const EventForm = ({ isOpen, onClose, onSave, event }: EventFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fullDescription: '',
    date: '',
    time: '',
    location: '',
    image: '',
    type: '',
    categoryId: ''
  });
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (event && event.id) {
      // Fetch the original event data to get the ISO date
      const fetchEventData = async () => {
        try {
          console.log('🔄 [EventForm] Buscando dados do evento:', event.id);
          const apiEvent = await apiService.getEventById(event.id.toString());
          console.log('✅ [EventForm] Dados do evento recebidos:', apiEvent);
          
          const isoDate = new Date(apiEvent.date);
          const dateForInput = isoDate.toISOString().split('T')[0];
          
          setFormData({
            title: event.title || '',
            description: event.description || '',
            fullDescription: event.fullDescription || '',
            date: dateForInput,
            time: event.time || '',
            location: event.location || '',
            image: event.image || '',
            type: event.type || '',
            categoryId: event.category?.id || ''
          });
          
          console.log('✅ [EventForm] Formulário preenchido com sucesso');
        } catch (error) {
          console.error('❌ [EventForm] Erro ao buscar dados do evento:', error);
          setError('Erro ao carregar dados do evento');
          
          // Fallback: use available data but leave date empty
          setFormData({
            title: event.title || '',
            description: event.description || '',
            fullDescription: event.fullDescription || '',
            date: '', // Leave empty if we can't parse
            time: event.time || '',
            location: event.location || '',
            image: event.image || '',
            type: event.type || '',
            categoryId: event.category?.id || ''
          });
        }
      };
      
      fetchEventData();
    } else if (!event) {
      // New event, reset form
      console.log('🆕 [EventForm] Inicializando formulário para novo evento');
      setFormData({
        title: '',
        description: '',
        fullDescription: '',
        date: '',
        time: '',
        location: '',
        image: '',
        type: '',
        categoryId: ''
      });
      setError(null);
    }
  }, [event, event?.id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await apiService.getCategories();
        setCategories(categoriesData.filter(cat => cat.name === 'Litúrgicos' || !cat.name.includes('Anúncios')));
      } catch (err) {
        console.error('Erro ao carregar categorias:', err);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const eventData = {
        ...formData,
        date: new Date(formData.date + 'T' + formData.time).toISOString(),
      };

      if (event) {
        // Update existing event
        const response = await fetch(`http://localhost:3001/api/events/${event.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData),
        });

        if (!response.ok) {
          throw new Error('Erro ao atualizar evento');
        }
      } else {
        // Create new event
        const response = await fetch('http://localhost:3001/api/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData),
        });

        if (!response.ok) {
          throw new Error('Erro ao criar evento');
        }
      }

      onSave();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            {event ? 'Editar Evento' : 'Novo Evento'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Título *
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descrição *
            </label>
            <textarea
              name="description"
              id="description"
              required
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="fullDescription" className="block text-sm font-medium text-gray-700">
              Descrição Completa
            </label>
            <textarea
              name="fullDescription"
              id="fullDescription"
              rows={4}
              value={formData.fullDescription}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="HTML é aceito (ex: <p>Texto</p>)"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Data *
              </label>
              <input
                type="date"
                name="date"
                id="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                Horário *
              </label>
              <input
                type="time"
                name="time"
                id="time"
                required
                value={formData.time}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Local
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex: Igreja Principal, Salão Paroquial"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Tipo *
              </label>
              <select
                name="type"
                id="type"
                required
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Selecione o tipo</option>
                <option value="Missa">Missa</option>
                <option value="Juventude">Juventude</option>
                <option value="Serviço">Serviço</option>
                <option value="Celebração">Celebração</option>
                <option value="Reunião">Reunião</option>
              </select>
            </div>

            <div>
              <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
                Categoria *
              </label>
              <select
                name="categoryId"
                id="categoryId"
                required
                value={formData.categoryId}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Selecione a categoria</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ImageUpload
            currentImage={formData.image}
            onImageChange={(imageUrl) => setFormData(prev => ({ ...prev, image: imageUrl }))}
            onImageRemove={() => setFormData(prev => ({ ...prev, image: '' }))}
            placeholder="Faça upload da imagem do evento"
          />

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {event ? 'Atualizar' : 'Criar'} Evento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;