/* eslint-disable prettier/prettier */
export class CustomError extends Error {
    details: string;
    isError = true;
    constructor(title: string, details: string) {
        super(title);
        this.details = details;
    }
}