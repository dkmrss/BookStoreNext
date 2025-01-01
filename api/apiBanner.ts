import { API_ROUTE } from "@/const/apiRoute";
import { apiOrigin } from "@/library/axios";
import { AxiosResponse } from "axios";
import { HandleResponseError } from "./handleError";

export const getDataListBanner = async (
  query: string
): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.get(
      API_ROUTE.GET_LIST_NEWS_BANNER + query
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getDataListBannerAdmin = async (
  query: string
): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.get(
      API_ROUTE.GET_LIST_BANNER_ADMIN + query
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const updateBannerStatus = async (id: number): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.put(
      `${API_ROUTE.UPDATE_STATUS_BANNER}/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error updating banner status:", error);
  }
};

export const updateTrashBanner = async (id: number): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.put(
      `${API_ROUTE.UPDATE_TRASH_BANNER}/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error updating banner trash:", error);
  }
};

export const deleteBanner = async (id: number): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.delete(
      `${API_ROUTE.DELETE_BANNER}/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting banner:", error);
  }
};

export const createBanner = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.post(
      `${API_ROUTE.CREATE_BANNER}`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating banner:", error);
  }
};

export const updateBanner = async (id: number, data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.put(
      `${API_ROUTE.UPDATE_BANNER}/${id}`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating banner:", error);
  }
};