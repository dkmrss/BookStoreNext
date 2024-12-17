"use client";
import ProductSelection from "@/common/ProductSelection";
import React, { useState } from "react";
import style from "./SidebarMenu.module.scss";
import SubMenu from "./SubMenu/SubMenu";
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
import { StaticImageData } from "next/image";
interface MenuItem {
  id: number;
  text: string;
  image: StaticImageData;
  link: string;
}

const data: MenuItem[] = [
  {
    id: 1,
    text: "Tiểu Thuyết",
    image: CategoryImage1,
    link: "/category/sua-chua-laptop",
  },
  {
    id: 2,
    text: "Tâm lý, tâm linh, tôn giáo",
    image: CategoryImage2,
    link: "/category/sua-chua-dien-thoai",
  },
  {
    id: 3,
    text: "Giáo trình",
    image: CategoryImage3,
    link: "/category/sua-chua-linh-kien-may-tinh",
  },
  {
    id: 4,
    text: "Light Novel",
    image: CategoryImage4,
    link: "/category/thay-main-laptop",
  },
  {
    id: 5,
    text: "Truyện tranh",
    image: CategoryImage5,
    link: "/category/cai-dat-may-chu",
  },
  {
    id: 6,
    text: "Văn học nghệ thuật",
    image: CategoryImage6,
    link: "/category/sua-chua-thiet-bi-van-phong",
  },
  {
    id: 7,
    text: "Kinh tế",
    image: CategoryImage7,
    link: "/category/bao-tri-bao-duong-may-tinh-tbvp",
  },
  {
    id: 8,
    text: "Khoa học công nghệ",
    image: CategoryImage8,
    link: "/category/dich-vu-bao-hanh-mo-rong",
  },
  {
    id: 9,
    text: "Tiểu Thuyết",
    image: CategoryImage10,
    link: "/category/thi-cong",
  },
  {
    id: 10,
    text: "Thiếu nhi",
    image: CategoryImage9,
    link: "/new-list/4",
  },
];

const SidebarMenu: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleMouseEnter = (id: number) => {
    // setHoveredId(id);
  };

  const handleMouseLeave = () => {
    // setHoveredId(null);
  };

  return (
    <div className={style.sidebar}>
      {data?.map((value) => (
        <div
          key={value.id}
          onMouseEnter={() => handleMouseEnter(value.id)}
          onMouseLeave={handleMouseLeave}
        >
          <ProductSelection element={value} />
          {hoveredId === value.id && <SubMenu id={value.id} />}
        </div>
      ))}
    </div>
  );
};

export default SidebarMenu;
