// src/api/cafeApi.ts
import axios from 'axios';
import { GetCafeResponse, CreateCafeRequest, EditCafeRequest } from '../types/Cafe';


export const API_URL = `${import.meta.env.VITE_BACKEND_URL}/cafe`;

// get all cafes
export const getCafes = async (location?: string): Promise<GetCafeResponse[]> => {
	const params = location ? { location } : {};
  const response = await axios.get(`${API_URL}s`, { params });
  return response.data;
};

export const createCafe = async (cafeData: CreateCafeRequest): Promise<GetCafeResponse> => {
  const formData = createFormData(cafeData, 'logo');
  const response = await axios.post(API_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const updateCafe = async (id: string, cafeData: EditCafeRequest): Promise<GetCafeResponse> => {
  const formData = createFormData(cafeData, 'logo');
  formData.append('cafeId', id);
  const response = await axios.put(API_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const deleteCafe = async (cafeId: string): Promise<void> => {
  await axios.delete(API_URL, { data: { cafeId } });
};

export const getCafeById = async (id: string): Promise<GetCafeResponse> => {
  const response = await axios.get(`${API_URL}s/${id}`);
  return response.data;
};


const createFormData = (data: Record<string, any>, fileField: string): FormData => {
  const formData = new FormData();
  const maxFileSize = 2 * 1024 * 1024; // 2MB limit

  Object.entries(data).forEach(([key, value]) => {
    if (value != null && key !== 'id') {
      if (key === fileField && value instanceof File) {
        if (value.size > maxFileSize) {
          throw new Error(`${fileField} file size exceeds 2MB limit`);
        }
        formData.append(key, value);
      } else {
        formData.append(key, value.toString());
      }
    }
  });

  return formData;
}