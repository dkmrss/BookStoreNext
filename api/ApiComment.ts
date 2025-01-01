import { API_ROUTE } from "@/const/apiRoute";
import { apiOrigin } from "@/library/axios";
import { AxiosResponse } from "axios";
import { HandleResponseError } from "./handleError";

export const getDataListComment = async (
  query: any
): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.get(
      API_ROUTE.GET_LIST_COMMENT + query
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const createComment = async (data: {
  user_id: number;
  book_id: number;
  content: string;
}): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.post(
      API_ROUTE.CREATE_COMMENT,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw HandleResponseError(error);
  }
};

export const deleteComment = async (comment_id: number): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.delete(
      `${API_ROUTE.DELETE_COMMENT}/${comment_id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw HandleResponseError(error);
  }
};