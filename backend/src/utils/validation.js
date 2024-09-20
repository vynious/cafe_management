

export function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhoneNumber(phone_number) {
    // Check if the phone number is 8 digits and starts with 8 or 9
    return /^[89][0-9]{7}$/.test(phone_number);
}
