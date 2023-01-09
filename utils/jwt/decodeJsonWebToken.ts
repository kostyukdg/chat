import { jwtVerify } from "jose";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

export async function decodeJsonWebToken<T>(
  token: string
): Promise<T | undefined> {
  const {
    payload: { jti },
  } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET_KEY));
  let data: T | undefined;
  if (jti !== undefined) data = JSON.parse(jti);
  return data;
}
