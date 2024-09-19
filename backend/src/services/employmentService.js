import { prisma_db } from "../utils/connect_db";

export default class EmploymentService {
    constructor() {
        this.prisma_db = prisma_db;
    }

    // get all employees for a cafe
    // order by number of days worked desc based on startDate
    async getEmployeesForCafe(cafeId) {
        return this.prisma_db.employment.findMany({
            where: { cafeId },
            // order by number of days worked desc based on startDate and currentDate
            orderBy: {
                startDate: 'desc',
            },
            // include the employee data
            include: {
                employee: true,
            },
        });
    }

    // get the employment record for an employee for a cafe
    async getEmploymentRecordForEmployeeForCafe(cafeId, employeeId) {
        return this.prisma_db.employment.findFirst({
            where: { cafeId, employeeId },
        });
    }

    // create a new employment record
    async createEmploymentRecord(cafeId, employeeId) {
        // create a new employment record 
        return this.prisma_db.employment.create({
            data: {
                cafeId,
                employeeId,
            },
        });
    }

    // check if an employee is currently employed
    async employeeIsCurrentlyEmployed(employeeId) {
        const employmentRecord = await this.prisma_db.employment.findMany({
            where: { employeeId },
            // order by number of days worked desc based on startDate and currentDate
            orderBy: {
                startDate: 'desc',
            },
            // include the employee data
            include: {
                employee: true,
            },
        });
        return employmentRecord.length > 0;
    }

    // end the employment record for an employee for a cafe
    async endEmployment(cafeId, employeeId) {
        return this.prisma_db.employment.update({
            where: { cafeId, employeeId },
            data: {
                endDate: new Date(), // current date
            },
        });
    }

    // get current employment records for an employee that hasn't ended
    calculateDaysWorked(startDate, currentDate) {
        // calculate the number of days worked
        const daysWorked = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
        return daysWorked;
    }
}