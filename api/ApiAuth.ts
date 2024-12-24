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

export const changePassword = async (
  userId: number,
  oldPassword: string,
  newPassword: string
): Promise<any> => {
  try {
    const response = await apiOrigin.post(API_ROUTE.CHANGE_PASSWORD, {
      userId,
      oldPassword,
      newPassword,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error changing password:", error);
    throw error.response?.data || { message: "Đổi mật khẩu thất bại" };
  }
};



