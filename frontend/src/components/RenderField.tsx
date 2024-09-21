import React, {useState} from 'react'
import { WrappedFieldProps } from 'redux-form'
import { TextField, Button, Box, Typography } from '@mui/material'

interface RenderFieldProps extends WrappedFieldProps {
    label: string;
    type: string;
}

export const RenderField: React.FC<RenderFieldProps> = ({ input, label, type, meta: { touched, error } }) => {
    const [preview, setPreview] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (typeof input.onChange === 'function') {
            const file = e.target.files?.[0];
            if (file) {
                input.onChange(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result as string);
                };
                reader.readAsDataURL(file);
            }
        }
        // Add any additional onChange logic here if needed
    };

    if (type === 'file') {
        return (
            <Box sx={{ mt: 2, mb: 2 }}>
                <input
                    {...input}
                    type={type}
                    accept="image/*"
                    style={{ display: 'none' }}
                    id={input.name}
                    onChange={handleChange}
                    value=""
                />
                <label htmlFor={input.name}>
                    <Button variant="contained" component="span">
                        {preview ? 'Replace' : 'Upload'} {label}
                    </Button>
                </label>
                {preview && (
                    <Box sx={{ mt: 2 }}>
                        <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                    </Box>
                )}
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