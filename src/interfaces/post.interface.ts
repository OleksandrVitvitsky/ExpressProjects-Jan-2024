import { IUser } from "./user.interface";

export interface IPost {
  _id?: string;
  content: string;
  _userId: string | IUser;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
