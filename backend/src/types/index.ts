// Common types for the backend application
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'EDITOR';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreateInput {
  name: string;
  email: string;
  password: string;
  role?: 'USER' | 'ADMIN' | 'EDITOR';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: Omit<User, 'password'>;
  token: string;
}

// Category types
export interface Category {
  id: string;
  name: string;
  description?: string;
  type: 'EVENT' | 'NEWS';
  createdAt: Date;
  updatedAt: Date;
}

// Event types
export interface Event {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  date: Date;
  time: string;
  location?: string;
  image?: string;
  type: string;
  isActive: boolean;
  categoryId: string;
  authorId?: string;
  createdAt: Date;
  updatedAt: Date;
  category?: Category;
  author?: Omit<User, 'password'>;
}

export interface EventCreateInput {
  title: string;
  description: string;
  fullDescription?: string;
  date: Date;
  time: string;
  location?: string;
  image?: string;
  type?: string;
  categoryId: string;
}

export interface EventUpdateInput extends Partial<EventCreateInput> {
  isActive?: boolean;
}

export interface EventFilters {
  category?: string;
  type?: string;
  active?: boolean;
}

// News types
export interface News {
  id: string;
  title: string;
  summary: string;
  content: string;
  image?: string;
  isPublished: boolean;
  publishedAt?: Date;
  categoryId: string;
  authorId?: string;
  createdAt: Date;
  updatedAt: Date;
  category?: Category;
  author?: Omit<User, 'password'>;
}

export interface NewsCreateInput {
  title: string;
  summary: string;
  content: string;
  image?: string;
  categoryId: string;
  isPublished?: boolean;
  publishedAt?: Date;
}

export interface NewsUpdateInput extends Partial<NewsCreateInput> {
  isPublished?: boolean;
}

export interface NewsFilters {
  category?: string;
  published?: boolean | string;
  search?: string;
}

// Express Request extensions
declare global {
  namespace Express {
    interface Request {
      user?: Omit<User, 'password'>;
    }
  }
}

// Donation types
export interface Donation {
  id: string;
  amount: number;
  currency: string;
  donationType: 'ONCE' | 'MONTHLY' | 'YEARLY';
  status: 'PENDING' | 'PAID' | 'CANCELLED' | 'REFUNDED';
  stripeId?: string;
  donorEmail?: string;
  donorName?: string;
  donorPhone?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Stripe types
export interface StripeCheckoutRequest {
  amount: number;
  donationType: 'once' | 'monthly';
}

export interface StripeCheckoutResponse {
  id: string;
}

// Error types
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export interface ErrorResponse {
  error: string;
  statusCode?: number;
  stack?: string;
}