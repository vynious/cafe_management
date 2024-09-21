import React from 'react'
import { Field, FormProps } from 'redux-form'
import { Button, Box, Typography, Container, Paper } from '@mui/material'
import { RenderField } from './RenderField'
import { ReusableTextbox } from './Textbox'
import type { CreateCafeRequest } from '../types/Cafe'

interface CafeFormProps extends FormProps<CreateCafeRequest, {}, string> {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    submitting: boolean;
    onCancel: () => void;
    onFieldChange: (field: keyof CreateCafeRequest, value: any) => void;
    submitButtonText: string;
    initialValues: any
}

const MAX_FILE_SIZE = 2 * 1024 * 1024

const renderReusableTextbox = ({
    input,
    label,
    meta,
    ...custom
}: {
    input: any;
    label: string;
    meta: { touched: boolean; error: string };
    [key: string]: any;
}) => (
    <ReusableTextbox
        {...input}
        {...custom}
        label={label}
        error={meta.touched && meta.error}
        helperText={meta.touched && meta.error}
    />
)

export const CafeForm: React.FC<CafeFormProps> = ({
    handleSubmit,
    submitting,
    onCancel,
    onFieldChange,
    submitButtonText,
    initialValues,
}) => {
    const handleChange = (field: keyof CreateCafeRequest) => (e: React.ChangeEvent<HTMLInputElement>) => {
        let value;
        console.log(e)
        if (field === 'logo' && e instanceof File) {
            const file = e;
            if (file && file.size <= MAX_FILE_SIZE) {
                value = file;
            } else {
                alert('File size exceeds the limit of 2MB.');
                return;
            }
        } else {
            value = e.target.value;
        }
        onFieldChange(field, value);
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {submitButtonText} Cafe
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Field
                        name="name"
                        component={renderReusableTextbox}
                        label="Name"
                        minLength={6}
                        maxLength={10}
                        initialValue={initialValues?.name}
                    />
                    <Field
                        name="description"
                        component={renderReusableTextbox}
                        label="Description"
                        maxLength={256}
                        multiline
                        rows={4}
                        initialValue={initialValues?.description}

                    />
                    <Field
                        name="location"
                        component={renderReusableTextbox}
                        label="Location"
                        initialValue={initialValues?.location}

                    />
                    <Field
                        name="logo"
                        component={RenderField}
                        type="file"
                        label="Logo"
                        onChange={handleChange('logo')}
                        initialValue={initialValues?.logo}

                    />
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={onCancel} disabled={submitting}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={submitting}
                        >
                            {submitButtonText}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};