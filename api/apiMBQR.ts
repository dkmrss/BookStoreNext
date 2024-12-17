import { AxiosResponse } from "axios";
import { API_ROUTE } from "../const/apiRoute";
import { HandleResponseError } from "./handleError";
import { NotificationExtension } from "@/extension/NotificationExtension";
import { apiCart } from "@/library/axios";

export const createQrCode = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await apiCart.post(
      API_ROUTE.CREATE_QR_CODE,
      data
    );
    return response.data;
  } catch (error) {
    HandleResponseError(error);
    return error;
  }
};

export const editQrCode = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await apiCart.post(
      API_ROUTE.EDIT_QR_CODE,
      data
    );
    return response.data;
  } catch (error) {
    HandleResponseError(error);
  }
};

export const deleteQrCode = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await apiCart.post(
      API_ROUTE.DELETE_QR_CODE,
      data
    );
    return response.data;
  } catch (error) {
    HandleResponseError(error);
  }
};

export const getAllQrCode = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await apiCart.get(
      API_ROUTE.GET_ALL_QR_CODE
    );
    return response.data;
  } catch (error) {
    HandleResponseError(error);
  }
};

export const getDetailsQrCodePayment = async (data: string): Promise<any> => {
  try {
    const response: AxiosResponse = await apiCart.post(
      API_ROUTE.GET_DETAILS_QR_CODE_PAYMENT + data
    );

    return response.data;
  } catch (error) {
    HandleResponseError(error);
  }
};
