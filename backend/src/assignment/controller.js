import assignmentService from "./service.js";

export default class AssignmentController {

    constructor() {
        this.assignmentService = new assignmentService();

        // bind methods 
        this.getAllAssignments = this.getAllAssignments.bind(this);
        this.createNewAssignment = this.createNewAssignment.bind(this);
        this.updateAssignment = this.updateAssignment.bind(this);
        this.getEmployeeAssignment = this.getEmployeeAssignment.bind(this);
        this.getEmployeesAssignedToCafe = this.getEmployeesAssignedToCafe.bind(this);
    }

    async getAllAssignments(req, res, next) {
        try {
            const assignments = await this.assignmentService.getAssignments();
            res.json(assignments);
        } catch (error) {
            next(error);
        }
    }

    async createNewAssignment(req, res, next) {
        try {
            const { cafeId, employeeId } = req.body;
            const Assignment = await this.assignmentService.createAssignmentRecord(cafeId, employeeId);
            res.json(Assignment);
        } catch (error) {
            next(error);
        }
    }

    async updateAssignment(req, res, next) {
        try {
            const Assignment = await this.assignmentService.updateAssignment(req.params.id, req.body);
            res.json(Assignment);
        } catch (error) {
            next(error);
        }
    }
    

    async getEmployeeAssignment(req, res, next) {
        try {
            const Assignment = await this.assignmentService.getAssignmentForEmployee(req.params.employeeId);
            res.json(Assignment);
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
    async getEmployeesWithAssignments(cafeName) {
        try {
            let parsedAssignments = [];
            let assignmentRecords = [];

            if (cafeName) {
                // get employees assigned to the specified cafe
                assignmentRecords = await this.assignmentService.getEmployeesForCafe(cafeName);
            } else {
                // all employees 
                assignmentRecords = await this.assignmentService.getAssignments();
            }

            // parse the employment records to calculate total days worked
            parsedAssignments = await this._parseAssignmentRecords(assignmentRecords);

        } catch (error) {
            console.error('Error fetching employees:', error);
            return { error: 'Failed to fetch employees' };
        }
    }

    // parse assignment records 
    async _parseAssignmentRecords(assignmentRecords) {
        return Promise.all(assignmentRecords.map(async record => {
            const { employee, startDate, endDate, cafe } = record;
            return {
                id: employee.id,
                name: employee.name,
                gender: employee.gender,
                email: employee.email,
                phone_number: employee.phone_number,
                daysWorked: this.assignment.calculateDaysWorked(startDate, endDate),
                cafe: cafe.name,
                startDate: startDate
            };
        }));
    }
}