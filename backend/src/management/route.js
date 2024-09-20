import express from 'express';
import ManagementController from './controller.js';

const managementRouter = express.Router();
const managementController = new ManagementController();



// SETTLED
// route to get employees / employees for a cafe
managementRouter.get('/employees', managementController.updateEmployeeAndEmploymentRecord);


// SETTLED
// route to register a new employee for a cafe
// This should create a new employee in the database.
// This should also create the relationship between an employee and a café.
managementRouter.post("/employee", managementController.createEmployeeAndEmploymentRecord);

export default managementRouter;