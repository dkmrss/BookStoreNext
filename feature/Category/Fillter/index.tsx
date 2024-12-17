"use client";
import BrandLists from "@/common/CategoryFillter/BrandList";
import TypeLists from "@/common/CategoryFillter/TypeList";
import SelectGroup from "@/common/CategoryFillter/selection";
import style from "./fillter.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  AttributeOptionType,
  TblAttributeFilter,
  TblAttributeFilterOption,
} from "@/model/TblCategory";
import SelectComponent from "@/common/CategoryFillter/Sort";
import { TblBrand } from "@/model/TblBrand";

interface TypeData {
  link: string;
  imageSrc: string;
  title: string;
}

interface FillterProps {
  dataBrand: TblBrand[];
  selectedBrandIds: number[];
  setSelectedBrandIds: Dispatch<SetStateAction<number[]>>;
  dataType?: TypeData[];
  selectedAttributeFilter: (AttributeOptionType | null)[];
  setSelectedAttributeFilter: Dispatch<
    SetStateAction<(AttributeOptionType | null)[]>
  >;
  dataAttributeFilterOption: TblAttributeFilterOption[];
  priceFilter: string;
  handleChangePriceFilter: (filter: string) => void;
  priceRange: [number, number | undefined];
  setPriceRange: (value: [number, number]) => void;
}

const Fillter: React.FC<FillterProps> = ({
  dataBrand,
  selectedBrandIds,
  setSelectedBrandIds,
  dataType,
  selectedAttributeFilter,
  setSelectedAttributeFilter,
  dataAttributeFilterOption,
  priceFilter,
  handleChangePriceFilter,
  priceRange,
  setPriceRange,
}) => {
  return (
    <div style={{ padding: "5px 0px" }}>
      <div className={style.fillterChild}>
        <h2 className={style.title}>Hãng sản phẩm</h2>
        <BrandLists
          data={dataBrand}
          selectedBrandIds={selectedBrandIds}
          setSelectedBrandIds={setSelectedBrandIds}
        />
      </div>
      {dataType && (
        <div className={style.fillterChild}>
          <h2 className={style.title}>Loại sản phẩm</h2>
          <TypeLists data={dataType} type="widthImg" />
        </div>
      )}
      {dataAttributeFilterOption && dataAttributeFilterOption.length > 0 ? (
        <div className={style.fillterChild}>
          <h2 className={style.title}>Tiêu chí</h2>
          <SelectGroup
            selectedAttributeFilter={selectedAttributeFilter}
            setSelectedAttributeFilter={setSelectedAttributeFilter}
            dataAttributeFilterOption={dataAttributeFilterOption}
            setPriceRange={setPriceRange}
            priceRange={priceRange}
          />
        </div>
      ) : (
        <div className={style.fillterChild}>
          <h1 className={style.title}>Tiêu chí</h1>
          <SelectGroup
            selectedAttributeFilter={selectedAttributeFilter}
            setSelectedAttributeFilter={setSelectedAttributeFilter}
            dataAttributeFilterOption={dataAttributeFilterOption}
            setPriceRange={setPriceRange}
            priceRange={priceRange}
          />
        </div>
      )}

      <div className={style.fillterChild}>
        <h2 className={style.title}>Sắp xếp theo</h2>
        <SelectComponent
          priceFilter={priceFilter}
          handleChangePriceFilter={handleChangePriceFilter}
        />
      </div>
    </div>
  );
};

export default Fillter;
