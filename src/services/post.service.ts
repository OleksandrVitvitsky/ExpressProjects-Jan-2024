import { IPost } from "../interfaces/post.interface";
import { postRepository } from "../repositories/post.repository";

class PostService {
  public async getList(): Promise<IPost[]> {
    return await postRepository.getList();
  }

  public async create(post_dto: IPost): Promise<IPost> {
    return await postRepository.create(post_dto);
  }

  public async getById(postId: string): Promise<IPost> {
    return await postRepository.getById(postId);
  }

  public async updateById(
    postId: string,
    post_dto: Partial<IPost>,
  ): Promise<IPost> {
    return await postRepository.updateById(postId, post_dto);
  }

  public async deleteById(postId: string): Promise<void> {
    await postRepository.deleteById(postId);
  }
}

export const postService = new PostService();
