import { Request, Response, NextFunction } from 'express';

// Clase que define el middleware para verificar el ID
export class VerifyIdMiddleware {
  // Método estático para verificar el ID en la solicitud
  public static validate(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response | void {
    // Obtener el nombre del primer parámetro de la ruta
    const paramName = Object.keys(req.params)[0];

    // Verificar si el parámetro está presente
    if (!req.params[paramName]) {
      return res.status(400).json({
        message: `${paramName} Is Required`,
        data: null,
      });
    }

    // Verificar si el parámetro es un número válido
    if (isNaN(parseInt(req.params[paramName]))) {
      return res.status(400).json({
        message: `${paramName} Must Be A Number`,
        data: null,
      });
    }

    // Pasar al siguiente middleware o controlador si todo está bien
    next();
  }
}
