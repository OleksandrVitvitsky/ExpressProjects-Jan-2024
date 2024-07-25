import { NextFunction, Request, Response } from "express";

import { IPost } from "../interfaces/post.interface";
import { postService } from "../services/post.service";

class PostController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await postService.getList();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const post_dto = req.body as IPost;
      const result = await postService.create(post_dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = req.params.postId;
      const result = await postService.getById(postId);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
  public async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = req.params.postId;
      const post_dto = req.body as IPost;
      const result = await postService.updateById(postId, post_dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = req.params.postId;
      await postService.deleteById(postId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}
export const postController = new PostController();
