import { AxiosResponse } from "axios";
import { API_ROUTE } from "../const/apiRoute";
import { HandleResponseError } from "./handleError";
import { NotificationExtension } from "@/extension/NotificationExtension";
import { api } from "@/library/axios";

export const getDataCommune = async (query: string): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get(
      `${API_ROUTE.GET_LIST_COMMUNE}?${query}`
    );
    return response.data;
  } catch (error) {
    HandleResponseError(error);
  }
};

export const getDataProvice = async (query: string): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get(
      `${API_ROUTE.GET_LIST_PROVINCE}?${query}`
    );
    return response.data;
  } catch (error) {
    HandleResponseError(error);
  }
};

export const getDataDistrict = async (query: string): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get(
      `${API_ROUTE.GET_LIST_DISTRICT}?${query}`
    );
    return response.data;
  } catch (error) {
    HandleResponseError(error);
  }
};



export const getDataCommuneId = async (query: string): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post(
      `${API_ROUTE.GET_DETAIL_COMMUNE}?${query}`
    );
    return response.data;
  } catch (error) {
    HandleResponseError(error);
  }
};

export const getDataProviceId = async (query: string): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post(
      `${API_ROUTE.GET_DETAIL_PROVINCE}?${query}`
    );
    return response.data;
  } catch (error) {
    HandleResponseError(error);
  }
};

export const getDataDistrictId = async (query: string): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post(
      `${API_ROUTE.GET_DETAIL_DISTRICT}?${query}`
    );
    return response.data;
  } catch (error) {
    HandleResponseError(error);
  }
};