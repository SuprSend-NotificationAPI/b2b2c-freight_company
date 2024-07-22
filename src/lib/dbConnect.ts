import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error('MONGO_URI environment variable is not defined');
}

const connectToDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('Connected to database');
  } catch (error) {
    console.error('Failed to connect to database:', error);
  }
};

export default connectToDatabase;
