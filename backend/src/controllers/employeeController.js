import EmployeeService from "../services/employeeService";
// rest controller for the employee
export default class EmployeeController {
    // constructor for the employee controller
    constructor() {
        this.employeeService = new EmployeeService()
    }
    
    // endpoint to register a new employee
    async registerEmployee(req, res) {
        const { name, email, phone_number, gender } = req.body;
        
        // check if all fields are provided
        if (!name || !email || !phone_number || !gender) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // check if the email is valid
        if (!isValidEmail(email)) {
            return res.status(400).json({ error: 'Invalid email' });
        }

        // check if the phone number is valid
        if (!isValidPhoneNumber(phone_number)) {
            return res.status(400).json({ error: 'Invalid phone number' });
        }

        const employee = await this.employeeService.createEmployee(req.body);
        res.json(employee);
    }

    // endpoint to update employee details by id
    async updateEmployee(req, res) {
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

        const employee = await this.employeeService.updateEmployee(employeeId, updateData);
        res.json(employee);
    }

    // regex to check email
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // regex to check phone number
    isValidPhoneNumber(phone_number) {
        return /^[0-9]{10}$/.test(phone_number);
    }
}