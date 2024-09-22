import React from 'react'
import { Field, FormProps } from 'redux-form'
import { Button, Box, Typography, Container, Paper } from '@mui/material'
import { RenderField } from '../RenderField'
import { ReusableTextbox } from '../Textbox'
import type { CreateCafeRequest } from '../../types/Cafe'

interface CafeFormProps extends FormProps<CreateCafeRequest, any, any> {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    submitting: boolean;
    onCancel: () => void;
    submitButtonText: string;
    initialValues?: Partial<CreateCafeRequest>; 
}

export const CafeForm: React.FC<CafeFormProps> = (props) => {

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {props.submitButtonText} Cafe
                </Typography>
                <form onSubmit={props.handleSubmit}>
                    <Field
                        name="name"
                        component={ReusableTextbox}
                        label="Name"
                        minLength={6}
                        maxLength={10}
                    />
                    <Field
                        name="description"
                        component={ReusableTextbox}
                        label="Description"
                        maxLength={256}
                        multiline
                        rows={4}
                    />
                    <Field
                        name="location"
                        component={ReusableTextbox}
                        label="Location"
                    />
                    <Field
                        name="logo"
                        component={RenderField}
                        type="file"
                        label="Logo"
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