import { FlattenedGetEmployeeAssignmentResponse, GetEmployeeAssignmentResponse } from "../types/Employee";
export const flattenEmployeeData = (from: GetEmployeeAssignmentResponse): FlattenedGetEmployeeAssignmentResponse => {
    return {
        id: from.id,
        employeeId: from.employee.id, 
        employeeName: from.employee.name,
        employeeEmail: from.employee.email,
        employeeGender: from.employee.gender,
        employeePhoneNumber: from.employee.phone_number,
        employeeDaysWorked: from.daysWorked,
        cafeName: from.cafe.name,
        cafeId: from.cafe.id, 
        cafeDescription: from.cafe.description, 
        cafeLocation: from.cafe.location, 
    };
}