import { API_ROUTE } from "@/const/apiRoute";
import { apiOrigin } from "@/library/axios";
import { AxiosResponse } from "axios";
import { HandleResponseError } from "./handleError";

export const getDataListNews = async (
  query: string
): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.get(
      API_ROUTE.GET_LIST_NEWS + query
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getDetailNew = async (
    query: string
  ): Promise<any> => {
    try {
      const response: AxiosResponse = await apiOrigin.get(
        API_ROUTE.GET_NEW_DETAIL + query
      );
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  };

