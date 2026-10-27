import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { News } from '../types';
import { apiService } from '../services/api';
import ImageUpload from './ImageUpload';

interface NewsFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  news?: News | null;
}

interface CategoryOption {
  id: string;
  name: string;
}

const NewsForm = ({ isOpen, onClose, onSave, news }: NewsFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    image: '',
    categoryId: '',
    isPublished: true,
    publishedAt: ''
  });
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (news) {
      setFormData({
        title: news.title || '',
        summary: news.summary || '',
        content: news.content || '',
        image: news.image || '',
        categoryId: typeof news.category === 'object' ? news.category?.id || '' : '',
        isPublished: true,
        publishedAt: news.publishedAt ? new Date(news.publishedAt).toISOString().split('T')[0] : ''
      });
    } else {
      setFormData({
        title: '',
        summary: '',
        content: '',
        image: '',
        categoryId: '',
        isPublished: true,
        publishedAt: new Date().toISOString().split('T')[0] // Today's date
      });
    }
  }, [news]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await apiService.getCategories();
        setCategories(categoriesData.filter(cat => cat.name === 'Anúncios' || !cat.name.includes('Litúrgicos')));
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
      // Ensure publishedAt is set to current time if published and no date specified
      let publishedAt = undefined;
      if (formData.isPublished) {
        if (formData.publishedAt) {
          publishedAt = new Date(formData.publishedAt + 'T12:00:00.000Z').toISOString();
        } else {
          publishedAt = new Date().toISOString();
        }
      }
      
      const newsData = {
        ...formData,
        publishedAt,
      };
      
      console.log('📰 [NewsForm] Enviando dados:', newsData);

      if (news) {
        // Update existing news
        await apiService.updateNews(news.id.toString(), newsData);
      } else {
        // Create new news
        await apiService.createNews(newsData);
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
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-ink/60 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border border-line w-11/12 md:w-3/4 lg:w-1/2 bg-parchment">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-serif text-lg font-medium text-ink">
            {news ? 'Editar Notícia' : 'Nova Notícia'}
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
            <label htmlFor="summary" className="block text-sm font-medium text-ink">
              Resumo *
            </label>
            <textarea
              name="summary"
              id="summary"
              required
              rows={2}
              value={formData.summary}
              onChange={handleChange}
              className="mt-1 block w-full border border-line px-3 py-2 focus:outline-none focus:ring-1 focus:ring-wine focus:border-wine"
              placeholder="Breve descrição da notícia"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-ink">
              Conteúdo *
            </label>
            <textarea
              name="content"
              id="content"
              required
              rows={6}
              value={formData.content}
              onChange={handleChange}
              className="mt-1 block w-full border border-line px-3 py-2 focus:outline-none focus:ring-1 focus:ring-wine focus:border-wine"
              placeholder="Conteúdo completo da notícia. HTML é aceito."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div>
              <label htmlFor="publishedAt" className="block text-sm font-medium text-ink">
                Data de Publicação
              </label>
              <input
                type="date"
                name="publishedAt"
                id="publishedAt"
                value={formData.publishedAt}
                onChange={handleChange}
                className="mt-1 block w-full border border-line px-3 py-2 focus:outline-none focus:ring-1 focus:ring-wine focus:border-wine"
              />
            </div>
          </div>

          <ImageUpload
            currentImage={formData.image}
            onImageChange={(imageUrl) => setFormData(prev => ({ ...prev, image: imageUrl }))}
            onImageRemove={() => setFormData(prev => ({ ...prev, image: '' }))}
            placeholder="Faça upload da imagem da notícia"
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isPublished"
              id="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
              className="h-4 w-4 text-wine focus:ring-wine border-line rounded"
            />
            <label htmlFor="isPublished" className="ml-2 block text-sm text-ink">
              Publicar imediatamente
            </label>
          </div>

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
              {news ? 'Atualizar' : 'Criar'} Notícia
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsForm;