import axios from 'axios';
import { GetEmployeeResponse, EmployeePersonalData, EditEmployeeRequest, GetEmployeeAssignmentResponse, CreateEmployeeRequest, FlattenedGetEmployeeAssignmentResponse } from '../types/Employee';


export const EMPLOYEE_API_URL = `${import.meta.env.VITE_BACKEND_URL}/employee`;
export const ASSIGNMENT_API_URL = `${import.meta.env.VITE_BACKEND_URL}/assignments`;

export const getEmployees = async (cafe?: string): Promise<GetEmployeeAssignmentResponse[]> => {
    const params = cafe ? { cafe } : {}
    const response = await axios.get(`${EMPLOYEE_API_URL}s`, { params });
    return response.data;
}

export const getEmployeeAssignment = async (employeeId: string): Promise<GetEmployeeAssignmentResponse> => {
    const response = await axios.get(`${ASSIGNMENT_API_URL}/employee/${employeeId}`);
    return response.data;
}   

export const createEmployee = async (employeeData: CreateEmployeeRequest): Promise<GetEmployeeResponse> => {
    const response = await axios.post(EMPLOYEE_API_URL, employeeData)
    return response.data;
}

export const updateEmployee = async (id: string, employeeData: FlattenedGetEmployeeAssignmentResponse): Promise<GetEmployeeResponse> => {

    let personalData: Partial<EmployeePersonalData> = {};
    if (employeeData.employeeEmail) { personalData.email = employeeData.employeeEmail }
    if (employeeData.employeeGender) { personalData.gender = employeeData.employeeGender }
    if (employeeData.employeeName) { personalData.name = employeeData.employeeName }
    if (employeeData.employeePhoneNumber) { personalData.phone_number = employeeData.employeePhoneNumber }

    let assignmentData: { cafeId: string } | undefined = undefined;
    if (employeeData.cafeId) { 
        assignmentData = { cafeId: employeeData.cafeId };
    }
    
    
    let reqBody: EditEmployeeRequest = {
        employeeId: id,
        updateEmployeeData: {
            personalData: personalData,
            assignmentData: assignmentData
        }
    }

    const response = await axios.put(EMPLOYEE_API_URL, reqBody)
    return response.data;
}

export const getEmployeeById = async (id: string): Promise<GetEmployeeResponse> => {
    const response = await axios.get(`${EMPLOYEE_API_URL}/${id}`);
    return response.data;
}

export const deleteEmployee = async (employeeId: string): Promise<void> => {
    await axios.delete(EMPLOYEE_API_URL, { data: { employeeId } });
}