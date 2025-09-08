import { Router } from 'express';
import uploadController from '@/controllers/uploadController';
import { authMiddleware } from '@/middlewares/auth';
import { crudRateLimiter } from '@/middlewares/rateLimiter';

const router = Router();

// Endpoint para upload de imagem
router.post('/image', 
  crudRateLimiter, 
  authMiddleware, 
  uploadController.getUploadMiddleware(), 
  uploadController.uploadImage
);

// Endpoint para deletar imagem
router.delete('/image/:filename', crudRateLimiter, authMiddleware, uploadController.deleteImage);

// Middleware para tratar erros do multer
router.use(uploadController.handleMulterError);

export default router;