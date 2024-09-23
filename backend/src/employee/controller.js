import EmployeeService from "./service.js";
import { isValidEmail, isValidPhoneNumber } from "../utils/validation.js";

// rest controller for the employee
export default class EmployeeController {
    // constructor for the employee controller
    constructor() {
        this.employeeService = new EmployeeService()

        // bind methods to the instance
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.getEmployee = this.getEmployee.bind(this)
    }

    async deleteEmployee(req, res, next) {
        try {
            const { employeeId } = req.body
            await this.employeeService.deleteEmployeeById(employeeId)
            res.status(204).send()
        } catch (error) {
            next(error)
        }
    }

    async getEmployee(req, res, next) {
        try {
            const { id } = req.params
            const employee = await this.employeeService.getEmployeeById(id)
            res.json(employee)
        } catch (error) {
            next(error)
        }
    }
}