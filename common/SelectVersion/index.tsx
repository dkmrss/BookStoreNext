"use client";
import imgOled from "@/assets/oled.webp";
import { IconCheck } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import style from "./SelectVersion.module.scss";

interface Version {
  name: string;
  price: string;
}

interface Category {
  name: string;
  price: string;
}

interface SelectVersionProps {
  listVersion?: Version[];
  listCategory?: Category[];
}

const SelectVersion: React.FC<SelectVersionProps> = ({
  listVersion,
  listCategory,
}) => {
  const [selectedVersion, setSelectedVersion] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleVersion = (index: number) => {
    setSelectedVersion(index);
  };

  const handleCategory = (indexCategory: number) => {
    setSelectedCategory(indexCategory);
  };

  return (
    <div className={style.selectVersion}>
      <div className={style.allCategory}>
        {Array.isArray(listCategory) &&
          listCategory?.map((item, index) => (
            <div
              key={index}
              className={`${style.category} ${
                selectedCategory === index ? style.setBorder : ""
              }`}
              onClick={() => handleCategory(index)}
            >
              <IconCheck
                color="white"
                size={15}
                className={`${
                  selectedCategory === index ? style.check : style.noCheck
                }`}
              />
              <div>
                <span>{item.name}</span>
                <br />
                <span>{item.price}</span>
              </div>
            </div>
          ))}
      </div>
      <span className={style.title}>Lựa chọn phiên bản / màu sắc :</span>
      <div className={style.allVersion}>
        {Array.isArray(listVersion) &&
          listVersion?.map((item, index) => (
            <div
              key={index}
              className={`${style.version} ${
                selectedVersion === index ? style.setBorder : ""
              }`}
              onClick={() => handleVersion(index)}
            >
              <IconCheck
                color="white"
                size={15}
                className={`${
                  selectedVersion === index ? style.check : style.noCheck
                }`}
              />
              <Image src={imgOled} alt="version" />
              <div>
                <span>{item.name}</span>
                <br />
                <span>{item.price}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SelectVersion;
