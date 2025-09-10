/**
 * Utilitários para sanitização segura de URLs de imagem
 * Previne vulnerabilidades XSS ao exibir imagens de fontes externas
 */

/**
 * Sanitiza uma URL de imagem para prevenir XSS
 * @param url - URL da imagem a ser sanitizada
 * @returns URL sanitizada e segura ou string vazia se inválida
 */
export const getSafeImageUrl = (url: string | undefined | null): string => {
  if (!url || typeof url !== 'string') return '';

  // Escapar caracteres HTML potencialmente perigosos
  const escapeHtml = (unsafe: string): string => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/javascript:/gi, "")
      .replace(/data:/gi, "")
      .replace(/vbscript:/gi, "");
  };

  // Lista de protocolos permitidos
  const allowedProtocols = ['http:', 'https:'];
  
  // Lista de origens permitidas
  const allowedOrigins = [
    'https://santa-rita-backend.onrender.com',
    import.meta?.env?.VITE_API_URL || 'http://localhost:3001'
  ];

  // Sanitizar a URL primeiro
  const sanitizedUrl = escapeHtml(url.trim());

  // Permitir apenas caminhos relativos seguros para uploads
  if (sanitizedUrl.match(/^\/uploads\/[a-zA-Z0-9._-]+\.(jpg|jpeg|png|gif|webp)$/i)) {
    return sanitizedUrl;
  }

  // Permitir apenas caminhos relativos para assets
  if (sanitizedUrl.match(/^\/assets\/[a-zA-Z0-9._/-]+\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
    return sanitizedUrl;
  }

  // Para URLs absolutas, validar rigorosamente
  try {
    const parsedUrl = new URL(sanitizedUrl);
    
    // Verificar protocolo
    if (!allowedProtocols.includes(parsedUrl.protocol)) {
      return '';
    }

    // Verificar origem
    if (!allowedOrigins.includes(parsedUrl.origin)) {
      return '';
    }

    // Verificar caminho e extensão
    if (!parsedUrl.pathname.match(/^\/uploads\/[a-zA-Z0-9._-]+\.(jpg|jpeg|png|gif|webp)$/i)) {
      return '';
    }

    // URL válida e segura
    return parsedUrl.href;
  } catch {
    // URL inválida
    return '';
  }
};

/**
 * Obtém uma URL de imagem segura com fallback
 * @param url - URL da imagem principal
 * @param fallback - URL de fallback (padrão: /assets/igreja.png)
 * @returns URL sanitizada ou fallback
 */
export const getSafeImageUrlWithFallback = (
  url: string | undefined | null, 
  fallback: string = '/assets/igreja.png'
): string => {
  const safeUrl = getSafeImageUrl(url);
  return safeUrl || getSafeImageUrl(fallback) || '';
};

/**
 * Valida se uma URL de imagem é segura
 * @param url - URL a ser validada
 * @returns true se a URL é segura, false caso contrário
 */
export const isImageUrlSafe = (url: string | undefined | null): boolean => {
  return getSafeImageUrl(url) !== '';
};