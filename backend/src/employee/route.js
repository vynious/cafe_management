
import express from 'express';
import EmployeeController from './controller';

const router = express.Router();

const employeeController = new EmployeeController();


// SETTLED
// route to update employee by id
router.put('/employee', employeeController.updateEmployee);