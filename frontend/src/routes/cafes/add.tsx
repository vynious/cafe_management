import { createFileRoute } from '@tanstack/react-router'
import { Field, reduxForm, InjectedFormProps, FormErrors, formValueSelector, change } from 'redux-form'
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useDispatch, useSelector } from 'react-redux'
import { TextField, Button, Box, Typography, Container, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { RootState } from '../../store'
import { CreateCafeFormData } from '../../types/Cafe'

const validate = (values: CreateCafeFormData): FormErrors<CreateCafeFormData> => {
  const errors: FormErrors<CreateCafeFormData> = {}
  if (!values.name) errors.name = 'Required'
  if (!values.description) errors.description = 'Required'
  if (!values.location) errors.location = 'Required'
  return errors
}

const RenderField = ({ input, label, type, meta: { touched, error } }: any) => {
  if (type === 'file') {
    return (
      <Box sx={{ mt: 2, mb: 2 }}>
        <input
          {...input}
          type={type}
          accept="image/*"
          style={{ display: 'none' }}
          id={input.name}
          onChange={(event) => input.onChange(event.target.files?.[0])}
        />
        <label htmlFor={input.name}>
          <Button variant="contained" component="span">
            Upload {label}
          </Button>
        </label>
        {touched && error && (
          <Typography color="error" variant="caption" display="block" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
      </Box>
    )
  }

  return (
    <TextField
      {...input}
      type={type}
      label={label}
      variant="outlined"
      fullWidth
      margin="normal"
      error={touched && !!error}
      helperText={touched && error}
    />
  )
}

interface AddCafeFormProps extends InjectedFormProps<CreateCafeFormData> {
  values?: CreateCafeFormData;
}

const AddCafeForm = ({ handleSubmit, pristine, submitting }: AddCafeFormProps) => {
  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const selector = formValueSelector('addCafe')
  const { name, description, location } = useSelector((state: RootState) =>
    selector(state, 'name', 'description', 'location')
  )

  const onSubmit = (values: CreateCafeFormData) => {
    // TODO: Implement form submission logic (POST/PUT to API)
    console.log(values)
    setUnsavedChanges(false)
  }

  const handleChange = (field: string, value: any) => {
    dispatch(change('addCafe', field, value))
    setUnsavedChanges(true)
  }

  const handleCancel = () => {
    unsavedChanges ? setOpenModal(true) : navigate({ to: '/cafes' })
  }

  const handleConfirmLeave = () => {
    setOpenModal(false)
    navigate({ to: '/cafes' })
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Cafe
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {['name', 'description', 'location'].map((field) => (
            <Field
              key={field}
              name={field}
              component={RenderField}
              type="text"
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              onChange={(e: any) => handleChange(field, e.target.value)}
            />
          ))}
          <Field
            name="logo"
            component={RenderField}
            type="file"
            label="Logo"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChange('logo', event.target.files?.[0])
            }
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={pristine || submitting || !(name && description && location)}
            >
              Submit
            </Button>
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', py: 2 }}>
          Unsaved Changes
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <DialogContentText id="alert-dialog-description">
            You have unsaved changes. Are you sure you want to leave without saving?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 3 }}>
          <Button onClick={() => setOpenModal(false)} variant="outlined" color="primary">
            Stay
          </Button>
          <Button onClick={handleConfirmLeave} variant="contained" color="error">
            Leave without saving
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

const AddCafeFormRedux = reduxForm({
  form: 'addCafe',
  validate
})(AddCafeForm)

const AddCafePage = () => <AddCafeFormRedux />;

export const Route = createFileRoute('/cafes/add')({
  component: AddCafePage,
})