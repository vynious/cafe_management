import React, { useCallback, useMemo, useState } from 'react';
import { reduxForm, FormErrors, InjectedFormProps } from 'redux-form';
import { useNavigate } from '@tanstack/react-router';
import { EmployeeForm } from '../../components/employee/EmployeeForm';
import { UnsavedChangesDialog } from '../../components/UnsavedChangesDialog';
import { createFileRoute } from '@tanstack/react-router';
import { createEmployee } from '../../api/employeeApi';
import { CreateEmployeeRequest, FlattenedGetEmployeeAssignmentResponse } from '../../types/Employee';

const validate = (values: FlattenedGetEmployeeAssignmentResponse): FormErrors<FlattenedGetEmployeeAssignmentResponse> => {
  const errors: FormErrors<FlattenedGetEmployeeAssignmentResponse> = {};
  if (!values.employeeName) errors.employeeName = 'Required';
  if (!values.employeeEmail) errors.employeeEmail = 'Required';
  if (!values.employeeGender) errors.employeeGender = 'Required';
  if (!values.employeePhoneNumber) errors.employeePhoneNumber = 'Required';
  return errors;
};

interface AddEmployeeFormProps extends InjectedFormProps<FlattenedGetEmployeeAssignmentResponse> { }

const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({ handleSubmit, submitting }) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const onSubmit = useCallback(async (values: FlattenedGetEmployeeAssignmentResponse) => {
    try {
      const createEmployeeRequest: CreateEmployeeRequest = {
        newEmployeeData: {
          name: values.employeeName,
          email: values.employeeEmail,
          phone_number: values.employeePhoneNumber,
          gender: values.employeeGender,
        },
        cafeId: values.cafeId,
      };

      await createEmployee(createEmployeeRequest);
      navigate({ to: '/employees' });
    } catch (error) {
      console.error('Failed to create employee:', error);
    }
  }, [navigate]);

  const handleCancel = useCallback(() => setOpenModal(true), []);
  const handleConfirmLeave = useCallback(() => {
    setOpenModal(false);
    navigate({ to: '/employees' });
  }, [navigate]);

  const formProps = useMemo(() => ({
    onCancel: handleCancel,
    handleSubmit: handleSubmit(onSubmit),
    submitButtonText: "Add",
    submitting
  }), [handleCancel, handleSubmit, onSubmit, submitting]);

  return (
    <>
      <EmployeeForm {...formProps} />
      <UnsavedChangesDialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleConfirmLeave}
      />
    </>
  );
};

const AddEmployeeFormRedux = reduxForm<FlattenedGetEmployeeAssignmentResponse>({
  form: 'addEmployee',
  validate
})(AddEmployeeForm);

const AddEmployeePage: React.FC = () => <AddEmployeeFormRedux />;

export const Route = createFileRoute('/employees/add')({
  component: AddEmployeePage,
});

export default AddEmployeePage;