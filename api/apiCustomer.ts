import axios, { AxiosRequestConfig } from "axios";
import { API_ROUTE } from "@/const/apiRoute";
import { api } from "@/library/axios";
import { AxiosResponse } from "axios";
import { HandleResponseError } from "./handleError";
import { NotificationExtension } from "@/extension/NotificationExtension";
import { tblCustomerEdit } from "@/model/TblCustomer";
import { FormOrderBuyerInfo } from "@/model/TblSaleOrder";
import { modals } from "@mantine/modals";
import AuthService from "@/api/login/auth.service";

export const createCustomer = async (data: any): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Thêm token JWT vào tiêu đề Authorization
      },
    };
    const response: AxiosResponse = await api.post(
      API_ROUTE.CREATE_USER_CUSTOMER,
      data,
      config
    );
    return response.data;
  } catch (error) {
    //không thể gọi hàm HandleResponseError để show thông báo lỗi trên server
    console.log("error", error);
    // HandleResponseError(error);
  }
};

export const createCustomerWithOutToken = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post(
      API_ROUTE.CREATE_USER_CUSTOMER_WITH_OUT_TOKEN,
      data
    );
    modals.closeAll();
    return response.data;
  } catch (error: any) {
    //không thể gọi hàm HandleResponseError để show thông báo lỗi trên server
    // HandleResponseError(error);
    return error.response.data;
    // HandleResponseError(error);
  }
};

export const createCustomerWithOutTokenPhone = async (
  data: any
): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post(
      API_ROUTE.CREATE_USER_CUSTOMER_WITH_OUT_TOKEN,
      data
    );

    return response.data;
  } catch (error: any) {
    //không thể gọi hàm HandleResponseError để show thông báo lỗi trên server
    console.log("error", error);
    // HandleResponseError(error);
  }
};

export const getCustomerInfo = async (): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Thêm token JWT vào tiêu đề Authorization
      },
    };

    const response: AxiosResponse = await api.get(
      API_ROUTE.CUSTOMER_INFO,
      config
    );
    return response.data;
  } catch (error: any) {
    console.log("error", error);
  }
};

export const getCustomerInfoByUserName = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post(
      API_ROUTE.CUSTOMER_INFO_BY_USER_NAME + data
    );
    return response.data;
  } catch (error: any) {
    HandleResponseError(error);
  }
};

export const modifyCustomer = async (data: tblCustomerEdit): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post(
      API_ROUTE.MODIFY_CUSTOMER,
      data
    );
    NotificationExtension.Success("Sửa thông tin thành công");
    return response.data;
  } catch (error) {
    HandleResponseError(error);
  }
};

export const createCustomerSite = async (
  data: FormOrderBuyerInfo
): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post(
      API_ROUTE.CREATE_USER_CUSTOMER_SITE,
      data
    );
    NotificationExtension.Success("Thêm thông tin thành công");
    return response.data;
  } catch (error) {
    HandleResponseError(error);
  }
};

export const deleteCustomerSite = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post(
      API_ROUTE.DELETE_CUSTOMER_SITE,
      data
    );
    NotificationExtension.Success("Xoá thông tin thành công");
    return response.data;
  } catch (error) {
    HandleResponseError(error);
  }
};

export const editCustomerSite = async (
  data: FormOrderBuyerInfo
): Promise<any> => {
  try {
    const response: AxiosResponse = await api.put(
      API_ROUTE.MODIFY_CUSTOMER_SITE,
      data
    );
    NotificationExtension.Success("Cập nhật thông tin thành công");
    return response.data;
  } catch (error) {
    HandleResponseError(error);
  }
};
