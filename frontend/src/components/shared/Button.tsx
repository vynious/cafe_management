import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

interface ButtonProps extends MuiButtonProps {}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <MuiButton
            variant="contained"
            size="small"
            {...props}
        >
            {children}
        </MuiButton>
    );
};

export default Button;