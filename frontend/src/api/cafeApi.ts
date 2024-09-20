// src/api/cafeApi.ts

import axios from 'axios';
import { Cafe, CafeFormData } from '../types/Cafe';


export const API_URL = `${import.meta.env.VITE_BACKEND_URL}/cafes`;

// get all cafes
export const getCafes = async (location?: string): Promise<Cafe[]> => {
	const params = location ? { location } : {};
	console.log(API_URL)
  const response = await axios.get(API_URL, { params });
  return response.data;
};

// create a new cafe 
export const createCafe = async (cafeData: CafeFormData): Promise<Cafe> => {
  const formData = new FormData();
  Object.entries(cafeData).forEach(([key, value]) => {
    if (value !== null) {
      if (key === 'image' && value instanceof File) {
        if (value.size <= 2 * 1024 * 1024) { // 2MB limit
          formData.append(key, value);
        } else {
          throw new Error('Image size exceeds 2MB limit');
        }
      } else {
        formData.append(key, value);
      }
    }
  });
  const response = await axios.post(API_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

// update an existing cafe
export const updateCafe = async (id: string, cafeData: Partial<CafeFormData>): Promise<Cafe> => {
  const formData = new FormData();
  Object.entries(cafeData).forEach(([key, value]) => {
    if (value !== null) {
      if (key === 'image' && value instanceof File) {
        if (value.size <= 2 * 1024 * 1024) { // 2MB limit
          formData.append(key, value);
        } else {
          throw new Error('Image size exceeds 2MB limit');
        }
      } else {
        formData.append(key, value);
      }
    }
  });
  formData.append('cafeId', id);
  const response = await axios.put(`${API_URL}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const deleteCafe = async (cafeId: string): Promise<void> => {
  await axios.delete(API_URL, { data: { cafeId } });
};