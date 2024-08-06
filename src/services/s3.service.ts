import path from "node:path";

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { UploadedFile } from "express-fileupload";

import { configs } from "../configs/configs";
import { FileItemTypeEnum } from "../enums/file-item-type.enum";
import { ApiError } from "../errors/api-error";

class S3Service {
  constructor(
    private readonly s3Client = new S3Client({
      // forcePathStyle: true,
      // endpoint: configs.AWS_S3_ENDPOINT, // вказується,Якщо якогось не хоче завантажуватись в хмару.

      region: configs.AWS_S3_REGION,
      credentials: {
        accessKeyId: configs.AWS_S3_ACCESS_KEY,
        secretAccessKey: configs.AWS_S3_SECRET_KEY,
      },
    }),
  ) {}

  public async uploadFile(
    itemType: FileItemTypeEnum,
    itemId: string,
    file: UploadedFile,
  ): Promise<string> {
    try {
      const filePath = `${itemType}/${itemId}/${randomUUID()}${path.extname(file.name)}`;
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: configs.AWS_S3_BUCKET_NAME,
          Key: filePath,
          Body: file.data,
          ACL: configs.AWS_S3_ACL, //ACL: "public-read",
          ContentType: file.mimetype,
        }),
      );
      return filePath;
    } catch (err) {
      throw new ApiError(
        "Something went wrong while uploading file to S3: " + err.message,
        500,
      );
    }
  }

  public async deleteFile(filePath: string): Promise<void> {
    try {
      const bucketName = configs.AWS_S3_BUCKET_NAME;
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: bucketName,
          Key: filePath, // вказується не повний шлях до файлу, без ендпоінта і бакета
        }),
      );
    } catch (err) {
      //console.log(err.message);
      throw new ApiError(
        "Something went wrong while uploading file to S3: " + err.message,
        500,
      );
    }
  }
}

export const s3Service = new S3Service();
