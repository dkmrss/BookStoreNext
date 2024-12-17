import { API_ROUTE } from "@/const/apiRoute";
import { api } from "@/library/axios";
import { AxiosResponse } from "axios";

export const getHomeSuggestSearch = async (query: string): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get(
      API_ROUTE.GET_HOME_SUGGEST + query
    );
    return response.data;
  } catch (error) {
    // HandleResponseError(error);
    console.log("error", error);
  }
};
