import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { useNavigate, useParams } from '@tanstack/react-router';
import { EmployeeForm } from '../../components/employee/EmployeeForm';
import { UnsavedChangesDialog } from '../../components/shared/UnsavedChangesDialog';
import { getEmployeeAssignment, updateEmployee } from '../../api/employeeApi';
import { createFileRoute } from '@tanstack/react-router';
import { FlattenedGetEmployeeAssignmentResponse } from '../../types/Employee';
import { flattenEmployeeData } from '../../utils/flatten';
import { validateEmployeeForm } from '../../utils/formValidation';




interface EditEmployeeFormProps extends InjectedFormProps<FlattenedGetEmployeeAssignmentResponse> { }

const EditEmployeeForm: React.FC<EditEmployeeFormProps> = (props) => {
  const navigate = useNavigate();
  const { id } = useParams({ from: '/employees/edit/$id' });
  const [openModal, setOpenModal] = useState(false);

  const onSubmit = useCallback(
    async (values: FlattenedGetEmployeeAssignmentResponse) => {
      if (!id) {
        console.error('No employee ID provided');
        return;
      }
      try {
        await updateEmployee(id, values);
        navigate({ to: '/employees' });
      } catch (error) {
        console.error('Failed to update employee:', error);
      }
    },
    [id, navigate]
  );

  const handleCancel = useCallback(() => setOpenModal(true), []);
  const handleConfirmLeave = useCallback(() => {
    setOpenModal(false);
    navigate({ to: '/employees' });
  }, [navigate]);

  const formProps = useMemo(
    () => ({
      onCancel: handleCancel,
      handleSubmit: props.handleSubmit(onSubmit),
      submitButtonText: 'Update',
      submitting: props.submitting,
      initialValues: props.initialValues
    }),
    [handleCancel, props.handleSubmit, onSubmit, props.submitting, props.initialValues]
  );

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

const EditEmployeeFormRedux = reduxForm<FlattenedGetEmployeeAssignmentResponse>({
  validate: validateEmployeeForm,
  form: 'editEmployee',
  enableReinitialize: true,
  keepDirtyOnReinitialize: false,
})(EditEmployeeForm);

const EditEmployeePage: React.FC = () => {
  const { id } = useParams({ from: '/employees/edit/$id' });
  const [initialValues, setInitialValues] = useState<FlattenedGetEmployeeAssignmentResponse | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchEmployee = async () => {
        try {
          const employeeData = await getEmployeeAssignment(id);
          if (employeeData) {
            const flattenData = flattenEmployeeData(employeeData)
            setInitialValues(flattenData);
          } else {
            console.error('No employee data returned');
          }
        } catch (error) {
          console.error('Failed to fetch employee data:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchEmployee();
    } else {
      setLoading(false);
    }
  }, [id]);

  return <EditEmployeeFormRedux initialValues={initialValues} />;
};

export const Route = createFileRoute('/employees/edit/$id')({
  component: EditEmployeePage,
});

export default EditEmployeePage;