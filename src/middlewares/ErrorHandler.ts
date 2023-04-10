export class CustomError extends Error {
    public status: number;
    public message: string;
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
