import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 7);

// generate employee Id with "UIXXXXXXXX"
export function generateEmployeeId() {
    return `UI${nanoid()}`;
}