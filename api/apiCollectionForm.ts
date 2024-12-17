import { API_ROUTE } from "@/const/apiRoute";
import { NotificationExtension } from "@/extension/NotificationExtension";
import { apiCart } from "@/library/axios";
import { AxiosResponse } from "axios";
import { HandleResponseError } from "./handleError";
import { isNullOrUndefined } from "@/extension/StringExtension";

export const createCollectionForm = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await apiCart.post(
      API_ROUTE.CREATE_COLLECTION_FORM,
      data
    );
    if (!isNullOrUndefined(response) && response?.data?.success) {
      NotificationExtension.Success("Gửi đơn đăng ký thành công");
      return response?.data?.success;
    } else if (response != null)
      NotificationExtension.Fails("Gửi đơn đăng ký thất bại!");
    return response.data;
  } catch (error) {
    HandleResponseError(error);
  }
};
