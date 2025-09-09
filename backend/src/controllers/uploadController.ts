import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { handleError, ValidationError } from '@/utils/errors';
import { successResponse } from '@/utils/response';

export class UploadController {
  private uploadDir: string;
  private upload: multer.Multer;

  constructor() {
    // Configurar pasta de uploads
    this.uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }

    // Configuração do multer com memoryStorage para melhor performance
    // diskStorage é lento no Render.com - usar memoryStorage
    const storage = multer.memoryStorage();

    const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
      // Aceitar apenas imagens
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Apenas arquivos de imagem são permitidos'));
      }
    };

    this.upload = multer({
      storage: storage,
      fileFilter: fileFilter,
      limits: {
        fileSize: 5 * 1024 * 1024 // 5MB máximo
      }
    });
  }

  getUploadMiddleware() {
    return this.upload.single('image');
  }

  async uploadImage(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        throw new ValidationError('Nenhum arquivo enviado');
      }

      // Com memoryStorage, gerar filename manualmente
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(req.file.originalname);
      const filename = 'image-' + uniqueSuffix + ext;
      
      // Para memoryStorage, salvar o arquivo no disco manualmente
      const filepath = path.join(this.uploadDir, filename);
      await fs.promises.writeFile(filepath, req.file.buffer);
      
      const sanitizedFilename = path.basename(filename);
      const imageUrl = `/uploads/${sanitizedFilename}`;
      
      console.log('✅ [UPLOAD] Imagem enviada com sucesso');
      
      successResponse(res, {
        imageUrl: imageUrl,
        filename: sanitizedFilename
      }, 'Imagem enviada com sucesso');
    } catch (error: any) {
      console.error('❌ [UPLOAD] Erro ao fazer upload:', error);
      handleError(error, res);
    }
  }

  async deleteImage(req: Request, res: Response): Promise<void> {
    try {
      const { filename } = req.params;
      
      if (!filename) {
        throw new ValidationError('Nome do arquivo é obrigatório');
      }
      
      // Validar filename para prevenir path traversal
      if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
        throw new ValidationError('Nome de arquivo inválido');
      }
      
      // Verificar se o arquivo segue o padrão esperado
      if (!/^image-\d+-\d+\.(jpg|jpeg|png|gif|webp)$/i.test(filename)) {
        throw new ValidationError('Formato de arquivo inválido');
      }
      
      const filepath = path.resolve(this.uploadDir, filename);
      
      // Verificar se o path resolvido ainda está dentro do diretório de upload
      if (!filepath.startsWith(path.resolve(this.uploadDir))) {
        throw new ValidationError('Acesso negado');
      }
      
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
        console.log('✅ [UPLOAD] Imagem deletada');
        successResponse(res, undefined, 'Imagem deletada com sucesso');
      } else {
        res.status(404).json({ error: 'Imagem não encontrada' });
      }
    } catch (error: any) {
      console.error('❌ [UPLOAD] Erro ao deletar imagem:', error);
      handleError(error, res);
    }
  }

  // Middleware para tratar erros do multer
  handleMulterError(error: any, _req: Request, res: Response, next: NextFunction): void {
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        res.status(400).json({
          error: 'Arquivo muito grande. Tamanho máximo: 5MB'
        });
        return;
      }
      res.status(400).json({
        error: 'Erro no upload do arquivo'
      });
      return;
    } else if (error) {
      res.status(400).json({
        error: error.message
      });
      return;
    }
    next();
  }
}

export default new UploadController();