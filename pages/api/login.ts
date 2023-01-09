import type { NextApiRequest, NextApiResponse } from "next";
import { LoginResponse } from "../../types/api/LoginResponse";
import { generateJsonWebToken } from "../../utils/jwt/generateJsonWebToken";
import { UserJsonWebToken } from "../../types/UserJsonWebToken";
import prisma from "../../prisma";
import { getPasswordHash } from "../../utils/getPasswordHash";

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
        const passwordHash = getPasswordHash(code);
        const user = await prisma.user.findUnique({
          where: { password: passwordHash },
        });
        if (!user) {
          res.status(200).json({ status: "InvalidCredentials" });
        } else {
          const expirationDate = new Date(
            Date.now() + 365 * 24 * 60 * 60 * 1000
          );
          const token = await generateJsonWebToken<UserJsonWebToken>(
            { userId: user.id },
            expirationDate
          );
          res.status(200).json({
            status: "Success",
            data: { token, expirationTime: expirationDate.getTime() },
          });
        }
        break;
      default:
        res.status(404).json({ status: "NoEntryPoint" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "InternalError" });
  }
}
