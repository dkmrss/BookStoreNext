"use client";
import SelectComponent from "@/common/CategoryFillter/Sort";
import SelectGroup from "@/common/CategoryFillter/selection";
import style from "./fillter.module.scss";
import { AttributeOptionType } from "@/model/TblCategory";
import { Dispatch, SetStateAction } from "react";

interface FillterProps {
  priceFilter: string;
  handleChangePriceFilter: (filter: string) => void;
  priceRange: [number, number | undefined];
  setPriceRange: (value: [number, number]) => void;
  selectedAttributeFilter: (AttributeOptionType | null)[];
  setSelectedAttributeFilter: Dispatch<
    SetStateAction<(AttributeOptionType | null)[]>
  >;
}

const Fillter: React.FC<FillterProps> = ({
  priceFilter,
  handleChangePriceFilter,
  priceRange,
  setPriceRange,
  selectedAttributeFilter,
  setSelectedAttributeFilter,
}) => {
  return (
    <div style={{ padding: "10px 0px" }}>
      <div className={style.fillterChild}>
        <h2 className={style.title}>Tiêu chí</h2>
        <SelectGroup
          setPriceRange={setPriceRange}
          priceRange={priceRange}
          selectedAttributeFilter={selectedAttributeFilter}
          setSelectedAttributeFilter={setSelectedAttributeFilter}
          dataAttributeFilterOption={undefined}
        />
      </div>

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
