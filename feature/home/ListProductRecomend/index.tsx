"use client";

import { useEffect, useState } from "react";
import ProductCarousel from "@/common/CarouselProductCard";
import HeaderSection from "@/components/HeaderSection";
import { TblProduct } from "@/model/TblBook";
// Replace with your actual API call
import { notifications } from "@mantine/notifications";
import { getRecommendedProducts } from "@/api/ApiBookProduct";

const ListProductRecomend = () => {
  const title = "Đề xuất dựa trên đơn hàng của bạn";
  const [recommendedProducts, setRecommendedProducts] = useState<TblProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasUser, setHasUser] = useState<boolean>(true);

  const fetchRecommendedProducts = async (userId: number) => {
    try {
      const response = await getRecommendedProducts(`?userId=${userId}&limit=12&offset=0`); // Replace with your API call
      if (response.success && response.data) {
        setRecommendedProducts(response.data);
      } else {
        setRecommendedProducts([]);
      }
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm đề xuất:", error);
      notifications.show({
        message: "Không thể tải sản phẩm đề xuất.",
        color: "red",
      });
      setRecommendedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    const idUser = user ? JSON.parse(user).id : null; // Parse user and get ID
    if (idUser) {
      fetchRecommendedProducts(idUser);
    } else {
      setHasUser(false);
      setLoading(false);
    }
  }, []);

  if (!hasUser || (!loading && recommendedProducts.length === 0)) {
    return <div></div>;
  }

  return (
    <div style={{ padding: "10px 0px" }}>
      <HeaderSection title={title} />
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <ProductCarousel data={recommendedProducts} rows={1} />
      )}
    </div>
  );
};

export default ListProductRecomend;
