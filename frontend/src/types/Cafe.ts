export interface Cafe {
  id: string;
  name: string;
  description: string;
  logo: string;
  location: string;
  count: number; // Array of employee IDs
}

export interface CreateCafeFormData {
  name: string;
  description: string;
  logo: File | null;
  location: string;
}

export interface CafeQuery {
  cafeId?: string;
  location?: string;
  name?: string;
  description?: string;
}

export interface EditCafeFormData {
  cafeId: string;
  updateCafeData: {
    name?: string;
    description?: string;
    logo?: File | null;
    location?: string;
  };
}