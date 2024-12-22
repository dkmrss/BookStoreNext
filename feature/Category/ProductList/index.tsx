"use client";
import imageNull from "@/assets/noValue.png";
import ProductCard from "@/common/ProductCard";
import { Box, Select } from "@mantine/core"; // Import Select từ Mantine
import Image from "next/image";
import { useEffect, useState } from "react";
import style from "./productList.module.scss";
import { TblProduct } from "@/model/TblBook";

interface ProductProps {
  data: TblProduct[];
}

const ProductList: React.FC<ProductProps> = ({ data }) => {
  const [sortedData, setSortedData] = useState<TblProduct[]>(data); // State lưu danh sách sản phẩm sau khi sắp xếp
  const [priceSortOrder, setPriceSortOrder] = useState<string | null>("asc"); // Bộ lọc giá
  const [timeSortOrder, setTimeSortOrder] = useState<string | null>("date-desc"); // Bộ lọc thời gian

  // Hàm tính giá sau khi giảm
  const calculateFinalPrice = (price: number, saleprice: number) => {
    return price - (price * saleprice) / 100;
  };

  // Xử lý sắp xếp khi thay đổi bộ lọc
  useEffect(() => {
    const sorted = [...data].sort((a, b) => {
      // Lọc theo giá
      if (priceSortOrder === "asc") {
        return (
          calculateFinalPrice(a.price, a.saleprice) -
          calculateFinalPrice(b.price, b.saleprice)
        );
      } else if (priceSortOrder === "desc") {
        return (
          calculateFinalPrice(b.price, b.saleprice) -
          calculateFinalPrice(a.price, a.saleprice)
        );
      }

      // Lọc theo thời gian
      if (timeSortOrder === "date-asc") {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else if (timeSortOrder === "date-desc") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }

      return 0; // Không sắp xếp
    });
    setSortedData(sorted);
  }, [priceSortOrder, timeSortOrder, data]);

  return (
    <div style={{ padding: "10px 0px" }}>
      {/* Dropdown chọn sắp xếp theo giá */}
      <div style={{ marginBottom: "16px" }}>
        <Select
          label="Lọc theo giá"
          placeholder="Chọn thứ tự"
          data={[
            { value: "asc", label: "Giá tăng dần" },
            { value: "desc", label: "Giá giảm dần" },
          ]}
          value={priceSortOrder}
          onChange={setPriceSortOrder}
          style={{ maxWidth: "200px", marginBottom: "8px" }}
        />
      </div>

      {/* Dropdown chọn sắp xếp theo thời gian */}
      <div style={{ marginBottom: "16px" }}>
        <Select
          label="Lọc theo thời gian"
          placeholder="Chọn thứ tự"
          data={[
            { value: "date-asc", label: "Cũ nhất" },
            { value: "date-desc", label: "Mới nhất" },
          ]}
          value={timeSortOrder}
          onChange={setTimeSortOrder}
          style={{ maxWidth: "200px", marginBottom: "8px" }}
        />
      </div>

      {/* Kiểm tra nếu không có sản phẩm */}
      {data.length === 0 ? (
        <div className={style.noValue}>
          <Image src={imageNull} alt="" />
          <div>
            <p>Xin lỗi, danh mục bạn chọn hiện giờ chưa có sản phẩm nào</p>
          </div>
        </div>
      ) : (
        <>
          <Box className={style.productListBox}>
            {sortedData.map((item: TblProduct, index: number) => (
              <div className={style.product} key={index}>
                <ProductCard data={item} />
              </div>
            ))}
          </Box>
        </>
      )}
    </div>
  );
};

export default ProductList;
