import { API_ROUTE } from "@/const/apiRoute";
import { apiOrigin } from "@/library/axios";
import { AxiosResponse } from "axios";
import { HandleResponseError } from "./handleError";
import { NotificationExtension } from "@/extension/NotificationExtension";

export const addToCart = async (
    userId: number,
    productId: number,
    quantity: number
  ): Promise<any> => {
    try {
      // Gửi dữ liệu qua POST request
      const response: AxiosResponse = await apiOrigin.post(API_ROUTE.ADD_CART, {
        userId,
        productId,
        quantity,
      });
      NotificationExtension.Success("Thêm vào giỏ hàng thành công");
      // Trả về dữ liệu từ response
      return response.data;
    } catch (error: any) {
        HandleResponseError(error);
    }
  };
  export const getCartUser = async (
    userId: string,
  ): Promise<any> => {
    try {
      // Gửi dữ liệu qua POST request
      const response: AxiosResponse = await apiOrigin.get(API_ROUTE.VIEW_CART + userId, {
        
        
      });
      // Trả về dữ liệu từ response
      return response.data;
    } catch (error: any) {
        HandleResponseError(error);
    }
  };


  export const deleteCartProduct = async (userId: number, productId: number): Promise<any> => {
    try {
      const response = await apiOrigin.delete(`/cart/delete`, {
        params: { userId, productId },
      });
      return response.data;
    } catch (error: any) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      throw error.response?.data || { message: "Không thể xóa sản phẩm" };
    }
  };

  export const clearCart = async (userId: number): Promise<any> => {
    try {
      const response = await apiOrigin.delete(`/cart/clear`, {
        params: { userId },
      });
      return response.data;
    } catch (error: any) {
      console.error("Lỗi khi xóa toàn bộ giỏ hàng:", error);
      throw error.response?.data || { message: "Không thể xóa toàn bộ giỏ hàng" };
    }
  };
  export const updateCartQuantity = async (
    userId: number,
    productId: number,
    quantity: number
  ): Promise<any> => {
    try {
      const response = await apiOrigin.put(`/cart`, {
        userId,
        productId,
        quantity,
      });
      return response.data;
    } catch (error: any) {
      console.error("Lỗi khi cập nhật số lượng sản phẩm:", error);
      throw error.response?.data || { message: "Không thể cập nhật số lượng sản phẩm" };
    }
  };