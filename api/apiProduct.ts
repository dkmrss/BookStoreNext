import { API_ROUTE } from "@/const/apiRoute";
import { api } from "@/library/axios";
import { AxiosResponse } from "axios";
import { HandleResponseError } from "./handleError";

export const getDataDetailProductByPathName = async (
  query: string
): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get(
      API_ROUTE.GET_DETAIL_PRODUCT_BY_URL + query
    );
    return response.data;
  } catch (error) {
    // HandleResponseError(error);
    console.log("error", error);
  }
};

export const getDataListProductFlashSale = async (
  query?: string
): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get(
      API_ROUTE.GET_LIST_PRODUCT_DEAL + query
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getDataListProductNormal = async (query: string): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get(
      API_ROUTE.GET_LIST_PRODUCT_NORMAL + query
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getDataListProductRelation = async (
  query?: string
): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get(
      API_ROUTE.GET_LIST_PRODUCT_RELATION + query
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getDetailCategory = async (query: string): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get(
      API_ROUTE.GET_DETAIL_CATEGORY + query
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getListBrandSearch = async (query: string): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get(
      API_ROUTE.GET_SEARCH_BRAND + query
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getListAttributeFilter = async (query: string): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get(
      API_ROUTE.GET_LIST_ATTRIBUTE_FILTER + query
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getSearchProduct = async (searchValue: any): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get(
      API_ROUTE.GET_SEARCH_PRODUCT + searchValue
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getDataListProductFull = async (query: string): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get(
      API_ROUTE.GET_LIST_PRODUCT_NORMAL + query
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getDetailProduct = async (query: string): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get(
      API_ROUTE.GET_PRODUCT_DETAIL + query
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

