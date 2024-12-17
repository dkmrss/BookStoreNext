import { API_ROUTE } from "@/const/apiRoute";
import { api } from "@/library/axios";
import { AxiosResponse } from "axios";
import { HandleResponseError } from "./handleError";
import { isNullOrUndefined } from "@/extension/StringExtension";
import { NotificationExtension } from "@/extension/NotificationExtension";

export const getListArticle = async (query: string): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get(
      `${API_ROUTE.GET_LIST_ARTICLE}?${query}`
    );
    if (!isNullOrUndefined(response) && response?.data?.success) {
      return response.data;
    } else if (response != null)
      NotificationExtension.Fails("Có lỗi xảy ra khi tải dữ liệu!");
  } catch (error) {
    HandleResponseError(error);
  }
};

export const getDataDetailNew = async (query: string): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post(
      API_ROUTE.GET_ARTICLE_DETAIL + query
    );
    return response.data;
  } catch (error) {
    HandleResponseError(error);
  }
};

export const getListArticleCategory = async (query: string): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get(
      `${API_ROUTE.GET_LIST_ARTICLE_CATEGORY}?Active=true${query}`
    );
    if (!isNullOrUndefined(response) && response?.data?.success) {
      return response.data;
    } else if (response != null)
      NotificationExtension.Fails("Có lỗi xảy ra khi tải dữ liệu!");
  } catch (error) {
    HandleResponseError(error);
  }
};
