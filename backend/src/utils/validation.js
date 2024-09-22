
// validation on the backend for input sansitization

export function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhoneNumber(phone_number) {
    return /^[89][0-9]{7}$/.test(phone_number);
}
