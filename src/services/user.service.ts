import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async create(dto: Partial<IUser>): Promise<IUser> {
    const { name, email, password } = dto;

    if (!name || name.length < 3) {
      throw new ApiError(
        "Name is required and should be at least 3 characters",
        400,
      );
    }
    if (!email || !email.includes("@")) {
      throw new ApiError("Email is required and should be valid", 400);
    }
    if (!password || password.length < 6) {
      throw new ApiError(
        "Password is required and should be at least 6 characters",
        400,
      );
    }
    return await userRepository.create(dto);
  }
  public async getById(id: string): Promise<IUser> {
    return await userRepository.getById(id);
  }

  public async updateById(id: number, dto: IUser): Promise<IUser> {
    return await userRepository.updateById(id, dto);
  }
  public async deleteById(id: number): Promise<void> {
    return await userRepository.deleteById(id);
  }
}

export const userService = new UserService();
