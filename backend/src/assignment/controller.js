import assignmentService from "./service.js";

export default class AssignmentController {

    constructor() {
        this.assignmentService = new assignmentService();

        // bind methods 
        this.createNewAssignment = this.createNewAssignment.bind(this);
        this.updateAssignment = this.updateAssignment.bind(this);
        this.getEmployeeAssignment = this.getEmployeeAssignment.bind(this);
        this.getEmployeesAssignedToCafe = this.getEmployeesAssignedToCafe.bind(this);
        this.getEmployeesWithAssignments = this.getEmployeesWithAssignments.bind(this);
    }



    async createNewAssignment(req, res, next) {
        try {
            const { cafeId, employeeId } = req.body;
            const assignment = await this.assignmentService.createAssignmentRecord(cafeId, employeeId);
            res.json(assignment);
        } catch (error) {
            next(error);
        }
    }

    async updateAssignment(req, res, next) {
        try {
            const assignment = await this.assignmentService.updateAssignment(req.params.id, req.body);
            res.json(assignment);
        } catch (error) {
            next(error);
        }
    }
    

    async getEmployeeAssignment(req, res, next) {
        try {
            const assignment = await this.assignmentService.getAssignmentForEmployee(req.params.employeeId);
            res.json(assignment);
        } catch (error) {
            next(error);
        }
    }

    async getEmployeesAssignedToCafe(req, res, next) {
        try {
            const employees = await this.assignmentService.getEmployeesForCafe(req.params.cafeId);
            res.json(employees);
        } catch (error) {
            next(error);
        }
    }

    // Retrieve employees for a specific cafe or all employees sorted by days worked
    async getEmployeesWithAssignments(req, res, next) {
        try {
            let parsedAssignments = [];
            let assignmentRecords = [];

            if (req.query.cafe) {
                // get employees assigned to the specified cafe
                assignmentRecords = await this.assignmentService.getEmployeesForCafe(req.query.cafe);
            } else {
                // all employees 
                assignmentRecords = await this.assignmentService.getAllAssignments();
            }
            // parse the employment records to calculate total days worked
            parsedAssignments = await this._parseAssignmentRecords(assignmentRecords);
            res.json(parsedAssignments)
        } catch (error) {
            next(error)
        }
    }

    // parse assignment records 
    async _parseAssignmentRecords(assignmentRecords) {
        return Promise.all(assignmentRecords.map(async record => {
            const { id, employee, startDate, endDate, cafe } = record;
            return {
                id: id,
                employee: employee,
                cafe: cafe,
                daysWorked: this.assignmentService.calculateDaysWorked(startDate, endDate),
            };
        }));
    }
}