import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as express from 'express';

import HttpException from '../exceptions/HttpException';

function validateMiddleware<T>(
  type: any,
  skipMissingProperties = false
): express.RequestHandler {
  return (req, res, next) => {
    validate(plainToClass(type, req.body), { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors
            .map((errs, validationError) => Object.values(errs.constraints))
            .join(', ');
          next(new HttpException(400, message));
        } else {
          next();
        }
      }
    );
  };
}

export default validateMiddleware;
