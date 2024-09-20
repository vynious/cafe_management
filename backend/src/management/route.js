import express from 'express';
import ManagementController from './controller';

const router = express.Router();
const managementController = new ManagementController();



// SETTLED
// route to get employees / employees for a cafe
router.get('/employees', managementController.getEmployees);


// SETTLED
// route to register a new employee for a cafe
// This should create a new employee in the database.
// This should also create the relationship between an employee and a café.
router.post("/employee", managementController.createEmployeeAndEmploymentRecord);