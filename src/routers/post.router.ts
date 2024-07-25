import { Router } from "express";

import { postController } from "../controllers/post.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { PostValidator } from "../validators/post.validator";

const router = Router();

router.get("/", postController.getList);
router.post(
  "/",
  commonMiddleware.isBodyValid(PostValidator.createPost),
  commonMiddleware.isIdValid("_userId"),
  postController.create,
);

router.get(
  "/:postId",
  //commonMiddleware.isIdValid("userId"),
  postController.getById,
);
router.put(
  "/:postId",
  //  commonMiddleware.isIdValid("userId"),
  //commonMiddleware.isBodyValid(UserValidator.updateUser),
  postController.updateById,
);
router.delete(
  "/:postId",
  //commonMiddleware.isIdValid("userId"),
  postController.deleteById,
);

export const postRouter = router;
