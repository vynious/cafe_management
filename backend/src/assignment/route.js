import express from 'express';
import AssignmentController from './controller.js';

const assignmentRouter = express.Router();

const assignmentController = new AssignmentController();

export default assignmentRouter;


// // get assignment record by employee id
// assignmentRouter.get('/assignments/employee/:employeeId', assignmentController.getEmployeeAssignment);

// // create a new assignment record
// assignmentRouter.post('/assignments', assignmentController.createNewAssignment);

// // update assignment record by id
// assignmentRouter.put('/assignments/:id', assignmentController.updateAssignment);

// // get employees for a cafe
// assignmentRouter.get('/assignments/cafe/:cafeId', assignmentController.getEmployeesAssignedToCafe);


assignmentRouter.get("employees", assignmentController.getEmployeesWithAssignments)