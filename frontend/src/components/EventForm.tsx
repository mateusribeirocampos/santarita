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
        await apiService.updateEvent(event.id.toString(), eventData);
      } else {
        // Create new event
        await apiService.createEvent(eventData);
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
    <div className="fixed inset-0 bg-ink/60 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border border-line w-11/12 md:w-3/4 lg:w-1/2 bg-parchment">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-serif text-lg font-medium text-ink">
            {event ? 'Editar Evento' : 'Novo Evento'}
          </h3>
          <button
            onClick={onClose}
            className="text-ink-soft hover:text-ink"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-wine-light border border-wine/40 text-wine px-4 py-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-ink">
              Título *
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-line px-3 py-2 focus:outline-none focus:ring-1 focus:ring-wine focus:border-wine"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-ink">
              Descrição *
            </label>
            <textarea
              name="description"
              id="description"
              required
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-line px-3 py-2 focus:outline-none focus:ring-1 focus:ring-wine focus:border-wine"
            />
          </div>

          <div>
            <label htmlFor="fullDescription" className="block text-sm font-medium text-ink">
              Descrição Completa
            </label>
            <textarea
              name="fullDescription"
              id="fullDescription"
              rows={4}
              value={formData.fullDescription}
              onChange={handleChange}
              className="mt-1 block w-full border border-line px-3 py-2 focus:outline-none focus:ring-1 focus:ring-wine focus:border-wine"
              placeholder="HTML é aceito (ex: <p>Texto</p>)"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-ink">
                Data *
              </label>
              <input
                type="date"
                name="date"
                id="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full border border-line px-3 py-2 focus:outline-none focus:ring-1 focus:ring-wine focus:border-wine"
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-ink">
                Horário *
              </label>
              <input
                type="time"
                name="time"
                id="time"
                required
                value={formData.time}
                onChange={handleChange}
                className="mt-1 block w-full border border-line px-3 py-2 focus:outline-none focus:ring-1 focus:ring-wine focus:border-wine"
              />
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-ink">
              Local
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full border border-line px-3 py-2 focus:outline-none focus:ring-1 focus:ring-wine focus:border-wine"
              placeholder="Ex: Igreja Principal, Salão Paroquial"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-ink">
                Tipo *
              </label>
              <select
                name="type"
                id="type"
                required
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full border border-line px-3 py-2 focus:outline-none focus:ring-1 focus:ring-wine focus:border-wine"
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
              <label htmlFor="categoryId" className="block text-sm font-medium text-ink">
                Categoria *
              </label>
              <select
                name="categoryId"
                id="categoryId"
                required
                value={formData.categoryId}
                onChange={handleChange}
                className="mt-1 block w-full border border-line px-3 py-2 focus:outline-none focus:ring-1 focus:ring-wine focus:border-wine"
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
              className="px-4 py-2 text-sm font-medium text-ink border border-line hover:border-ink focus:outline-none transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-parchment bg-wine hover:bg-wine-dark focus:outline-none disabled:opacity-50 transition-colors"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-parchment mr-2"></div>
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