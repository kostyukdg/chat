import { BaseResponse } from "./BaseResponse";

export interface LoginResponse extends BaseResponse {
  data?: { token: string; expirationTime: number };
}
