import { AxiosResponse } from "axios";
import { HandleResponseError } from "./handleError";
import { apiQr } from "@/library/axios";

export const createQrCode = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await apiQr.post(
     "generate",
      data, // Dữ liệu cần gửi
      {
        headers: {
          "Content-Type": "application/json",
          "x-client-id": "e606a78e-11e5-45b2-bf36-2d61e7f4f4b1", // Thay bằng Client ID thực tế
          "x-api-key": "380588be-5632-4243-ae90-f4f864dec38f",    // Thay bằng API Key thực tế
        },
      }
    );
    return response.data;
  } catch (error) {
    HandleResponseError(error);
    return error;
  }
};