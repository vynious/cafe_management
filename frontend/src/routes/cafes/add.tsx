import React, { useCallback, useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { reduxForm, FormErrors, InjectedFormProps, change, formValueSelector } from 'redux-form'
import { useNavigate } from '@tanstack/react-router'
import { useDispatch, useSelector } from 'react-redux'
import { CafeForm } from '../../components/CafeForm'
import { UnsavedChangesDialog } from '../../components/UnsavedChangesDialog'
import { debounce } from 'lodash';  // You'll need to install lodash


interface Cafe {
  name: string;
  description: string;
  location: string;
  logo?: string;
  _logoFile?: File; // This will store the actual File object
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
  const dispatch = useDispatch()

  const onSubmit = useCallback((values: Cafe) => {
    // TODO: Implement form submission logic (POST to API)
    console.log(values)
    navigate({ to: '/cafes' })
  }, [navigate])

  const selector = formValueSelector('addCafe')
  const formValues = useSelector((state: Cafe) => selector(state, 'name', 'description', 'location', 'logo'))

  const handleCancel = useCallback(() => {
    setOpenModal(true)
  }, [])


  const handleConfirmLeave = useCallback(() => {
    setOpenModal(false)
    navigate({ to: '/cafes' })
  }, [navigate])

  // reduces dispatches for text inputs
  const debouncedDispatch = useMemo(
    () => debounce((field, value) => {
      dispatch(change('addCafe', field, value));
    }, 300),
    [dispatch]
  );
  
  // handle input field changes
  const onFieldChange = useCallback((field: any, value: File | string | null) => {
    if (field === 'logo' && value instanceof File) {
      dispatch(change('addCafe', field, URL.createObjectURL(value)));
      dispatch(change('addCafe', '_logoFile', value));
    } else {
      debouncedDispatch(field, value)
    }
  }, [dispatch, debouncedDispatch]);


  const formProps = useMemo(() => ({
    onCancel: handleCancel,
    handleSubmit: handleSubmit(onSubmit),
    submitButtonText: "Add",
    submitting,
    onFieldChange,
    isUpdate: false,
    initialValues: null,
  }), [handleCancel, handleSubmit, onSubmit, submitting, onFieldChange, formValues])

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

export const Route = createFileRoute('/cafes/add')({
  component: AddCafePage,
})