import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";
import createHttpError from "http-errors";

export const validateBody = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return next(createHttpError(400, "Невалідні дані"));
    }
    res.locals.body = result.data;
    next();
  };
};
