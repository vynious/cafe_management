import { prisma_db } from "../utils/connect_db";

// service for the employee that interacts with the database and encapsulates the logic for the employee
export default class EmployeeService {
    constructor() {
        this.prisma_db = prisma_db;
    }

    // get all employees
    async getAllEmployees() {
        return this.prisma_db.employee.findMany();
    }

    // create a new employee
    async createEmployee(name, email, phone_number, gender) {
        return this.prisma_db.employee.create({
            data: {
                name,
                email,
                phone_number,
                gender,
            },
        });
    }

    // get an employee by id
    async getEmployeeById(employeeId) {
        return this.prisma_db.employee.findUnique({
            where: { id: employeeId },
        });
    }

    // update an employee by id
    async updateEmployee(employeeId, data) {
        return this.prisma_db.employee.update({
            where: { id: employeeId },
            data,
        });
    }
}