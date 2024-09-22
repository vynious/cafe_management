import React, { useCallback, useMemo, useState } from 'react'
import { reduxForm, FormErrors, InjectedFormProps } from 'redux-form'
import { useNavigate } from '@tanstack/react-router'
import { CafeForm } from '../../components/cafe/CafeForm'
import { UnsavedChangesDialog } from '../../components/UnsavedChangesDialog'
import { createFileRoute } from '@tanstack/react-router'
import { createCafe } from '../../api/cafeApi'

interface Cafe {
  name: string;
  description: string;
  location: string;
  logo?: string;
  _logoFile?: File; // Actual file object
}

const validate = (values: Cafe): FormErrors<Cafe> => {
  const errors: FormErrors<Cafe> = {}
  if (!values.name) errors.name = 'Required'
  if (!values.description) errors.description = 'Required'
  if (!values.location) errors.location = 'Required'
  return errors
}

interface AddCafeFormProps extends InjectedFormProps<Cafe> { }

const AddCafeForm: React.FC<AddCafeFormProps> = ({ handleSubmit, submitting }) => {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)

  const onSubmit = useCallback(async (values: Cafe) => {
    // Implement form submission logic (POST to API)
    await createCafe(values)
    console.log('Form submitted with values:', values);
    navigate({ to: '/cafes' });
  }, [navigate])

  const handleCancel = useCallback(() => setOpenModal(true), []);
  const handleConfirmLeave = useCallback(() => {
    setOpenModal(false);
    navigate({ to: '/cafes' });
  }, [navigate]);

  const formProps = useMemo(() => ({
    onCancel: handleCancel,
    handleSubmit: handleSubmit(onSubmit),
    submitButtonText: "Add",
    submitting
  }), [handleCancel, handleSubmit, onSubmit, submitting]);

  return (
    <>
      <CafeForm {...formProps} />
      <UnsavedChangesDialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleConfirmLeave}
      />
    </>
  )
}

const AddCafeFormRedux = reduxForm<Cafe>({
  form: 'addCafe',
  validate
})(AddCafeForm)

const AddCafePage: React.FC = () => <AddCafeFormRedux />
;
export const Route = createFileRoute('/cafes/add')({
  component: AddCafePage,
})