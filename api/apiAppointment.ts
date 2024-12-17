import { API_ROUTE } from "@/const/apiRoute";
import { NotificationExtension } from "@/extension/NotificationExtension";
import { isNullOrUndefined } from "@/extension/StringExtension";
import { api } from "@/library/axios";
import { TblAppointment } from "@/model/TblAppointment";
import { AxiosResponse } from "axios";
import { HandleResponseError } from "./handleError";

export const createAppointment = async (
  data: TblAppointment
): Promise<{ success: boolean; data?: any }> => {
  try {
    const response: AxiosResponse = await api.post(
      API_ROUTE.CREATE_APPOINTMENT,
      data
    );
    if (!isNullOrUndefined(response) && response?.data?.success) {
      NotificationExtension.Success("Đăng ký lịch bảo hành thành công !");
      return { success: true, data: response.data };
    } else if (response != null) {
      NotificationExtension.Fails("Đăng ký lịch bảo hành thất bại !");
    }
    return { success: false, data: response?.data };
  } catch (error) {
    HandleResponseError(error);
    return { success: false };
  }
};

export const getListGuaranteeBooking = async (query: string): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get(
      `${API_ROUTE.GET_DATA_GUARANTEE_LIST}?${query}`
    );
    if (!isNullOrUndefined(response) && response?.data?.success) {
      return response.data;
    } else if (response != null)
      NotificationExtension.Fails("Có lỗi xảy ra khi tải dữ liệu!");
  } catch (error) {
    HandleResponseError(error);
  }
};

export const CancelGuaranteeBooking = async (id: any): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post(
      `${API_ROUTE.CANCEL_GUARANTEE_BOOKING}`,
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
