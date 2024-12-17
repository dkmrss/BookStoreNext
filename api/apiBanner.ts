import { API_ROUTE } from "@/const/apiRoute";
import { apiOrigin } from "@/library/axios";
import { AxiosResponse } from "axios";
import { HandleResponseError } from "./handleError";

export const getDataListBanner = async (
  query: string
): Promise<any> => {
  try {
    const response: AxiosResponse = await apiOrigin.get(
      API_ROUTE.GET_LIST_NEWS_BANNER + query
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};
