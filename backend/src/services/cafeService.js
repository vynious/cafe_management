import { prisma_db } from "../utils/connect_db";

// service for the cafe that interacts with the database and encapsulates the logic for the cafe
export default class CafeService {
    constructor() {
        this.prisma_db = prisma_db;
        this.employmentService = new EmploymentService();
    }

    // get all cafes
    async getAllCafes() {
        return this.prisma_db.cafe.findMany();
    }

    // get a cafe by id
    async getCafeById(cafeId) {
        return this.prisma_db.cafe.findUnique({
            where: { cafeId },
        });
    }

    // get all cafes by location
    async getCafeByLocation(location) {
        return this.prisma_db.cafe.findMany({
            where: { location },
        });
    }

    // create a new cafe
    async createCafe(cafeData) {
        return this.prisma_db.cafe.create({
            data: cafeData,
        });
    }

    // update a cafe by id
    async updateCafe(cafeId, cafeData) {
        return this.prisma_db.cafe.update({
            where: { cafeId },
            data: cafeData,
        });
    }

    // delete a cafe by id
    async deleteCafe(id) {
        return this.prisma_db.cafe.delete({
            where: { id },
        });
    }

    // get all employees for a cafe
    // The response of this endpoint should be the below and sorted by the highest number of days
    // worked. It should list all the employees.
    async getEmployeesForCafe(cafeId) {
        
        let parsedEmploymentRecords = [];
        const employmentRecords = await this.employmentService.getEmployeesForCafe(cafeId);

        // parse the employment records to get total days worked 
        const currentDate = new Date();
        employmentRecords.forEach(employment => {
            parsedEmploymentRecords.push({
                id: employment.id,
                name: employment.employee.name,
                gender: employment.employee.gender,
                email: employment.employee.email,
                daysWorked: this.employmentService.calculateDaysWorked(employment.startDate, currentDate),
            });
        });

        return parsedEmploymentRecords;
    }

    // register a new employee for a cafe
    async registerEmployeeForCafe(cafeId, employeeId) {
        
        // check if the employee is already registered for the cafe
        const employmentRecord = await this.employmentService.getEmploymentRecordForEmployeeForCafe(cafeId, employeeId);
        if (employmentRecord) {
            return { error: 'Employee already registered for this cafe' };
        }

        const isCurrentlyEmployed = await this.employmentService.employeeIsCurrentlyEmployed(employeeId);
        if (isCurrentlyEmployed) {
            return { error: 'Employee is currently employed' };
        }

        // create a new employment record
        return this.employmentService.createEmploymentRecord(cafeId, employeeId);
    }

    async terminateEmployment(cafeId, employeeId) {
        
        // end the employment for an employee for a cafe
        return this.employmentService.endEmployment(cafeId, employeeId);
    }
}