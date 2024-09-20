
import express from 'express';
import EmployeeController from './controller.js';

const employeeRouter = express.Router();

const employeeController = new EmployeeController();

export default employeeRouter;

employeeRouter.delete("/employee", employeeController.deleteEmployee)