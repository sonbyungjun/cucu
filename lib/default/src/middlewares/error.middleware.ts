import { NextFunction, Request, Response } from 'express';

function errorMiddleware(error: any, req: Request, res: Response, next: NextFunction) {
  console.error('[ERROR] ', error);

  const err = {
    status: error.status || 404,
    message: error.message || error.original || error.error.toString(),
  };

  if (error && error.error && error.error.isJoi) {
    err.status = 202;
  }

  res.status(err.status).json(err);
}

export default errorMiddleware;
