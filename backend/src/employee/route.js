import express from 'express';
import EmployeeController from './controller.js';

const employeeRouter = express.Router();
const employeeController = new EmployeeController();

employeeRouter.delete("/employee", employeeController.deleteEmployee)

export default employeeRouter;

