import { userRepository } from "../repositories/user.repository";
import { IUser } from "../interfaces/user.interface";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async create(dto: Partial<IUser>): Promise<IUser> {
    return await userRepository.create(dto);
  }
  public async getById(id: number): Promise<IUser> {
    return await userRepository.getById(id);
  }
  public async updateById(id: number, dto: Partial<IUser>): Promise<IUser> {
    return await userRepository.updateById(id, dto);
  }
  public async deleteById(id: number): Promise<void> {
    return await userRepository.deleteById(id);
  }
}

export const userService = new UserService();
