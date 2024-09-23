import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { reduxForm, FormErrors, InjectedFormProps } from 'redux-form';
import { useNavigate, useParams } from '@tanstack/react-router';
import { CafeForm } from '../../components/cafe/CafeForm';
import { UnsavedChangesDialog } from '../../components/shared/UnsavedChangesDialog';
import { getCafeById, updateCafe } from '../../api/cafeApi';
import { createFileRoute } from '@tanstack/react-router';
import { CreateCafeRequest, EditCafeRequest } from '../../types/Cafe';

const validate = (values: CreateCafeRequest): FormErrors<CreateCafeRequest> => {
  const errors: FormErrors<CreateCafeRequest> = {};
  if (!values.name) errors.name = 'Required';
  if (!values.description) errors.description = 'Required';
  if (!values.location) errors.location = 'Required';
  return errors;
};

interface EditCafeFormProps extends InjectedFormProps<CreateCafeRequest> { }

const EditCafeForm: React.FC<EditCafeFormProps> = (props) => {
  const navigate = useNavigate();
  const { id } = useParams({ from: '/cafes/edit/$id' });
  const [openModal, setOpenModal] = useState(false);

  const onSubmit = useCallback(
    async (values: EditCafeRequest) => {
      if (!id) {
        console.error('No cafe ID provided');
        return;
      }
      try {
        await updateCafe(id, values)
        navigate({ to: '/cafes' });
      } catch (error) {
        alert(`Failed to update cafe: ${error}`)
      }
    },
    [id, navigate]
  );

  const handleCancel = useCallback(() => setOpenModal(true), []);
  const handleConfirmLeave = useCallback(() => {
    setOpenModal(false);
    navigate({ to: '/cafes' });
  }, [navigate]);

  const formProps = useMemo(
    () => ({
      onCancel: handleCancel,
      handleSubmit: props.handleSubmit(onSubmit),
      submitButtonText: 'Update',
      submitting: props.submitting, // Changed this line
      initialValues: props.initialValues
    }),
    [handleCancel, props.handleSubmit, onSubmit, props.submitting, props.initialValues]
  );

  return (
    <>
      <CafeForm {...formProps} />
      <UnsavedChangesDialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleConfirmLeave}
      />
    </>
  );
};

// reduxForm configuration
const EditCafeFormRedux = reduxForm<CreateCafeRequest>({
  validate,
  form: 'editCafe',
  enableReinitialize: true,
  keepDirtyOnReinitialize: false,
})(EditCafeForm);

const EditCafePage: React.FC = () => {
  const { id } = useParams({ from: '/cafes/edit/$id' });
  const [initialValues, setInitialValues] = useState<CreateCafeRequest | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const fetchCafe = async () => {
        try {
          const cafeData = await getCafeById(id);
          if (cafeData) {
            setInitialValues(cafeData);
          } else {
            console.error('No cafe data returned');
          }
        } catch (error) {
          console.error('Failed to fetch cafe data:', error);
        }
      };
      fetchCafe();
    }
  }, [id])

  return <EditCafeFormRedux initialValues={initialValues} />;
};

export const Route = createFileRoute('/cafes/edit/$id')({
  component: EditCafePage,
});

export default EditCafePage;
