import { configs } from "../configs/configs";
import { IUser } from "../interfaces/user.interface";

export class UserPresenter {
  public static toResponse(data: IUser) {
    return {
      _id: data._id,
      name: data.name,
      age: data.age,
      email: data.email,
      phone: data.phone,
      avatar: data.avatar
        ? `${configs.AWS_S3_ENDPOINT}/${data.avatar}`
        : data.avatar,
      role: data.role,
      isVerified: data.isVerified,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
