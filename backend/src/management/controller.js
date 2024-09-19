import ManagementService from "./service";


export default class ManagementController {
    constructor() {
        this.managementService = new ManagementService();
    }

    // get all employees for a cafe
    async getEmployees(req, res) {
        try {
            const employees = await this.managementService.getEmployees(req.params.cafeName);
            res.json(employees);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // get all cafes
    async createEmployeeAndEmploymentRecord(req, res) {
        try {
            const { cafeId, newEmployeeData } = req.body;

            // validation 
            if (!newEmployeeData || !newEmployeeData.name || !newEmployeeData.email || !newEmployeeData.phone_number || !newEmployeeData.gender) {
                return res.status(400).json({ error: 'Complete employee data is required' });
            }
            if (!this.employeeService.isValidEmail(newEmployeeData.email)) {
                return res.status(400).json({ error: 'Invalid email' });
            }
            if (!this.employeeService.isValidPhoneNumber(newEmployeeData.phone_number)) {
                return res.status(400).json({ error: 'Invalid phone number' });
            }

            const employee = await this.managementService.createEmployeeAndEmploymentRecord(cafeId, newEmployeeData);
            res.json(employee);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateEmployee(req, res) {
        try {
            // validation
            const { employeeId, updatedEmployeeData } = req.body;
            if (!employeeId || !updatedEmployeeData) {
                return res.status(400).json({ error: 'Employee ID and updated employee data are required' });
            }

            // update both employee and employment data
            const updatedInfo = await this.managementService.updateEmployeeAndEmployment(employeeId, updatedEmployeeData);

            res.json(updatedInfo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}