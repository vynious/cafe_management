import axios from 'axios';
import { GetEmployeeResponse, EditEmployeeFormData, CreateEmployeeFormData, EmployeePersonalData, EditEmployeeRequest, GetEmployeeAssignmentResponse, CreateEmployeeRequest } from '../types/Employee';


export const EMPLOYEE_API_URL = `${import.meta.env.VITE_BACKEND_URL}/employees`;
export const ASSIGNMENT_API_URL = `${import.meta.env.VITE_BACKEND_URL}/assignments`;

export const getEmployees = async (cafe?: string): Promise<GetEmployeeAssignmentResponse[]> => {
    const params = cafe ? { cafe } : {}
    const response = await axios.get(EMPLOYEE_API_URL, { params });
    console.log(response.data)
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

export const updateEmployee = async (id: string, employeeData: EditEmployeeFormData): Promise<GetEmployeeResponse> => {

    let personalData: Partial<EmployeePersonalData> = {};
    if (employeeData.email) { personalData.email = employeeData.email }
    if (employeeData.gender) { personalData.gender = employeeData.gender }
    if (employeeData.name) { personalData.name = employeeData.name }
    if (employeeData.phone_number) { personalData.phone_number = employeeData.phone_number }

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
    console.log(reqBody)

    const response = await axios.put(EMPLOYEE_API_URL, reqBody)
    return response.data;
}

export const getEmployeeById = async (id: string): Promise<GetEmployeeResponse> => {
    const response = await axios.get(`${EMPLOYEE_API_URL}/${id}`);
    return response.data;
}