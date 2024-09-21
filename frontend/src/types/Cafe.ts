export interface CreateCafeRequest {
  name: string;
  location: string;
  description: string;
  logo?: string;
  logoFile?: File;
}


export interface GetCafeResponse {
  id: string;
  name: string;
  location: string;
  description: string;
  logo: string;
  _count?: {
    employees: number
  }
}


export interface EditCafeRequest {
  name?: string;
  location?: string;
  description?: string;
  logo?: string;
  logoFile?: File;
}