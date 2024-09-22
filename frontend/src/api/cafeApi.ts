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

// create a new cafe 
export const createCafe = async (cafeData: CreateCafeRequest): Promise<GetCafeResponse> => {
  const formData = new FormData();
  console.log('Initial cafeData:', cafeData); // Debug log

  Object.entries(cafeData).forEach(([key, value]) => {
    if (value !== null) {
      if (key === 'image' && value instanceof File) {
        if (value.size <= 2 * 1024 * 1024) { // 2MB limit
          formData.append(key, value);
          console.log(`Appended file: ${key}`); // Debug log
        } else {
          throw new Error('Image size exceeds 2MB limit');
        }
      } else {
        formData.append(key, value);
        console.log(`Appended: ${key} = ${value}`); // Debug log
      }
    }
  });

  // Log FormData contents
  console.log('FormData contents:');
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const response = await axios.post(`${API_URL}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const updateCafe = async (id: string, cafeData: EditCafeRequest): Promise<GetCafeResponse> => {
  const formData = new FormData();
  formData.append('cafeId', id);

  console.log('Initial cafeData:', cafeData); // Debug log

  Object.entries(cafeData).forEach(([key, value]) => {
    if (value !== null && value !== undefined && key !== 'id') {
      if (key === 'logo' && value instanceof File) {
        if (value.size > 2 * 1024 * 1024) { // 2MB limit
          throw new Error('Logo file size exceeds 2MB limit');
        }
        formData.append(key, value);
        console.log(`Appended file: ${key}`); // Debug log
      } else {
        formData.append(key, value.toString());
        console.log(`Appended: ${key} = ${value}`); // Debug log
      }
    }
  });

  // Log FormData contents
  console.log('FormData contents:');
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const response = await axios.put(`${API_URL}`, formData, {
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