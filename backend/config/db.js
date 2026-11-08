import mongoose from 'mongoose';
import { ENV } from './env.js';
import { sampleProducts } from '../utils/seedData.js';
import { Product } from '../models/Product.js';

let isConnected = false;

export const connectDB = async () => {
  if (!ENV.MONGODB_URI) {
    console.log('ℹ️  No MONGODB_URI provided. Running in Standalone In-Memory/Fallback Mode.');
    return false;
  }

  try {
    console.log('⏳ Connecting to MongoDB Atlas...');
    const conn = await mongoose.connect(ENV.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);

    // Auto-seed if database is empty
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log('🌱 Seeding sample products into MongoDB...');
      await Product.insertMany(sampleProducts);
      console.log(`✅ Seeded ${sampleProducts.length} products into MongoDB!`);
    }

    return true;
  } catch (error) {
    console.warn(`⚠️  MongoDB Connection failed: ${error.message}`);
    console.warn('ℹ️  Falling back to high-performance local in-memory store.');
    isConnected = false;
    return false;
  }
};

export const isMongoConnected = () => isConnected;
