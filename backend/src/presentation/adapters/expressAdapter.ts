import { Request, Response, NextFunction } from "express";
import { IController } from "../../app/providers/controller/IController";

export function expressAdapter(controller: IController) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller.handle(req, res);
    } catch (err) {
      next(err);
    }
  };
}
