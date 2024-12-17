import { API_ROUTE } from "@/const/apiRoute";
import { api } from "@/library/axios";
import { AxiosResponse } from "axios";
import { HandleResponseError } from "./handleError";
import { isNullOrUndefined } from "@/extension/StringExtension";
import { NotificationExtension } from "@/extension/NotificationExtension";
import { tblCustomerAppointment } from "@/model/TblCustomerAppointment";

export const createCustomerAppointment = async (
  data: tblCustomerAppointment
): Promise<{ success: boolean; data?: any }> => {
  try {
    const response: AxiosResponse = await api.post(
      API_ROUTE.CREATE_CUSTOMER_APPOINTMENT,
      data
    );
    if (!isNullOrUndefined(response) && response?.data?.success) {
      NotificationExtension.Success("Đặt lịch sửa chữa thành công !");
      return { success: true, data: response.data };
    } else if (response != null) {
      NotificationExtension.Fails("Tạo lịch sửa chữa thất bại !");
    }
    return { success: false, data: response?.data };
  } catch (error) {
    HandleResponseError(error);
    return { success: false };
  }
};

export const getListRepairBooking = async (query: string): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get(
      `${API_ROUTE.GET_DATA_REPAIR_BOOKING_LIST}?${query}`
    );
    if (!isNullOrUndefined(response) && response?.data?.success) {
      return response.data;
    } else if (response != null)
      NotificationExtension.Fails("Có lỗi xảy ra khi tải dữ liệu!");
  } catch (error) {
    HandleResponseError(error);
  }
};

export const CancelRepairBooking = async (id: any): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post(
      `${API_ROUTE.CANCEL_REPAIR_BOOKING}`,
      id
    );
    if (!isNullOrUndefined(response) && response?.data?.success) {
      return response.data;
    } else if (response != null)
      NotificationExtension.Fails("Có lỗi xảy ra khi tải dữ liệu!");
  } catch (error) {
    HandleResponseError(error);
  }
};
