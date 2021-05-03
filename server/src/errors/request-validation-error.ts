import {ValidationError} from 'express-validator';
import {CustomError, ErrorResponse} from "./custom-error";

export class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(private errors: ValidationError[]) {
        super('Invalid request parameters');
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors(): ErrorResponse[] {
        return this.errors.map(err => (
            {
                message: err.msg,
                field: err.param
            }
        ));
    }
}