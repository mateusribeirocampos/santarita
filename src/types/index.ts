// Interface unificada para eventos (compatível com mock e API)
export interface Event {
  id: string | number;
  title: string;
  description: string;
  fullDescription?: string;
  date: string;
  time: string;
  location?: string;
  image?: string;
  type: string;
  category?: {
    id: string;
    name: string;
  };
}

// Interface unificada para notícias (compatível com mock e API)
export interface News {
  id: string | number;
  title: string;
  summary: string;
  content: string;
  image?: string;
  date?: string; // Para compatibilidade com mock data
  publishedAt?: string; // Para dados da API
  category?: {
    id: string;
    name: string;
  } | string; // String para compatibilidade com mock data
}

// Estados de loading/error
export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Hooks personalizados return types
export interface UseEventsReturn {
  events: Event[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseNewsReturn {
  news: News[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  } | null;
  refetch: () => Promise<void>;
}