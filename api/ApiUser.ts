import { API_ROUTE } from "@/const/apiRoute";
import { apiOrigin } from "@/library/axios";
import { AxiosResponse } from "axios";
import { HandleResponseError } from "./handleError";

export const getDataUser= async (
  query: string
): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.get(
      API_ROUTE.GET_INFO_USER + query
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const registerUser = async (userData: FormData): Promise<any> => {
  
  try {
    const response: AxiosResponse = await apiOrigin.post( API_ROUTE.CREATE_USER, userData,{
      headers: {
        "Content-Type": "multipart/form-data", // Để Axios tự xử lý
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
export const updateUser = async (userID: number, userData: FormData): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.put(
      `${API_ROUTE.UPDATE_USER}/${userID}`, // Đường dẫn endpoint cập nhật
      userData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Xử lý FormData
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};