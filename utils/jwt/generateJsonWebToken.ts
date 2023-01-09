import { SignJWT } from "jose";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

export async function generateJsonWebToken<T>(
  data: T,
  expirationDate: Date
): Promise<string> {
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setJti(JSON.stringify(data))
    .setIssuedAt()
    .setExpirationTime(expirationDate.getTime())
    .sign(new TextEncoder().encode(JWT_SECRET_KEY));
  return token;
}
