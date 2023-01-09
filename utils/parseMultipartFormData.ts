import { formidable, Fields, Files } from "formidable";
import { NextApiRequest } from "next";

export interface MultipartFormData {
  fields: Fields;
  files: Files;
}

export function parseMultipartFormData(
  req: NextApiRequest
): Promise<MultipartFormData> {
  const promise = new Promise<MultipartFormData>((resolve, reject) => {
    const form = formidable();
    form.parse(req, (error, fields, files) => {
      if (error) reject(error);
      resolve({ fields, files });
    });
  });
  return promise;
}
