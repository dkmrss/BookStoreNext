import { API_ROUTE } from "@/const/apiRoute";
import { NotificationExtension } from "@/extension/NotificationExtension";
import { api } from "@/library/axios";
import { AxiosResponse } from "axios";
import { HandleResponseError } from "./handleError";

export const getDataUserCommentDetail = async (id: any): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get(
      `${API_ROUTE.GET_USER_COMMENT_DETAIL}${id}`
    );
    return response.data;
  } catch (error) {
    // HandleResponseError(error);
    console.error("Lỗi khi gọi API:", error);
  }
};

export const createUserComment = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post(
      API_ROUTE.CREATE_USER_COMMENT,
      data
    );
    NotificationExtension.Success(
      "Bạn đã gửi thành công. Bình luận của bạn đang chờ duyệt. Chúng tôi sẽ phản hồi sớm"
    );
    return response.data;
  } catch (error) {
    HandleResponseError(error);
  }
};

export const getDataUserComment = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get(
      `${API_ROUTE.GET_LIST_USER_COMMENT}`
    );
    return response.data;
  } catch (error) {
    HandleResponseError(error);
  }
};

export const createUserCommentReply = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post(
      API_ROUTE.CREATE_USER_COMMENT_REPLY,
      data
    );
    NotificationExtension.Success(
      "Bạn đã gửi thành công. Bình luận của bạn đang chờ duyệt. Chúng tôi sẽ phản hồi sớm"
    );
    return response.data;
  } catch (error) {
    HandleResponseError(error);
  }
};
