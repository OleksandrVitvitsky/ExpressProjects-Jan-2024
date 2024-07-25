import { FilterQuery } from "mongoose";

import { IToken } from "../interfaces/token.interface";
import { Token } from "../models/token.model";

class TokenRepository {
  public async create(dto: IToken): Promise<IToken> {
    return await Token.create(dto);
  }

  public async findByParams(params: FilterQuery<IToken>): Promise<IToken> {
    return await Token.findOne(params);
  }

  // public async deleteById(id: string): Promise<void> {
  //   await Token.deleteOne({ _id: id });
  // }
  // public async deleteById(id: string, field: string): Promise<void> {
  //   await Token.deleteOne({ [field]: id });
  // }

  public async deleteByParams(
    params: FilterQuery<IToken>,
    path: string,
  ): Promise<void> {
    if (path === "/logout-all") {
      await Token.deleteMany(params);
    } else {
      await Token.deleteOne(params);
    }
  }
}

export const tokenRepository = new TokenRepository();
