import { Router } from "express";

import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getList);
router.post("/", userController.create);

router.get("/:userId", userController.getById);
router.put("/:userId", userController.updateById);


router.patch("/:userId", userController.updateById);
router.delete("/:userId", userController.deleteById);
export const UserRouter = router;
