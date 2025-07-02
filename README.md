# Website for Igreja Santa Rita de Cássia - Ouro Fino, MG

[![GitHub License](https://img.shields.io/github/license/mateusribeirocampos/santarita)](https://github.com/mateusribeirocampos/santarita/blob/main/LICENSE)
[![GitHub Issues](https://img.shields.io/github/issues/mateusribeirocampos/santarita)](https://github.com/mateusribeirocampos/santarita/issues)
[![GitHub Stars](https://img.shields.io/github/stars/mateusribeirocampos/santarita)](https://github.com/mateusribeirocampos/santarita/stargazers)

## Overview

**Complete website and admin system for Santa Rita de Cássia Catholic Church**  
A modern full-stack web application to engage our faith community, manage church content, and facilitate digital donations.

🎉 **Status**: Fully functional with admin panel, authentication, and real-time data integration

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
- **Authentication System:** Role-based access (Admin/Editor)
- **Content Management:** Rich text editor with HTML support
- **Real-time Updates:** Instant synchronization between admin and public pages
- **Image Management:** URL-based image system with fallbacks
- **Publication Control:** Draft/published status with scheduling

### **Technical Achievements**

- **Full-Stack Integration:** React frontend with Node.js/Express backend
- **Database Management:** PostgreSQL with Prisma ORM
- **RESTful API:** 13+ endpoints with comprehensive error handling
- **Type Safety:** Complete TypeScript implementation
- **Testing Coverage:** 39 automated tests with 60%+ coverage
- **Debug System:** Comprehensive logging for development and troubleshooting  

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
- **[Prisma 6.11.0](https://prisma.io/)** - Modern database ORM
- **[PostgreSQL 15+](https://postgresql.org/)** - Robust relational database

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
- **Development Ports:** Frontend (3000), Backend (3001)

---

## Live Demo

🌐 **Production Website:** [https://santaritaourofino.vercel.app](https://santaritaourofino.vercel.app)

### Demo Credentials

For testing the admin panel in development:

```bash
Administrator:
Email: admin@santarita.com
Password: admin123

Editor:
Email: padre@santarita.com  
Password: padre123
```

> ⚠️ **Note:** These are demo credentials for development only

---

## Installation & Setup

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
    npm install
    ```

3. **Environment Configuration:**

    Create a `.env` file in the root directory:

    ```bash
    # Frontend API Configuration
    VITE_API_URL=http://localhost:3001
    
    # Stripe Configuration (Frontend)
    VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
    
    # Backend Configuration
    PORT=3001
    FRONTEND_URL=http://localhost:3000
    
    # Stripe Configuration (Backend)
    STRIPE_SECRET_KEY=sk_test_your_secret_key
    STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
    
    # Database Configuration
    DATABASE_URL="postgresql://username:password@localhost:5432/santa_rita_db"
    ```

4. **Database Setup:**

    ```bash
    # Create and migrate database
    npx prisma migrate dev
    
    # Seed with initial data
    curl -X POST http://localhost:3001/api/seed
    ```

5. **Start the application:**

    ```bash
    # Terminal 1: Start backend server
    node server-prisma.cjs
    
    # Terminal 2: Start frontend development server
    npm run dev
    ```

6. **Access the application:**
    - **Public Website:** `http://localhost:3000`
    - **Admin Panel:** `http://localhost:3000/admin`
    - **API Documentation:** `http://localhost:3001/api`

### Build for Production

```bash
# Build frontend
npm run build

# Preview production build
npm run preview
```

---

## Admin Panel

### Features
- **Events Management:** Create, edit, delete church events
- **News Management:** Manage church announcements and news
- **User Roles:** Admin and Editor permissions
- **Real-time Updates:** Changes reflect immediately on public pages
- **Rich Text Editor:** HTML support for detailed content
- **Image Integration:** URL-based image system
- **Publication Control:** Draft and published status

### Navigation
```
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

---

## API Documentation

### Base URL
```
Development: http://localhost:3001/api
Production: [Your production API URL]
```

### Endpoints

#### Events
```
GET    /api/events           - List active events
GET    /api/events/:id       - Get specific event
POST   /api/events           - Create new event
PUT    /api/events/:id       - Update event
DELETE /api/events/:id       - Delete event (soft delete)
```

#### News
```
GET    /api/news             - List published news (with pagination)
GET    /api/news/:id         - Get specific news article
POST   /api/news             - Create new news
PUT    /api/news/:id         - Update news
DELETE /api/news/:id         - Delete news
```

#### Other
```
GET    /api/categories       - List categories
POST   /api/seed            - Populate database with initial data
POST   /api/create-checkout-session - Stripe payment session
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
