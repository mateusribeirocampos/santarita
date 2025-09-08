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
- **Layered Architecture:** Controllers, Services, Repositories pattern
- **Database Management:** PostgreSQL with Prisma ORM
- **RESTful API:** 15+ endpoints with comprehensive error handling
- **Security Implementation:** JWT authentication, bcrypt password hashing, and rate limiting
- **Type Safety:** Complete TypeScript implementation (migrated from JavaScript)
- **Production Deploy:** Vercel (frontend) + Render (backend) + Supabase (database)
- **CORS Configuration:** Properly configured for production environments
- **Environment Management:** Separate dev/prod configurations
- **Image Upload:** Secure file upload system with validation
- **Migration Excellence:** Seamless JavaScript to TypeScript migration with zero downtime  

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

- **[Node.js](https://nodejs.org/)** - JavaScript runtime
- **[Express.js](https://expressjs.com/)** - Web application framework
- **[TypeScript 5.2+](https://typescriptlang.org/)** - **Type safety and developer experience**
- **[Prisma 6.11.0](https://prisma.io/)** - Modern database ORM
- **[PostgreSQL 15+](https://postgresql.org/)** - Robust relational database
- **[JWT](https://jwt.io/)** - JSON Web Token authentication
- **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Password hashing
- **[express-rate-limit](https://github.com/express-rate-limit/express-rate-limit)** - Rate limiting middleware

> **Migration Note:** The backend was initially developed in JavaScript and later migrated to TypeScript for improved type safety, better developer experience, and enhanced code maintainability. The migration maintains full backward compatibility while adding robust type checking and validation.

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
│   ├── src/                   # Source code with layered architecture
│   │   ├── controllers/       # Request/response handling (TypeScript)
│   │   ├── services/          # Business logic (TypeScript)
│   │   ├── repositories/      # Data access layer (TypeScript)
│   │   ├── middlewares/       # JWT auth, CORS, etc. (TypeScript)
│   │   ├── routes/            # API route definitions (TypeScript)
│   │   ├── types/             # TypeScript type definitions
│   │   ├── utils/             # Utility functions (TypeScript)
│   │   ├── app.ts             # Express app configuration (TypeScript)
│   │   ├── app.js             # Express app configuration (Legacy JavaScript)
│   │   ├── server.ts          # Server initialization (TypeScript)
│   │   └── server.js          # Server initialization (Legacy JavaScript)
│   ├── dist/                  # Compiled TypeScript output
│   ├── uploads/               # User uploaded images (auto-created)
│   ├── prisma/                # Database schema and migrations
│   │   └── schema.prisma      # Prisma schema file
│   ├── tsconfig.json          # TypeScript configuration
│   ├── .env                   # Backend environment variables
│   ├── DEPLOY.md              # Deployment instructions
│   ├── package.json           # Backend dependencies
│   └── package-lock.json      # Backend lock file
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

    **Option A: JavaScript (Production Mode):**

    ```bash
    # Terminal 1: Start backend server (JavaScript)
    cd backend
    npm start
    
    # Terminal 2: Start frontend development server
    cd frontend
    npm run dev
    ```

    **Option B: TypeScript (Development Mode):**

```bash
    # Terminal 1: Start backend server (TypeScript)
    cd backend
    npm run dev:ts
    
    # Terminal 2: Start frontend development server
    cd frontend
    npm run dev
    ```

    > **Note:** The backend supports both JavaScript (legacy) and TypeScript (modern) execution modes. For development, use TypeScript mode for better type checking. For production, the current deployment uses JavaScript mode.

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

## TypeScript Migration

### **Migration Overview**

The backend underwent a comprehensive migration from JavaScript to TypeScript to improve code quality, developer experience, and maintainability. This migration was performed incrementally with zero downtime.

### **Migration Highlights**

- **✅ Complete Type Safety:** All code is now fully typed
- **✅ Enhanced Developer Experience:** Better IDE support, autocomplete, and error detection
- **✅ Robust Error Handling:** Custom error classes with proper type checking
- **✅ Input Validation:** Type-safe request/response handling
- **✅ Backward Compatibility:** JavaScript version remains functional during transition
- **✅ Zero Downtime:** Production deployment unaffected during migration

### **Architecture Improvements**

#### **Before (JavaScript)**

```javascript
// Basic controller without types
const authController = {
  async login(req, res) {
    const { email, password } = req.body;
    // ... business logic
  }
};
```

#### **After (TypeScript)**

```typescript
// Fully typed controller with validation
export class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    const { email, password }: LoginCredentials = req.body;
    // ... type-safe business logic with proper error handling
  }
}
```

### **Migration Benefits**

1. **Type Safety:** Catch errors at compile time instead of runtime
2. **Better IDE Support:** Enhanced autocomplete and refactoring
3. **Documentation:** Types serve as self-documenting code
4. **Maintainability:** Easier to maintain and refactor large codebase
5. **Team Collaboration:** Clear contracts between different parts of the system

### **Development Scripts**

```bash
# TypeScript Development
npm run dev:ts          # Run with TypeScript + ts-node + nodemon
npm run type-check      # Check types without compilation
npm run build:prod      # Compile TypeScript to JavaScript

# Legacy JavaScript (Production)
npm start               # Run production JavaScript version
npm run dev             # Run JavaScript with nodemon
```

### **Migration Timeline**

The migration was completed in layers following best practices:

1. **Setup & Configuration** - TypeScript config, types, build scripts
2. **Utilities Layer** - Error handling, validation, response utilities  
3. **Middlewares Layer** - Authentication, rate limiting with full typing
4. **Repositories Layer** - Database access with Prisma types
5. **Services Layer** - Business logic with comprehensive validation
6. **Controllers Layer** - HTTP handlers with type-safe request/response
7. **Routes Layer** - Express routes with proper middleware typing
8. **App & Server** - Application bootstrap with full TypeScript support

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
