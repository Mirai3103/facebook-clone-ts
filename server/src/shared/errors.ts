import HttpStatusCodes from 'http-status-codes';


export abstract class CustomError extends Error {
    public Mgs = "";

    public readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

    constructor(msg: string, httpStatus: number) {
        super(msg);
        this.Mgs = msg;
        this.HttpStatus = httpStatus;
    }
}


export class BadRequestError extends CustomError {


    public static readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

    constructor(mgs: string) {
        super(mgs, BadRequestError.HttpStatus);
    }
}


export class NotFoundError extends CustomError {

    public static readonly HttpStatus = HttpStatusCodes.NOT_FOUND;

    constructor(mgs: string) {
        super(mgs, NotFoundError.HttpStatus);
    }
}


export class UnauthorizedError extends CustomError {

    public static readonly Msg = 'Login failed';
    public static readonly HttpStatus = HttpStatusCodes.UNAUTHORIZED;

    constructor(mgs: string) {
        super(mgs, UnauthorizedError.HttpStatus);
    }
}

export class ForbiddenError extends CustomError {

    public static readonly Msg = 'Forbidden';
    public static readonly HttpStatus = HttpStatusCodes.FORBIDDEN;

    constructor(mgs: string) {
        super(mgs, ForbiddenError.HttpStatus);
    }
}
