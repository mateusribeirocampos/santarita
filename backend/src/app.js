const express = require('express');
const cors = require('cors');
const he = require('he');
const path = require('path');
require('dotenv').config();

// Importar rotas
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const newsRoutes = require('./routes/news');
const categoryRoutes = require('./routes/categories');
const uploadRoutes = require('./routes/upload');

// Importar rate limiting
const { globalRateLimiter } = require('./middlewares/rateLimiter');

// Importar Stripe para manter compatibilidade
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

// Middlewares globais
app.use(express.json());

// Rate limiting global - aplicado a todas as rotas
app.use(globalRateLimiter);

// Configuração CORS
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  'http://localhost:3000',
  'http://localhost:5173',
  'https://santaritaourofino.vercel.app',
  'https://igrejasantaritaourofino.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Servir arquivos estáticos de upload
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/upload', uploadRoutes);

// Manter rotas do Stripe para compatibilidade
app.post('/api/create-checkout-session', async (req, res) => {
  const { amount, donationType } = req.body;
  
  try {
    const amountInCents = Math.round(parseFloat(amount) * 100);
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: donationType === 'monthly' ? 'Dízimo Mensal' : 'Dízimo Único',
              description: 'Dízimo para Igreja Santa Rita',
            },
            unit_amount: amountInCents,
            recurring: donationType === 'monthly' ? { interval: 'month' } : undefined,
          },
          quantity: 1,
        },
      ],
      mode: donationType === 'monthly' ? 'subscription' : 'payment',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/tithe`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Erro ao criar sessão:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook do Stripe
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error(`Erro de webhook: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${he.escape(err.message)}`);
  }
  
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log(`Pagamento bem-sucedido: ${session.id}`);
      break;
      
    case 'invoice.paid':
      const invoice = event.data.object;
      console.log(`Fatura paga: ${invoice.id}`);
      break;
      
    default:
      console.log(`Evento não tratado: ${event.type}`);
  }
  
  res.json({ received: true });
});

// Rota de seed (temporária para desenvolvimento)
app.post('/api/seed', async (req, res) => {
  try {
    const { PrismaClient } = require('@prisma/client');
    const bcrypt = require('bcrypt');
    const prisma = new PrismaClient();

    // Criar categorias padrão
    const eventCategory = await prisma.category.upsert({
      where: { name: 'Litúrgicos' },
      update: {},
      create: {
        name: 'Litúrgicos',
        description: 'Eventos litúrgicos da igreja',
        type: 'EVENT'
      }
    });

    const newsCategory = await prisma.category.upsert({
      where: { name: 'Anúncios' },
      update: {},
      create: {
        name: 'Anúncios',
        description: 'Anúncios gerais da paróquia',
        type: 'NEWS'
      }
    });

    // Criar usuário admin padrão
    const adminPassword = await bcrypt.hash('admin123', 12);
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@santarita.com' },
      update: {},
      create: {
        name: 'Administrador',
        email: 'admin@santarita.com',
        password: adminPassword,
        role: 'ADMIN'
      }
    });

    // Criar usuário editor padrão
    const editorPassword = await bcrypt.hash('padre123', 12);
    const editorUser = await prisma.user.upsert({
      where: { email: 'padre@santarita.com' },
      update: {},
      create: {
        name: 'Padre João',
        email: 'padre@santarita.com',
        password: editorPassword,
        role: 'EDITOR'
      }
    });

    res.json({ 
      message: 'Dados iniciais criados com sucesso',
      data: { 
        categories: { eventCategory, newsCategory },
        users: { adminUser, editorUser }
      }
    });
  } catch (error) {
    console.error('Erro ao criar dados iniciais:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API Igreja Santa Rita funcionando',
    timestamp: new Date().toISOString()
  });
});

// Middleware de tratamento de erros
app.use((error, req, res, next) => {
  console.error('Erro não tratado:', error);
  res.status(500).json({ 
    error: 'Erro interno do servidor' 
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Rota não encontrada' 
  });
});

module.exports = app;