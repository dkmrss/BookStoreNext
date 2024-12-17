// ProductCard.js
"use client";
import { Image, ScrollArea } from "@mantine/core";
import style from "./brand.module.scss";
import { TblBrand } from "@/model/TblBrand";
import { Dispatch, SetStateAction } from "react";

interface BrandProps {
  data: TblBrand[];
  selectedBrandIds: number[];
  setSelectedBrandIds: Dispatch<SetStateAction<number[]>>;
}

const BrandLists: React.FC<BrandProps> = ({
  data,
  selectedBrandIds,
  setSelectedBrandIds,
}) => {
  const handleChooseBrand = (brandId: number) => {
    const newBrandIds = [...selectedBrandIds];
    if (newBrandIds.includes(brandId)) {
      const index = newBrandIds.indexOf(brandId);
      newBrandIds.splice(index, 1);
    } else {
      newBrandIds.push(brandId);
    }
    setSelectedBrandIds(newBrandIds);
  };

  return (
    <div className={style.containerBox}>
      <ScrollArea mah={74}>
        <div className={style.box}>
          {data?.map((item, index) => (
            <div
              className={`${style.brandBox} ${
                selectedBrandIds.includes(item?.id) && style.brandActive
              }`}
              key={index}
              onClick={() => handleChooseBrand(item?.id)}
            >
              <Image src={item?.image} alt="#" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default BrandLists;
