import { NextFunction, Request, Response } from "express";
import {
  BadRequestError,
  HttpError,
  InternalServerError,
} from "./src/exceptions/Error";
import { ZodError } from "zod";

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      let exception: HttpError;
      if (error instanceof HttpError) {
        exception = error;
      } else {
        if (error instanceof ZodError) {
          exception = new BadRequestError(error.name, error.errors);
        } else {
          exception = new InternalServerError(error.name, error.message);
        }
      }
      next(exception);
    }
  };
};
