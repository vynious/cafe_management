import EmployeeService from "./service";
import { isValidEmail, isValidPhoneNumber } from "../utils/validation";

// rest controller for the employee
export default class EmployeeController {
    // constructor for the employee controller
    constructor() {
        this.employeeService = new EmployeeService()
    }

    // endpoint to update employee details by id
    async updateEmployee(req, res) {
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
            res.status(500).json({ error: error.message });
        }
    }
}