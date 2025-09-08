# Website for Igreja Santa Rita de Cássia - Ouro Fino, MG

[![GitHub License](https://img.shields.io/github/license/mateusribeirocampos/santarita)](https://github.com/mateusribeirocampos/santarita/blob/main/LICENSE)
[![GitHub Issues](https://img.shields.io/github/issues/mateusribeirocampos/santarita)](https://github.com/mateusribeirocampos/santarita/issues)
[![GitHub Stars](https://img.shields.io/github/stars/mateusribeirocampos/santarita)](https://github.com/mateusribeirocampos/santarita/stargazers)

## Overview

**Complete website and admin system for Santa Rita de Cássia Catholic Church**  
A modern full-stack web application to engage our faith community, manage church content, and facilitate digital donations.

🎉 **Status**: ✅ **PRODUCTION** - Complete system deployed and fully operational

![Church Banner Image](public/assets/churchIcon4.png?text=Santa+Rita+de+Cássia+Church)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Live Demo](#live-demo)
- [Installation & Setup](#installation--setup)
- [Admin Panel](#admin-panel)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Project Overview

This modern web application serves as the complete digital platform for Igreja Santa Rita de Cássia, providing:

### **Public Website Features**

- **Event Calendar:** Real-time event listings with detailed information
- **News & Announcements:** Church news with categorization and search
- **Mass Schedule:** Fixed schedule with special celebration information
- **Digital Tithing:** Secure Stripe integration for online donations
- **Church History:** Comprehensive information about the church and Santa Rita
- **Responsive Design:** Mobile-first approach with Tailwind CSS

### **Admin Management System**

- **Complete CRUD Operations:** Create, read, update, delete events and news
- **JWT Authentication:** Secure token-based authentication system
- **Role-based Access Control:** Admin/Editor permissions with middleware protection
- **Password Security:** bcrypt encryption for user passwords
- **Rate Limiting:** Protection against brute force attacks and spam
- **Content Management:** Rich text editor with HTML support
- **Real-time Updates:** Instant synchronization between admin and public pages
- **Image Management:** File upload system with drag & drop interface
- **Publication Control:** Draft/published status with scheduling

### **Technical Achievements**

- **Full-Stack Integration:** React frontend with Node.js/Express backend
- **Layered Architecture:** Controllers, Services, Repositories pattern with TypeScript
- **Database Management:** PostgreSQL with Prisma ORM and full type safety
- **RESTful API:** 15+ endpoints with comprehensive error handling and TypeScript validation
- **Security Implementation:** JWT authentication, bcrypt password hashing, rate limiting, and ReDoS protection
- **Type Safety:** Complete TypeScript implementation with 100% type coverage across all layers
- **Production Deploy:** Vercel (frontend) + Render (backend) + Supabase (database)
- **CORS Configuration:** Properly configured for production environments
- **Environment Management:** Separate dev/prod configurations with type-safe environment validation
- **Image Upload:** Secure file upload system with validation and type checking
- **Migration Excellence:** Successfully completed JavaScript to TypeScript migration with proper architecture  

---

## Key Features

### Worship Information

- Regular and special mass schedules
- Sacrament preparation and liturgical calendar
- Live streaming integration

### Community Portal

- Member registration and profile management
- Prayer request submission
- Volunteer opportunity management
- Church group directories

### Event Management

- Interactive event calendar with registration
- Automated event reminders
- Attendance tracking

### Resource Library

- Homily and sermon archives
- Catholic educational content
- Digital rosary guide
- Daily "Saint of the Day" feature

### Administration

- Integrated Content Management System (CMS)
- Donation tracking and reporting
- Analytics dashboard for website performance
- Email newsletter integration

---

## Technology Stack

### **Frontend**

- **[React 18.3.1](https://reactjs.org/)** - Modern UI library with hooks
- **[TypeScript 5.2+](https://typescriptlang.org/)** - Type safety and developer experience
- **[Vite 5.0+](https://vitejs.dev/)** - Fast build tool and dev server
- **[Tailwind CSS 3.4.1](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Router DOM 6.30.0](https://reactrouter.com/)** - Client-side routing
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library

### **Backend**

- **[Node.js](https://nodejs.org/)** - JavaScript runtime environment
- **[Express.js](https://expressjs.com/)** - Web application framework
- **[TypeScript 5.9.2](https://typescriptlang.org/)** - **Complete type safety across all application layers**
- **[Prisma 6.11.0](https://prisma.io/)** - Type-safe database ORM with full TypeScript integration
- **[PostgreSQL 15+](https://postgresql.org/)** - Robust relational database
- **[JWT](https://jwt.io/)** - JSON Web Token authentication with TypeScript validation
- **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Password hashing with type safety
- **[express-rate-limit](https://github.com/express-rate-limit/express-rate-limit)** - Rate limiting middleware
- **[ts-node](https://typestrong.org/ts-node/)** - TypeScript execution for development
- **[tsc-alias](https://github.com/justkey007/tsc-alias)** - Path alias resolution for compiled output

> **Migration Complete:** ✅ The backend has been successfully migrated to 100% TypeScript with proper layered architecture. All 25 source files are now TypeScript with comprehensive type checking, path aliases, and production-ready compilation. No JavaScript source files remain - only compiled output in `dist/` for production deployment.

### **Payment Processing**

- **[Stripe](https://stripe.com/)** - Secure payment processing
- **[@stripe/react-stripe-js](https://stripe.com/docs/stripe-js/react)** - React integration

### **Development & Testing**

- **[Vitest](https://vitest.dev/)** - Unit testing framework
- **[React Testing Library](https://testing-library.com/react)** - Component testing
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting

### **Deployment**

- **[Vercel](https://vercel.com/)** - Frontend deployment
- **[Render](https://render.com/)** - Backend deployment
- **[Supabase](https://supabase.com/)** - PostgreSQL database hosting
- **Development Ports:** Frontend (5173), Backend (3001)

---

## Live Demo

🌐 **Production Website:** [https://igrejasantaritaourofino.vercel.app](https://igrejasantaritaourofino.vercel.app)
🔧 **Backend API:** [https://santa-rita-backend.onrender.com](https://santa-rita-backend.onrender.com)

---

## Claude Code MCP Agents Setup

Este projeto está configurado com **agentes MCP (Model Context Protocol)** para otimizar o desenvolvimento com Claude Code.

### **🤖 Agentes Configurados**

- **filesystem**: Manipulação de arquivos do projeto
- **postgresql**: Conexão direta com banco PostgreSQL  
- **github**: Integração CI/CD, issues e PRs
- **puppeteer**: Testes E2E automatizados
- **brave-search**: Busca web para documentação
- **claude-context**: Busca semântica no código
- **sentry**: Monitoramento de erros em produção
- **stripe**: Integração com pagamentos

### **⚡ Setup Rápido dos Agentes**

1. **Configure as variáveis de ambiente:**

   ```bash
   cp .env.example .env
   # Preencha as credenciais necessárias no arquivo .env
   ```

2. **Instale os agentes MCP:**

   ```bash
   claude mcp install
   ```

3. **Teste a configuração:**

   ```bash
   claude mcp status
   ```

### **🔑 Credenciais Necessárias**

Para usar todos os agentes, você precisa configurar:

- `DATABASE_URL`: String de conexão PostgreSQL
- `GITHUB_TOKEN`: Token do GitHub (settings → tokens)
- `SENTRY_DSN` + `SENTRY_AUTH_TOKEN`: Conta Sentry para monitoramento
- `BRAVE_API_KEY`: API key do Brave Search
- `STRIPE_SECRET_KEY` + `STRIPE_PUBLISHABLE_KEY`: Chaves Stripe

### **📚 Como Usar**

Com os agentes configurados, você pode:

- Fazer queries diretas no banco: *"Quantos eventos temos cadastrados?"*
- Analisar código: *"Encontre vulnerabilidades de segurança no projeto"*
- Automatizar testes: *"Execute testes E2E na página de login"*
- Monitorar erros: *"Mostre os erros mais frequentes em produção"*

---

## Installation & Setup

### Project Structure

```bash
santarita/
├── backend/                    # Node.js + Express + Prisma + TypeScript
│   ├── src/                   # 📁 TypeScript source code (25 files)
│   │   ├── controllers/       # 🎮 Request/response handling (6 .ts files)
│   │   ├── services/          # 🔧 Business logic layer (3 .ts files)
│   │   ├── repositories/      # 🗃️ Data access layer (3 .ts files)
│   │   ├── middlewares/       # 🛡️ JWT auth, CORS, rate limiting (2 .ts files)
│   │   ├── routes/            # 🛣️ API route definitions (5 .ts files)
│   │   ├── types/             # 📝 TypeScript type definitions (1 .ts file)
│   │   ├── utils/             # 🛠️ Utility functions (3 .ts files)
│   │   ├── app.ts             # 🚀 Express app configuration (TypeScript)
│   │   └── server.ts          # 🖥️ Server initialization (TypeScript)
│   ├── dist/                  # 📦 Compiled JavaScript output (100 files)
│   │   ├── *.js               # Compiled JavaScript files
│   │   ├── *.d.ts             # TypeScript declaration files
│   │   └── *.map              # Source maps for debugging
│   ├── uploads/               # 📸 User uploaded images (auto-created)
│   ├── prisma/                # 🗄️ Database schema and migrations
│   │   └── schema.prisma      # Prisma schema file
│   ├── tsconfig.json          # ⚙️ TypeScript configuration
│   ├── .env                   # 🔐 Backend environment variables
│   ├── DEPLOY.md              # 🚀 Deployment instructions
│   ├── package.json           # 📋 Backend dependencies
│   └── package-lock.json      # 🔒 Backend lock file
├── frontend/                   # React + Vite + TypeScript
│   ├── src/                   # Frontend source code
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services + auth service
│   │   └── contexts/          # React contexts
│   ├── .env                   # Frontend environment variables
│   ├── package.json           # Frontend dependencies
│   ├── package-lock.json      # Frontend lock file
│   ├── index.html             # Frontend entry point
│   ├── vite.config.ts         # Vite configuration
│   └── tailwind.config.js     # Tailwind CSS configuration
├── DEPLOY.md                  # Deployment guide
└── README.md                  # This file
```

### Prerequisites

- **Node.js** v18+
- **PostgreSQL** 15+
- **npm** package manager
- **Git** for version control

### Quick Start

1. **Clone the repository:**

    ```bash
    git clone https://github.com/mateusribeirocampos/santarita.git
    cd santarita
    ```

2. **Install dependencies:**

    ```bash
    # Install backend dependencies
    cd backend
    npm install
    
    # Install frontend dependencies  
    cd ../frontend
    npm install
    ```

3. **Environment Configuration:**

    Create `.env` files in both frontend and backend directories:

    **Backend (.env):**

    ```bash
    # Backend Configuration
    PORT=3001
    FRONTEND_URL=http://localhost:5173
    
    # Database Configuration
    DATABASE_URL="postgresql://username:password@localhost:5432/santa_rita_db"
    
    # JWT Configuration
    JWT_SECRET=your_jwt_secret_key_here
    
    # Stripe Configuration (Backend)
    STRIPE_SECRET_KEY=sk_test_your_secret_key
    STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
    ```

    **Frontend (.env):**

    ```bash
    # Frontend API Configuration
    VITE_API_URL=http://localhost:3001
    
    # Stripe Configuration (Frontend)
    VITE_STRIPE_PUBLIC_KEY=pk_test_your_publishable_key
    
    # Production API URL (for production builds)
    VITE_PRODUCTION_API_URL=https://santa-rita-backend.onrender.com
    ```

4. **Database Setup:**

    ```bash
    # Navigate to backend directory
    cd backend
    
    # Generate Prisma client
    npx prisma generate
    
    # Push database schema
    npx prisma db push
    
    # Open Prisma Studio to view/manage data
    npx prisma studio
    ```

5. **Start the application:**

    **Development Mode (TypeScript):**

    ```bash
    # Terminal 1: Start backend server (TypeScript with hot reload)
    cd backend
    npm run dev
    
    # Terminal 2: Start frontend development server
    cd frontend
    npm run dev
    ```

    **Production Mode (Compiled JavaScript):**

    ```bash
    # Terminal 1: Build and start backend server (Compiled JavaScript)
    cd backend
    npm run build:prod
    npm start
    
    # Terminal 2: Start frontend development server
    cd frontend
    npm run dev
    ```

    > **Note:** The backend now runs TypeScript directly in development mode using ts-node, and compiles to JavaScript for production. Source code is 100% TypeScript with no JavaScript files in src/.

6. **Access the application:**
    - **Public Website:** `http://localhost:5173`
    - **Admin Panel:** `http://localhost:5173/admin`
    - **API Documentation:** `http://localhost:3001/api`

### Build for Production

```bash
# Build frontend
npm run build

# Preview production build
npm run preview
```

---

## TypeScript Migration - Complete ✅

### **Migration Status: 100% COMPLETE**

The Santa Rita backend has been successfully migrated from JavaScript to TypeScript with a proper layered architecture. The migration is complete and production-ready.

### **Migration Achievements**

- **✅ Complete Type Safety:** All 25 source files are fully typed with strict TypeScript configuration
- **✅ Zero JavaScript Source Files:** Only compiled JavaScript in `dist/` for production
- **✅ Enhanced Developer Experience:** Full IDE support, autocomplete, and compile-time error detection
- **✅ Robust Error Handling:** Custom error classes with proper type checking and ReDoS protection
- **✅ Input Validation:** Type-safe request/response handling with comprehensive sanitization
- **✅ Path Alias Resolution:** Clean imports with `@/` aliases for better code organization
- **✅ Production Ready:** Proper compilation pipeline with source maps and declarations
- **✅ Zero Downtime:** Migration completed without affecting production deployment

### **Current Architecture**

#### **TypeScript Source Structure**
```bash
src/ (TypeScript Only - 25 files)
├── controllers/    # 6 TypeScript files - HTTP request handlers
├── services/       # 3 TypeScript files - Business logic layer
├── repositories/   # 3 TypeScript files - Data access layer
├── routes/         # 5 TypeScript files - API route definitions
├── middlewares/    # 2 TypeScript files - Auth, rate limiting
├── utils/          # 3 TypeScript files - Utilities, validation
├── types/          # 1 TypeScript file - Type definitions
├── app.ts          # Express application configuration
└── server.ts       # Server initialization and startup
```

#### **Compiled Output Structure**
```bash
dist/ (Generated - 100 files)
├── *.js            # 25 Compiled JavaScript files
├── *.d.ts          # 25 TypeScript declaration files
├── *.js.map        # 25 JavaScript source maps
└── *.d.ts.map      # 25 Declaration source maps
```

### **Code Quality Improvements**

#### **Before Migration (JavaScript)**

```javascript
// Untyped controller with potential runtime errors
const authController = {
  async login(req, res) {
    const { email, password } = req.body; // No validation
    // Potential undefined/null errors
    const user = await authService.login(email, password);
    res.json({ user });
  }
};
```

#### **After Migration (TypeScript)**

```typescript
// Fully typed controller with comprehensive validation
export class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    const { email, password }: LoginCredentials = req.body;
    
    // Input sanitization with type checking
    const sanitizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const sanitizedPassword = typeof password === 'string' ? password : '';
    
    // Type-safe service call with error handling
    const result: LoginResponse = await authService.login(sanitizedEmail, sanitizedPassword);
    
    // Consistent response format
    successResponse(res, result, 'Login realizado com sucesso');
  }
}
```

### **Type Safety Features**

1. **Interface Definitions:** Comprehensive types for all API contracts
2. **Custom Error Classes:** Typed error hierarchy with proper inheritance
3. **Database Types:** Full Prisma integration with generated types
4. **Request/Response Types:** Type-safe Express handler signatures
5. **Validation Utilities:** Type-safe input validation and sanitization
6. **Environment Variables:** Type-safe environment configuration

### **Development Scripts**

```bash
# TypeScript Development (Primary)
npm run dev          # TypeScript development with hot reload
npm run type-check   # Type checking without compilation
npm run build:prod   # Production build with path resolution

# Production Deployment
npm start           # Run compiled JavaScript from dist/

# Utility Scripts
npm run clean       # Clean compiled output
```

### **Security Enhancements**

✅ **ReDoS Protection:** Fixed polynomial regex vulnerability in email validation  
✅ **Input Sanitization:** Type-safe input cleaning and validation  
✅ **Rate Limiting:** Comprehensive protection against abuse  
✅ **Type Validation:** Runtime validation matching TypeScript types  
✅ **Error Handling:** Typed error responses with proper status codes  

### **Migration Benefits Realized**

1. **🔒 Enhanced Security:** Type-safe validation prevents injection attacks
2. **🐛 Fewer Runtime Errors:** Compile-time error detection
3. **📖 Self-Documenting Code:** Types serve as living documentation
4. **🚀 Better Performance:** Optimized compiled JavaScript output
5. **👥 Team Productivity:** Clear contracts and better IDE support
6. **🔧 Easier Maintenance:** Safe refactoring with type checking
7. **📊 Code Quality:** Strict TypeScript configuration ensures consistency

### **Final Architecture**

The backend now follows a clean **layered architecture** with **100% TypeScript coverage**:

**Request Flow:** `Routes` → `Controllers` → `Services` → `Repositories` → `Database`

Each layer is fully typed with proper error handling, input validation, and response formatting. The migration maintains the same API contract while adding comprehensive type safety and improved developer experience.

---

## Admin Panel

### Features

- **Events Management:** Create, edit, delete church events
- **News Management:** Manage church announcements and news
- **User Roles:** Admin and Editor permissions
- **Real-time Updates:** Changes reflect immediately on public pages
- **Rich Text Editor:** HTML support for detailed content
- **Image Upload:** Drag & drop file upload with automatic processing
- **Publication Control:** Draft and published status

### Navigation

```bash
/login     - Authentication page
/admin     - Main admin dashboard
           ├── Events tab (event management)
           └── News tab (news management)
```

### Security Features

- Protected routes with authentication
- Role-based access control
- Session persistence with localStorage
- Automatic logout functionality
- Input validation and sanitization
- Rate limiting protection against brute force attacks

---

## API Documentation

### Base URL

```bash
Development: http://localhost:3001/api
Production: https://santa-rita-backend.onrender.com/api
```

### Endpoints

#### Authentication (Public)

```bash
POST   /api/auth/login       - User login (returns JWT token)
POST   /api/auth/register    - User registration
POST   /api/auth/verify      - Verify JWT token (protected)
POST   /api/auth/refresh     - Refresh JWT token
POST   /api/auth/logout      - User logout (protected)
```

#### Events

```bash
GET    /api/events           - List active events (public)
GET    /api/events/:id       - Get specific event (public)
POST   /api/events           - Create new event (protected: editor+)
PUT    /api/events/:id       - Update event (protected: editor+)
DELETE /api/events/:id       - Delete event (protected: editor+)
```

#### News

```bash
GET    /api/news             - List published news (public)
GET    /api/news/:id         - Get specific news article (public)
POST   /api/news             - Create new news (protected: editor+)
PUT    /api/news/:id         - Update news (protected: editor+)
DELETE /api/news/:id         - Delete news (protected: editor+)
```

#### Other

```bash
GET    /api/categories       - List categories (public)
POST   /api/categories       - Create category (protected: editor+)
GET    /api/health                 - Health check
POST   /api/create-checkout-session - Stripe payment session
POST   /api/upload/image           - Upload image file (protected: editor+)
GET    /uploads/:filename          - Serve uploaded images
POST   /webhook                    - Stripe webhook endpoint
```

### Response Format

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "date": "ISO string",
  "category": {
    "id": "string",
    "name": "string"
  }
}
```

---

## Rate Limiting

The API includes comprehensive rate limiting to protect against abuse and ensure service availability.

### Rate Limit Configuration

| Endpoint Type | Limit | Window | Description |
|---------------|-------|--------|-------------|
| **Authentication** | 5 requests | 15 minutes | Login attempts per IP |
| **Registration** | 3 requests | 1 hour | User registration per IP |
| **CRUD Operations** | 20 requests | 1 minute | Create/Update/Delete per IP |
| **Public APIs** | 100 requests | 1 minute | GET requests per IP |
| **Global Limit** | 200 requests | 1 minute | All requests per IP |

### Rate Limit Headers

When rate limiting is active, the following headers are included in responses:

```bash
RateLimit-Limit: 5           # Maximum requests allowed
RateLimit-Remaining: 2       # Requests remaining in window
RateLimit-Reset: 1625097600  # When the limit resets (Unix timestamp)
```

### Rate Limit Exceeded Response

When limits are exceeded, the API returns a `429 Too Many Requests` status:

```json
{
  "error": "Muitas tentativas",
  "message": "Limite de 5 tentativas de login excedido. Tente novamente em 15 minutos.",
  "retryAfter": 900000,
  "type": "RATE_LIMIT_EXCEEDED"
}
```

### Protected Endpoints

#### High Security (Restrictive)

- `POST /api/auth/login` - 5 requests per 15 minutes
- `POST /api/auth/register` - 3 requests per hour

#### Medium Security (CRUD Operations)

- `POST /api/events` - 20 requests per minute
- `PUT /api/events/:id` - 20 requests per minute
- `DELETE /api/events/:id` - 20 requests per minute
- `POST /api/news` - 20 requests per minute
- `PUT /api/news/:id` - 20 requests per minute
- `DELETE /api/news/:id` - 20 requests per minute

#### Low Security (Public APIs)

- `GET /api/events` - 100 requests per minute
- `GET /api/news` - 100 requests per minute
- `GET /api/categories` - 100 requests per minute

---

## Testing

### Run Tests

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

### Test Coverage

- **39+ automated tests** implemented
- **60%+ overall coverage**
- **96%+ coverage** for critical components (Tithe)
- Unit tests for components, hooks, and utilities
- Integration tests for API endpoints

### Testing Stack

- **Vitest** - Fast unit test framework
- **React Testing Library** - Component testing utilities
- **jsdom** - DOM environment for testing

---

## Contributing

We welcome contributions from the community!

1. **Fork the repository.**
2. **Create a feature branch:**

    ```bash
    git checkout -b feature/YourFeatureName
    ```

3. **Commit your changes:**

    ```bash
    git commit -m "Add feature: YourFeatureName"
    ```

4. **Push to the branch:**

    ```bash
    git push origin feature/YourFeatureName
    ```
  
5. **Open a Pull Request:** Follow the guidelines in our [CONTRIBUTING.md](CONTRIBUTING.md).

For detailed contribution instructions, please refer to our [Contribution Guidelines](CONTRIBUTING.md).

---

## License

This project is distributed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

## Contact

**Church Office:**  
Email: [secretaria@santarita.org](mailto:secretaria@santarita.org)  
Phone: +55 (31) 1234-5678  

**Technical Support:**  
Mateus Campos  

**Church Address:**  
Rua Santa Rita de Cássia, 123  
Ouro Fino, MG, Brazil

> “For where two or three are gathered in my name, there am I with them.” - Matthew 18:20

---
