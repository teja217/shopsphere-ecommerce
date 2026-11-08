import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import { ENV } from './config/env.js';
import { connectDB, isMongoConnected } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { notFoundHandler, globalErrorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distPath = path.join(rootDir, 'dist');

const app = express();

// Security Headers
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// CORS configuration
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-session-id'],
  })
);

// Request parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
if (ENV.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// System Health & Status Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'ShopSphere API',
    version: '1.0.0',
    database: isMongoConnected() ? 'MongoDB Atlas' : 'In-Memory Fallback Store (Active)',
  });
});

// REST API Endpoints
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/contact', contactRoutes);

// In production, serve React frontend static assets if dist exists
if (fs.existsSync(distPath)) {
  console.log(`📦 Serving static frontend from: ${distPath}`);
  app.use(express.static(distPath));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// 404 handler for API routes
app.use('/api/*', notFoundHandler);

// Global Error Handler
app.use(globalErrorHandler);

// Start Server
const startServer = async () => {
  await connectDB();

  const server = app.listen(ENV.PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 ShopSphere Server running in [${ENV.NODE_ENV}] mode`);
    console.log(`📡 Local API Endpoint: http://localhost:${ENV.PORT}/api`);
    console.log(`🏥 Health Check:       http://localhost:${ENV.PORT}/api/health`);
    console.log(`💾 Database Backend:   ${isMongoConnected() ? 'MongoDB Atlas' : 'Local Fallback Store'}`);
    console.log(`======================================================\n`);
  });

  return server;
};

startServer().catch(err => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});

export default app;
