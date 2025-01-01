import { API_ROUTE } from "@/const/apiRoute";
import { apiOrigin } from "@/library/axios";
import { AxiosResponse } from "axios";
import { HandleResponseError } from "./handleError";

export const getDataListCategory = async (
  query: string
): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.get(
      API_ROUTE.GET_LIST_CATEGORY + query
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getDataListCategoryAdmin = async (
  query: string
): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.get(
      API_ROUTE.GET_LIST_CATEGORY_ADMIN + query
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getDataInfoCategory = async (
  query: string
): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.get(
      API_ROUTE.GET_CATEGORY_INFO + query
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};


export const updateStatusCategory = async (id: number): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.put(
      `${API_ROUTE.UPDATE_STATUS_CATEGORY}/${id}`
    );
    // NotificationExtension.Success('Cập nhật trạng thái thành công.');
    return response.data;
  } catch (error) {
    // NotificationExtension.Fails('Cập nhật trạng thái thất bại.');
    console.error('error', error);
  }
};

export const updateTrashCategory = async (id: number): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.put(
      `${API_ROUTE.UPDATE_TRASH_CATEGORY}/${id}`
    );
    // NotificationExtension.Success('Cập nhật trạng thái thùng rác thành công.');
    return response.data;
  } catch (error) {
    // NotificationExtension.Fails('Cập nhật trạng thái thùng rác thất bại.');
    console.error('error', error);
  }
};

export const updateCategory = async (id: number, data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.put(
      `${API_ROUTE.UPDATE_CATEGORY}/${id}`,
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

export const createCategory = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.post(
      `${API_ROUTE.CREATE_CATEGORY}`,
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

export const deleteCategory = async (id: number): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.delete(
      `${API_ROUTE.DELETE_CATEGORY}/${id}`
    );
   
    return response.data;
  } catch (error) {
    console.error("error", error);
   
  }
};