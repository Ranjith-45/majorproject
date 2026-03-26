import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import allRoutes from './routes/index.route.js'

// 1. Initialize Environment Variables
dotenv.config();

// 2. Connect to MongoDB
connectDB();

const app = express();

// 3. Middlewares
// CORS allows your React app (usually port 5173) to talk to this server
app.use(cors({
  origin: "http://localhost:5173", // Your React Port
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Required for JWT/Cookies
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Built-in body parser for JSON payloads (your designData object)
app.use(express.json({ limit: '10mb' })); 

// 4. Basic System Health Check
app.get('/api/status', (req, res) => {
  res.json({
    status: 'OPERATIONAL',
    version: '1.0.0',
    uptime: process.uptime(),
    message: 'NEON_ARCH_KERNEL_ONLINE'
  });
});

// 5. Routes (We will plug these in next)
app.use('/api', allRoutes);
// app.use('/api/projects', projectRoutes);


// 7. Start Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`-------------------------------------------`);
  console.log(`📡 SERVER_LISTENING_ON_PORT: ${PORT}`);
  console.log(`🛠  MODE: ${process.env.STATE}`);
  console.log(`-------------------------------------------`);
});