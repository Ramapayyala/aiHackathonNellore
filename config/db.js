const { MongoClient } = require('mongodb');
require('dotenv').config();

// MongoDB connection URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database';

// Create a new MongoClient instance
const client = new MongoClient(MONGODB_URI);

// Database connection state
let db = null;

/**
 * Connect to MongoDB
 * @returns {Promise<Object>} Database instance
 */
async function connectDB() {
  try {
    if (db) {
      console.log('Using existing database connection');
      return db;
    }

    // Connect to MongoDB
    await client.connect();
    console.log('✅ Successfully connected to MongoDB');

    // Get the database name from URI or use default
    const dbName = process.env.DB_NAME || MONGODB_URI.split('/').pop().split('?')[0];
    db = client.db(dbName);

    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

/**
 * Close MongoDB connection
 * @returns {Promise<void>}
 */
async function closeDB() {
  try {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
      db = null;
    }
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    throw error;
  }
}

/**
 * Get the database instance (must be called after connectDB)
 * @returns {Object} Database instance
 */
function getDB() {
  if (!db) {
    throw new Error('Database not connected. Call connectDB() first.');
  }
  return db;
}

module.exports = {
  connectDB,
  closeDB,
  getDB,
  client
};

