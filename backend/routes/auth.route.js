import express from 'express';
import { googleAuth, checkAuth } from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/google', googleAuth);
router.get('/check', protectRoute, checkAuth); // Verifies JWT and returns user data

export default router;