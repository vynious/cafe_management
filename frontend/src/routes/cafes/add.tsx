import { createFileRoute } from '@tanstack/react-router'
import { Field, reduxForm, InjectedFormProps, FormErrors } from 'redux-form'
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material'

// Form validation
const validate = (values: CafeFormValues): FormErrors<CafeFormValues> => {
  const errors: FormErrors<CafeFormValues> = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.description) {
    errors.description = 'Required'
  }
  if (!values.location) {
    errors.location = 'Required'
  }
  return errors
}

// Updated RenderField component to handle file inputs
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
// Updated main component
const AddCafeForm = ({ handleSubmit, pristine, submitting }: InjectedFormProps<CafeFormValues>) => {
  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const navigate = useNavigate()

  const onSubmit = (values: CafeFormValues) => {
    // TODO: Implement form submission logic (POST/PUT to API)
    console.log(values)
    setUnsavedChanges(false)
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Cafe
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field name="name" component={RenderField} type="text" label="Name" />
          <Field name="description" component={RenderField} type="text" label="Description" />
          <Field name="logo" component={RenderField} type="file" label="Logo" />
          <Field name="location" component={RenderField} type="text" label="Location" />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={pristine || submitting}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate({ to: '/cafes' })}
            >
              Cancel
            </Button>
          </Box>
          {unsavedChanges && (
            <Typography color="error" sx={{ mt: 2 }}>
              Warning: You have unsaved changes!
            </Typography>
          )}
        </form>
      </Paper>
    </Container>
  )
}

const AddCafePage = () => <AddCafeFormRedux />;

const AddCafeFormRedux = reduxForm({
  form: 'addCafe',
  validate
})(AddCafeForm)

export const Route = createFileRoute('/cafes/add')({
  component: AddCafePage,
})

// Types
interface CafeFormValues {
  name: string
  description: string
  logo: File
  location: string
}