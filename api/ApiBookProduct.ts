import { API_ROUTE } from "@/const/apiRoute";
import { apiOrigin } from "@/library/axios";
import { AxiosResponse } from "axios";
import { HandleResponseError } from "./handleError";
import { NotificationExtension } from "@/extension/NotificationExtension";

export const getDataListProductBookNormal = async (
  query: string
): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.get(
      API_ROUTE.GET_LIST_PRODUCT + query
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getProductDetail = async (
  query: string
): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.get(
      API_ROUTE.GET_DETAIL_PRODUCT + query
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getDataListProductBookSale = async (
    query: string
  ): Promise<any> => {
    try {
      const response: AxiosResponse = await apiOrigin.get(
        API_ROUTE.GET_LIST_PRODUCT_SALE + query
      );
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  };

  export const getDataListProductBookCategory = async (
    query: string
  ): Promise<any> => {
    try {
      const response: AxiosResponse = await apiOrigin.get(
        API_ROUTE.GET_LIST_PRODUCT_CATEGORY + query
      );
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  };

  export const getSearchProduct = async (
    query: string
  ): Promise<any> => {
    try {
      const response: AxiosResponse = await apiOrigin.get(
        API_ROUTE.GET_LIST_SEARCH + query
      );
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  };

  export const getSearchKeyProduct = async (
    query: string
  ): Promise<any> => {
    try {
      const response: AxiosResponse = await apiOrigin.get(
        API_ROUTE.GET_LIST_SEARCHKEY + query
      );
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  };

  export const getRecommendedProducts = async (
    query: string
  ): Promise<any> => {
    try {
      const response: AxiosResponse = await apiOrigin.get(
        API_ROUTE.GET_LIST_RECOMMEND + query
      );
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  };


  export const updateStatus = async (id: number): Promise<any> => {
    try {
      const response: AxiosResponse = await apiOrigin.put(
        `${API_ROUTE.UPDATE_STATUS}/${id}`
      );
      // NotificationExtension.Success('Cập nhật trạng thái thành công.');
      return response.data;
    } catch (error) {
      // NotificationExtension.Fails('Cập nhật trạng thái thất bại.');
      console.error('error', error);
    }
  };

  export const updateTrash = async (id: number): Promise<any> => {
    try {
      const response: AxiosResponse = await apiOrigin.put(
        `${API_ROUTE.UPDATE_TRASH}/${id}`
      );
      // NotificationExtension.Success('Cập nhật trạng thái thùng rác thành công.');
      return response.data;
    } catch (error) {
      // NotificationExtension.Fails('Cập nhật trạng thái thùng rác thất bại.');
      console.error('error', error);
    }
  };

  export const updateBook = async (id: number, data: any): Promise<any> => {
    try {
      const response: AxiosResponse = await apiOrigin.put(
        `${API_ROUTE.UPDATE_BOOK_PRODUCT}/${id}`,
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

  export const createBook = async (data: any): Promise<any> => {
    try {
      const response: AxiosResponse = await apiOrigin.post(
        `${API_ROUTE.CREATE_BOOK_PRODUCT}`,
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

  export const deleteBook = async (id: number): Promise<any> => {
    try {
      const response: AxiosResponse = await apiOrigin.delete(
        `${API_ROUTE.DELETE_BOOK}/${id}`
      );
     
      return response.data;
    } catch (error) {
      console.error("error", error);
     
    }
  };