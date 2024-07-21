import { Router } from "express";

import { postController } from "../controllers/post.controller";

//import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();

router.get("/", postController.getList);
router.post(
  "/",
  // commonMiddleware.isBodyValid(UserValidator.createUser),
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
