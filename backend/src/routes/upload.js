const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { authMiddleware } = require('../middlewares/auth');
const { crudRateLimiter } = require('../middlewares/rateLimiter');

const router = express.Router();

// Configurar pasta de uploads
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Gerar nome único para evitar conflitos
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'image-' + uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  // Aceitar apenas imagens
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Apenas arquivos de imagem são permitidos'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB máximo
  }
});

// Endpoint para upload de imagem
router.post('/image', crudRateLimiter, authMiddleware, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'Nenhum arquivo enviado'
      });
    }

    // Sanitizar e validar filename antes de usar
    const sanitizedFilename = path.basename(req.file.filename);
    const imageUrl = `/uploads/${sanitizedFilename}`;
    
    console.log('✅ [UPLOAD] Imagem enviada com sucesso:', sanitizedFilename);
    
    res.json({
      message: 'Imagem enviada com sucesso',
      imageUrl: imageUrl,
      filename: sanitizedFilename
    });
  } catch (error) {
    console.error('❌ [UPLOAD] Erro ao fazer upload:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// Endpoint para deletar imagem
router.delete('/image/:filename', crudRateLimiter, authMiddleware, (req, res) => {
  try {
    const { filename } = req.params;
    
    // Validar filename para prevenir path traversal
    if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return res.status(400).json({ error: 'Nome de arquivo inválido' });
    }
    
    // Verificar se o arquivo segue o padrão esperado
    if (!/^image-\d+-\d+\.(jpg|jpeg|png|gif|webp)$/i.test(filename)) {
      return res.status(400).json({ error: 'Formato de arquivo inválido' });
    }
    
    const filepath = path.join(uploadDir, filename);
    
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      console.log('✅ [UPLOAD] Imagem deletada:', filename);
      res.json({ message: 'Imagem deletada com sucesso' });
    } else {
      res.status(404).json({ error: 'Imagem não encontrada' });
    }
  } catch (error) {
    console.error('❌ [UPLOAD] Erro ao deletar imagem:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Middleware para tratar erros do multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'Arquivo muito grande. Tamanho máximo: 5MB'
      });
    }
    return res.status(400).json({
      error: 'Erro no upload do arquivo'
    });
  } else if (error) {
    return res.status(400).json({
      error: error.message
    });
  }
  next();
});

module.exports = router;