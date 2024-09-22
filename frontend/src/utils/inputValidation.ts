export const minLength6 = (value: string) =>
    value && value.length < 6 ? 'Must be at least 6 characters' : undefined;

export const maxLength10 = (value: string) =>
    value && value.length > 10 ? 'Must be 10 characters or less' : undefined;

export const emailValidation = (value: string) => {
    if (!value) {
        return 'Email is required';
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(value) ? undefined : 'Invalid email address';
};

export const phoneNumberValidation = (value: string) => {
    if (!value) {
        return 'Phone number is required';
    }
    // regex for SG phone number (starts with 8 or 9 and has 8 digits)
    const sgPhoneRegex = /^[89]\d{7}$/;
    return sgPhoneRegex.test(value) ? undefined : 'Invalid Singapore phone number';
};

