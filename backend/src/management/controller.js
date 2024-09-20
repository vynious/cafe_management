import ManagementService from "./service.js";
import { isValidEmail, isValidPhoneNumber } from "../utils/validation.js";

export default class ManagementController {
    constructor() {
        this.managementService = new ManagementService();

        // bind methods to the instance
        this.deleteCafeAndRelatedAssociations = this.deleteCafeAndRelatedAssociations.bind(this);
        this.addEmployeeWithAssignment = this.addEmployeeWithAssignment.bind(this);
        this.modifyEmployeeWithAssignment = this.modifyEmployeeWithAssignment.bind(this);
    }


    // create a new employee with assignment
    async addEmployeeWithAssignment(req, res, next) {
        try {
            const { cafeId, newEmployeeData } = req.body;

            // validation 
            if (!cafeId) {
                return res.status(400).json({ error: 'Required to assigned to a cafe' });
            }
            if (!newEmployeeData || !newEmployeeData.name || !newEmployeeData.email || !newEmployeeData.phone_number || !newEmployeeData.gender) {
                return res.status(400).json({ error: 'Complete employee data is required' });
            }
            if (!isValidEmail(newEmployeeData.email)) {
                return res.status(400).json({ error: 'Invalid email' });
            }
            if (!isValidPhoneNumber(newEmployeeData.phone_number)) {
                return res.status(400).json({ error: 'Invalid phone number' });
            }

            const employee = await this.managementService.createEmployeeWithAssignment(cafeId, newEmployeeData);
            res.json(employee);
        } catch (error) {
            next(error);
        }
    }

    // update an existing employee with assignment
    async modifyEmployeeWithAssignment(req, res, next) {
        try {
            const { employeeId, updateEmployeeData } = req.body;

            // validation
            if (!employeeId || !updateEmployeeData) {
                return res.status(400).json({ error: 'Employee ID and updated employee data are required' });
            }

            const updatedInfo = await this.managementService.updateEmployeeWithAssignment(employeeId, updateEmployeeData);
            
            res.json(updatedInfo);

        } catch (error) {
            next(error);
        }
    }

    // delete cafe and its related 
    async deleteCafeAndRelatedAssociations(req, res, next) {
        try {
            const { cafeId } = req.body;
            if (!cafeId) {
                return res.status(400).json({ error: "Cafe ID is required" });
            }
            await this.managementService.deleteCafeAndRelatedAssociations(cafeId);
            return res.status(200).json({ message: "Cafe and related associations deleted successfully" });
        } catch (error) {
            next(error);
        }
    }
}