"use client";
import AccessoriesCard from "@/common/AccessoriesCard";
import { StaticImageData } from "next/image";
import styles from "./AccessoriesList.module.scss";
import Link from "next/link";

export interface Accessory {
  id: number;
  name: string;
  img: StaticImageData;
  url: string;
  color: string;
}

type AccessoriesList = {
  accessoriesArr: Array<Accessory>;
};

const AccessoriesList = ({ accessoriesArr }: AccessoriesList) => {
  return (
    <>
      <div className={styles.accessoriesContainer}>
        <div className={styles.accessoriesList}>
          {accessoriesArr?.map((accessory) => {
            return (
              <div
                key={accessory.id}
                style={{ backgroundColor: `${accessory.color}` }}
                className={styles.accessories}
              >
                <AccessoriesCard
                  title={accessory.name}
                  image={accessory.img}
                  url={accessory.url}
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
