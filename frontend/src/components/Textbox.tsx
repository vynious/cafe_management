import React, { useEffect, useState } from 'react';
import { TextField, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

interface ReusableTextboxProps {
    input: {
        name: string;
        value: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
    label: string;
    meta: {
        touched: boolean;
        error: string;
    };
    minLength?: number;
    maxLength?: number;
    multiline?: boolean;
    rows?: number;
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
    input,
    label,
    meta: { touched, error },
    minLength,
    maxLength,
    multiline = false,
    rows = 1
}) => {
    return (
        <Box sx={{ mb: 2 }}>
            <StyledTextField
                fullWidth
                {...input}
                label={label}
                error={touched && !!error}
                helperText={touched && error}
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
                    {input.value.length} / {maxLength}
                </CharCount>
            )}
        </Box>
    );
};