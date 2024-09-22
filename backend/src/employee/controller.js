import EmployeeService from "./service.js";
import { isValidEmail, isValidPhoneNumber } from "../utils/validation.js";

// rest controller for the employee
export default class EmployeeController {
    // constructor for the employee controller
    constructor() {
        this.employeeService = new EmployeeService()

        // bind methods to the instance
        this.updateEmployee = this.updateEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.getEmployee = this.getEmployee.bind(this)
    }

    // !! not needed since we update through management service
    // endpoint to update employee details by id
    async updateEmployee(req, res, next) {
        try {
            const { employeeId, name, email, phone_number, gender } = req.body;

            // check if the email is valid
            if (email && !isValidEmail(email)) {
                return res.status(400).json({ error: 'Invalid email' });
            }

            // check if the phone number is valid
            if (phone_number && !isValidPhoneNumber(phone_number)) {
                return res.status(400).json({ error: 'Invalid phone number' });
            }

            // filter out undefined fields
            const updateData = { name, email, phone_number, gender };
            Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

            // update the employee
            const employee = await this.employeeService.updateEmployee(employeeId, updateData);

            // return the updated employee
            res.json(employee);

        } catch (error) {
            next(error)
        }
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