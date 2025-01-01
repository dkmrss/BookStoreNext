import { API_ROUTE } from "@/const/apiRoute";
import { apiOrigin } from "@/library/axios";
import { AxiosResponse } from "axios";
import { HandleResponseError } from "./handleError";
import { NotificationExtension } from "@/extension/NotificationExtension";

export const getDetailBookInfo = async (query: string): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.get(
      API_ROUTE.GET_DETAIL_PRODUCT_INFO + query
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getDetailBookAll = async (query: string): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.get(
      API_ROUTE.GET_DETAIL_PRODUCT_INFO_ALL + query
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const createBookInfo = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.post(
      API_ROUTE.CREATE_BOOK_INFO,
      data,
      {
      headers: {
        "Content-Type": "multipart/form-data", // Để Axios tự xử lý
      },}
    );
   
    return response.data;
  } catch (error) {
    console.error("error", error);
    
  }
};

// Sửa thông tin sách
export const updateBookInfo = async (id: number, data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.put(
      `${API_ROUTE.UPDATE_BOOK_INFO}/${id}`,
      data,
      {
      headers: {
        "Content-Type": "multipart/form-data", // Để Axios tự xử lý
      },}
    );
   
    return response.data;
  } catch (error) {
    console.error("error", error);
  
  }
};

// Xóa thông tin sách
export const deleteBookInfo = async (id: number): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.delete(
      `${API_ROUTE.DELETE_BOOK_INFO}/${id}`
    );
   
    return response.data;
  } catch (error) {
    console.error("error", error);
   
  }
};

// Cập nhật trạng thái Trash
export const updateTrash = async (id: number, trash: number): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.put(
      `${API_ROUTE.UPDATE_BOOK_INFO_TRASH}/${id}`,
      { trash }
    );
   
    return response.data;
  } catch (error) {
    console.error("error", error);
    
  }
};

// Cập nhật loại sách (Type)
export const updateType = async (id: number): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.put(
      `${API_ROUTE.UPDATE_TYPE}/${id}`
    );
   
    return response.data;
  } catch (error) {
    console.error("error", error);
   
  }
};
