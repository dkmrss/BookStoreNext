import { apiOrigin } from "@/library/axios";
import { API_ROUTE } from "@/const/apiRoute";
import { NotificationExtension } from "@/extension/NotificationExtension";
/**
 * Tạo đơn hàng mới
 * @param orderData - Dữ liệu đơn hàng
 * @returns Kết quả API
 */
export const createOrder = async (orderData: any): Promise<any> => {
  try {
    const response = await apiOrigin.post(API_ROUTE.CREATE_ORDER, orderData);
    NotificationExtension.Success("Tạo đơn hàng thành công")
    return response.data;
    
    
  } catch (error: any) {
   
    NotificationExtension.Fails("Không thể tạo đơn hàng");
  }
};

/**
 * Lấy danh sách đơn hàng
 * @param params - Các tham số cho truy vấn danh sách đơn hàng
 * @returns Kết quả API
 */
export const getOrders = async (params: string): Promise<any> => {
  try {
    const response = await apiOrigin.get(API_ROUTE.GET_LIST_ORDER + params);
    return response.data;
  } catch (error: any) {
    console.error("Lỗi khi lấy danh sách đơn hàng:", error);
    throw error.response?.data || { message: "Không thể lấy danh sách đơn hàng" };
  }
};

export const getOrderDetails = async (orderId: number): Promise<any> => {
  try {
    const response = await apiOrigin.get(`${API_ROUTE.GET_ORDER_DETAILS}/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    return null;
  }
};

export const deleteOrder = async (orderId: number): Promise<any> => {
  try {
    const response = await apiOrigin.delete(
      `${API_ROUTE.DELETE_ORDER}/${orderId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

 export const updateOrderStatus = async (id: number, data: any): Promise<any> => {
    try {
      const response = await apiOrigin.put(
        `${API_ROUTE.UPDATE_ORDER}/${id}`,
        data
        
      );
      return response.data;
    } catch (error) {
      console.error("Error updating news:", error);
    }
  };

  export const cancelOrder = async (id: number, data: any): Promise<any> => {
    try {
      const response = await apiOrigin.put(
        `${API_ROUTE.CANCEL_ORDER}/${id}`,
        data
        
      );
      return response.data;
    } catch (error) {
      console.error("Error updating news:", error);
    }
  };