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
    const response = await apiOrigin.get(API_ROUTE.GET_LIST_ORDER + `?${params}`);
    return response.data;
  } catch (error: any) {
    console.error("Lỗi khi lấy danh sách đơn hàng:", error);
    throw error.response?.data || { message: "Không thể lấy danh sách đơn hàng" };
  }
};
