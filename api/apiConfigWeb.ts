import { AxiosResponse } from "axios";
import { API_ROUTE } from "../const/apiRoute";
import { HandleResponseError } from "./handleError";
import { NotificationExtension } from "@/extension/NotificationExtension";
import { api } from "@/library/axios";

export const getDataConfigWeb = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post(
      `${API_ROUTE.CONFIG_WEB}`
    );
    return response.data;
  } catch (error) {
    HandleResponseError(error);
  }
};
