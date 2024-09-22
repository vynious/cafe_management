import express from 'express';
import AssignmentController from './controller.js';

const assignmentRouter = express.Router();

const assignmentController = new AssignmentController();

export default assignmentRouter;


// get assignment record by employee id
assignmentRouter.get('/assignments/employee/:employeeId', assignmentController.getEmployeeAssignment);

// create a new assignment record
assignmentRouter.get("/employees", assignmentController.getEmployeesWithAssignments)