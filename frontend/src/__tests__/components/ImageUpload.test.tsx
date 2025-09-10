/**
 * Testes para o componente ImageUpload
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageUpload from '../../components/ImageUpload';

// Mock do authService
vi.mock('../../services/authService', () => ({
  authService: {
    isAuthenticated: vi.fn(() => true),
    getAuthHeaders: vi.fn(() => ({ Authorization: 'Bearer test-token' })),
    getToken: vi.fn(() => 'test-token'),
    logout: vi.fn(),
  },
}));

// Mock do fetch
global.fetch = vi.fn();

describe('ImageUpload', () => {
  const mockOnImageChange = vi.fn();
  const mockOnImageRemove = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render upload area when no image is provided', () => {
    render(
      <ImageUpload
        onImageChange={mockOnImageChange}
        onImageRemove={mockOnImageRemove}
      />
    );

    expect(screen.getByText(/Clique para fazer upload de uma imagem/i)).toBeInTheDocument();
    expect(screen.getByText(/Arraste e solte uma imagem aqui/i)).toBeInTheDocument();
  });

  it('should render image preview when image is provided', () => {
    render(
      <ImageUpload
        currentImage="/uploads/test-image.jpg"
        onImageChange={mockOnImageChange}
        onImageRemove={mockOnImageRemove}
      />
    );

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', 'Preview');
  });

  it('should show remove button when image is provided', () => {
    render(
      <ImageUpload
        currentImage="/uploads/test-image.jpg"
        onImageChange={mockOnImageChange}
        onImageRemove={mockOnImageRemove}
      />
    );

    const removeButton = screen.getByText('Remover');
    expect(removeButton).toBeInTheDocument();
  });

  it('should call onImageRemove when remove button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <ImageUpload
        currentImage="/uploads/test-image.jpg"
        onImageChange={mockOnImageChange}
        onImageRemove={mockOnImageRemove}
      />
    );

    const removeButton = screen.getByText('Remover');
    await user.click(removeButton);

    expect(mockOnImageRemove).toHaveBeenCalledTimes(1);
  });

  it('should have file type validation', () => {
    render(
      <ImageUpload
        onImageChange={mockOnImageChange}
        onImageRemove={mockOnImageRemove}
      />
    );

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(fileInput).toHaveAttribute('accept', 'image/*');
  });

  it('should validate file size', async () => {
    const user = userEvent.setup();
    
    render(
      <ImageUpload
        onImageChange={mockOnImageChange}
        onImageRemove={mockOnImageRemove}
      />
    );

    // Simular arquivo muito grande (6MB)
    const largeFile = new File(['x'.repeat(6 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' });
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

    await user.upload(fileInput, largeFile);

    await waitFor(() => {
      expect(screen.getByText(/O arquivo deve ter no máximo 5MB/i)).toBeInTheDocument();
    });
  });

  it('should show authentication error when user is not logged in', async () => {
    const { authService } = await import('../../services/authService');
    vi.mocked(authService.isAuthenticated).mockReturnValue(false);

    const user = userEvent.setup();
    
    render(
      <ImageUpload
        onImageChange={mockOnImageChange}
        onImageRemove={mockOnImageRemove}
      />
    );

    const validFile = new File(['image content'], 'test.jpg', { type: 'image/jpeg' });
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

    await user.upload(fileInput, validFile);

    await waitFor(() => {
      expect(screen.getByText(/Você precisa estar logado para fazer upload/i)).toBeInTheDocument();
    });
  });

  it('should show loading state during upload', async () => {
    // Mock fetch para simular upload em progresso
    vi.mocked(fetch).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve(new Response('{"imageUrl": "/uploads/test.jpg"}')), 100))
    );

    const user = userEvent.setup();
    
    render(
      <ImageUpload
        onImageChange={mockOnImageChange}
        onImageRemove={mockOnImageRemove}
      />
    );

    const validFile = new File(['image content'], 'test.jpg', { type: 'image/jpeg' });
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

    await user.upload(fileInput, validFile);

    // Verificar se o estado de loading aparece
    expect(screen.getByText(/Fazendo upload.../i)).toBeInTheDocument();

    // Aguardar conclusão do upload
    await waitFor(() => {
      expect(screen.queryByText(/Fazendo upload.../i)).not.toBeInTheDocument();
    }, { timeout: 2000 });
  });
});