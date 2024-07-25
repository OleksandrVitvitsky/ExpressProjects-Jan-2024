import { NextFunction, Request, Response } from "express";

import { ITokenPayload } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { authService } from "../services/auth.service";

class AuthController {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUser;
      const result = await authService.signUp(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as Partial<IUser>;
      const result = await authService.signIn(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const oldTokensId = req.res.locals.oldTokensId as string;
      const result = await authService.refresh(jwtPayload, oldTokensId);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async signOut(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const tokenId = req.res.locals.tokenId as string;
      const routePath = req.route.path;
      await authService.signOut(jwtPayload, tokenId, routePath);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
