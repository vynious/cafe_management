import express from 'express';
import ManagementController from './controller.js';

const managementRouter = express.Router();
const managementController = new ManagementController();


// route to delete cafe and associated
managementRouter.delete('/cafe', managementController.deleteCafeAndRelatedAssociations);


// route to update employees and their assignments
managementRouter.put('/employee', managementController.modifyEmployeeWithAssignment);


// route to register a new employee for a cafe
// This should create a new employee in the database.
// This should also create the relationship between an employee and a café.
managementRouter.post("/employee", managementController.addEmployeeWithAssignment);

export default managementRouter;