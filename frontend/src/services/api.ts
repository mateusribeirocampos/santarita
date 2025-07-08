import { authService } from './authService';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface ApiEvent {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  date: string;
  time: string;
  location?: string;
  image?: string;
  type: string;
  isActive: boolean;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    description?: string;
  };
  author?: {
    id: string;
    name: string;
  };
}

export interface ApiNews {
  id: string;
  title: string;
  summary: string;
  content: string;
  image?: string;
  isPublished: boolean;
  publishedAt?: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    description?: string;
  };
  author?: {
    id: string;
    name: string;
  };
}

export interface NewsResponse {
  news: ApiNews[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log(`📡 [ApiService] Fazendo request para: ${url}`);
    
    try {
      // Adicionar headers de autenticação automaticamente quando disponível
      const authHeaders = authService.getAuthHeaders();
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
          ...options?.headers,
        },
        ...options,
      });
      
      console.log(`📊 [ApiService] Status da resposta: ${response.status}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ [ApiService] Erro HTTP:`, {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        
        // Se erro 401, token pode ter expirado - fazer logout
        if (response.status === 401) {
          authService.logout();
          window.location.href = '/login';
        }
        
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`✅ [ApiService] Dados recebidos:`, data);
      return data;
    } catch (error) {
      console.error('❌ [ApiService] Request falhou:', { endpoint, error });
      throw error;
    }
  }

  // Events API
  async getEvents(params?: {
    category?: string;
    type?: string;
    active?: boolean;
  }): Promise<ApiEvent[]> {
    const searchParams = new URLSearchParams();
    
    if (params?.category) searchParams.set('category', params.category);
    if (params?.type) searchParams.set('type', params.type);
    if (params?.active !== undefined) searchParams.set('active', params.active.toString());
    
    const queryString = searchParams.toString();
    const endpoint = `/api/events${queryString ? `?${queryString}` : ''}`;
    
    return this.request<ApiEvent[]>(endpoint);
  }

  async getEventById(id: string): Promise<ApiEvent> {
    return this.request<ApiEvent>(`/api/events/${id}`);
  }

  async createEvent(eventData: any): Promise<{ success: boolean; message: string; data: ApiEvent }> {
    return this.request(`/api/events`, {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  async updateEvent(id: string, eventData: any): Promise<{ success: boolean; message: string; data: ApiEvent }> {
    return this.request(`/api/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  }

  async deleteEvent(id: string): Promise<void> {
    return this.request(`/api/events/${id}`, {
      method: 'DELETE',
    });
  }

  // News API
  async getNews(params?: {
    category?: string;
    published?: boolean;
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<NewsResponse> {
    const searchParams = new URLSearchParams();
    
    if (params?.category) searchParams.set('category', params.category);
    if (params?.published !== undefined) searchParams.set('published', params.published.toString());
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.search) searchParams.set('search', params.search);
    
    const queryString = searchParams.toString();
    const endpoint = `/api/news${queryString ? `?${queryString}` : ''}`;
    
    return this.request<NewsResponse>(endpoint);
  }

  async getNewsById(id: string): Promise<ApiNews> {
    return this.request<ApiNews>(`/api/news/${id}`);
  }

  async createNews(newsData: any): Promise<{ success: boolean; message: string; data: ApiNews }> {
    return this.request(`/api/news`, {
      method: 'POST',
      body: JSON.stringify(newsData),
    });
  }

  async updateNews(id: string, newsData: any): Promise<{ success: boolean; message: string; data: ApiNews }> {
    return this.request(`/api/news/${id}`, {
      method: 'PUT',
      body: JSON.stringify(newsData),
    });
  }

  async deleteNews(id: string): Promise<void> {
    return this.request(`/api/news/${id}`, {
      method: 'DELETE',
    });
  }

  // Categories API
  async getCategories(): Promise<{ id: string; name: string; description?: string }[]> {
    return this.request<{ id: string; name: string; description?: string }[]>('/api/categories');
  }
}

export const apiService = new ApiService();