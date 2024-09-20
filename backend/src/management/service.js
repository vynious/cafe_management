import employmentService from "../employment/service";
import employeeService from "../employee/service";
import cafeService from "../cafe/service";
import prisma_db from "../utils/prismaClient"; // Assuming prisma client is initialized here

export default class ManagementService {
    constructor() {
        this.employmentService = new employmentService();
        this.employeeService = new employeeService();
        this.cafeService = new cafeService();
        this.prisma_db = prisma_db; 
    }


    // ------------- CRUD functions ------------- //
    // Get employees for a cafe or all employees sorted by days worked
    async getEmployees(cafeName) {
        try {
            let parsedEmploymentRecords = [];
            const currentDate = new Date();

            if (cafeName) {
                // Get employment records for the specified cafe
                const employmentRecords = await this.employmentService.getActiveEmployeesForCafe(cafeName);

                // Parse the employment records to get total days worked
                parsedEmploymentRecords = this.parseEmploymentRecords(employmentRecords, currentDate);
            } else {
                // Get all employees with or without a cafe
                const employees = await this.employeeService.getAllEmployees();

                // Get employment records for each employee
                for (const employee of employees) {
                    const employmentRecords = await this.employmentService.getEmploymentRecordsByEmployeeId(employee.id);

                    if (employmentRecords.length > 0) {
                        const records = this.parseEmploymentRecords(employmentRecords, currentDate, employee);
                        parsedEmploymentRecords.push(...records);
                    } else {
                        // Employee has no active employment, still include them in the response
                        parsedEmploymentRecords.push({
                            id: employee.id,
                            name: employee.name,
                            gender: employee.gender,
                            email_address: employee.email,
                            phone_number: employee.phone_number,
                            daysWorked: 0, // No employment records, hence no days worked
                            cafe: '', // No associated cafe
                        });
                    }
                }
            }

            // Sort by the highest number of days worked
            parsedEmploymentRecords.sort((a, b) => b.daysWorked - a.daysWorked);

            return parsedEmploymentRecords;
        } catch (error) {
            console.error('Error fetching employees:', error);
            return { error: 'Failed to fetch employees' };
        }
    }


    // Create an employee and employment record
    async createEmployeeAndEmploymentRecord(cafeId, newEmployeeData) {
        try {
            const result = await this.prisma_db.$transaction(async (transaction) => {
                // Check if employee already exists
                await this.checkForExistingEmployee(newEmployeeData, transaction);

                // Create a new employee
                const newEmployee = await transaction.employee.create({
                    data: newEmployeeData
                });

                // Create a new employment record if cafeId is provided
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

    // Check if employee already exists
    async checkForExistingEmployee(newEmployeeData, transaction) {
        const existingEmployee = await transaction.employee.findUnique({
            where: { email: newEmployeeData.email },
        });
        if (existingEmployee) {
            throw new Error('Employee with this email already exists');
        }

        const phoneNumberEmployee = await transaction.employee.findUnique({
            where: { phone_number: newEmployeeData.phone_number },
        });
        if (phoneNumberEmployee) {
            throw new Error('Employee with this phone number already exists');
        }
    }

    // Update employee and employment data
    async updateEmployeeAndEmployment(employeeId, updatedEmployeeData) {
        const { personalData, employmentData } = updatedEmployeeData;

        try {
            const result = await this.prisma_db.$transaction(async (transaction) => {
                // Update employee personal data if provided
                const updatedEmployee = personalData ? await transaction.employee.update({
                    where: { id: employeeId },
                    data: personalData,
                }) : null;

                // Update employment data if provided
                const updatedEmployment = employmentData ? await this.updateEmploymentData(employmentData, transaction) : null;

                return { employee: updatedEmployee, employment: updatedEmployment };
            });

            return result;
        } catch (error) {
            console.error('Error updating employee and employment data:', error);
            throw new Error('Failed to update employee and employment data');
        }
    }

    // Update employment data
    async updateEmploymentData(employmentData, transaction) {
        const { employmentId, ...employmentUpdates } = employmentData;

        // Filter out undefined or null values
        const filteredEmploymentUpdates = Object.fromEntries(
            Object.entries(employmentUpdates).filter(([_, value]) => value !== undefined && value !== null)
        );

        return transaction.employment.update({
            where: { id: employmentId },
            data: filteredEmploymentUpdates,
        });
    }

    // ------------- Helper functions ------------- //
    // Parse employment records
    parseEmploymentRecords(employmentRecords, currentDate, employeeOverride = null) {
        return employmentRecords.map(employment => ({
            id: employeeOverride ? employeeOverride.id : employment.employee.id, // Use employeeOverride if provided
            name: employeeOverride ? employeeOverride.name : employment.employee.name,
            gender: employeeOverride ? employeeOverride.gender : employment.employee.gender,
            email_address: employeeOverride ? employeeOverride.email : employment.employee.email,
            phone_number: employeeOverride ? employeeOverride.phone_number : employment.employee.phone_number,
            daysWorked: this.employmentService.calculateDaysWorked(employment.startDate, currentDate),
            cafe: employment.cafe.name,
        }));
    }
}
