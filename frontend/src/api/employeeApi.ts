import axios from 'axios';
import { Employee, EditEmployeeFormData, CreateEmployeeFormData } from '../types/Employee';


export const API_URL = `${import.meta.env.VITE_BACKEND_URL}/cafes`;


export const getEmployees = async (cafe?: string): Promise<Employee[]> => {
    const params = cafe ? { cafe } : {}
    const response = await axios.get(API_URL, { params });
    return response.data;
}

export const createEmployee = async (employeeData: CreateEmployeeFormData): Promise<Employee> => {
    const response = await axios.post(API_URL, employeeData)
    return response.data;
}

export const updateEmployee = async (employeeData: EditEmployeeFormData): Promise<Employee> => {
    const response = await axios.put(API_URL, employeeData)
    return response.data;
}