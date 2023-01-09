import { BaseResponse } from "./BaseResponse";
import { Status } from "./Status";

export interface LoginResponse extends Omit<BaseResponse, "status"> {
  status: Status | "InvalidCredentials";
  data?: { token: string; expirationTime: number };
}
