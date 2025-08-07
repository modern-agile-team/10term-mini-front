import { publicAxios, privateAxios } from "@/apis/axios";
import type { APIRequest, APIRequestWithData } from "@/types/api";
import type { AxiosInstance } from "axios";

function makeClient(instance: AxiosInstance) {
  const getAPI = async <R>(options: APIRequest): Promise<R> => {
    const res = await instance<R>({
      method: "GET",
      ...options,
    });
    return res.data;
  };

  const postAPI = async <R, D = any>(
    options: APIRequestWithData<D>
  ): Promise<R> => {
    const res = await instance<R>({
      method: "POST",
      ...options,
    });
    return res.data;
  };

  return { getAPI, postAPI };
}

export const publicAPI = makeClient(publicAxios);   // 토큰 불필요
export const privateAPI = makeClient(privateAxios); // 토큰 자동 주입