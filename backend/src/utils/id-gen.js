import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 7);

export function generateEmployeeId() {
    return `UI${nanoid()}`;
}