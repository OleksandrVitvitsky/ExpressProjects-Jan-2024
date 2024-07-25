import joi from "joi";

export class PostValidator {
  private static content = joi.string().min(20).max(1500).trim();

  public static createPost = joi.object({
    content: this.content.required(),
  });

  // public static updateUser = joi.object({
  //   name: this.name,
  //   age: this.age,
  //   email: this.email,
  //   phone: this.phone,
  // });
  //
  // public static login = joi.object({
  //   email: this.email.required(),
  //   password: this.password.required(),
  // });
}
