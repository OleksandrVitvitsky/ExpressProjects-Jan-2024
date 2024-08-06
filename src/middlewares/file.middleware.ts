import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { avatarFileConfig } from "../constants/file-type.constant";
import { ApiError } from "../errors/api-error";

class FilesMiddleware {
  public async isAvatarValid(req: Request, res: Response, next: NextFunction) {
    try {
      const avatar = req.files?.avatar as UploadedFile;
      if (!avatar) {
        throw new ApiError("Invalid file ", 400);
      }
      if (Array.isArray(avatar)) {
        throw new ApiError("File must be not array", 400);
      }
      if (!avatarFileConfig.MIMETYPE.includes(avatar.mimetype)) {
        throw new ApiError("Invalid format file", 400);
      }
      if (avatarFileConfig.MAX_SIZE < avatar.size) {
        throw new ApiError("This file is too large", 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const filesMiddleware = new FilesMiddleware();
