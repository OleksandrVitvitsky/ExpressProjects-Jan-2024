import fs from "node:fs/promises";
import path from "node:path";

import { IUser } from "../interfaces/user.interface";

const filePath = path.join(process.cwd(), "db.json");

class UserRepository {
  private async reader(): Promise<IUser[]> {
    return JSON.parse(await fs.readFile(filePath, "utf8"));
  }

  private async writer(users: IUser[]): Promise<void> {
    await fs.writeFile(filePath, JSON.stringify(users));
  }

  public async getList(): Promise<IUser[]> {
    return await this.reader();
  }

  public async create(dto: Partial<IUser>): Promise<IUser> {
    const users: IUser[] = await this.reader();
    const newUser: IUser = {
      id: users[users.length - 1].id + 1,
      first_name: dto.first_name,
      last_name: dto.last_name,
      login: dto.login,
      phone: dto.phone,
      age: dto.age,
      password: dto.password,
      email: dto.email,
    };
    users.push(newUser);

    await this.writer(users);
    return newUser;
  }

  public async getById(id: number): Promise<IUser> {
    const users: IUser[] = await this.reader();
    return users.find((user) => user.id === id);
  }
  public async updateById(id: number, dto: Partial<IUser>): Promise<IUser> {
    const users: IUser[] = await this.reader();
    const index: number = users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error("User not found");
    }
    users[index] = {
      ...users[index],
      ...dto,
    };
    await this.writer(users);
    return users[index];
  }

  public async deleteById(id: number): Promise<void> {
    const users: IUser[] = await this.reader();
    const index: number = users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error("User not found");
    }
    users.splice(index, 1);
    await this.writer(users);
  }
}

export const userRepository = new UserRepository();
