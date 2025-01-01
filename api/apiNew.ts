import { API_ROUTE } from "@/const/apiRoute";
import { apiOrigin } from "@/library/axios";
import { AxiosResponse } from "axios";
import { HandleResponseError } from "./handleError";

export const getDataListNews = async (
  query: string
): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.get(
      API_ROUTE.GET_LIST_NEWS + query
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getDataListNewsAdmin = async (
  query: string
): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.get(
      API_ROUTE.GET_LIST_NEWS_ADMIN + query
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getDetailNew = async (
    query: string
  ): Promise<any> => {
    try {
      const response: AxiosResponse = await apiOrigin.get(
        API_ROUTE.GET_NEW_DETAIL + query
      );
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  };



  export const getNewsDetail = async (id: number): Promise<any> => {
    try {
      const response: AxiosResponse = await apiOrigin.get(
        `${API_ROUTE.GET_NEWS_DETAIL}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching news detail:", error);
    }
  };
  
  export const createNews = async (data: any): Promise<any> => {
    try {
      const response: AxiosResponse = await apiOrigin.post(
        `${API_ROUTE.CREATE_NEWS}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating news:", error);
    }
  };
  
  export const updateNews = async (id: number, data: any): Promise<any> => {
    try {
      const response: AxiosResponse = await apiOrigin.put(
        `${API_ROUTE.UPDATE_NEWS}/${id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating news:", error);
    }
  };
  
  export const deleteNews = async (id: number): Promise<any> => {
    try {
      const response: AxiosResponse = await apiOrigin.delete(
        `${API_ROUTE.DELETE_NEWS}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };
  
  export const updateStatusNews = async (id: number): Promise<any> => {
    try {
      const response: AxiosResponse = await apiOrigin.put(
        `${API_ROUTE.UPDATE_STATUS_NEWS}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error updating news status:", error);
    }
  };
  
  export const updateTrashNews = async (id: number): Promise<any> => {
    try {
      const response: AxiosResponse = await apiOrigin.put(
        `${API_ROUTE.UPDATE_TRASH_NEWS}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error updating news trash:", error);
    }
  };