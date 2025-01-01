import axios, { AxiosResponse, AxiosError } from "axios";
import {  BASE_API_URL_CART, BASE_API_URL_ORIGIN } from "@/config";
// import AuthService from "@/api/login/auth.service";

const createApiInstance = (baseURL: string) => {
  const api = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      // Xử lý lỗi mạng hoặc lỗi từ server ở đây
      console.error("API request failed:", error);

      if (error?.response?.status == 401) {
        //loi 401 thi call lại api refresh tại đây
        const originalRequest = error?.config;
        if (error?.response?.status == 401 && localStorage.getItem("jwt")) {
          // const userName = localStorage.getItem("userName") || "{}";
          // const refreshToken = localStorage.getItem("refreshToken") || "{}";
          // const id = localStorage.getItem("id") || "{}";
          // const dataRefresh = await AuthService.refreshToken({
          //   userName: userName,
          //   refreshToken: refreshToken,
          //   id: id,
          // });
          // //console.log("dataRefresh", dataRefresh);
          // originalRequest.headers.Authorization = `Bearer ${dataRefresh?.data?.jwt}`;
          return axios(originalRequest);
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
};


const apiCart = createApiInstance(BASE_API_URL_CART || "");
const apiOrigin = createApiInstance(BASE_API_URL_ORIGIN || "");
export {  apiCart, apiOrigin };
