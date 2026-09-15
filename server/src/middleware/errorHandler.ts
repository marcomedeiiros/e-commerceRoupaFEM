import { Request, Response, NextFunction } from 'express';

interface ErrorWithStatus extends Error {
  status?: number;
}

export function errorHandler(
  err: ErrorWithStatus,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = err.status ?? 500;
  const message = err.message ?? 'Erro interno do servidor.';

  if (process.env.NODE_ENV !== 'production') {
    console.error(`[ERROR] ${status} - ${message}`);
    if (err.stack) console.error(err.stack);
  }

  res.status(status).json({
    success: false,
    error: message,
  });
}
