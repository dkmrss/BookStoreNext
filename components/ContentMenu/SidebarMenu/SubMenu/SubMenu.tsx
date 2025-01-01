"use client";
import Bhimage from "@/assets/BAO-HANH-MO-RONG-1-NĂM.png";
import { Box, Grid, Text } from "@mantine/core";
import { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import MenuCarousel from "./CarouselImageGroup";
import style from "./SubMenu.module.scss";

interface SubMenuProps {
  id: number;
}

interface SubMenuItem {
  value?: string;
  title: string;
  imageGroup?: boolean;
  children: {
    value?: string;
    label: string;
    isNodata?: boolean;
    image?: StaticImageData;
  }[];
}

const data: { [key: number]: SubMenuItem[] } = {
  1: [
    {
      value: "/category/sua-main-laptop",
      title: "Sửa Main - Nguồn - Wifi",
      children: [
        {
          value: "/product-detail/dich-vu-doi-cac-bo-mach-chu-cho-laptop",
          label: "Dịch vụ đổi bo mạch chủ cho laptop",
        },
        {
          value: "/product-detail/dich-vu-thay-bo-mach-chu-cho-laptop",
          label: "Dịch vụ thay bo mạch chủ cho laptop",
        },
        {
          value:
            "/product-detail/sua-chua-laptop-chuyen-sau-sua-chua-tren-main-bi-chay-no-ri-set",
          label:
            "Sửa chữa laptop chuyên sâu: sửa chữa trên Main bị cháy nổ rỉ sét",
        },

        {
          value:
            "/product-detail/sua-chua-laptop-nang-cao-sua-chua-phan-nguon-thu-cap-tren-main",
          label:
            "Sửa chữa laptop nâng cao: sửa chữa phần nguồn thứ cấp trên Main",
        },
        {
          value:
            "/product-detail/sua-chua-laptop-co-ban-sua-chua-phan-nguon-so-cap-tren-main",
          label: "Sửa chữa laptop cơ bản: sửa chữa phần nguồn sơ cấp trên Main",
        },

        {
          value: "/product-detail/card-wifi-sf313-53",
          label: "Card Wifi SF313-53",
        },
        {
          value: "/product-detail/sua-card-wifi-laptop",
          label: "Sửa card wifi laptop",
        },
      ],
    },
    {
      value: "/category/sua-ban-le-laptop",
      title: "Sửa LAN - Loa - Bản lề",
      children: [
        {
          value:
            "/product-detail/sua-chua-laptop-don-gian-thay-the-cong-ket-noi-ngoai-vi",
          label: "Sửa chữa laptop đơn giản : thay thế cổng kết nối ngoại vi",
        },
        {
          value: "/product-detail/loa-laptop-lenovo-t460s",
          label: "Loa Laptop Lenovo T460S",
        },
        {
          value: "/product-detail/loa-laptop-asus-f555l",
          label: "Loa Laptop Asus F555L",
        },
        {
          value: "/product-detail/sua-chua-ban-le-laptop-15-6-17-3-inch",
          label: "Sửa chữa bản lề laptop 15,6-17,3 inch",
        },
        {
          value: "/product-detail/sua-chua-ban-le-laptop-13-14-inch",
          label: "Sửa chữa bản lề laptop 13-14 inch",
        },
        {
          value: "/product-detail/sua-chua-ban-le-laptop-quay-360-do",
          label: "Sửa chữa bản lề laptop quay 360 độ",
        },
      ],
    },
    {
      value: "/category/sua-vo-laptop",
      title: "Sửa Vỏ Laptop",
      children: [
        {
          value: "/product-detail/vo-laptop-dell-5401-mat-a",
          label: "Vỏ Laptop Dell 5401 Mặt A",
        },
        {
          value: "/product-detail/vo-b-laptop-msi-gf63",
          label: "Vỏ B Laptop MSI GF63",
        },
        {
          value: "/product-detail/vo-b-asus-tuf-fa506-48bkxlbjn00-den-nhua",
          label: "Vỏ B Asus TUF FA506 48BKXLBJN00 Đen Nhựa",
        },
        {
          value:
            "/product-detail/vo-a-asus-tuf-fa506-47bkxlcjn30-den-nhua-van-xuoc",
          label: "Vỏ A Asus TUF FA506 47BKXLCJN30 Đen Nhựa Vân Xước",
        },
        {
          value: "/product-detail/vo-dell-vostro-3405-mat-c",
          label: "Vỏ Dell Vostro 3405 Mặt C",
        },
        {
          value: "/product-detail/son-sua-vo-laptop",
          label: "Sơn sửa vỏ laptop",
        },
      ],
    },
  ],
  2: [
    {
      value: "/category/sua-chua-dien-thoai",
      title: "Thay pin điện thoại",
      children: [
        {
          value: "/category/thay-pin-dien-thoai",
          label: "Thay Pin Điện Thoại",
        },
        {
          value:
            "/product-detail/pin-bison-thay-the-cho-iphone-13-pro-max-dung-luong-tieu-chuan",
          label: "Pin BISON iPhone 13 Pro Max",
        },
        {
          value:
            "/product-detail/pin-bison-thay-the-cho-iphone-13-pro-dung-luong-tieu-chuan",
          label: "Pin BISON iPhone 13 Pro",
        },
        {
          value:
            "/product-detail/pin-bison-thay-the-cho-iphone-13-dung-luong-tieu-chuan",
          label: "Pin BISON thay thế cho iPhone 13",
        },
        {
          value:
            "/product-detail/pin-bison-thay-the-cho-iphone-12-pro-max-dung-luong-tieu-chuan",
          label: "Pin BISON iPhone 12 Pro Max",
        },
        {
          value:
            "/product-detail/pin-bison-thay-the-cho-iphone-12-12-pro-dung-luong-tieu-chuan",
          label: "Pin BISON iPhone 12/12 Pro",
        },
        {
          value:
            "/product-detail/pin-bison-thay-the-cho-iphone-11-pro-max-dung-luong-tieu-chuan",
          label: "Pin BISON iPhone 11 Pro Max",
        },
        {
          value:
            "/product-detail/pin-bison-thay-the-cho-iphone-11-pro-dung-luong-tieu-chuan",
          label: "Pin BISON iPhone 11 Pro",
        },
        {
          value:
            "/product-detail/pin-bison-thay-the-cho-iphone-11-dung-luong-tieu-chuan",
          label: "Pin BISON thay thế cho iPhone 11",
        },
      ],
    },
    {
      value: "/category/sua-chua-dien-thoai",
      title: "Thay pin điện thoại",
      children: [
        {
          value:
            "/product-detail/pin-bison-thay-the-cho-iphone-se-2020-dung-luong-tieu-chuan",
          label: "Pin BISON iPhone SE (2020)",
        },
        {
          value:
            "/product-detail/pin-bison-thay-the-cho-iphone-xs-max-dung-luong-tieu-chuan",
          label: "Pin BISON iPhone XS Max",
        },
        {
          value:
            "/product-detail/pin-bison-thay-the-cho-iphone-xs-dung-luong-tieu-chuan",
          label: "Pin BISON iPhone XS",
        },
        {
          value:
            "/product-detail/pin-bison-thay-the-cho-iphone-xr-dung-luong-tieu-chuan",
          label: "Pin BISON iPhone XR",
        },
        {
          value:
            "/product-detail/pin-bison-thay-the-cho-iphone-x-dung-luong-tieu-chuan",
          label: "Pin BISON iPhone X",
        },
        {
          value:
            "/product-detail/pin-bison-thay-the-cho-iphone-8-plus-dung-luong-tieu-chuan",
          label: "Pin BISON iPhone 8 Plus",
        },
        {
          value:
            "/product-detail/pin-bison-thay-the-cho-iphone-7-plus-dung-luong-tieu-chuan",
          label: "Pin BISON iPhone 7 Plus",
        },
        {
          value:
            "/product-detail/pin-bison-thay-the-cho-iphone-7-dung-luong-tieu-chuan",
          label: "Pin BISON iPhone 7",
        },
        {
          value:
            "/product-detail/pin-bison-thay-the-cho-iphone-6s-plus-dung-luong-tieu-chuan",
          label: "Pin BISON iPhone 6S Plus",
        },
      ],
    },
    {
      value: "",
      title: "Sửa Màn hình, camera",
      children: [
        {
          value:
            "/product-detail/pin-bison-thay-the-cho-iphone-13-pro-max-dung-luong-tieu-chuan",
          label: "Thay, ép kính iPhone 15 Plus",
          isNodata: true,
        },
        {
          value:
            "/product-detail/pin-bison-thay-the-cho-iphone-13-pro-max-dung-luong-tieu-chuan",
          label: "Thay, ép kính iPhone 15",
          isNodata: true,
        },
        {
          value:
            "/product-detail/pin-bison-thay-the-cho-iphone-13-pro-max-dung-luong-tieu-chuan",
          label: "Thay, ép kính iPhone 14 Pro Max",
          isNodata: true,
        },

        {
          value:
            "/product-detail/pin-bison-thay-the-cho-iphone-13-pro-max-dung-luong-tieu-chuan",
          label: "Thay, ép kính Iphone X",
          isNodata: true,
        },

        {
          value:
            "/product-detail/pin-bison-thay-the-cho-iphone-13-pro-max-dung-luong-tieu-chuan",
          label: "Sửa cảm ứng Iphone 15",
          isNodata: true,
        },
        {
          value:
            "/product-detail/pin-bison-thay-the-cho-iphone-13-pro-max-dung-luong-tieu-chuan",
          label: "Sửa cảm ứng Iphone 14",
          isNodata: true,
        },
        {
          value:
            "/product-detail/pin-bison-thay-the-cho-iphone-13-pro-max-dung-luong-tieu-chuan",
          label: "Thay Camera trước Iphone 14",
          isNodata: true,
        },
        {
          value:
            "/product-detail/pin-bison-thay-the-cho-iphone-13-pro-max-dung-luong-tieu-chuan",
          label: "Thay cam sau Iphone 13",
          isNodata: true,
        },
        {
          value:
            "/product-detail/pin-bison-thay-the-cho-iphone-13-pro-max-dung-luong-tieu-chuan",
          label: "Thay cam sau Iphone 12",
          isNodata: true,
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
      value: "/category/thay-ban-phim-laptop",
      title: "Thay Bàn Phím Laptop",
      children: [
        {
          value: "/product-detail/ban-phim-lenovo-e15-gen3-led",
          label: "Bàn Phím Lenovo E15 Gen3 Led",
        },
        {
          value: "/product-detail/ban-phim-laptop-acer-a515-53",
          label: "Bàn Phím Laptop Acer A515-53",
        },
        {
          value: "/product-detail/ban-phim-laptop-hp-4540-khung",
          label: "Bàn Phím Laptop HP 4540 Khung",
        },
        {
          value: "/product-detail/ban-phim-laptop-hp-g4-g6-cq43",
          label: "Bàn Phím Laptop HP G4, G6, CQ43",
        },
        {
          value: "/product-detail/ban-phim-laptop-hp-15s-fq-mau-bac",
          label: "Bàn Phím Laptop HP 15S-FQ Màu Bạc",
        },
        {
          value: "/product-detail/ban-phim-laptop-dell-5581-led",
          label: "Bàn Phím Laptop Dell 5581 Led",
        },
        {
          value: "/product-detail/ban-phim-laptop-dell-3476-z",
          label: "Bàn Phím Laptop Dell 3476 (Z)",
        },
        {
          value: "/product-detail/ban-phim-laptop-dell-e5550",
          label: "Bàn phím Laptop Dell E5550",
        },
        {
          value: "/product-detail/ban-phim-laptop-dell-g15-5511-led",
          label: "Bàn Phím Laptop Dell G15 5511 Led",
        },
      ],
    },
    {
      value: "/category/thay-pin-laptop",
      title: "Thay Pin Laptop",
      children: [
        {
          value:
            "/product-detail/pin-laptop-lenovo-t460s-ngan-00hw024-00hw025-01av405-01av406",
          label: "Pin Laptop Lenovo T460S Ngắn",
        },
        {
          value: "/product-detail/pin-laptop-lenovo-t460s-dai-00hw022-00hw023",
          label: "Pin Laptop Lenovo T460S Dài",
        },
        {
          value: "/product-detail/pin-laptop-dell-5550-69kf2-86w",
          label: "Pin Laptop Dell 5550/69KF2 86W",
        },
        {
          value: "/product-detail/pin-laptop-dell-e5550-51w-z",
          label: "Pin Laptop Dell E5550 51W (Z)",
        },
        {
          value: "/product-detail/pin-laptop-dell-3451-z",
          label: "Pin Laptop Dell 3451 (Z)",
        },
        {
          value: "/product-detail/pin-laptop-asus-c21n1409-k455-z",
          label: "Pin Laptop Asus C21N1409, K455 (Z)",
        },
        {
          value: "/product-detail/pin-laptop-msi-m6h-z",
          label: "Pin Laptop MSI M6H (Z)",
        },
        {
          value: "/product-detail/pin-laptop-hp-so04xl-z",
          label: "Pin Laptop HP SO04XL (Z)",
        },
        {
          value: "/product-detail/pin-laptop-hp-hs04-z",
          label: "Pin Laptop HP HS04 (Z)",
        },
      ],
    },
    {
      value: "/category/thay-man-hinh-laptop",
      title: "Thay Màn Hình Laptop",
      children: [
        {
          value: "/product-detail/man-hinh-laptop-14.0-inch-40-pin-120hz",
          label: "Màn Laptop 14.0 inch 40 Pin 120Hz",
        },
        {
          value:
            "/product-detail/man-hinh-laptop-15.6-inch-mong-30-pin-fhd-cho-dell-3520",
          label: "Màn Laptop 15.6 inch Mỏng, 30 Pin, FHD Cho Dell 3520",
        },
        {
          value: "/product-detail/man-hinh-cam-ung-dell-5410-7415-30-pin-fhd",
          label: "Màn cảm ứng Dell 5410 7415 30 Pin, FHD",
        },
        {
          value:
            "/product-detail/man-hinh-laptop-15.6-inch-fhd-slim-30-pin-vien-to",
          label: "Màn laptop 15.6 inch FHD, Slim, 30 Pin, Viền to",
        },
        {
          value:
            "/product-detail/man-hinh-laptop-13.3-inch-fhd-tran-vien-khong-tai-30pin-cap-phai-230mm-nv133fhm-n43",
          label:
            "Màn Laptop 13.3 inch FHD Tràn Viền, Không Tai, 30Pin Cáp Phải 230mm",
        },
        {
          value: "/product-detail/man-hinh-laptop-14.0-inch-mong-40pin-2k",
          label: "Màn Laptop 14.0 inch mỏng, 40pin, 2K",
        },
      ],
    },
  ],
  5: [
    {
      value: "/category/cai-dat-may-chu",
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
      imageGroup: true,
      children: [
        {
          image: Bhimage,
          value: "/category/bao-tri-tai-chi-nhanh",
          label: "Bảo Trì Tại Chi Nhánh",
        },
        {
          image: Bhimage,
          value: "/category/bao-tri-tai-noi-su-dung",
          label: "Bảo Trì Tại Nơi Sử Dụng",
        },
        {
          image: Bhimage,
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
      imageGroup: true,
      children: [
        {
          image: Bhimage,
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
      title: "Tin tức",
      children: [
        {
          label: "Tin tức",
          value: "/new-list/4",
        },
        {
          label: "Sự kiện",
          value: "/new-list/58",
        },
        {
          label: "Tin tuyển nhân sự",
          value: "/new-list/60",
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
          label: "Khuyến mại ưu đãi",
          value: "/new-list/69",
        },
        {
          label: "Khuyến mại Vệ sinh PC/Laptop",
          value: "/new-list/68",
        },
        {
          label: "Khuyến mại giao hàng ",
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
      title: "Review & Tư vấn",
      children: [
        {
          label: "Review sản phẩm",
          value: "/new-list/59",
        },
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

const SubMenu: React.FC<SubMenuProps> = ({ id }) => {
  const submenuData = data[id] || [];

  const router = useRouter();

  const handleClickGoToCategory = (pathName?: string) => {
    if (pathName) {
      router.push(`${pathName}`);
    }
  };

  return (
    <Box className={style.SubMenu}>
      <Grid>
        {submenuData?.map((value, index) => {
          return (
            <>
              {value.imageGroup ? (
                <Grid.Col className={style.boxImage} key={index} span={12}>
                  <MenuCarousel children={value?.children} />
                </Grid.Col>
              ) : (
                <Grid.Col
                  className={style.box}
                  key={index}
                  span={{
                    base: 6,
                    md: 4,
                    lg: value.children.length < 3 ? 4 : 3,
                  }}
                >
                  <Text
                    fw={500}
                    className={style.title}
                    onClick={() => handleClickGoToCategory(value?.value)}
                  >
                    {value.title}
                  </Text>
                  {value?.children?.map((element, index) => {
                    return (
                      <Text
                        fw={400}
                        size="sm"
                        key={index}
                        className={`${style.text_dcr}
                  ${element?.isNodata && style.disable}
                  `}
                        onClick={() => handleClickGoToCategory(element?.value)}
                      >
                        {element.label}
                      </Text>
                    );
                  })}
                </Grid.Col>
              )}
            </>
          );
        })}
      </Grid>
    </Box>
  );
};

export default SubMenu;
