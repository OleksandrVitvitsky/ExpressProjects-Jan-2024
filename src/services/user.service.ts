//import { randomUUID } from "crypto";
import { UploadedFile } from "express-fileupload";

import { FileItemTypeEnum } from "../enums/file-item-type.enum";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { s3Service } from "./s3.service";

class UserService {
  public async getList(query: any): Promise<IUser[]> {
    return await userRepository.getList(query);
  }

  public async getById(userId: string): Promise<IUser> {
    return await userRepository.getById(userId);
  }

  public async getMe(userId: string): Promise<IUser> {
    return await userRepository.getById(userId);
  }

  public async updateMe(userId: string, dto: IUser): Promise<IUser> {
    return await userRepository.updateById(userId, dto);
  }

  public async deleteMe(userId: string): Promise<void> {
    await userRepository.deleteById(userId);
  }

  public async uploadAvatar(
    userId: string,
    file: UploadedFile,
  ): Promise<IUser> {
    const user = await userRepository.getById(userId);

    const avatar = await s3Service.uploadFile(
      FileItemTypeEnum.USER,
      userId,
      file,
    );
    const updatedUser = await userRepository.updateById(userId, {
      avatar,
    });

    if (user.avatar) {
      await s3Service.deleteFile(user.avatar);
    }

    return updatedUser;
  }

  public async deleteAvatar(userId: string): Promise<IUser> {
    const user = await userRepository.getById(userId);
    const updatedUser = await userRepository.updateById(userId, {
      avatar: null,
    });
    if (user.avatar) {
      await s3Service.deleteFile(user.avatar);
    }
    return updatedUser;
  }
}

export const userService = new UserService();
