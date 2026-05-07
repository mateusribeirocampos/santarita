import app from './app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

const connectDatabase = async (retries = 5, delayMs = 5000): Promise<void> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await prisma.$connect();
      console.log('✅ Conectado ao banco de dados PostgreSQL');
      return;
    } catch (error) {
      if (attempt === retries) {
        console.error(`❌ Erro ao conectar com o banco de dados após ${retries} tentativas:`, error);
        process.exit(1);
      }
      console.warn(`⚠️ Tentativa ${attempt}/${retries} falhou. Aguardando ${delayMs / 1000}s...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
};

// Start server
const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();
    
    app.listen(PORT, () => {
      console.log('\n🚀 Servidor Igreja Santa Rita iniciado com sucesso!');
      console.log(`📡 Rodando na porta: ${PORT}`);
      console.log(`🌐 URL: http://localhost:${PORT}`);
      console.log('\n📝 API Endpoints disponíveis:');
      console.log('   🔐 Auth: POST /api/auth/login, /api/auth/register');
      console.log('   📅 Events: GET/POST/PUT/DELETE /api/events');
      console.log('   📰 News: GET/POST/PUT/DELETE /api/news');
      console.log('   🏷️  Categories: GET/POST /api/categories');
      console.log('   📤 Upload: POST /api/upload/image');
      console.log('   💰 Stripe: POST /api/create-checkout-session');
      console.log('   🔗 Webhook: POST /webhook');
      console.log('   ❤️  Health: GET /api/health');
      console.log('✅ Servidor pronto para receber requisições!\n');
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

// Graceful shutdown
const gracefulShutdown = async (signal: string): Promise<void> => {
  console.log(`\n📡 Recebido sinal ${signal}. Encerrando servidor...`);
  
  try {
    await prisma.$disconnect();
    console.log('✅ Conexão com banco de dados encerrada');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro durante o encerramento:', error);
    process.exit(1);
  }
};

// Signal handlers for graceful shutdown
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Error handlers for uncaught exceptions
process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error: Error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// Start the application
startServer();