"use client";
import React from "react";
import style from "./SearchTrends.module.scss";
import { Box, Grid, Title } from "@mantine/core";
import TitleSearch from "@/common/TitleSearch/TitleSearch";
import ChildProduct from "@/common/ChildProduct/ChildProduct";

const SearchTrends = ({
  setIsFocus,
}: {
  setIsFocus: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dataProduct = [
    {
      id: 1,
      text: "Sửa màn hình",
      image:
        "https://hanoicomputercdn.com/media/product/76601_ma_sp_dvsc020.jpg",
      to: "/category/thay-man-hinh-laptop",
    },
    {
      id: 2,
      text: "Sửa bản lề Laptop",
      image: "https://hanoicomputercdn.com/media/product/77172_sp_dvsc007.jpg",
      to: "/category/sua-ban-le-laptop",
    },
    {
      id: 3,
      text: "Bảo hành",
      image: "https://hanoicomputercdn.com/media/product/76616_sp_dvsc035.jpg",
      to: "/category/bao-tri-tai-chi-nhanh",
    },
    {
      id: 4,
      text: "Cài đặt hệ điều hành",
      image: "https://hanoicomputercdn.com/media/product/76649_sp_dvdn009.jpg",
      to: "/category/cai-dat-he-dieu-hanh",
    },
    // {
    //   id: 5,
    //   text: "Màn Gen A Samsung Note 20 Ultra",
    //   image:
    //     "https://image.dienthoaivui.com.vn/40x40,webp,q100/https://dashboard.dienthoaivui.com.vn/uploads/wp-content/uploads/images/77cda568eaeb12193bf22bb3d5d2888f.png",
    //   to: "/",
    // },
    // {
    //   id: 6,
    //   text: "Tai nghe Havit",
    //   image:
    //     "https://image.dienthoaivui.com.vn/40x40,webp,q100/https://dashboard.dienthoaivui.com.vn/uploads/wp-content/uploads/images/946362ad84a8f0f9f9685f0c4ad4f329.jpg",
    //   to: "/",
    // },
  ];

  return (
    <Box
      style={{ "--radius": "0.5rem", borderRadius: "var(--radius)" }}
      p={5}
      className={style.SearchTrends}
    >
      <TitleSearch>Xu hướng tìm kiếm</TitleSearch>
      <Box className={style.box} p={5}>
        <Grid p={9}>
          {dataProduct?.map((element, index) => {
            return (
              <Grid.Col key={index} pl={6} pr={6} pt={8} pb={8} span={6}>
                <ChildProduct
                  to={element.to}
                  image={element.image}
                  text={element.text}
                  search
                  setIsFocus={setIsFocus}
                />
              </Grid.Col>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default SearchTrends;
