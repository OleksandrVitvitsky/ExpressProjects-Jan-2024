export interface IPost {
  _id?: string;
  content: string;
  userId: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
