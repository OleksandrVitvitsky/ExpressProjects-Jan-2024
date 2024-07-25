export interface IPost {
  _id?: string;
  content: string;
  _userId: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
