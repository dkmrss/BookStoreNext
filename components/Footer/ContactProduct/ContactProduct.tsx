"use client";
import { Box, Grid, Text } from "@mantine/core";
import Link from "next/link";
import style from "./ContactProduct.module.scss";
const ContactProduct = () => {
  const danhSachTuongTu = [
    "Điện thoại cũ giá rẻ",
    "iPhone cũ giá rẻ",
    "Điện thoại giá rẻ",
    "Vệ sinh laptop",
    "Thay pin iPhone",
    "Thay màn hình iPhone",
    "Nâng cấp RAM laptop",
    "iPhone X cũ giá rẻ",
    "iPhone 11 cũ giá rẻ",
    "iPhone 12 cũ giá rẻ",
    "iPhone 13 cũ giá rẻ",
    "iPhone 14 cũ giá rẻ",
    "iPhone 8 Plus 64GB cũ giá rẻ",
    "iPhone X 64GB cũ giá rẻ",
    "iPhone 11 Pro Max 256GB cũ giá rẻ",
    "iPhone 12 Pro Max 128GB cũ giá rẻ",
    "Thay màn hình Samsung A50",
    "Thay màn hình Samsung Note 10 Plus",
    "Thay màn hình Xiaomi Redmi Note 11S",
    "Thay màn hình MacBook",
    "Thay màn hình laptop Dell",
    "Thay pin MacBook",
    "Thay màn hình laptop HP",
    "Thay màn hình laptop Asus",
    "Sửa laptop",
  ];
  return (
    <Box className={style.contact_product}>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <Text size="xs" className={style.text}>
            {danhSachTuongTu?.map((value, index) => (
              <Link key={index} href="/">
                {value}
              </Link>
            ))}
          </Text>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <Text size="xs" className={style.text}>
            {danhSachTuongTu?.map((value, index) => (
              <Link key={index} href="/">
                {value}
              </Link>
            ))}
          </Text>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <Text size="xs" className={style.text}>
            {danhSachTuongTu?.map((value, index) => (
              <Link key={index} href="/">
                {value}
              </Link>
            ))}
          </Text>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default ContactProduct;
