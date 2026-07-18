const express = require('express');
const logger = require('./utils/logger');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const prisma = require('./config/db');

dotenv.config();

// Strict Environment Validation
const requiredEnvVars = ['DATABASE_URL', 'SUPABASE_JWT_SECRET'];
const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingVars.length > 0) {
  logger.error(`FATAL ERROR: Missing required environment variables: ${missingVars.join(', ')}`);
  process.exit(1);
}

const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Security and Performance Middleware
app.use(helmet());
app.use(compression());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Standard Middleware
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Root Route
app.get('/', (req, res) => {
  res.json({
    status: "success",
    message: "Portfolio Backend Running",
    version: "1.0.0"
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: "healthy" });
});

// API Routes
app.use('/api/contacts', contactRoutes);
app.use('/api/auth', authRoutes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Error Handler Middleware
app.use(errorHandler);

const server = app.listen(PORT, '0.0.0.0', () => {
  logger.info(`Server is running on port ${PORT}`);
});

// Graceful shutdown
const shutdown = async () => {
  logger.info('Shutting down server...');
  server.close(async () => {
    await prisma.$disconnect();
    logger.info('Database disconnected. Server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
