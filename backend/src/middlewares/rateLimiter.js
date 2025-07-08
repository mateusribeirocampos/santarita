const rateLimit = require('express-rate-limit');

// Função para criar mensagens de erro personalizadas
const createLimitReachedMessage = (type, windowMs, max) => {
  const minutes = Math.ceil(windowMs / (1000 * 60));
  return {
    error: 'Muitas tentativas',
    message: `Limite de ${max} tentativas de ${type} excedido. Tente novamente em ${minutes} minutos.`,
    retryAfter: windowMs,
    type: 'RATE_LIMIT_EXCEEDED'
  };
};

// Rate limiter para autenticação (login/registro) - mais restritivo
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Máximo 5 tentativas por IP em 15 minutos
  message: createLimitReachedMessage('login', 15 * 60 * 1000, 5),
  standardHeaders: true, // Retorna informações de rate limit no cabeçalho `RateLimit-*`
  legacyHeaders: false, // Desabilita cabeçalhos `X-RateLimit-*`
  
  // Personalizar a resposta de erro
  handler: (req, res) => {
    console.warn(`🚨 [RATE LIMIT] Tentativas excessivas de login do IP: ${req.ip}`);
    res.status(429).json(createLimitReachedMessage('login', 15 * 60 * 1000, 5));
  },

  // Pular verificação para ambientes de desenvolvimento (opcional)
  skip: (req) => {
    // Pular rate limiting se estiver em desenvolvimento e vindo de localhost
    if (process.env.NODE_ENV === 'development' && 
        (req.ip === '127.0.0.1' || req.ip === '::1' || req.ip.includes('localhost'))) {
      return false; // Não pular - aplicar rate limiting mesmo em dev para testes
    }
    return false;
  }
});

// Rate limiter para operações CRUD - menos restritivo
const crudRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 20, // Máximo 20 operações por IP por minuto
  message: createLimitReachedMessage('operações', 1 * 60 * 1000, 20),
  standardHeaders: true,
  legacyHeaders: false,
  
  handler: (req, res) => {
    console.warn(`🚨 [RATE LIMIT] Muitas operações CRUD do IP: ${req.ip}`);
    res.status(429).json(createLimitReachedMessage('operações', 1 * 60 * 1000, 20));
  }
});

// Rate limiter para APIs públicas (mais permissivo)
const publicApiRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 100, // Máximo 100 requisições por IP por minuto
  message: createLimitReachedMessage('requisições', 1 * 60 * 1000, 100),
  standardHeaders: true,
  legacyHeaders: false,
  
  handler: (req, res) => {
    console.warn(`🚨 [RATE LIMIT] Muitas requisições públicas do IP: ${req.ip}`);
    res.status(429).json(createLimitReachedMessage('requisições', 1 * 60 * 1000, 100));
  }
});

// Rate limiter específico para registro - mais restritivo
const registerRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 3, // Máximo 3 registros por IP por hora
  message: createLimitReachedMessage('registro', 60 * 60 * 1000, 3),
  standardHeaders: true,
  legacyHeaders: false,
  
  handler: (req, res) => {
    console.warn(`🚨 [RATE LIMIT] Muitas tentativas de registro do IP: ${req.ip}`);
    res.status(429).json(createLimitReachedMessage('registro', 60 * 60 * 1000, 3));
  }
});

// Rate limiter para reset de senha (se implementado no futuro)
const passwordResetRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 3, // Máximo 3 tentativas de reset por IP em 15 minutos
  message: createLimitReachedMessage('reset de senha', 15 * 60 * 1000, 3),
  standardHeaders: true,
  legacyHeaders: false,
  
  handler: (req, res) => {
    console.warn(`🚨 [RATE LIMIT] Muitas tentativas de reset de senha do IP: ${req.ip}`);
    res.status(429).json(createLimitReachedMessage('reset de senha', 15 * 60 * 1000, 3));
  }
});

// Rate limiter global para todas as rotas (proteção geral)
const globalRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 200, // Máximo 200 requisições por IP por minuto
  message: {
    error: 'Muitas requisições',
    message: 'Limite global de requisições excedido. Tente novamente em alguns instantes.',
    type: 'GLOBAL_RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
  
  handler: (req, res) => {
    console.warn(`🚨 [RATE LIMIT GLOBAL] IP suspeito de spam: ${req.ip}`);
    res.status(429).json({
      error: 'Muitas requisições',
      message: 'Limite global de requisições excedido. Tente novamente em alguns instantes.',
      type: 'GLOBAL_RATE_LIMIT_EXCEEDED'
    });
  }
});

module.exports = {
  authRateLimiter,
  crudRateLimiter,
  publicApiRateLimiter,
  registerRateLimiter,
  passwordResetRateLimiter,
  globalRateLimiter
};