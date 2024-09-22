import { GetCafeResponse } from "./Cafe";

export interface GetEmployeeResponse {
    id: string;
    name: string;
    email: string;
    gender: string;
    phone_number: string;
    daysWorked: number;
    cafe: GetCafeResponse;
}

export interface EditEmployeeRequest {
    employeeId: string;
    updateEmployeeData?: {
        personalData?: Partial<EmployeePersonalData>;
        assignmentData?: EmployeeAssignmentData;
    };
}

export interface EmployeesQuery {
    cafe: string
}

export interface EmployeePersonalData {
    name: string;
    email: string;
    phone_number: string;
    gender: string;
}

export interface EmployeeAssignmentData {
    cafeId: string;
}

export interface CreateEmployeeRequest {
    newEmployeeData: EmployeePersonalData;
    cafeId: string;
}

export interface EditEmployeeFormData{
    name?: string;
    email?: string;
    phone_number?: string;
    gender?: string
    cafeId?: string
}

export interface CreateEmployeeFormData {
    name: string;
    email: string;
    phone_number: string;
    gender: string;
    cafeId: string;
}

export interface GetEmployeeAssignmentResponse {
    id: string;
    daysWorked: number;
    employee: GetEmployeeResponse
    cafe: GetCafeResponse
}


export interface FlattenedGetEmployeeAssignmentResponse {
    id: string;
    employeeId: string;
    employeeName: string;
    employeeEmail: string;
    employeeGender: string;
    employeePhoneNumber: string;
    employeeDaysWorked: number;
    cafeId: string;
    cafeName: string;
    cafeDescription: string;
    cafeLocation: string;
}