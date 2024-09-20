export interface Cafe {
  id: string;
  name: string;
  description: string;
  logo: string;
  location: string;
  employees: string[]; // Array of employee IDs
}

export interface CafeFormData {
  name: string;
  description: string;
  logo: File | null;
  location: string;
}

export interface CafeQuery {
    location: string
}