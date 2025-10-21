import { Router } from 'express';
import { getSummary, getCollectionTimeline, getOutstandingByClass } from '../controllers/reportController.js';

const router = Router();

router.get('/summary', getSummary);
router.get('/collections', getCollectionTimeline);
router.get('/outstanding', getOutstandingByClass);

export default router;
