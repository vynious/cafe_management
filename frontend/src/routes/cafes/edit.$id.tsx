import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { reduxForm, FormErrors, InjectedFormProps } from 'redux-form';
import { useNavigate, useParams } from '@tanstack/react-router';
import { CafeForm } from '../../components/CafeForm';
import { UnsavedChangesDialog } from '../../components/UnsavedChangesDialog';
import { getCafeById, updateCafe } from '../../api/cafeApi';
import { createFileRoute } from '@tanstack/react-router';
import { CreateCafeRequest, EditCafeRequest } from '../../types/Cafe';

// Define the Cafe interface for form values
interface Cafe {
  name: string;
  description: string;
  location: string;
  logo?: string;
  _logoFile?: File;
}

const validate = (values: Cafe): FormErrors<Cafe> => {
  const errors: FormErrors<Cafe> = {};
  if (!values.name) errors.name = 'Required';
  if (!values.description) errors.description = 'Required';
  if (!values.location) errors.location = 'Required';
  return errors;
};

interface EditCafeFormProps extends InjectedFormProps<Cafe> { }

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
        console.log(values)
        await updateCafe(id, values);
        navigate({ to: '/cafes' });
      } catch (error) {
        console.error('Failed to update cafe:', error);
      }
    },
    [id, navigate]
  );

  const handleCancel = useCallback(() => setOpenModal(true), []);
  const handleConfirmLeave = useCallback(() => {
    setOpenModal(false);
    navigate({ to: '/cafes' });
  }, [navigate]);

  console.log(23, props)
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
  const [initialValues, setInitialValues] = useState<Cafe | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchCafe = async () => {
        try {
          const cafeData = await getCafeById(id);
          console.log("Fetched cafe data:", cafeData);
          if (cafeData) {
            setInitialValues(cafeData);
          } else {
            console.error('No cafe data returned');
          }
        } catch (error) {
          console.error('Failed to fetch cafe data:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchCafe();
    } else {
      setLoading(false);
    }
  }, [id]);

  console.log("Rendering EditCafePage, initialValues:", initialValues);

  return <EditCafeFormRedux initialValues={initialValues} />;
};

export const Route = createFileRoute('/cafes/edit/$id')({
  component: EditCafePage,
});

export default EditCafePage;
