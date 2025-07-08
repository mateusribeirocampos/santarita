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
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            {news ? 'Editar Notícia' : 'Nova Notícia'}
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
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
              Resumo *
            </label>
            <textarea
              name="summary"
              id="summary"
              required
              rows={2}
              value={formData.summary}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Breve descrição da notícia"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Conteúdo *
            </label>
            <textarea
              name="content"
              id="content"
              required
              rows={6}
              value={formData.content}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Conteúdo completo da notícia. HTML é aceito."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div>
              <label htmlFor="publishedAt" className="block text-sm font-medium text-gray-700">
                Data de Publicação
              </label>
              <input
                type="date"
                name="publishedAt"
                id="publishedAt"
                value={formData.publishedAt}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900">
              Publicar imediatamente
            </label>
          </div>

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
              {news ? 'Atualizar' : 'Criar'} Notícia
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsForm;