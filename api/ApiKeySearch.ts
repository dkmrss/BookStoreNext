import { API_ROUTE } from "@/const/apiRoute";
import { apiOrigin } from "@/library/axios";
import { AxiosResponse } from "axios";
import { HandleResponseError } from "./handleError";

export const getDataListKeySearch = async (
  query: string
): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.get(
      API_ROUTE.GET_KEY_SEARCH + query
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const deleteKeyword = async (id: number) => {
  const response = await apiOrigin.delete(`${API_ROUTE.DELETE_KEYWORD}/${id}`);
  return response.data;
};