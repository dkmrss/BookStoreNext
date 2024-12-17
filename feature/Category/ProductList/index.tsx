"use client";
import imageNull from "@/assets/noValue.png";
import ProductCard from "@/common/ProductCard";
import { Box, Pagination } from "@mantine/core";
import Image from "next/image";
import { useEffect, useState } from "react";
import style from "./productList.module.scss";
import { TblItem } from "@/model/ProductList";

interface ProductProps {
  data: TblItem[];
  itemsPerPage: number;
}
const ProductList: React.FC<ProductProps> = ({ data, itemsPerPage }) => {
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const totalPage = Math.ceil(data.length / itemsPerPage);
    setTotalPages(totalPage);
  }, []);

  return (
    <div style={{ padding: "10px 0px" }}>
      {data.length === 0 ? (
        <div className={style.noValue}>
          <Image src={imageNull} alt="" />
          <div>
            <p>Để tìm được kết quả chính xác hơn, bạn vui lòng:</p>
            <div className={style.customList}>
              Kiểm tra lỗi chính tả của từ khóa đã nhập
            </div>
            <div className={style.customList}>Thử lại bằng từ khóa khác</div>
            <div className={style.customList}>
              Thử lại bằng những từ khóa tổng quát hơn
            </div>
            <div className={style.customList}>
              Thử lại bằng những từ khóa ngắn gọn hơn
            </div>
          </div>
        </div>
      ) : (
        <>
          <Box className={style.productListBox}>
            {data
              ?.slice(
                (currentPage - 1) * itemsPerPage,
                itemsPerPage * currentPage
              )
              ?.map((item: any, index: number) => {
                return (
                  <div className={style.product} key={index}>
                    <ProductCard data={item} />
                  </div>
                );
              })}
          </Box>
        </>
      )}
    </div>
  );
};

export default ProductList;
