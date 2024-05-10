import { NextFunction, Request, Response } from "express";
import { HttpError } from "../exceptions/Error";

export const errorMiddleware = (
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.statusCode).json({
    message: error.message,
    errors: error.errors,
  });
};
