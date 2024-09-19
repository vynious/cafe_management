import employmentService from "../employment/service";
import employeeService from "../employee/service";
import cafeService from "../cafe/service";

export default class ManagementService {
    constructor() {
        this.employmentService = new employmentService();
        this.employeeService = new employeeService();
        this.cafeService = new cafeService();
    }

    // get employees for a cafe or all employees
    async getEmployees(cafeName) {
        try {
            let parsedEmploymentRecords = [];
            const currentDate = new Date();

            if (cafeName) {
                // 1. get the employees for the specified cafe
                const employmentRecords = await this.employmentService.getActiveEmployeesForCafe(cafeName);

                // 2. Parse the employment records to get total days worked
                employmentRecords.forEach(employment => {
                    parsedEmploymentRecords.push({
                        id: employment.employee.id, // Using employee ID instead of employment ID if needed
                        name: employment.employee.name,
                        gender: employment.employee.gender,
                        email_address: employment.employee.email,
                        phone_number: employment.employee.phone_number,
                        daysWorked: this.employmentService.calculateDaysWorked(employment.startDate, currentDate),
                        cafe: employment.cafe.name,
                    });
                });
            } else {
                // 3. get all employees (with or without a cafe)
                const employees = await this.employeeService.getAllEmployees();

                // populate employment records
                for (const employee of employees) {
                    // check if the employee has any active employment records
                    const employmentRecords = await this.employmentService.getEmploymentRecordsByEmployeeId(employee.id);

                    if (employmentRecords.length > 0) {
                        employmentRecords.forEach(employment => {
                            parsedEmploymentRecords.push({
                                id: employee.id,
                                name: employee.name,
                                gender: employee.gender,
                                email_address: employee.email,
                                phone_number: employee.phone_number,
                                daysWorked: this.employmentService.calculateDaysWorked(employment.startDate, currentDate),
                                cafe: employment.cafe.name,
                            });
                        });
                    } else {
                        // employee has no active employment, still include them in the response
                        parsedEmploymentRecords.push({
                            id: employee.id,
                            name: employee.name,
                            gender: employee.gender,
                            email_address: employee.email,
                            phone_number: employee.phone_number,
                            daysWorked: 0, // no employment records, hence no days worked
                            cafe: '', // no associated cafe
                        });
                    }
                }
            }

            // sort by the highest number of days worked
            parsedEmploymentRecords.sort((a, b) => b.daysWorked - a.daysWorked);

            return parsedEmploymentRecords;
        } catch (error) {
            console.error('Error fetching employees:', error);
            return { error: 'Failed to fetch employees' };
        }
    }


    async createEmployeeAndEmploymentRecord(cafeId, newEmployeeData) {
        try {
            // start a transaction
            const result = await this.prisma_db.$transaction(async (transaction) => {
                // 1. check if employee already exists
                const existingEmployee = await this.employeeService.getEmployeeByEmail(newEmployeeData.email);
                if (existingEmployee) {
                    throw new Error('Employee with this email already exists');
                }

                // 2. check if employee with phone number already exists
                const phoneNumberEmployee = await this.employeeService.getEmployeeByPhoneNumber(newEmployeeData.phone_number);
                if (phoneNumberEmployee) {
                    throw new Error('Employee with this phone number already exists');
                }

                // 3. create a new employee
                const newEmployee = await transaction.employee.create({
                    data: newEmployeeData
                });

                // 4. create a new employment record if cafeId is provided
                if (cafeId) {
                    await transaction.employment.create({
                        data: {
                            employeeId: newEmployee.id,
                            cafeId: cafeId,
                            startDate: new Date(),
                        }
                    });
                }

                return newEmployee;
            });

            return result;
        } catch (error) {
            console.error('Error creating employee and employment record:', error);
            throw new Error('Failed to create employee and employment record');
        }
    }


    async updateEmployeeAndEmployment(employeeId, updatedEmployeeData) {
        const { personalData, employmentData } = updatedEmployeeData;

        // start a transaction
        const prisma = this.prisma_db;
        return await prisma.$transaction(async (transaction) => {
            try {

                // 1. update employee personal data if provided
                let updatedEmployee = null;
                if (personalData) {
                    updatedEmployee = await transaction.employee.update({
                        where: { id: employeeId },
                        data: personalData,
                    });
                }

                // 2. update employment data if provided
                let updatedEmployment = null;
                if (employmentData) {
                    const { employmentId, ...employmentUpdates } = employmentData;

                    // remove undefined or null values to only update the fields that are provided
                    const filteredEmploymentUpdates = {};
                    for (const key in employmentUpdates) {
                        if (employmentUpdates[key] !== undefined && employmentUpdates[key] !== null) {
                            filteredEmploymentUpdates[key] = employmentUpdates[key];
                        }
                    }

                    updatedEmployment = await transaction.employment.update({
                        where: { id: employmentId },
                        data: filteredEmploymentUpdates,
                    });
                }

                return {
                    employee: updatedEmployee,
                    employment: updatedEmployment,
                };
            } catch (error) {
                console.error('Error updating employee and employment data:', error);
                throw new Error('Failed to update employee and employment data');
            }
        });
    }

}
