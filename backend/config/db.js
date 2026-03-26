import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Select URL based on environment state
const URL = process.env.STATE === "development" 
  ? process.env.DB_LOCAL_URL 
  : process.env.DB_GLOBAL_URL;

const connectDB = async () => {
  try {
    console.log(`📡 ATTEMPTING_CONNECTION: ${URL}`);
    
    const conn = await mongoose.connect(URL, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging
    });

    console.log(`-------------------------------------------`);
    console.log(`🚀 DATABASE_STATUS: ONLINE`);
    console.log(`📡 NODE_ADDRESS: ${conn.connection.host}`);
    console.log(`💠 NEON_ARCH_KERNEL: READY`);
    console.log(`-------------------------------------------`);
  } catch (error) {
    console.error(`❌ DATABASE_ERROR: ${error.message}`);
    console.log(`💡 TIP: Ensure your local MongoDB Service is running!`);
    process.exit(1); 
  }
};

export default connectDB;