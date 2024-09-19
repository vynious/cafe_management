
export default class EmploymentService {
    constructor() {
        this.prisma_db = prisma_db;
    }

    // get all employees for a cafe
    async getEmployeesForCafe(cafeId) {
        return this.prisma_db.employeeCafe.findMany({
            where: { cafeId },
            // order by number of days worked desc based on startDate and currentDate
            orderBy: {
                startDate: 'desc',
            },
        });
    }

    // create a new employment record
    async createEmploymentRecord(cafeId, employeeId) {

        return this.prisma_db.employeeCafe.create({
            data: {
                cafeId,
                employeeId,
            },
        });
    }
}