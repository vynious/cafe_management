import React, { useCallback, useMemo, useState } from 'react';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { useNavigate } from '@tanstack/react-router';
import { EmployeeForm } from '../../components/employee/EmployeeForm';
import { UnsavedChangesDialog } from '../../components/shared/UnsavedChangesDialog';
import { createFileRoute } from '@tanstack/react-router';
import { createEmployee } from '../../api/employeeApi';
import { CreateEmployeeRequest, FlattenedGetEmployeeAssignmentResponse } from '../../types/Employee';
import { validateEmployeeForm } from '../../utils/formValidation';

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
  validate: validateEmployeeForm,
})(AddEmployeeForm);

const AddEmployeePage: React.FC = () => <AddEmployeeFormRedux />;

export const Route = createFileRoute('/employees/add')({
  component: AddEmployeePage,
});

export default AddEmployeePage;