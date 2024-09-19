import { prisma_db } from "../../prisma/connect_db";

// service for the employee that interacts with the database and encapsulates the logic for the employee
export default class EmployeeService {
    constructor() {
        this.prisma_db = prisma_db;
    }

    // get all employees
    async getAllEmployees() {
        return this.prisma_db.employee.findMany();
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

    // get employee by email
    async getEmployeeByEmail(email) {
        return this.prisma_db.employee.findUnique({
            where: { email },
        });
    }

    // get employee by phone number
    async getEmployeeByPhoneNumber(phone_number) {
        return this.prisma_db.employee.findUnique({
            where: { phone_number },
        });
    }
}
