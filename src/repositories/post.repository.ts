import { IPost } from "../interfaces/post.interface";
import { Post } from "../models/post.model";

class PostRepository {
  public async getByParams(params: Partial<IPost>): Promise<IPost> {
    return await Post.findOne(params);
  }

  public async getList(): Promise<IPost[]> {
    return await Post.find();
  }

  public async create(post_dto: IPost): Promise<IPost> {
    return await Post.create(post_dto);
  }

  public async getById(postId: string): Promise<IPost> {
    return await Post.findById(postId);
  }

  public async updateById(
    postId: string,
    post_dto: Partial<IPost>,
  ): Promise<IPost> {
    return await Post.findByIdAndUpdate(postId, post_dto, {
      returnDocument: "after",
    });
  }

  public async deleteById(postId: string): Promise<void> {
    // await Post.deleteOne({ _id: postId });
    //встановити IsDeleted = true
    const post = await Post.findById(postId);
    post.isDeleted = true;
    await post.save();
  }
}

export const postRepository = new PostRepository();
