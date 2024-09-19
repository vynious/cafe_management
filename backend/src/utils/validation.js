

export function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhoneNumber(phone_number) {
    return /^[0-9]{10}$/.test(phone_number);
}
