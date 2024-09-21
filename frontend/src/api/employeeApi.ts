import axios from 'axios';
import { GetEmployeeResponse, EditEmployeeFormData, CreateEmployeeFormData } from '../types/Employee';


export const API_URL = `${import.meta.env.VITE_BACKEND_URL}/employees`;


export const getEmployees = async (cafe?: string): Promise<GetEmployeeResponse[]> => {
    const params = cafe ? { cafe } : {}
    const response = await axios.get(API_URL, { params });
    console.log(response.data)
    return response.data;
}

export const createEmployee = async (employeeData: CreateEmployeeFormData): Promise<GetEmployeeResponse> => {
    const response = await axios.post(API_URL, employeeData)
    return response.data;
}

export const updateEmployee = async (employeeData: EditEmployeeFormData): Promise<GetEmployeeResponse> => {
    const response = await axios.put(API_URL, employeeData)
    return response.data;
}