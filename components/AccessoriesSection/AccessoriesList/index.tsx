"use client";
import AccessoriesCard from "@/common/AccessoriesCard";
import { StaticImageData } from "next/image";
import styles from "./AccessoriesList.module.scss";
import Link from "next/link";
import { Category } from "@/model/TblCategory";

const darkerColors = [
  "#D9534F", // Dark Red
  "#F0AD4E", // Dark Orange
  "#F7DC6F", // Dark Yellow
  "#5CB85C", // Dark Green
  "#5BC0DE", // Dark Cyan
  "#5A99D3", // Dark Blue
  "#8E44AD", // Dark Purple
  "#34495E", // Dark Navy
  "#2C3E50", // Dark Teal
  "#7D3C98", // Dark Violet
  "#A04000"  // Dark Brown
];


type AccessoriesList = {
  accessoriesArr: Category[] | undefined;
};

const AccessoriesList = ({ accessoriesArr }: AccessoriesList) => {
  return (
    <>
      <div className={styles.accessoriesContainer}>
        <div className={styles.accessoriesList}>
          {accessoriesArr?.map((accessory, index) => {
            // Lấy màu từ mảng theo chỉ số, vòng lại nếu vượt quá chiều dài của mảng
            const color = darkerColors[index % darkerColors.length];
            return (
              <div
                key={accessory.id}
                style={{ backgroundColor: color }}
                className={styles.accessories}
              >
                <AccessoriesCard
                  title={accessory.category_name}
                  image={accessory.illustration}
                  url={accessory.id}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AccessoriesList;