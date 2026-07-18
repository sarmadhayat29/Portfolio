# 🚀 Full-Stack Portfolio

A modern, responsive, and feature-rich personal portfolio built with a React frontend and an Node.js/Express backend. This project is designed to showcase skills, projects, and experience while incorporating robust form handling and database integrations.

## 🛠️ Tech Stack

### Frontend
- **React** (built with Vite)
- **Tailwind CSS** (for styling)
- **Framer Motion** (for smooth animations)
- **React Router** (for navigation)
- **React Hook Form & Zod** (for form validation)
- **Supabase JS** (for database connectivity)

### Backend
- **Node.js & Express** (API Server)
- **Prisma ORM** (Database ORM)
- **Supabase** (PostgreSQL Database)
- **Resend** (for handling emails/contact forms)

## 📂 Folder Structure

```
.
├── backend/          # Express API server
│   ├── prisma/       # Database schema and migrations
│   └── src/          # Controllers, routes, middlewares, and config
└── frontend/         # React Vite application
    ├── public/       # Static assets
    └── src/          # Components, pages, layouts, and utilities
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- A Supabase account and project
- A Resend API key (for the contact form emails)

### Environment Variables

You will need to set up environment variables for both the frontend and backend. Create these files and add your credentials.

**Frontend (`frontend/.env.local`)**
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

**Backend (`backend/.env`)**
```env
PORT=5000
DATABASE_URL=your_supabase_postgres_connection_string
RESEND_API_KEY=your_resend_api_key
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sarmadhayat29/Portfolio.git
   cd Portfolio
   ```

2. **Setup the Backend**
   ```bash
   cd backend
   npm install
   npx prisma generate
   npm run dev
   ```
   The backend server will start on port `5000` (or your configured port).

3. **Setup the Frontend**
   Open a new terminal and run:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The frontend will start on `http://localhost:5173`.

## ✨ Features
- **Responsive Design:** Beautifully crafted UI optimized for all devices using Tailwind CSS.
- **Smooth Animations:** Integrated with Framer Motion for scroll and entrance animations.
- **Contact Form:** Integrated with React Hook Form, Zod validation, and Resend for reliable messaging.
- **Dynamic Data:** Supabase integration for managing and displaying real-time data like projects, skills, or todos.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/sarmadhayat29/Portfolio/issues).

## 📄 License
This project is open-source and available under the ISC License.
