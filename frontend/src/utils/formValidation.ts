import { FormErrors } from 'redux-form';
import { FlattenedGetEmployeeAssignmentResponse } from '../types/Employee';

export const validateEmployeeForm = (values: FlattenedGetEmployeeAssignmentResponse): FormErrors<FlattenedGetEmployeeAssignmentResponse> => {
  const errors: FormErrors<FlattenedGetEmployeeAssignmentResponse> = {};
  ['employeeName', 'employeeEmail', 'employeeGender', 'employeePhoneNumber'].forEach(field => {
    if (!values[field as keyof FlattenedGetEmployeeAssignmentResponse]) {
      errors[field as keyof FlattenedGetEmployeeAssignmentResponse] = 'Required';
    }
  });
  return errors;
};