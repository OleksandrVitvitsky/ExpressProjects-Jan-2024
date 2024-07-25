import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { ApiError } from "./api-error";
import { configs } from "./configs/configs";
import { authRouter } from "./routers/auth.router";
import { postRouter } from "./routers/post.router";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);

app.use(
  "*",
  (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    return res.status(err.status || 500).json(err.message);
  },
);
process.on("uncaughtException", (error) => {
  console.error("uncaughtException: ", error);
  process.exit(1);
});

app.listen(configs.port, configs.host, async () => {
  await mongoose.connect(configs.mongo_url);
  console.log(`Server is running at http://${configs.host}:${configs.port}`);
});
