import { Router } from "express";

import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getList);
router.post("/", userController.create);

router.get("/:userId", userController.getById);
router.put(
  "/:userId",
  //commonMiddleware.isIdValid("userId"),
  // TODO add validation middleware for body
  userController.updateById,
);
router.delete(
  "/:carId",
  // commonMiddleware.isIdValid("carId"),
  userController.deleteById,
);

export const UserRouter = router;
