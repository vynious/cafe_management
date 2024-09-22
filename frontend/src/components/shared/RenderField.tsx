import React, { useState } from 'react'
import { WrappedFieldProps } from 'redux-form'
import { Button, Box, Typography } from '@mui/material'

interface RenderFieldProps extends WrappedFieldProps {
    label: string;
    type: string;
}

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB


export const RenderField: React.FC<RenderFieldProps> = ({
    input,
    label,
    type,
    meta: { touched, error }
}) => {
    const [preview, setPreview] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                alert(`File size should not exceed ${MAX_FILE_SIZE / 1024 / 1024} MB.`);
                return;
            }
            input.onChange(file); 
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
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
        );
    }

    return null;
};
