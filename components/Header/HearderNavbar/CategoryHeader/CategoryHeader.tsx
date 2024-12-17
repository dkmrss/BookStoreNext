"use client";
import React, { useState } from "react";
import style from "./CategoryHeader.module.scss";
import { Box, Flex, Group, ScrollArea, Text, Title } from "@mantine/core";
import Link from "next/link";
import CategoryImage1 from "@/assets/IconMegaMenu/category1.png";
import CategoryImage2 from "@/assets/IconMegaMenu/category2.png";
import CategoryImage3 from "@/assets/IconMegaMenu/category3.png";
import CategoryImage4 from "@/assets/IconMegaMenu/category4.png";
import CategoryImage5 from "@/assets/IconMegaMenu/category5.png";
import CategoryImage6 from "@/assets/IconMegaMenu/category6.png";
import CategoryImage7 from "@/assets/IconMegaMenu/category7.png";
import CategoryImage8 from "@/assets/IconMegaMenu/category8.png";
import CategoryImage9 from "@/assets/IconMegaMenu/category9.png";
import CategoryImage10 from "@/assets/IconMegaMenu/category10.png";
import ButtonCategory from "@/common/ButtonCategory/ButtonCategory";
import Image from "next/image";

type DataProps = {
  setHiddenDrawerCategory: React.Dispatch<React.SetStateAction<boolean>>;
  hiddenDrawerCategory: boolean;
  setValueActive: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  valueActive: boolean | undefined;
};

interface SubMenuItem {
  value?: string;
  title: string;
  children: {
    value?: string;
    label: string;
    isNodata?: boolean;
  }[];
}

const CategoryHeader: React.FC<DataProps> = ({
  setHiddenDrawerCategory,
  hiddenDrawerCategory,
  setValueActive,
  valueActive,
}) => {
  const dataTitleCategory = [
    {
      id: 1,
      text: "Sửa chữa laptop",
      image: CategoryImage1,
      link: "/category/sua-chua-laptop",
    },
    {
      id: 2,
      text: "Sửa Chữa Điện Thoại",
      image: CategoryImage2,
      link: "/category/sua-chua-dien-thoai",
    },
    {
      id: 3,
      text: "Sửa Chữa Linh Kiện Máy Tính",
      image: CategoryImage3,
      link: "/category/sua-chua-linh-kien-may-tinh",
    },
    {
      id: 4,
      text: "Thay Thế Linh Kiện Laptop",
      image: CategoryImage4,
      link: "/category/thay-the-linh-kien-laptop",
    },
    {
      id: 5,
      text: "Cài Đặt",
      image: CategoryImage5,
      link: "/category/cai-dat-may-chu",
    },
    {
      id: 6,
      text: "Sửa Chữa Thiết Bị Văn Phòng",
      image: CategoryImage6,
      link: "/category/sua-chua-thiet-bi-van-phong",
    },
    {
      id: 7,
      text: "Bảo Trì Bảo Dưỡng Máy Tính, TBVP",
      image: CategoryImage7,
      link: "/category/bao-tri-bao-duong-may-tinh-tbvp",
    },
    {
      id: 8,
      text: "Dịch Vụ Bảo Hành Mở Rộng",
      image: CategoryImage8,
      link: "/category/dich-vu-bao-hanh-mo-rong",
    },
    {
      id: 9,
      text: "Thi Công",
      image: CategoryImage10,
      link: "/category/thi-cong",
    },
    {
      id: 10,
      text: "Tin Công Nghệ",
      image: CategoryImage9,
      link: "/new-list/4",
    },
  ];

  const data: { [key: number]: SubMenuItem[] } = {
    1: [
      {
        value: "/category/sua-chua-laptop",
        title: "Sửa chữa laptop",
        children: [
          {
            value: "/category/sua-main-laptop",
            label: "Sửa Main Laptop",
          },
          {
            value: "/category/sua-cong-lan-laptop",
            label: "Sửa Cổng LAN Laptop",
          },
          {
            value: "/category/sua-audio-laptop",
            label: "Sửa Audio Laptop",
          },
          {
            value: "/category/sua-ban-le-laptop",
            label: "Sửa Bản Lề Laptop",
          },
          {
            value: "/category/thay-vo-laptop",
            label: "Thay Vỏ Laptop",
            isNodata: true,
          },
          {
            value: "/category/sua-man-hinh-laptop",
            label: "Sửa Màn Hình Laptop",
          },
          {
            value: "/category/sua-wifi-laptop",
            label: "Sửa Wifi Laptop",
          },
          {
            value: "/category/sua-vo-laptop",
            label: "Sửa Vỏ Laptop",
          },
          {
            value: "/category/thay-audio-laptop",
            label: "Thay Audio Laptop",
            isNodata: true,
          },
          {
            value: "/category/thay-card-wifi-laptop",
            label: "Thay Card Wifi Laptop",
            isNodata: true,
          },
          {
            value: "/category/sua-nguon-laptop",
            label: "Sửa Nguồn Laptop",
          },
        ],
      },
    ],
    2: [
      {
        value: "/category/sua-chua-dien-thoai",
        title: "Sửa Chữa Điện Thoại",
        children: [
          // {
          //   value: "/category/thay-man-hinh-dien-thoai",
          //   label: "Thay Màn Hình Điện Thoại",
          //   isNodata: true,
          // },
          // {
          //   value: "/category/thay-loa-dien-thoai",
          //   label: "Thay Loa Điện Thoại",
          //   isNodata: true,
          // },
          // {
          //   value: "/category/thay-mic-dien-thoai",
          //   label: "Thay Mic Điện Thoại",
          //   isNodata: true,
          // },
          // {
          //   value: "/category/thay-cam-bien-dien-thoai",
          //   label: "Thay Cảm Biến Điện Thoại",
          //   isNodata: true,
          // },
          // {
          //   value: "/category/sua-dien-thoai",
          //   label: "Sửa Điện Thoại",
          //   isNodata: true,
          // },
          {
            value: "/category/thay-pin-dien-thoai",
            label: "Thay Pin Điện Thoại",
          },
          // {
          //   value: "/category/backup-du-lieu-dien-thoai",
          //   label: "Backup Dữ Liệu Điện Thoại",
          //   isNodata: true,
          // },
          {
            value: "/category/chay-lai-phan-mem-dien-thoai",
            label: "Chạy Lại Phần Mềm Điện Thoại",
          },
        ],
      },
    ],
    3: [
      {
        value: "/category/sua-chua-linh-kien-may-tinh",
        title: "Sửa Chữa Linh Kiện Máy Tính",
        children: [
          {
            value: "/category/sua-main-may-tinh",
            label: "Sửa Main Máy Tính",
          },
          {
            value: "/category/sua-nguon-may-tinh",
            label: "Sửa Nguồn Máy Tính",
          },
          {
            value: "/category/sua-vga-may-tinh",
            label: "Sửa VGA Máy Tính",
          },
          {
            value: "/category/sua-vo-case-may-tinh",
            label: "Sửa Vỏ Case Máy Tính",
          },
          {
            value: "/category/sua-man-hinh-may-tinh",
            label: "Sửa Màn Hình Máy Tính",
          },
          {
            value: "/category/sua-ban-phim-chuot-may-tinh",
            label: "Sửa Bàn Phím, Chuột Máy Tính",
          },
          {
            value: "/category/sua-loa-may-tinh",
            label: "Sửa Loa Máy Tính",
          },
        ],
      },
    ],
    4: [
      {
        value: "/category/thay-main-laptop",
        title: "Thay Thế Linh Kiện Laptop",
        children: [
          {
            value: "/category/thay-ban-phim-laptop",
            label: "Thay Bàn Phím Laptop",
          },
          {
            value: "/category/thay-pin-laptop",
            label: "Thay Pin Laptop",
          },
          {
            value: "/category/thay-main-laptop",
            label: "Thay Main Laptop",
          },
          {
            value: "/category/thay-ban-le-laptop",
            label: "Thay Bản Lề Laptop",
          },
          {
            value: "/category/thay-man-hinh-laptop",
            label: "Thay Màn Hình Laptop",
          },
        ],
      },
    ],
    5: [
      {
        value: "/category/dich-vu-cai-dat",
        title: "Cài Đặt",
        children: [
          {
            value: "/category/cai-dat-he-dieu-hanh",
            label: "Cài Đặt Hệ Điều Hành",
          },
          {
            value: "/category/cai-dat-may-chu",
            label: "Cài Đặt Máy Chủ",
          },
          {
            value: "/category/cai-dat-may-cham-cong",
            label: "Cài Đặt Máy Chấm Công",
          },
        ],
      },
    ],
    6: [
      {
        value: "/category/sua-chua-thiet-bi-van-phong",
        title: "Sửa Chữa Thiết Bị Văn Phòng",
        children: [
          {
            value: "/category/sua-may-pos",
            label: "Sửa Máy POS",
          },
          {
            value: "/category/sua-may-photo",
            label: "Sửa Máy Photo",
          },
          {
            value: "/category/sua-may-scan",
            label: "Sửa Máy Scan",
          },
          {
            value: "/category/sua-may-chieu",
            label: "Sửa Máy Chiếu",
          },
          {
            value: "/category/sua-may-huy-giay",
            label: "Sửa Máy Hủy Giấy",
          },
          {
            value: "/category/sua-may-ban-ma-vach",
            label: "Sửa Máy Bắn Mã Vạch",
          },
          {
            value: "/category/sua-may-cham-cong",
            label: "Sửa Máy Chấm Công",
          },
        ],
      },
      {
        value: "/category/sua-chua-may-in",
        title: "Sửa Chữa Máy In",
        children: [
          {
            value: "/category/sua-may-in-laser",
            label: "Sửa Máy In Laser",
          },
          {
            value: "/category/sua-may-in-kim",
            label: "Sửa Máy In Kim",
          },
          {
            value: "/category/sua-may-in-phun",
            label: "Sửa Máy In Phun",
          },
          // {
          //   value: "/category/sua-may-in-nhiet",
          //   label: "Sửa Máy In Nhiệt",
          //   isNodata: true,
          // },
          {
            value: "/category/do-muc-may-in",
            label: "Đổ Mực Máy In",
          },
          // {
          //   value: "/category/thay-main-may-in",
          //   label: "Thay Main Máy In",
          //   isNodata: true,
          // },
          // {
          //   value: "/category/thay-bao-lua-may-in",
          //   label: "Thay Bao Lụa Máy In",
          //   isNodata: true,
          // },
          // {
          //   value: "/category/thay-lo-say-may-in",
          //   label: "Thay Lô Sấy Máy In",
          //   isNodata: true,
          // },
          // {
          //   value: "/category/thay-catridge-may-in",
          //   label: "Thay Catridge Máy In",
          //   isNodata: true,
          // },
          // {
          //   value: "/category/thay-kim-phun-may-in",
          //   label: "Thay Kim Phun Máy In",
          //   isNodata: true,
          // },
          // {
          //   value: "/category/thay-qua-dao-may-in",
          //   label: "Thay Quả Đào Máy In",
          //   isNodata: true,
          // },
          // {
          //   value: "/category/thay-card-formatter-may-in",
          //   label: "Thay Card Formatter Máy In",
          //   isNodata: true,
          // },
        ],
      },
    ],
    7: [
      {
        value: "/category/bao-tri-bao-duong-may-tinh-tbvp",
        title: "Bảo Trì Bảo Dưỡng Máy Tính, TBVP",
        children: [
          {
            value: "/category/bao-tri-tai-chi-nhanh",
            label: "Bảo Trì Tại Chi Nhánh",
          },
          {
            value: "/category/bao-tri-tai-noi-su-dung",
            label: "Bảo Trì Tại Nơi Sử Dụng",
          },
          {
            value: "/category/bao-tri-theo-hop-dong",
            label: "Bảo Trì Theo Hợp Đồng",
          },
        ],
      },
    ],
    8: [
      {
        value: "/category/dich-vu-bao-hanh-mo-rong",
        title: "Dịch Vụ Bảo Hành Mở Rộng",
        children: [
          {
            value: "/category/them-1-nam-bao-hanh-cho-laptop",
            label: "Thêm 1 Năm Bảo Hành Cho Laptop",
          },
        ],
      },
    ],
    9: [
      {
        value: "/category/thi-cong",
        title: "Thi Công",
        children: [
          {
            value: "/category/he-thong-mang",
            label: "Hệ Thống Mạng",
          },
          {
            value: "/category/he-thong-camera",
            label: "Hệ Thống Camera",
          },
          {
            value: "/category/he-thong-may-chieu",
            label: "Hệ Thống Máy Chiếu",
          },
          {
            value: "/category/he-thong-may-cham-cong",
            label: "Hệ Thống Máy Chấm Công",
          },
        ],
      },
    ],
    10: [
      {
        title: "Tin tức công nghệ",

        children: [
          {
            label: "Tin tức công nghệ",
            value: "/new-list/4",
          },
        ],
      },

      {
        title: "Khuyến mại",
        children: [
          {
            label: "Khuyến mãi phụ kiện",
            value: "/new-list/71",
          },
          {
            label: "Khuyến mại linh kiện",
            value: "/new-list/70",
          },
          {
            label: "Khuyến mại ưu đãi hình thức thanh toán",
            value: "/new-list/69",
          },
          {
            label: "Khuyến mại Vệ sinh PC/Laptop miễn phí",
            value: "/new-list/68",
          },
          {
            label: "Khuyến mại giao hàng siêu tốc 2h và miễn phí",
            value: "/new-list/67",
          },
          {
            label: "Khuyến mại Học sinh - Sinh viên",
            value: "/new-list/66",
          },
          {
            label: "Khuyến mại PC",
            value: "/new-list/65",
          },
          {
            label: "Khuyến mại Laptop",
            value: "/new-list/64",
          },
          {
            label: "Tin khuyến mại",
            value: "/new-list/57",
          },
        ],
      },
      {
        title: "Phần mềm",
        children: [
          {
            label: "Dowload phần mềm, game",
            value: "/new-list/63",
          },
          {
            label: "Ứng dụng phần mềm, game",
            value: "/new-list/62",
          },
          {
            label: "Game",
            value: "/new-list/61",
          },
        ],
      },
      {
        title: "Tuyển nhân sự",
        value: "/new-list/60",
        children: [
          {
            label: "Tuyển nhân sự",
            value: "/new-list/60",
          },
        ],
      },
      {
        title: "Review sản phẩm",
        value: "/new-list/59",
        children: [
          {
            label: "Thay quạt laptop Lenovo",
            value: "/new-list/59",
          },
        ],
      },
      {
        title: "Sự kiện",
        value: "/new-list/58",
        children: [
          {
            label: "Sự kiện",
            value: "/new-list/58",
          },
        ],
      },
      {
        title: "Tư vấn",

        children: [
          {
            label: "Tư vấn mua hàng",
            value: "/new-list/56",
          },
          {
            label: "Tư vấn phần cứng",
            value: "/new-list/53",
          },
          {
            label: "Kiến thức phần cứng",
            value: "/new-list/55",
          },
          {
            label: "Kinh nghiệm, thủ thuật",
            value: "/new-list/52",
          },
        ],
      },
    ],
  };

  const [selected, setSelected] = useState(dataTitleCategory[0]);

  const sidebarResponHeader = () => (
    <>
      <Box w={80} className={style.container_box}>
        <Flex
          className={style.category_container}
          direction="column"
          wrap="nowrap"
        >
          {dataTitleCategory?.map((element) => {
            return (
              <Box
                className={`${style.category_content} ${
                  style[`category_content_${element.id}`]
                }`}
                key={element.id}
                onClick={() => setSelected(element)}
              >
                <Image
                  width={45}
                  height={45}
                  src={element.image}
                  alt={element.text}
                />
                <Text pl={2} pr={2} fw={700}>
                  {element.text}
                </Text>
                {element.id === selected.id ? (
                  <>
                    <span className={style.check}></span>
                  </>
                ) : null}
              </Box>
            );
          })}
        </Flex>
      </Box>
    </>
  );

  return (
    <Box className={style.container}>
      {sidebarResponHeader()}
      <Box className={style.box_right} p={8}>
        <Group justify="space-between">
          <Title fw={700} order={5}>
            {selected.text} :
          </Title>
          <Link
            className={style.text}
            href={selected.link}
            onClick={() => {
              setHiddenDrawerCategory(!hiddenDrawerCategory);
              setValueActive(!valueActive);
            }}
          >
            <Text size="xs" fw={700}>
              Xem tất cả
            </Text>
          </Link>
        </Group>

        <>
          <Box className={style.box_button} mt={10} mb={10}>
            {data[selected.id]?.map((value, index) => {
              return (
                <Box mt={8} key={index}>
                  <Text fw={700} size="xs">
                    {value.title}
                  </Text>
                  <Box className={style.content_box}>
                    <Flex wrap={"wrap"} className={style.scroolItem} p={5}>
                      {value?.children?.map((element, index) => (
                        <ButtonCategory
                          key={index}
                          data={element}
                          // image={element.image}
                          setHiddenDrawerCategory={setHiddenDrawerCategory}
                          hiddenDrawerCategory={hiddenDrawerCategory}
                          valueActive={valueActive}
                          setValueActive={setValueActive}
                        />
                      ))}
                    </Flex>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </>
      </Box>
    </Box>
  );
};

export default CategoryHeader;
