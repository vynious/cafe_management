export interface Employee {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    daysWorked: number;
    cafeName: string;
}

export interface EditEmployeeFormData {
    employeeId: string;
    updateEmployeeData?: {
        personalData?: Partial<EmployeePersonalData>;
        assignmentData?: EmployeeAssignmentData;
    };
}

export interface EmployeesQuery {
    cafeName: string
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