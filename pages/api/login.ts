import type { NextApiRequest, NextApiResponse } from "next";
import { LoginResponse } from "../../types/api/LoginResponse";
import { SignJWT } from "jose";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) {
  try {
    switch (req.method) {
      case "POST":
        const { code } = req.body;
        if (!code || code.trim().length === 0) {
          res.status(400).json({ status: "BadRequest" });
        }
        const expirationTime = Date.now() + 365 * 24 * 60 * 60 * 1000;
        const token = await new SignJWT({})
          .setProtectedHeader({ alg: "HS256" })
          .setJti("lol")
          .setIssuedAt()
          .setExpirationTime(expirationTime)
          .sign(new TextEncoder().encode(JWT_SECRET_KEY));
        res
          .status(200)
          .json({ status: "Success", data: { token, expirationTime } });
        break;
      default:
        res.status(404).json({ status: "NoEntryPoint" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "InternalError" });
  }
}
