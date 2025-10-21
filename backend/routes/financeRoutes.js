import { Router } from 'express';
import {
  getStudents,
  createStudent,
  updateStudent,
  getStudentOrders,
  createConcession,
  listPermissions,
  updatePermission
} from '../controllers/financeController.js';

const router = Router();

router.get('/students', getStudents);
router.post('/students', createStudent);
router.put('/students/:id', updateStudent);
router.get('/students/:id/orders', getStudentOrders);

router.post('/concessions', createConcession);
router.get('/permissions', listPermissions);
router.post('/permissions', updatePermission);

export default router;
