import React, { useEffect } from 'react';
import { TextField, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

interface ReusableTextboxProps {
    name: string;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    minLength?: number;
    maxLength?: number;
    multiline?: boolean;
    rows?: number;
    initialValue?: string;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: theme.palette.primary.light,
            transition: 'border-color 0.3s',
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.dark,
        },
    },
    '& .MuiInputLabel-root': {
        color: theme.palette.text.secondary,
        '&.Mui-focused': {
            color: theme.palette.primary.main,
        },
    },
}));

const CharCount = styled(Typography)(({ theme }) => ({
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
    textAlign: 'right',
    marginTop: '4px',
}));

export const ReusableTextbox: React.FC<ReusableTextboxProps> = ({
    name,
    label,
    onChange,
    error,
    minLength,
    maxLength,
    multiline = false,
    rows = 1,
    initialValue = '',
}) => {
    const [value, setValue] = React.useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        onChange(e);
    };

    return (
        <Box sx={{ mb: 2 }}>
            <StyledTextField
                fullWidth
                name={name}
                label={label}
                value={value}
                onChange={handleChange}
                error={!!error}
                helperText={error}
                variant="outlined"
                multiline={multiline}
                rows={rows}
                inputProps={{
                    minLength,
                    maxLength,
                }}
            />
            {maxLength && (
                <CharCount>
                    {value.length} / {maxLength}
                </CharCount>
            )}
        </Box>
    );
};