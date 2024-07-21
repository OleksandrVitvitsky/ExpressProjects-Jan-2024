import mongoose from "mongoose";

import { IPost } from "../interfaces/post.interface";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    content: { type: String, required: true },
    userId: { type: String, required: true },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Post = mongoose.model<IPost>("posts", postSchema);
