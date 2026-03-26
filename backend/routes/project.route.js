import express from 'express';
import { 
  createProject, 
  getMyProjects, 
  getProjectById, 
  updateProject, 
  deleteProject 
} from '../controllers/project.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All project routes require a valid JWT
router.use(protectRoute);

router.post('/', createProject);         // POST /api/projects
router.get('/', getMyProjects);          // GET /api/projects
router.get('/:id', getProjectById);      // GET /api/projects/:id
router.put('/:id', updateProject);       // PUT /api/projects/:id
router.delete('/:id', deleteProject);    // DELETE /api/projects/:id

export default router;