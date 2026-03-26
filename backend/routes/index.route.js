import express from 'express';
import authRoutes from './auth.route.js';
import projectRoutes from './project.route.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

// 1. Authentication & User Management
// URL: /api/auth
router.use('/auth', authRoutes);

// 2. Architectural Project Management (CRUD)
// URL: /api/projects
router.use('/projects', projectRoutes);

// 3. System Diagnostic Route
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'SYSTEM_OPTIMAL',
    timestamp: new Date().toISOString(),
    service: 'NEON_ARCH_ROUTER'
  });
});

export default router;