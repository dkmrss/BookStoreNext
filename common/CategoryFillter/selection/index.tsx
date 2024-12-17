import React, { useState } from "react";
import { Flex, RangeSlider, Slider } from "@mantine/core";
import ChosenItem from "./ChosenItem";
import SelectAttributeFilter from "./SelectAttributeFillter";
import style from "./selection.module.scss";
import { AttributeOptionType } from "@/model/TblCategory";
import { IconBookmarkFilled } from "@tabler/icons-react";
import PriceFillter from "./SelectPrice";

type SelectionProps = {
  priceRange: [number, number | undefined];
  setPriceRange: (value: [number, number]) => void;
  selectedAttributeFilter: (AttributeOptionType | null)[];
  setSelectedAttributeFilter: React.Dispatch<
    React.SetStateAction<(AttributeOptionType | null)[]>
  >;
  dataAttributeFilterOption:
    | { options: AttributeOptionType[]; attributeName: string }[]
    | undefined;
};

const SelectGroup: React.FC<SelectionProps> = ({
  selectedAttributeFilter,
  setSelectedAttributeFilter,
  dataAttributeFilterOption,
  priceRange,
  setPriceRange,
}: SelectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const [isUsePriceFillter, setIsUsePriceFillter] = useState(false);

  const handleSelectAttributeFilter = (
    option: AttributeOptionType | undefined,
    indexGroup: number
  ) => {
    const newSelectedAttribute = [...selectedAttributeFilter];
    newSelectedAttribute[indexGroup] = option || null;
    setSelectedAttributeFilter(newSelectedAttribute);
  };

  const handleRemoveItem = (indexToRemove: number) => {
    const newSelectedAttribute = [...selectedAttributeFilter];
    newSelectedAttribute[indexToRemove] = null;
    setSelectedAttributeFilter(newSelectedAttribute);
  };

  const handleRemoveAllItems = () => {
    setSelectedAttributeFilter([]);
    setPriceRange([0, 0]);
    setIsUsePriceFillter(false);
  };

  // Ensure dataAttributeFilterOption is defined and not empty
  if (!dataAttributeFilterOption || dataAttributeFilterOption.length === 0) {
    return (
      <div className={style.box}>
        <div className={style.flexbox}>
          <PriceFillter
            indexGroup={999}
            isOpen={openIndex === 999}
            setOpenIndex={setOpenIndex}
            setPriceRange={setPriceRange}
            priceRange={priceRange}
            setIsUsePriceFillter={setIsUsePriceFillter}
            isUsePriceFillter={isUsePriceFillter}
          />
        </div>
        <Flex align={"center"}>
          <ChosenItem
            items={selectedAttributeFilter}
            onRemove={handleRemoveItem}
            onRemoveAll={handleRemoveAllItems}
            priceRange={priceRange}
          />
        </Flex>
      </div>
    );
  }

  return (
    <div className={style.box}>
      <div className={style.flexbox}>
        <PriceFillter
          indexGroup={999}
          isOpen={openIndex === 999}
          setOpenIndex={setOpenIndex}
          setPriceRange={setPriceRange}
          priceRange={priceRange}
          setIsUsePriceFillter={setIsUsePriceFillter}
          isUsePriceFillter={isUsePriceFillter}
        />
        {dataAttributeFilterOption?.map((item, index) => (
          <SelectAttributeFilter
            options={item.options}
            attributeName={item.attributeName}
            selectedAttributeFilter={selectedAttributeFilter[index]}
            handleSelectAttributeFilter={handleSelectAttributeFilter}
            indexGroup={index}
            key={index}
            isOpen={openIndex === index}
            setOpenIndex={setOpenIndex}
          />
        ))}
      </div>
      <Flex align={"center"}>
        <ChosenItem
          items={selectedAttributeFilter}
          onRemove={handleRemoveItem}
          onRemoveAll={handleRemoveAllItems}
          priceRange={priceRange}
        />
      </Flex>
    </div>
  );
};

export default SelectGroup;
