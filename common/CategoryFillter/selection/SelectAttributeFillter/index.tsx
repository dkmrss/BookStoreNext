import { Select } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import style from "./SelectAttributeFiter.module.scss";
import {
  IconBookmarkFilled,
  IconChevronDown,
  IconTags,
} from "@tabler/icons-react";
import { AttributeOptionType } from "@/model/TblCategory";

type SelectAttributeFilterProps = {
  attributeName: string;
  options: {
    value: string;
    label: string;
  }[];
  selectedAttributeFilter: AttributeOptionType | null;
  indexGroup: number;
  handleSelectAttributeFilter: (
    option: AttributeOptionType | undefined,
    indexGroup: number
  ) => void;
  isOpen: boolean;
  setOpenIndex: (index: number | null) => void;
};

const SelectAttributeFilter: React.FC<SelectAttributeFilterProps> = ({
  attributeName,
  options,
  selectedAttributeFilter,
  handleSelectAttributeFilter,
  indexGroup,
  isOpen,
  setOpenIndex,
}: SelectAttributeFilterProps) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [positionClass, setPositionClass] = useState<string>("");

  const toggleDropdown = () => {
    setOpenIndex(isOpen ? null : indexGroup);
  };

  const handleSelectItem = (value: string) => {
    const selectedItem = options.find((item) => item.value === value);
    if (selectedItem) {
      const selectOption: AttributeOptionType = {
        value: selectedItem.value,
        label: selectedItem.label,
        attributeName: attributeName,
        // Add attributeName here
      };
      handleSelectAttributeFilter(selectOption, indexGroup);
    } else {
      handleSelectAttributeFilter(undefined, indexGroup); // Handle case when no item is found
    }
    setOpenIndex(null);
  };

  useEffect(() => {
    const determinePosition = () => {
      if (selectRef.current) {
        const rect = selectRef.current.getBoundingClientRect();
        const middle = window.innerWidth / 2;
        if (rect.left < middle) {
          setPositionClass(style.leftPosition);
        } else {
          setPositionClass(style.rightPosition);
        }
      }
    };

    window.addEventListener("resize", determinePosition);
    determinePosition();

    return () => {
      window.removeEventListener("resize", determinePosition);
    };
  }, [setOpenIndex]);

  return (
    <div ref={selectRef} className={style.selectBox}>
      <div
        className={`${style.selectDiv} ${
          selectedAttributeFilter ? style.selected : ""
        }`}
        onClick={toggleDropdown}
      >
        {attributeName}
        <IconChevronDown height={20} width={20} />
      </div>
      {isOpen && (
        <div className={`${style.selectGroup} ${positionClass}`}>
          <div className={style.titleBox}>
            <div className={style.title}>
              <IconBookmarkFilled />
              {attributeName}
            </div>
            <div
              className={style.closeButton}
              onClick={() => setOpenIndex(null)}
            >
              X
            </div>
          </div>
          <div className={style.itemBox}>
            {options?.map((item) => (
              <div
                key={item.value}
                className={`${style.item} ${
                  selectedAttributeFilter?.value === item.value
                    ? style.selectedItem
                    : ""
                }`}
                onClick={() => handleSelectItem(item.value)}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectAttributeFilter;
