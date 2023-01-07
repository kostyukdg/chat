import { Status } from "./Status";

export interface BaseResponse {
  status: Status;
  data?: { [key: string]: any };
}
