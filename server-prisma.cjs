// Servidor backend completo com Prisma para Igreja Santa Rita
const express = require('express');
const he = require('he');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
// CORS configuration - allow multiple development origins
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  'http://localhost:3000',
  'http://localhost:5173'
];

app.use(cors({ 
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true 
}));

// =============================================================================
// EVENTS API
// =============================================================================

// GET /api/events - Listar eventos
app.get('/api/events', async (req, res) => {
  try {
    const { category, type, active = 'true' } = req.query;

    const where = {};
    
    if (active === 'true') {
      where.isActive = true;
    }

    if (category) {
      where.category = {
        name: category
      };
    }

    if (type) {
      where.type = type;
    }

    // Apenas eventos futuros por padrão
    where.date = {
      gte: new Date()
    };

    const events = await prisma.event.findMany({
      where,
      include: {
        category: true
      },
      orderBy: {
        date: 'asc'
      }
    });

    res.json(events);
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /api/events/:id - Obter evento específico
app.get('/api/events/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        category: true
      }
    });

    if (!event) {
      return res.status(404).json({ error: 'Evento não encontrado' });
    }

    res.json(event);
  } catch (error) {
    console.error('Erro ao buscar evento:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// POST /api/events - Criar evento
app.post('/api/events', async (req, res) => {
  try {
    const {
      title,
      description,
      fullDescription,
      date,
      time,
      location,
      image,
      type,
      categoryId
    } = req.body;

    // Validações básicas
    if (!title || !description || !date || !time || !categoryId) {
      return res.status(400).json({
        error: 'Campos obrigatórios: title, description, date, time, categoryId'
      });
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        fullDescription,
        date: new Date(date),
        time,
        location,
        image,
        type,
        categoryId
      },
      include: {
        category: true
      }
    });

    res.status(201).json(event);
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// PUT /api/events/:id - Atualizar evento
app.put('/api/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      fullDescription,
      date,
      time,
      location,
      image,
      type,
      categoryId,
      isActive
    } = req.body;

    const updateData = {};
    
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (fullDescription !== undefined) updateData.fullDescription = fullDescription;
    if (date) updateData.date = new Date(date);
    if (time) updateData.time = time;
    if (location !== undefined) updateData.location = location;
    if (image !== undefined) updateData.image = image;
    if (type) updateData.type = type;
    if (categoryId) updateData.categoryId = categoryId;
    if (isActive !== undefined) updateData.isActive = isActive;

    const event = await prisma.event.update({
      where: { id },
      data: updateData,
      include: {
        category: true
      }
    });

    res.json(event);
  } catch (error) {
    console.error('Erro ao atualizar evento:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Evento não encontrado' });
    }
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// DELETE /api/events/:id - Deletar evento (soft delete)
app.delete('/api/events/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.event.update({
      where: { id },
      data: {
        isActive: false
      }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar evento:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Evento não encontrado' });
    }
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// =============================================================================
// CATEGORIES API
// =============================================================================

// GET /api/categories - Listar categorias
app.get('/api/categories', async (req, res) => {
  try {
    const { type } = req.query;

    const where = {};
    
    if (type) {
      where.type = type;
    }

    const categories = await prisma.category.findMany({
      where,
      orderBy: {
        name: 'asc'
      }
    });

    res.json(categories);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// POST /api/categories - Criar categoria
app.post('/api/categories', async (req, res) => {
  try {
    const { name, description, type } = req.body;

    // Validações básicas
    if (!name || !type) {
      return res.status(400).json({
        error: 'Campos obrigatórios: name, type'
      });
    }

    const validTypes = ['EVENT', 'NEWS'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        error: 'Tipo de categoria inválido. Use: EVENT ou NEWS'
      });
    }

    const category = await prisma.category.create({
      data: {
        name,
        description,
        type
      }
    });

    res.status(201).json(category);
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Categoria com este nome já existe' });
    }
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// =============================================================================
// NEWS API
// =============================================================================

// GET /api/news - Listar notícias
app.get('/api/news', async (req, res) => {
  try {
    const { 
      category, 
      published = 'true', 
      page = '1', 
      limit = '10',
      search 
    } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const where = {};
    
    if (published === 'true') {
      where.isPublished = true;
      where.publishedAt = {
        lte: new Date()
      };
    }

    if (category) {
      where.category = {
        name: category
      };
    }

    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          summary: {
            contains: search,
            mode: 'insensitive'
          }
        }
      ];
    }

    const [news, total] = await Promise.all([
      prisma.news.findMany({
        where,
        include: {
          category: true
        },
        orderBy: {
          publishedAt: 'desc'
        },
        skip,
        take: limitNum
      }),
      prisma.news.count({ where })
    ]);

    const totalPages = Math.ceil(total / limitNum);

    res.json({
      news,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1
      }
    });
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /api/news/:id - Buscar notícia por ID
app.get('/api/news/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const news = await prisma.news.findUnique({
      where: { id },
      include: {
        category: true
      }
    });

    if (!news) {
      return res.status(404).json({ error: 'Notícia não encontrada' });
    }

    res.json(news);
  } catch (error) {
    console.error('Erro ao buscar notícia:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// POST /api/news - Criar notícia
app.post('/api/news', async (req, res) => {
  try {
    const {
      title,
      summary,
      content,
      image,
      categoryId,
      isPublished = false,
      publishedAt
    } = req.body;

    // Validações básicas
    if (!title || !summary || !content || !categoryId) {
      return res.status(400).json({
        error: 'Campos obrigatórios: title, summary, content, categoryId'
      });
    }

    const data = {
      title,
      summary,
      content,
      categoryId,
      isPublished
    };

    if (image) {
      data.image = image;
    }

    if (isPublished && publishedAt) {
      data.publishedAt = new Date(publishedAt);
    } else if (isPublished) {
      data.publishedAt = new Date();
    }

    const news = await prisma.news.create({
      data,
      include: {
        category: true
      }
    });

    res.status(201).json(news);
  } catch (error) {
    console.error('Erro ao criar notícia:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// PUT /api/news/:id - Atualizar notícia
app.put('/api/news/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      summary,
      content,
      image,
      categoryId,
      isPublished,
      publishedAt
    } = req.body;

    const updateData = {};

    if (title) updateData.title = title;
    if (summary) updateData.summary = summary;
    if (content) updateData.content = content;
    if (image !== undefined) updateData.image = image;
    if (categoryId) updateData.categoryId = categoryId;
    if (isPublished !== undefined) {
      updateData.isPublished = isPublished;
      
      if (isPublished && publishedAt) {
        updateData.publishedAt = new Date(publishedAt);
      } else if (isPublished) {
        // Se está publicando agora e não foi especificada data
        const currentNews = await prisma.news.findUnique({
          where: { id }
        });
        if (currentNews && !currentNews.publishedAt) {
          updateData.publishedAt = new Date();
        }
      }
    }

    const news = await prisma.news.update({
      where: { id },
      data: updateData,
      include: {
        category: true
      }
    });

    res.json(news);
  } catch (error) {
    console.error('Erro ao atualizar notícia:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Notícia não encontrada' });
    }
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// DELETE /api/news/:id - Deletar notícia
app.delete('/api/news/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.news.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar notícia:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Notícia não encontrada' });
    }
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// =============================================================================
// STRIPE API (existente)
// =============================================================================

app.post('/api/create-checkout-session', async (req, res) => {
  const { amount, donationType } = req.body;
  
  try {
    // Converter para centavos (Stripe trabalha com a menor unidade monetária)
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

// Endpoint para verificar detalhes da sessão
app.get('/api/checkout-session', async (req, res) => {
  const { sessionId } = req.query;
  
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.json(session);
  } catch (error) {
    console.error('Erro ao recuperar sessão:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook para receber eventos do Stripe
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
  
  // Lidar com o evento
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log(`Pagamento bem-sucedido: ${session.id}`);
      
      // Aqui você pode salvar a doação no banco usando Prisma
      try {
        await prisma.donation.create({
          data: {
            amount: session.amount_total / 100, // Converter de centavos
            currency: session.currency.toUpperCase(),
            stripeId: session.id,
            donationType: session.mode === 'subscription' ? 'MONTHLY' : 'ONCE',
            status: 'PAID',
            donorEmail: session.customer_details?.email,
            donorName: session.customer_details?.name
          }
        });
        console.log('Doação salva no banco de dados');
      } catch (dbError) {
        console.error('Erro ao salvar doação:', dbError);
      }
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

// =============================================================================
// SEED DATA - Popular banco com dados iniciais
// =============================================================================

app.post('/api/seed', async (req, res) => {
  try {
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

    // Migrar eventos existentes (se necessário)
    // ... código para migrar dados dos arquivos existentes

    res.json({ 
      message: 'Dados iniciais criados com sucesso',
      categories: { eventCategory, newsCategory }
    });
  } catch (error) {
    console.error('Erro ao criar dados iniciais:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// =============================================================================
// INICIAR SERVIDOR
// =============================================================================

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor Igreja Santa Rita rodando na porta ${PORT}`);
  console.log(`📝 API Endpoints disponíveis:`);
  console.log(`   📅 Events: GET/POST/PUT/DELETE /api/events`);
  console.log(`   📰 News: GET/POST/PUT/DELETE /api/news`);
  console.log(`   🏷️  Categories: GET/POST /api/categories`);
  console.log(`   💰 Stripe: POST /api/create-checkout-session`);
  console.log(`   🌱 Seed: POST /api/seed`);
  console.log(`   ✅ Health: Server is running!`);
});

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});