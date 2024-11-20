import { Router } from 'express';
import verifyToken from '../../../middleware/verifyToken.js';
import { updateEmployee } from '../../../controller/employee/updateEmployee.js';
import { getAllEmployees, getEmployeeById } from '../../../controller/employee/getEmployee.js';
import { deleteEmployee } from '../../../controller/employee/deleteEmployee.js';
import createEmployee from '../../../controller/employee/createEmployee.js';

const router = Router();

router.get('/', verifyToken, getAllEmployees);
router.get('/:employeeId', verifyToken, getEmployeeById);
router.get('/:employeeId', verifyToken, getEmployeeById);
router.post('/:departmentId', verifyToken, createEmployee);

router.put('/', verifyToken, updateEmployee);
router.delete('/:employeeId', verifyToken, deleteEmployee)




export default router;
