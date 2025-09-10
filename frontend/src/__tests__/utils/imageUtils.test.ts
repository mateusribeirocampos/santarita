/**
 * Testes para as funções utilitárias de sanitização de imagem
 */

import { getSafeImageUrl, getSafeImageUrlWithFallback, isImageUrlSafe } from '../../utils/imageUtils';

describe('imageUtils', () => {
  describe('getSafeImageUrl', () => {
    it('should return empty string for invalid inputs', () => {
      expect(getSafeImageUrl('')).toBe('');
      expect(getSafeImageUrl(null)).toBe('');
      expect(getSafeImageUrl(undefined)).toBe('');
      expect(getSafeImageUrl(123 as any)).toBe('');
    });

    it('should allow safe relative paths', () => {
      expect(getSafeImageUrl('/uploads/image-123.jpg')).toBe('/uploads/image-123.jpg');
      expect(getSafeImageUrl('/assets/igreja.png')).toBe('/assets/igreja.png');
      expect(getSafeImageUrl('/assets/subfolder/image.webp')).toBe('/assets/subfolder/image.webp');
    });

    it('should block dangerous protocols', () => {
      expect(getSafeImageUrl('javascript:alert(1)')).toBe('');
      expect(getSafeImageUrl('data:image/svg+xml,<script>alert(1)</script>')).toBe('');
      expect(getSafeImageUrl('vbscript:msgbox(1)')).toBe('');
      expect(getSafeImageUrl('blob:http://localhost/malicious')).toBe('');
    });

    it('should block paths with HTML characters', () => {
      // Paths with HTML characters are blocked for security
      expect(getSafeImageUrl('/assets/image<script>.jpg')).toBe('');
      expect(getSafeImageUrl('/assets/image"test.jpg')).toBe('');
    });

    it('should block invalid paths', () => {
      expect(getSafeImageUrl('/etc/passwd')).toBe('');
      expect(getSafeImageUrl('/uploads/../../../etc/passwd')).toBe('');
      expect(getSafeImageUrl('/uploads/script.js')).toBe('');
    });

    it('should validate absolute URLs strictly', () => {
      // URL válida do backend
      expect(getSafeImageUrl('https://santa-rita-backend.onrender.com/uploads/image-123.jpg')).toBe('https://santa-rita-backend.onrender.com/uploads/image-123.jpg');
      
      // URL externa bloqueada
      expect(getSafeImageUrl('https://malicious-site.com/uploads/image.jpg')).toBe('');
      
      // Protocolo HTTP bloqueado (apenas HTTPS para URLs externas)
      expect(getSafeImageUrl('http://santa-rita-backend.onrender.com/uploads/image.jpg')).toBe('');
    });
  });

  describe('getSafeImageUrlWithFallback', () => {
    it('should return safe URL when valid', () => {
      expect(getSafeImageUrlWithFallback('/uploads/test.jpg')).toBe('/uploads/test.jpg');
    });

    it('should return default fallback when invalid', () => {
      // When URL is invalid, returns the default fallback
      expect(getSafeImageUrlWithFallback('javascript:alert(1)')).toBe('/assets/igreja.png');
      expect(getSafeImageUrlWithFallback(null)).toBe('/assets/igreja.png');
    });

    it('should use custom fallback when provided', () => {
      expect(getSafeImageUrlWithFallback('invalid', '/assets/custom.png')).toBe('/assets/custom.png');
    });
  });

  describe('isImageUrlSafe', () => {
    it('should return true for safe URLs', () => {
      expect(isImageUrlSafe('/uploads/test.jpg')).toBe(true);
      expect(isImageUrlSafe('/assets/image.png')).toBe(true);
    });

    it('should return false for unsafe URLs', () => {
      expect(isImageUrlSafe('javascript:alert(1)')).toBe(false);
      expect(isImageUrlSafe(null)).toBe(false);
      expect(isImageUrlSafe('')).toBe(false);
    });
  });
});