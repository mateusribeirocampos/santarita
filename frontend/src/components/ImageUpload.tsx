import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { authService } from '../services/authService';
import { getSafeImageUrl } from '../utils/imageUtils';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (imageUrl: string) => void;
  onImageRemove: () => void;
  placeholder?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  currentImage,
  onImageChange,
  onImageRemove,
  placeholder = "Clique para fazer upload de uma imagem",
  className = ""
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Verificar se o usuário está autenticado antes de tentar upload
  const checkAuth = () => {
    if (!authService.isAuthenticated()) {
      setError('Você precisa estar logado para fazer upload de imagens.');
      return false;
    }
    return true;
  };

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    // Verificar autenticação primeiro
    if (!checkAuth()) {
      return;
    }

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione apenas arquivos de imagem');
      return;
    }

    // Validar tamanho (5MB máximo)
    if (file.size > 5 * 1024 * 1024) {
      setError('O arquivo deve ter no máximo 5MB');
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      // Obter headers de autenticação
      const authHeaders = authService.getAuthHeaders();
      console.log('🔍 [ImageUpload] Headers de autenticação:', authHeaders);
      console.log('🔍 [ImageUpload] URL da API:', `${import.meta.env.VITE_API_URL}/api/upload/image`);
      console.log('🔍 [ImageUpload] Token disponível:', !!authService.getToken());
      console.log('🔍 [ImageUpload] Usuário logado:', authService.isAuthenticated());
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/upload/image`, {
        method: 'POST',
        body: formData,
        headers: {
          ...authHeaders,
        },
        credentials: 'include'
      });

      console.log('🔍 [ImageUpload] Status da resposta:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ [ImageUpload] Erro na resposta:', errorText);
        
        // Se erro 401, token pode ter expirado
        if (response.status === 401) {
          setError('Sessão expirada. Você será redirecionado para fazer login novamente.');
          setTimeout(() => {
            authService.logout();
            window.location.href = '/login';
          }, 2000);
          return;
        }
        throw new Error(`Erro ao fazer upload da imagem: ${errorText}`);
      }

      const data = await response.json();
      // Construir URL completa da imagem
      const fullImageUrl = `${import.meta.env.VITE_API_URL}${data.imageUrl}`;
      onImageChange(fullImageUrl);
    } catch (error) {
      console.error('Erro no upload:', error);
      setError('Erro ao fazer upload da imagem. Tente novamente.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    onImageRemove();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Imagem
        </label>
        {currentImage && (
          <button
            type="button"
            onClick={handleRemove}
            className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
          >
            <X size={16} />
            Remover
          </button>
        )}
      </div>

      {currentImage ? (
        <div className="relative">
          <img
            src={getSafeImageUrl(currentImage)}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border border-gray-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
            <button
              type="button"
              onClick={handleClick}
              className="bg-white text-gray-800 px-4 py-2 rounded-md hover:bg-gray-100 flex items-center gap-2"
            >
              <Upload size={16} />
              Alterar imagem
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          {isUploading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
              <p className="text-gray-600">Fazendo upload...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <ImageIcon size={48} className="text-gray-400 mb-4" />
              <p className="text-gray-600 mb-2">{placeholder}</p>
              <p className="text-sm text-gray-500">
                Arraste e solte uma imagem aqui ou clique para selecionar
              </p>
              <p className="text-xs text-gray-400 mt-2">
                PNG, JPG até 5MB
              </p>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;