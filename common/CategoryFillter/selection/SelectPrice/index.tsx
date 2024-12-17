import { NumberFormatter, RangeSlider } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import style from "./SelectAttributeFiter.module.scss";
import {
  IconBookmarkFilled,
  IconChevronDown,
  IconTags,
} from "@tabler/icons-react";

type PriceFilterProps = {
  indexGroup: number;
  isOpen: boolean;
  setOpenIndex: (index: number | null) => void;
  priceRange: [number, number | undefined];
  setPriceRange: (value: [number, number]) => void;
  setIsUsePriceFillter: React.Dispatch<React.SetStateAction<boolean>>;
  isUsePriceFillter: boolean;
};

const PriceFilter: React.FC<PriceFilterProps> = ({
  indexGroup,
  isOpen,
  setOpenIndex,
  priceRange,
  setPriceRange,
  setIsUsePriceFillter,
  isUsePriceFillter,
}: PriceFilterProps) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [positionClass, setPositionClass] = useState<string>("");
  const [value, setValue] = useState<[number, number]>([0, 10000000]);
  const toggleDropdown = () => {
    setOpenIndex(isOpen ? null : indexGroup);
  };

  const setPriceSubmit = () => {
    setIsUsePriceFillter(true);
    setPriceRange(value);
    setOpenIndex(null);
  };
  const cancelPriceFillter = () => {
    setIsUsePriceFillter(false);
    setPriceRange([0, 0]);
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
          isUsePriceFillter ? style.selected : ""
        }`}
        onClick={toggleDropdown}
      >
        <IconTags height={20} width={20} />
        Khoảng Giá
        <IconChevronDown height={20} width={20} />
      </div>
      {isOpen && (
        <div className={`${style.selectGroup} ${positionClass}`}>
          <div className={style.titleBox}>
            <div className={style.title}>
              <IconBookmarkFilled />
              Khoảng Giá
            </div>
            <div
              className={style.closeButton}
              onClick={() => setOpenIndex(null)}
            >
              X
            </div>
          </div>
          <div className={style.itemBox}>
            <div className={style.priceBox}>
              <span>
                <NumberFormatter
                  thousandSeparator
                  value={value[0]}
                  suffix=" ₫"
                />
              </span>
              <span>
                <NumberFormatter
                  thousandSeparator
                  value={value[1]}
                  suffix=" ₫"
                />
              </span>
            </div>

            <RangeSlider
              color="var(--clr-primary)"
              label={null}
              min={0}
              max={5000000}
              step={5000}
              value={value}
              onChange={setValue}
              thumbSize={20}
              size={5}
            />
          </div>
          <div className={style.buttons}>
            <div className={style.closeButton} onClick={cancelPriceFillter}>
              Đóng
            </div>
            <div className={style.submitButton} onClick={setPriceSubmit}>
              Xem kết quả
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
