import type { NextApiRequest, NextApiResponse } from "next";
import { renameSync } from "fs";
import { extname } from "path";
import { parseMultipartFormData } from "../../utils/parseMultipartFormData";

interface Data {
  status: "Success" | "Error";
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const UPLOAD_DIR = process.env.UPLOAD_DIR || "./public/uploads";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    switch (req.method) {
      case "POST":
        let message: string | null = null;
        let attachmentFileName: string | null = null;
        const {
          fields: { message: messageField },
          files: { attachment },
        } = await parseMultipartFormData(req);
        if (messageField) {
          if (Array.isArray(messageField))
            throw new Error("Multiple fields with same name");
          message = messageField.trim() || null;
        }
        if (attachment) {
          if (Array.isArray(attachment))
            throw new Error("Multiple fields with same name");
          if (!attachment.originalFilename)
            throw new Error("No originalFilename");
          const extension = extname(attachment.originalFilename);
          attachmentFileName = `${attachment.newFilename}${extension}`;
          renameSync(
            attachment.filepath,
            `${UPLOAD_DIR.replace(/\/$/, "")}/${attachmentFileName}`
          );
        }
        if (!message && !attachmentFileName) throw new Error("No form data");
        console.log(message, attachmentFileName);
        res.status(200).json({ status: "Success" });
        break;
      default:
        res.status(404).json({ status: "Error" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error" });
  }
}
