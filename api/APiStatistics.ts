import { apiOrigin } from "@/library/axios";

export const getMonthlyRevenue = async () => {
  const response = await apiOrigin.get("/statistics/monthly-revenue");
  return response.data;
};

export const getDailyRevenue = async () => {
  const response = await apiOrigin.get("/statistics/daily-revenue");
  return response.data;
};

export const getTotalProductsSold = async () => {
  const response = await apiOrigin.get("/statistics/total-products-sold");
  return response.data;
};

export const getOrderCountByStatus = async () => {
  const response = await apiOrigin.get("/statistics/order-count-by-status");
  return response.data;
};

export const getBestSellingBooks = async (limit: number) => {
  const response = await apiOrigin.get(`/statistics/best-selling-books?limit=${limit}`);
  return response.data;
};

export const getTopKeywords = async (limit: number) => {
  const response = await apiOrigin.get(`/statistics/top-keywords?limit=${limit}`);
  return response.data;
};
