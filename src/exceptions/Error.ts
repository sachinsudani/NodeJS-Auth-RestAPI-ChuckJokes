export class HttpError extends Error {
  message: string;
  statusCode: StatusCode;
  errors: any;

  constructor(message: string, statusCode: StatusCode, errors?: any) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export enum StatusCode {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

export class BadRequestError extends HttpError {
  constructor(message: string, errors?: any) {
    super(message, StatusCode.BAD_REQUEST, errors);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string, errors?: any) {
    super(message, StatusCode.UNAUTHORIZED, errors);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string, errors?: any) {
    super(message, StatusCode.FORBIDDEN, errors);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string, errors?: any) {
    super(message, StatusCode.NOT_FOUND, errors);
  }
}

export class ConflictError extends HttpError {
  constructor(message: string, errors?: any) {
    super(message, StatusCode.CONFLICT, errors);
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string, errors?: any) {
    super(message, StatusCode.INTERNAL_SERVER_ERROR, errors);
  }
}
