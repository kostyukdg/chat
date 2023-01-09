import { createHash } from "crypto";

export function getPasswordHash(password: string): string {
  return createHash("sha256").update(password).digest("base64");
}
