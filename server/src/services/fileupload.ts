import { v4 } from "uuid";
import { Readable } from "stream";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME || "cloudname",
  api_key: process.env.CLOUDINARY_APIKEY || "123456789012345",
  api_secret:
    process.env.CLOUDINARY_APISECRET || "abcdeghijklmnopqrstuvwxyzABCD",
});

export async function upload(fileName: string, fileBuffer: Buffer) {
  const stream = new Readable();
  stream.push(fileBuffer);
  stream.push(null);
  const promise = new Promise<UploadApiResponse | undefined>(
    (resolve, reject) => {
      const cloudStream = cloudinary.uploader.upload_stream(
        { public_id: fileName, resource_type: "raw" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      stream.pipe(cloudStream);
    }
  );
  const res = await promise;
  return res?.secure_url;
}
