import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { ApiError } from "./api-error";
import { config } from "./configs/config";
import { UserRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", UserRouter);
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

app.listen(config.port, config.host, async () => {
  await mongoose.connect(config.mongo_url);
  console.log(`Server is running at http://${config.host}:${config.port}`);
});
