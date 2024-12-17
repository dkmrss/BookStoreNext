"use client";
import HeaderSection from "../HeaderSection";
import AccessoriesList from "./AccessoriesList";
import ImageAccessories from "@/assets/accessoriesCard1.png";
import UsbImage from "@/assets/accessoriesCard10.png";
import MemoryStickImage from "@/assets/accessoriesCard11.png";
import NetworkEquipmentImage from "@/assets/accessoriesCard12.png";
import CameraImage from "@/assets/accessoriesCard13.png";
import SmartHomeImage from "@/assets/accessoriesCard14.png";
import ConvenientAccessoriesImage from "@/assets/accessoriesCard15.png";
import SoftwareImage from "@/assets/accessoriesCard16.png";
import SimImage from "@/assets/accessoriesCard17.png";
import SmartWatchImage from "@/assets/accessoriesCard18.png";
import ChargerImage from "@/assets/accessoriesCard2.png";
import BatteryBackupImage from "@/assets/accessoriesCard3.png";
import ScreenProtectorImage from "@/assets/accessoriesCard4.png";
import LoudspeakerImage from "@/assets/accessoriesCard5.png";
import EarphoneImage from "@/assets/accessoriesCard6.png";
import PhoneCaseImage from "@/assets/accessoriesCard7.png";
import MouseImage from "@/assets/accessoriesCard8.png";
import BackpackImage from "@/assets/accessoriesCard9.png";
import styles from "./AccessoriesSection.module.scss";

const data = [
  {
    id: 1,
    name: "Tiểu Thuyết",
    img: ImageAccessories,
    url: "/category/sua-chua-laptop",
    color: "#ffcb8f",
  },
  {
    id: 2,
    name: "Chính trị – pháp luật",
    img: ChargerImage,
    url: "/category/sua-chua-linh-kien-may-tinh",
    color: "#f7784d",
  },
  {
    id: 3,
    name: "Khoa học công nghệ",
    img: BatteryBackupImage,
    url: "/category/thay-main-laptop",
    color: "#ff8f8e",
  },
  {
    id: 4,
    name: "Kinh tế",
    img: ScreenProtectorImage,
    url: "/category/cai-dat-may-chu",
    color: "#fdba74",
  },
  {
    id: 5,
    name: "Văn học nghệ thuật",
    img: LoudspeakerImage,
    url: "/category/sua-chua-thiet-bi-van-phong",
    color: "#9d8dbe",
  },
  {
    id: 6,
    name: "Truyện tranh",
    img: EarphoneImage,
    url: "/category/bao-tri-bao-duong-may-tinh-tbvp",
    color: "#7fd7b4",
  },
  {
    id: 7,
    name: "Light Novel",
    img: PhoneCaseImage,
    url: "/category/dich-vu-bao-hanh-mo-rong",
    color: "#92c5fc",
  },
  {
    id: 8,
    name: "Giáo trình",
    img: MouseImage,
    url: "/category/thi-cong",
    color: "#fc93b2",
  },
  {
    id: 9,
    name: "Tâm lý, tâm linh, tôn giáo",
    img: BackpackImage,
    url: "/category/sua-main-laptop",
    color: "#889afe",
  },

];

export default function AccessoriesSection() {
  return (
    <section className={styles.accessoriesSection}>
      <HeaderSection title={"Danh mục sản phẩm"} />
      <AccessoriesList accessoriesArr={data} />
    </section>
  );
}
