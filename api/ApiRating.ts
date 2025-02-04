import { API_ROUTE } from "@/const/apiRoute";
import { apiOrigin } from "@/library/axios";
import { AxiosResponse } from "axios";
import { HandleResponseError } from "./handleError";

export const getDataListRating= async (
  query: any
): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.get(
      API_ROUTE.GET_LIST_RATING + query
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const createRating = async (data: {
  user_id: number;
  product_id: number;
  comment: string;
  rating: number;
}): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.post(
      API_ROUTE.CREATE_RATING,
      data
    );
    return response.data;
  } catch (error) {

    throw HandleResponseError(error);
  }
};

export const deleteRating = async (rating_id: number): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.delete(
      `${API_ROUTE.DELETE_RATING}/${rating_id}`
    );
    return response.data;
  } catch (error) {
    
    throw HandleResponseError(error);
  }
};