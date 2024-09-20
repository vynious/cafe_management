import { prisma_db } from "../../prisma/connection.js";

export default class assignmentService {
    constructor() {
        this.prisma_db = prisma_db;
    }

    // ------------- CRUD functions ------------- //
    // get all employees for a cafe
    // order by number of days worked desc based on startDate
    async getEmployeesForCafe(cafeName) {
        return this.prisma_db.assignment.findMany({
            where: {
                cafe: {
                    name: cafeName,
                },
            },
            // order by number of days worked desc based on startDate and currentDate
            orderBy: {
                startDate: 'desc',
            },
            // include the employee data
            include: {
                employee: true,
                cafe: true
            },
        });
    }

    // returns active employment for employee
    async getAssignmentForEmployee(employeeId) {
        return this.prisma_db.assignment.findFirst({
            where: {
                id: employeeId,
            },
            include: {
                cafe: true
            }, 
        });
    }

    // ------------- Helper functions ------------- //
    // get current assignment records for an employee that hasn't ended
    calculateDaysWorked(startDate) {
        // calculate the number of days worked
        const daysWorked = Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24));
        console.log(startDate, currentDate)
        console.log(daysWorked)
        return daysWorked;
    }
}