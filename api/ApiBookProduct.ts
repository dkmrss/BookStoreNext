import { API_ROUTE } from "@/const/apiRoute";
import { apiOrigin } from "@/library/axios";
import { AxiosResponse } from "axios";
import { HandleResponseError } from "./handleError";

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

  export const getDetailBook = async (
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

  export const getDetailBookInfo = async (
    query: string
  ): Promise<any> => {
    try {
      const response: AxiosResponse = await apiOrigin.get(
        API_ROUTE.GET_DETAIL_PRODUCT_INFO + query
      );
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  };