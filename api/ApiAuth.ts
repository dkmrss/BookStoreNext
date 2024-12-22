import { AxiosResponse } from "axios";
import { apiOrigin } from "@/library/axios"; // Axios instance được cấu hình
import { API_ROUTE } from "@/const/apiRoute"; // Đường dẫn API
import { HandleResponseError } from "./handleError"; // Hàm xử lý lỗi


export const login = async (data: {
  email: string;
  password: string;
}): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.post(
      API_ROUTE.LOGIN, 
      data
    );
    return response.data; 
  } catch (error) {
    HandleResponseError(error); // Hàm xử lý lỗi chung
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};





