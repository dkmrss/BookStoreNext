"use client";
import StoreCard from "../StoreCard";
import { IconMapPin } from "@tabler/icons-react";
import style from "./StoreList.module.scss";
import ImageStore from "@/assets/dichvutot-store.jpg";

const storeListData = [
  {
    image: ImageStore,
    name: "DICHVUTOT - 65 Thái Hà",
    address: "Số 65 Phố Thái Hà - Đống Đa - Hà Nội",
    workingTime: "Từ 8h30 - 19h hàng ngày",
    contact: "1800.8091",
    joinGroup: "",
    storeMap:
      "https://www.google.com/maps/place/HANOICOMPUTER/@21.0112896,105.8194442,17z/data=!3m1!4b1!4m5!3m4!1s0x3135ab7d94ae54b9:0x21aae6c934d53ad6!8m2!3d21.0112846!4d105.8216329",
    imageName: "Shop 117",
    imageList: [ImageStore, ImageStore, ImageStore, ImageStore, ImageStore],
  },
  {
    image: ImageStore,
    name: "DICHVUTOT - 137 Xuân Thủy",
    address: "Số 137 Xuân Thủy - Cầu Giấy - Hà Nội",
    workingTime: "Từ 8h30 - 19h hàng ngày",
    contact: "1800.8091",
    joinGroup: "",
    storeMap:
      "https://www.google.com/maps/place/HANOICOMPUTER/@21.035436,105.7955403,17z/data=!3m1!4b1!4m5!3m4!1s0x3135ab4764432ddb:0x63e02e8abee5b42d!8m2!3d21.035436!4d105.797729",
    imageName: "Shop 63",
    imageList: [ImageStore, ImageStore, ImageStore, ImageStore, ImageStore],
  },
];

const StoreList = () => (
  <div className={style.storeList}>
    <div className={style.storeTitle}>
      <IconMapPin className={style.iconMap} />
      <span className={style.title}>Tìm Kiếm Cửa Hàng Gần Bạn</span>
    </div>
    <div className={style.storeContainer}>
      {storeListData.map((store, index) => (
        <StoreCard
          key={index}
          image={store.image}
          name={store.name}
          address={store.address}
          workingTime={store.workingTime}
          contact={store.contact}
          joinGroup={store.joinGroup}
          storeMap={store.storeMap}
          imageName={store.imageName}
          imageList={store.imageList}
        />
      ))}
    </div>
  </div>
);

export default StoreList;
