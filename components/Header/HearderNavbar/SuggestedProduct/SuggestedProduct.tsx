"use client";
import { Box } from "@mantine/core";
import React from "react";
import style from "./SuggestedProduct.module.scss";

const SuggestedProduct = ({
  setIsFocus,
}: {
  setIsFocus: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dataProduct = [
    {
      id: 1,
      text: "Pin chính hãng Pisen",
      image:
        "https://image.dienthoaivui.com.vn/40x40,webp,q100/https://dashboard.dienthoaivui.com.vn/uploads/wp-content/uploads/images/1a3904abf31d14f2540d4a7cc15d73d9.png",
      to: "/",
      price: "450000",
    },
    {
      id: 2,
      text: "Pin chính hãng Pisen",
      image:
        "https://image.dienthoaivui.com.vn/40x40,webp,q100/https://dashboard.dienthoaivui.com.vn/uploads/wp-content/uploads/images/1a3904abf31d14f2540d4a7cc15d73d9.png",
      to: "/",
      price: "450000",
    },
    {
      id: 3,
      text: "Pin chính hãng Pisen",
      image:
        "https://image.dienthoaivui.com.vn/40x40,webp,q100/https://dashboard.dienthoaivui.com.vn/uploads/wp-content/uploads/images/1a3904abf31d14f2540d4a7cc15d73d9.png",
      to: "/",
      price: "450000",
    },
    {
      id: 4,
      text: "Pin chính hãng Pisen",
      image:
        "https://image.dienthoaivui.com.vn/40x40,webp,q100/https://dashboard.dienthoaivui.com.vn/uploads/wp-content/uploads/images/1a3904abf31d14f2540d4a7cc15d73d9.png",
      to: "/",
      price: "450000",
    },
    {
      id: 5,
      text: "Ép kính thay cho iPhone 12 Pro Max",
      image:
        "https://image.dienthoaivui.com.vn/40x40,webp,q100/https://dashboard.dienthoaivui.com.vn/uploads/wp-content/uploads/images/1a3904abf31d14f2540d4a7cc15d73d9.png",
      to: "/",
      price: "450000",
    },
  ];

  return (
    <Box className={style.SuggestedProduct}>
      {/* <TitleSearch>Sản phẩm gợi ý</TitleSearch>
      <Box className={style.SearchTrends}>
        <Box className={style.box}>
          {dataProduct?.map((element, index) => {
            return (
              <Box key={index}>
                <ChildProduct
                  to={element.to}
                  image={element.image}
                  text={element.text}
                  price={element.price}
                  hover
                  child
                />
              </Box>
            );
          })}
        </Box>
      </Box> */}
    </Box>
  );
};

export default SuggestedProduct;
