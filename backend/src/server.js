const app = require('./app');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Verificar conexão com banco de dados
const connectDatabase = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Conectado ao banco de dados PostgreSQL');
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco de dados:', error);
    process.exit(1);
  }
};

// Iniciar servidor
const startServer = async () => {
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
      console.log('   💰 Stripe: POST /api/create-checkout-session');
      console.log('   ❤️  Health: GET /api/health');
      console.log('\n✅ Servidor pronto para receber requisições!\n');
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

// Graceful shutdown
const gracefulShutdown = async (signal) => {
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

// Handlers para encerramento graceful
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handler para erros não capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// Iniciar aplicação
startServer();