import { Router } from 'express';
import verifyToken from '../../../middleware/verifyToken.js';
import { createDepartment } from '../../../controller/department/createDepartment.js';
import { getAllDepartments, getDepartmentById } from '../../../controller/department/getDepartment.js';
import { deleteDepartment } from '../../../controller/department/deleteDepartment.js';
import { updateDepartment } from '../../../controller/department/updateDepartment.js';

const router = Router();

router.get('/', verifyToken, getAllDepartments);
router.get('/:departmentId', verifyToken, getDepartmentById);
router.post('/', verifyToken, createDepartment);
router.put('/:departmentId', verifyToken, updateDepartment);
router.delete('/:departmentId', verifyToken, deleteDepartment);




export default router;
