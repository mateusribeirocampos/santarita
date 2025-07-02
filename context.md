# Context - Igreja Santa Rita Project

## 📋 Resumo do Projeto

**Projeto**: Site da Igreja Santa Rita de Cássia - Ouro Fino, MG  
**Tecnologias**: React + TypeScript + Vite + Tailwind CSS + Prisma + PostgreSQL  
**Status**: Backend completo implementado, Frontend funcional  
**Deploy**: https://santaritaourofino.vercel.app/  

---

## 🏗️ Arquitetura Atual

### **Frontend (React)**
- **Framework**: Vite + React 18.3.1 + TypeScript
- **Styling**: Tailwind CSS 3.4.1
- **Routing**: React Router DOM 6.30.0
- **Icons**: Lucide React
- **Payments**: Stripe (@stripe/react-stripe-js)

### **Backend (Node.js + Prisma)**
- **Server**: Express.js (CommonJS - server-prisma.cjs)
- **Database**: PostgreSQL (local: santa_rita_db)
- **ORM**: Prisma 6.11.0
- **APIs**: REST endpoints completos
- **Port**: 3001

### **Banco de Dados (PostgreSQL)**
- **Database**: santa_rita_db
- **Models**: 11 modelos Prisma
- **Status**: Migrado e funcionando

---

## ✅ O QUE FOI IMPLEMENTADO

### **1. Framework de Testes (COMPLETO)**
- ✅ Vitest + React Testing Library configurado
- ✅ 39 testes implementados (100% passando)
- ✅ Coverage: 60.42% geral, Tithe 96.63%
- ✅ Scripts: `test`, `test:coverage`, `test:ui`, `test:run`
- ✅ Testes para: Navbar, Footer, Home, Tithe, Navegação integrada

### **2. Backend Completo com Prisma (COMPLETO)**
- ✅ PostgreSQL configurado e conectado
- ✅ Prisma Schema com 11 modelos implementados
- ✅ APIs REST funcionais
- ✅ Integração Stripe com banco de dados
- ✅ Webhook Stripe salvando doações
- ✅ Sistema de categorias
- ✅ Validações e error handling

### **3. Modelos de Dados (IMPLEMENTADOS)**
```prisma
- User (usuários e roles)
- Event (eventos da igreja)
- Category (categorias para eventos/news)
- News (sistema de notícias)
- Schedule (horários de missa)
- SpecialCelebration (celebrações especiais)
- Donation (doações integradas com Stripe)
- TimelineEvent (história da igreja)
- Priest (informações dos padres)
- Newsletter (inscrições de email)
- Settings (configurações gerais)
```

### **4. APIs REST Funcionais (IMPLEMENTADAS)**
```
✅ GET/POST    /api/events          - CRUD eventos
✅ GET         /api/events/:id      - Evento específico
✅ GET/POST    /api/categories      - Gestão categorias
✅ GET         /api/news            - Notícias (com paginação)
✅ POST        /api/seed            - Popular dados iniciais
✅ POST        /api/create-checkout-session - Stripe
✅ GET         /api/checkout-session - Verificar pagamento
✅ POST        /webhook             - Webhook Stripe
```

### **5. Sistema de Doações Stripe (COMPLETO)**
- ✅ Integração frontend + backend
- ✅ Suporte a doações únicas e mensais
- ✅ Página de sucesso com detalhes
- ✅ Webhook salvando no PostgreSQL
- ✅ Tratamento de estados (pending/paid/failed)

### **6. Estrutura de Arquivos**
```
src/
├── components/        # Componentes (Navbar, Footer)
├── pages/            # Páginas (Home, Events, News, etc.)
├── constants/        # Dados estáticos (upcomingEvents.ts)
├── data/             # Dados mockados (churchData.ts)
├── test/             # Setup de testes
└── App.tsx           # Router principal

Backend:
├── prisma/           # Schema e migrações
├── lib/              # Configuração Prisma
├── api/              # Controladores TypeScript
└── server-prisma.cjs # Servidor principal
```

---

## 🔄 STATUS ATUAL DAS PÁGINAS

### **✅ FUNCIONAIS (Static/Mock Data)**
- **Home.tsx** - Modal de mensagem do padre, links funcionais
- **Events.tsx** - Lista de 3 eventos mockados (upcomingEvents.ts)
- **EventDetail.tsx** - Detalhes individuais dos eventos
- **Schedule.tsx** - Horários fixos de missa
- **Tithe.tsx** - Integração Stripe completa + backend
- **Success.tsx** - Confirmação de pagamento Stripe
- **ChurchSR.tsx** - História da igreja (churchData.ts)
- **SantaRita.tsx** - História da santa (hardcoded)

### **⚠️ PÁGINAS QUE PRECISAM MIGRAR PARA BACKEND**
- **News.tsx** - 3 notícias mockadas no componente
- **Events.tsx** - Dados em upcomingEvents.ts (needs API integration)

---

## 🚀 PRINCIPAIS FEATURES A IMPLEMENTAR

### **🔴 PRIORIDADE ALTA**

#### **1. Conectar Frontend às APIs (PRÓXIMO)**
- [ ] Migrar Events.tsx para usar API REST
- [ ] Migrar News.tsx para usar API REST  
- [ ] Implementar loading states
- [ ] Implementar error handling no frontend

#### **2. Migração de Dados Estáticos**
- [ ] Migrar dados de upcomingEvents.ts para banco
- [ ] Migrar dados de churchData.ts para banco
- [ ] Popular categorias padrão
- [ ] Seed data completo

#### **3. Interface Admin (Básica)**
- [ ] Página para criar/editar eventos
- [ ] Página para criar/editar notícias
- [ ] Dashboard simples de doações

### **🟡 PRIORIDADE MÉDIA**

#### **4. Sistema de Usuários**
- [ ] Autenticação básica
- [ ] Roles (ADMIN, EDITOR, MEMBER)
- [ ] Proteção de rotas admin

#### **5. Upload de Imagens**
- [ ] Integração com Cloudinary/Vercel Blob
- [ ] Upload para eventos e notícias
- [ ] Otimização de imagens

#### **6. Newsletter**
- [ ] Formulário de inscrição funcional
- [ ] Sistema de envio de emails
- [ ] Gestão de inscritos

### **🟢 PRIORIDADE BAIXA**

#### **7. Features Avançadas**
- [ ] Sistema de busca global
- [ ] Calendário de eventos exportável
- [ ] Sistema de comentários
- [ ] PWA (Service Worker)
- [ ] Internacionalização (i18n)

---

## 📊 MÉTRICAS ATUAIS

### **Testes**
- **Total**: 39 testes (100% passando)
- **Coverage**: 60.42% statements, 89.28% branches
- **Componentes**: Navbar/Footer (100%), Tithe (96.63%)

### **Performance**
- **Lighthouse**: Não auditado recentemente
- **Bundle Size**: Não otimizado (sem code splitting)

### **Backend**
- **APIs**: 8 endpoints funcionais
- **Database**: 11 tabelas + relacionamentos
- **Status**: ✅ Rodando na porta 3001

---

## 🔧 CONFIGURAÇÃO ATUAL

### **Environment Variables (.env)**
```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_sua_chave_secreta
STRIPE_WEBHOOK_SECRET=whsec_seu_webhook_secret

# Server
PORT=3001
FRONTEND_URL=http://localhost:5173

# Database
DATABASE_URL="postgresql://mateusribeirodecampos:ZkM@t05@localhost:5432/santa_rita_db"
```

### **Scripts Disponíveis**
```bash
# Frontend
npm run dev          # Vite dev server (port 5173)
npm run build        # Build produção
npm run test         # Rodar testes
npm run test:coverage # Coverage report

# Backend
node server-prisma.cjs # Servidor backend (port 3001)

# Database
npx prisma studio    # Interface visual do banco
npx prisma migrate   # Rodar migrações
```

---

## 🚧 PROBLEMAS CONHECIDOS

### **1. Dados Estáticos**
- Events ainda usa mock data (upcomingEvents.ts)
- News ainda usa hardcoded data
- Precisa migrar para APIs

### **2. Falta de Admin Interface**
- Não há interface para gerenciar conteúdo
- Criação manual via API ou Prisma Studio

### **3. Upload de Imagens**
- Não implementado ainda
- URLs de imagem são strings estáticas

### **4. Autenticação**
- APIs não têm proteção
- Qualquer um pode criar/editar conteúdo

---

## 📁 ARQUIVOS IMPORTANTES

### **Configuração**
- `prisma/schema.prisma` - Schema do banco
- `lib/prisma.ts` - Cliente Prisma
- `server-prisma.cjs` - Servidor backend
- `vitest.config.ts` - Configuração de testes

### **Frontend**
- `src/pages/Tithe.tsx` - Integração Stripe funcional
- `src/constants/upcomingEvents.ts` - Dados mock (migrar)
- `src/data/churchData.ts` - História igreja (migrar)

### **Documentação**
- `STRIPE_IMPLEMENTATION.md` - Guia Stripe
- `tasks/taskToImplement.md` - Roadmap completo
- `context.md` - Este documento

---

## 🎯 PRÓXIMO MILESTONE

**Objetivo**: Conectar frontend às APIs implementadas

### **Tasks Específicas**:
1. **Modificar Events.tsx** para consumir `GET /api/events`
2. **Modificar News.tsx** para consumir `GET /api/news`  
3. **Implementar loading/error states**
4. **Migrar dados estáticos via API `/api/seed`**
5. **Testar integração completa**

### **Resultado Esperado**:
- Site funcionando 100% com dados dinâmicos
- Possibilidade de gerenciar conteúdo via API
- Base sólida para interface admin

---

**Última atualização**: 2025-07-02  
**Status**: ✅ Backend completo, Frontend precisa integração APIs  
**Próximo**: Conectar frontend às APIs REST implementadas