import express, { Request, Response, NextFunction, Application } from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from '@/routes/auth';
import eventRoutes from '@/routes/events';
import newsRoutes from '@/routes/news';
import categoryRoutes from '@/routes/categories';
import uploadRoutes from '@/routes/upload';

// Import middleware
import { globalRateLimiter } from '@/middlewares/rateLimiter';

// Import controllers
import stripeController from '@/controllers/stripeController';

// Import error handling
import { handleError } from '@/utils/errors';

const app: Application = express();

// Trust proxy for production deployment (Render)
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Global middlewares
app.use(express.json());

// Rate limiting global - applied to all routes
app.use(globalRateLimiter);

// CORS Configuration
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  'http://localhost:3000',
  'http://localhost:5173',
  'https://igrejasantaritaourofino.vercel.app',
  'https://santa-rita-front-git-main-mateusribeirocampos-projects.vercel.app'
];

app.use(cors({
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Serve static upload files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/upload', uploadRoutes);

// Stripe routes (maintaining compatibility)
app.post('/api/create-checkout-session', stripeController.createCheckoutSession.bind(stripeController));

// Stripe webhook (requires raw body)
app.post('/webhook', express.raw({ type: 'application/json' }), stripeController.handleWebhook.bind(stripeController));

// Health check route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    message: 'API Igreja Santa Rita funcionando',
    timestamp: new Date().toISOString(),
    version: '2.0.0-typescript'
  });
});

// Global error handling middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Erro não tratado:', error);
  handleError(error, res);
});

// 404 handler for unknown routes
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ 
    error: 'Rota não encontrada',
    path: req.originalUrl,
    method: req.method
  });
});

export default app;