import React from 'react'
import { Field, FormProps, WrappedFieldProps } from 'redux-form'
import { Button, Box, Typography, Container, Paper, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Select, MenuItem } from '@mui/material'
import { ReusableTextbox } from '../shared/Textbox'
import type { CreateEmployeeFormData } from '../../types/Employee'
import { useCafeData } from '../../hooks/useCafeData'
import { GetCafeResponse } from '../../types/Cafe'
import { emailValidation, maxLength10, minLength6, phoneNumberValidation } from '../../utils/inputValidation'

interface EmployeeFormProps extends FormProps<CreateEmployeeFormData, any, any> {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    submitting: boolean;
    onCancel: () => void;
    submitButtonText: string;
    initialValues?: Partial<CreateEmployeeFormData>;
}



const RadioButtonGroup: React.FC<WrappedFieldProps & { label: string }> = ({ input, label, meta, ...rest }) => (
    <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup {...input} {...rest}>
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel value="Female" control={<Radio />} label="Female" />
        </RadioGroup>
    </FormControl>
);

const Dropdown: React.FC<WrappedFieldProps & { label: string, cafes: GetCafeResponse[] }> = ({ input, label, cafes, meta, ...rest }) => (
    <FormControl fullWidth margin="normal">
        <FormLabel>{label}</FormLabel>
        <Select
            {...input}
            {...rest}
            value={input.value || meta.initial || ""}
        >
            {cafes.map(cafe => (
                <MenuItem key={cafe.id} value={cafe.id}>{cafe.name}</MenuItem>
            ))}
        </Select>
    </FormControl>
);
export const EmployeeForm: React.FC<EmployeeFormProps> = (props) => {
    const { data: cafes, isLoading, error } = useCafeData({ location: "" });
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!cafes) return <div>No cafe data found</div>;
    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {props.submitButtonText} Employee
                </Typography>
                <form onSubmit={props.handleSubmit}>
                    <Field
                        name="employeeName"
                        component={ReusableTextbox}
                        label="Name"
                        validate={[minLength6, maxLength10]}
                    />
                    <Field
                        name="employeeEmail"
                        component={ReusableTextbox}
                        label="Email"
                        type="email"
                        validate={[emailValidation]}
                    />
                    <Field
                        name="employeePhoneNumber"
                        component={ReusableTextbox}
                        label="Phone Number"
                        validate={[phoneNumberValidation]}
                    />
                    <Field
                        name="employeeGender"
                        component={RadioButtonGroup}
                        label="Gender"
                    />
                    <Field
                        name="cafeId"
                        component={Dropdown}
                        label="Assigned Café"
                        cafes={cafes} // Add this prop
                    />
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={props.onCancel} disabled={props.submitting}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={props.submitting}
                        >
                            {props.submitButtonText}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};


