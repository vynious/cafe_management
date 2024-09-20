import assignment from "../assignment/service.js";
import EmployeeService from "../employee/service.js";
import CafeService from "../cafe/service.js";
import { prisma_db } from "../../prisma/connection.js";

export default class ManagementService {
    constructor() {
        this.assignment = new assignment();
        this.employeeService = new EmployeeService();
        this.cafeService = new CafeService();
        this.prisma_db = prisma_db;
    }

    // ------------- CRUD functions ------------- //

    // Create a new employee and their employment record
    async createEmployeeWithAssignment(cafeId, newEmployeeData) {
        try {
            const result = await this.prisma_db.$transaction(async (transaction) => {
                // Create a new employee
                const newEmployee = await transaction.employee.create({
                    data: newEmployeeData
                });

                // Create a new assignment record
                await transaction.assignment.create({
                    data: {
                        employeeId: newEmployee.id,
                        cafeId: cafeId,
                        startDate: new Date(),
                    }
                });

                return newEmployee;
            });

            return result;
        } catch (error) {
            throw new Error('Failed to create employee and employment record');
        }
    }

    // Update employee personal and employment data
    async updateEmployeeWithAssignment(employeeId, updatedEmployeeData) {
        const { personalData, assignmentData } = updatedEmployeeData;

        try {
            const result = await this.prisma_db.$transaction(async (transaction) => {
                let updatedAssignment = null;
                let updatedEmployee = null;

                // Update employee personal data if provided
                if (personalData && Object.keys(personalData).length > 0) {
                    updatedEmployee = await transaction.employee.update({
                        where: { id: employeeId },
                        data: personalData,
                    });
                }

                // Update assignment data if provided
                if (assignmentData && Object.keys(assignmentData).length > 0) {
                    // validation
                    if (assignmentData.cafeId && assignmentData.cafeId == null) {
                        return new Error("cannot unassigned employee from cafe without a new cafe")
                    }

                    // Get the current assignment of the employee
                    const assignment = await this.assignment.getAssignmentForEmployee(employeeId);
                    // Update employment data if provided
                    updatedAssignment = await this._updateAssignment(assignment.id, assignmentData, transaction);
                }

                return { employee: updatedEmployee, assignment: updatedAssignment };
            });

            return result;
        } catch (error) {
            console.error('Error updating employee and employment data:', error);
            throw new Error('Failed to update employee and employment data');
        }
    }

    // delete the cafe, assignments and the employees under this cafe    
    async deleteCafeAndRelatedAssociations(cafeId) {
        try {
            const result = await this.prisma_db.$transaction(async (transaction) => {
                // Get employees assigned to this cafe
                const assignedEmployees = await transaction.assignment.findMany({
                    where: { cafeId: cafeId },
                    select: { employeeId: true }
                });

                const employeeIds = assignedEmployees.map(ae => ae.employeeId);

                // Delete all assignments for this cafe
                await transaction.assignment.deleteMany({
                    where: { cafeId: cafeId }
                });

                // Delete all employees assigned to this cafe
                await transaction.employee.deleteMany({
                    where: { id: { in: employeeIds } }
                });

                // Delete the cafe
                await transaction.cafe.delete({
                    where: { id: cafeId }
                });

                return { deletedCafeId: cafeId, deletedEmployeeCount: employeeIds.length };
            });

            return result;
        } catch (error) {
            console.error('Error deleting cafe and related associations:', error);
            throw new Error('Failed to delete cafe and related associations');
        }
    }
    
    // ------------- Helper functions ------------- //

    // Update employment data within a database transaction
    async _updateAssignment(assignmentId, assignmentData, transaction) {
        const { ...assignmentUpdates } = assignmentData;

        // Filter out undefined or null values
        const filteredAssignmentUpdates = Object.fromEntries(
            Object.entries(assignmentUpdates).filter(([_, value]) => value !== undefined && value !== null)
        )

        return transaction.assignment.update({
            where: { id: assignmentId },
            data: filteredAssignmentUpdates,
        });
    }
}