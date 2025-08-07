import type { AxiosRequestConfig } from "axios";

export interface APIRequest extends Omit<AxiosRequestConfig, "data" | "method"> {
  url: string;
  params?: Record<string, any>;
}
export interface APIRequestWithData<D = any> extends APIRequest {
  data?: D;
}