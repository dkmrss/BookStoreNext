import { API_ROUTE } from "@/const/apiRoute";
import { NotificationExtension } from "@/extension/NotificationExtension";
import { apiCart } from "@/library/axios";
import { AxiosResponse } from "axios";
import { HandleResponseError } from "./handleError";
import { tblSaleOrder } from "@/model/TblSaleOrder";
import { isNullOrUndefined } from "@/extension/StringExtension";
import { modals } from "@mantine/modals";

export const createSaleOrder = async (data: tblSaleOrder): Promise<any> => {
  try {
    const response: AxiosResponse = await apiCart.post(
      API_ROUTE.CREATE_SALE_ORDER,
      data
    );
    if (!isNullOrUndefined(response) && response?.data?.success) {
      NotificationExtension.Success("Xác nhận đơn hàng thành công");
    } else if (response != null)
      NotificationExtension.Fails("Xác nhận đơn hàng thất bại!");
    return response.data;
  } catch (error) {
    HandleResponseError(error);
  }
};

export const getDataListSaleOder = async (query?: string): Promise<any> => {
  try {
    const response: AxiosResponse = await apiCart.get(
      API_ROUTE.GET_LIST_SALE_ORDER + query
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getDetailStatusSaleOrder = async (query: string): Promise<any> => {
  try {
    const response: AxiosResponse = await apiCart.get(
      API_ROUTE.GET_STATUS_SALE_ORDER + `?${query}`
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const modifySaleOrderPaymentMethod = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await apiCart.post(
      API_ROUTE.MODIFY_SALE_ORDER + data
    );
    if (!isNullOrUndefined(response) && response?.data?.success) {
      NotificationExtension.Success("Xác nhận đơn hàng thành công");
    } else if (response != null)
      NotificationExtension.Fails("Xác nhận đơn hàng thất bại!");
    return response.data;
  } catch (error) {
    HandleResponseError(error);
  }
};

export const cancelSaleOrder = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await apiCart.post(
      API_ROUTE.CUSTOMER_CANCEL_SALE_ORDER,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    if (!isNullOrUndefined(response) && response?.data?.success) {
      NotificationExtension.Success("Huỷ đơn hàng thành công");
      modals.closeAll;
    } else if (response != null)
      NotificationExtension.Fails("Huỷ đơn hàng thất bại");
    return response.data;
  } catch (error) {
    HandleResponseError(error);
  }
};
