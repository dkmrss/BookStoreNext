import { API_ROUTE } from "@/const/apiRoute";
import { api } from "@/library/axios";
import { AxiosResponse } from "axios";
import { HandleResponseError } from "./handleError";
import { NotificationExtension } from "@/extension/NotificationExtension";
import { isNullOrUndefined } from "@/extension/StringExtension";

export const getDataUserReviewDetail = async (id: any): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get(
      `${API_ROUTE.GET_USER_REVIEW_DETAIL}${id}`
    );
    return response.data;
  } catch (error) {
    // HandleResponseError(error);
    console.error("Lỗi khi gọi API:", error);
  }
};

export const createUserReview = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post(
      API_ROUTE.CREATE_USER_REVIEW,
      data
    );
    if (!isNullOrUndefined(response) && response?.data?.success) {
      NotificationExtension.Success(
        "Bạn đã gửi đánh giá thành công. Đánh giá của bạn đang chờ duyệt."
      );
    } else if (response != null)
      NotificationExtension.Fails("Gửi đánh giá thất bại !");
    return response.data;
  } catch (error) {
    HandleResponseError(error);
  }
};
