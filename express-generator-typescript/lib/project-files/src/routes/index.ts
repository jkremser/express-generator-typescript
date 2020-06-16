import { Router } from 'express';
import DeploymentRouter from './Deployments';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/deployments', DeploymentRouter);

// Export the base-router
export default router;
