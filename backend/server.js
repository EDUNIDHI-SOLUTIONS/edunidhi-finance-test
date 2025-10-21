import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import financeRoutes from './routes/financeRoutes.js';
import razorpayRoutes from './routes/razorpayRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

dotenv.config();

const app = express();

app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));
app.use(cors({ origin: process.env.CLIENT_URL?.split(',') || '*', credentials: true }));
app.use((req, res, next) => {
  if (req.originalUrl === '/api/payments/webhook') {
    return next();
  }
  return express.json({ limit: '1mb' })(req, res, next);
});
app.use((req, res, next) => {
  if (req.originalUrl === '/api/payments/webhook') {
    return next();
  }
  return express.urlencoded({ extended: true })(req, res, next);
});
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/finance', financeRoutes);
app.use('/api/payments', razorpayRoutes);
app.use('/api/reports', reportRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
       console.log(`✅ Server running on port ${process.env.PORT || 5000}`);
     });
  })
  .catch((error) => {
    console.error('Failed to connect to database', error);
    process.exit(1);
  });
