import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await User.find();
  }

  public async create(dto: Partial<IUser>): Promise<IUser> {
    return await User.create(dto);
  }

  public async getById(userId: string): Promise<IUser> {
    return await User.findById(userId);
  }

  //TODO
  public async updateById(userId: number, dto: IUser): Promise<any> {
    return await User.findByIdAndUpdate(userId, dto, {
      returnDocument: "after",
    });
  }

  //TODO
  public async deleteById(userId: number): Promise<void> {
    await User.deleteOne({ _id: userId });
  }
}

export const userRepository = new UserRepository();
