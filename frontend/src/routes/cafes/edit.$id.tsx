import React, { useCallback, useState, useEffect, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { reduxForm, FormErrors, InjectedFormProps, change, formValueSelector, initialize } from 'redux-form'
import { useNavigate, useParams } from '@tanstack/react-router'
import { useDispatch, useSelector } from 'react-redux'
import { CafeForm } from '../../components/CafeForm'
import { UnsavedChangesDialog } from '../../components/UnsavedChangesDialog'
import { getCafeById, updateCafe } from '../../api/cafeApi'
import { RootState } from '../../store'
import { EditCafeRequest } from '../../types/Cafe'


const validate = (values: EditCafeRequest): FormErrors<EditCafeRequest> => {
  const errors: FormErrors<EditCafeRequest> = {}
  const requiredFields: (keyof EditCafeRequest)[] = ['name', 'description', 'location']
  requiredFields.forEach(field => {
    if (!values[field]) errors[field] = 'Required'
  })
  return errors
}

interface EditCafeFormProps extends InjectedFormProps<EditCafeRequest> { }

const EditCafeForm: React.FC<EditCafeFormProps> = ({ handleSubmit, submitting }) => {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch()
  const { id } = useParams({ from: '/cafes/edit/$id' })

  const loadCafeData = useCallback(async () => {
    if (!id) {
      console.error('No cafe ID provided')
      navigate({ to: '/cafes' })
      return
    }
    try {
      const cafeData = await getCafeById(id)
      console.log("loaded")
      if (!cafeData) throw new Error('No cafe data returned')
      dispatch(initialize('editCafe', cafeData))
    } catch (error) {
      console.error('Failed to fetch cafe data:', error)
      navigate({ to: '/cafes' })
    }
  }, [id, dispatch, navigate])

  useEffect(() => {
    loadCafeData()
  }, [loadCafeData])

  const onSubmit = useCallback(async (values: EditCafeRequest) => {
    if (!id) {
      console.error('No cafe ID provided')
      return
    }
    try {
      await updateCafe(id, values)
      navigate({ to: '/cafes' })
    } catch (error) {
      console.error('Failed to update cafe:', error)
    }
  }, [id, navigate])

  const selector = formValueSelector('editCafe')
  const formValues = useSelector((state: RootState) => selector(state, 'name', 'description', 'location', 'logo'))

  const handleCancel = useCallback(() => setOpenModal(true), [])
  const handleConfirmLeave = useCallback(() => {
    setOpenModal(false)
    navigate({ to: '/cafes' })
  }, [navigate])

  const onFieldChange = useCallback((field: string, value: File | string | null) => {
    if (field === 'logo' && value instanceof File) {
      dispatch(change('editCafe', field, URL.createObjectURL(value)))
      dispatch(change('editCafe', '_logoFile', value))
    } else {
      dispatch(change('editCafe', field, value))
    }
  }, [dispatch])

  const formProps = useMemo(() => ({
    onCancel: handleCancel,
    handleSubmit: handleSubmit(onSubmit),
    submitButtonText: "Update",
    submitting,
    onFieldChange,
    isUpdate: true,
    initialValues: formValues,
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

const EditCafeFormRedux = reduxForm<EditCafeRequest>({
  form: 'editCafe',
  validate,
  enableReinitialize: true
})(EditCafeForm)

const EditCafePage: React.FC = () => <EditCafeFormRedux />

export const Route = createFileRoute('/cafes/edit/$id')({
  component: EditCafePage,
})