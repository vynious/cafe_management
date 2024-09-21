export interface GetEmployeeResponse {
    id: string;
    name: string;
    email: string;
    phone_number: string;
    daysWorked: number;
    cafe: string;
}

export interface EditEmployeeFormData {
    employeeId: string;
    updateEmployeeData?: {
        personalData?: Partial<EmployeePersonalData>;
        assignmentData?: EmployeeAssignmentData;
    };
}

export interface EmployeesQuery {
    cafe: string
}

export interface EmployeePersonalData {
    name: string;
    email: string;
    phoneNumber: string;
    gender?: string;
}

export interface EmployeeAssignmentData {
    cafeId: string;
}

export interface CreateEmployeeFormData {
    newEmployeeData: EmployeePersonalData;
    cafeId: string;
}