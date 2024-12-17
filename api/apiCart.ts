import { API_ROUTE } from "@/const/apiRoute";
import { apiCart } from "@/library/axios";
import { AxiosResponse } from "axios";
import { HandleResponseError } from "./handleError";
import { NotificationExtension } from "@/extension/NotificationExtension";

export const getCartProduct = async (id: string): Promise<any> => {
  try {
    const response: AxiosResponse = await apiCart.get(
      `${API_ROUTE.GET_LIST_CART_PRODUCT}?CustomerId=${id}`
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const createCartProduct = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await apiCart.post(
      API_ROUTE.CREATE_CART_PRODUCT,
      data
    );

    // data?.tblShoppingCartDetailCommand?.map((item: any) =>
    //   postLoggingAction({
    //     userName: localStorage.getItem("userName"),
    //     actionType: "AddedToCartProduct",
    //     actionDetail: `[${item?.itemId}] ${item?.itemName}`,
    //   })
    // );

    NotificationExtension.Success("Thêm vào giỏ hàng thành công");
    return response.data;
  } catch (error) {
    HandleResponseError(error);
  }
};

export const deleteCartProduct = async (
  idList: any,
  listItem: any
): Promise<any> => {
  try {
    const response: AxiosResponse = await apiCart.post(
      API_ROUTE.DELETE_CART_PRODUCT,
      idList
    );
    // listItem.map((item: any) => {
    //   postLoggingAction({
    //     userName: localStorage.getItem("userName"),
    //     actionType: "RemovedFromCartProduct",
    //     actionDetail: `[${item?.id}] ${item?.itemName}`,
    //   });
    // });
    NotificationExtension.Success("Xóa sản phẩm thành công");
    return response.data;
  } catch (error) {
    HandleResponseError(error);
  }
};

export const totalCartPrice = async (id: any): Promise<any> => {
  try {
    const response: AxiosResponse = await apiCart.get(
      `${API_ROUTE.GET_TOTAL_CART_PRODUCT}?CustomerId=${id}`
    );
    return response.data;
  } catch (error) {
    HandleResponseError(error);
  }
};
