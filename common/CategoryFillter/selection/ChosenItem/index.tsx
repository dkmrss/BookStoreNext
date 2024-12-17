import React from "react";
import { Flex, NumberFormatter } from "@mantine/core";
import { IconCircleXFilled } from "@tabler/icons-react";
import Style from "./ChosenItem.module.scss";
import { AttributeOptionType } from "@/model/TblCategory";

interface ItemListProps {
  items: (AttributeOptionType | null)[];
  onRemove: (index: number) => void;
  onRemoveAll: () => void;

  priceRange?: [number, number | undefined];
}

const ChosenItem: React.FC<ItemListProps> = ({
  items,
  onRemove,
  onRemoveAll,
  priceRange,
}) => {
  const allNulls = items.every((item) => item === null || item === undefined);
  const isDefaultPriceRange =
    priceRange && priceRange[0] === 0 && priceRange[1] === 0;

  return (
    <div>
      {(!allNulls || (priceRange && !isDefaultPriceRange && priceRange[1])) && (
        <p className={Style.title}>Đang lọc theo:</p>
      )}
      <Flex>
        {items?.map(
          (item, index) =>
            item && (
              <div className={Style.fillter} key={index}>
                {item?.attributeName} : {item?.label}
                <IconCircleXFilled
                  width={15}
                  height={15}
                  color="var(--clr-primary)"
                  onClick={() => onRemove(index)}
                />
              </div>
            )
        )}
        {priceRange && !isDefaultPriceRange && priceRange[1] && (
          <div className={Style.fillter}>
            Giá:{" "}
            <NumberFormatter
              thousandSeparator
              value={priceRange[0]}
              suffix=" ₫"
            />
            -{" "}
            <NumberFormatter
              thousandSeparator
              value={priceRange[1]}
              suffix=" ₫"
            />
          </div>
        )}
        {(!allNulls ||
          (priceRange && !isDefaultPriceRange && priceRange[1])) && (
          <div className={Style.deleteAll} onClick={onRemoveAll}>
            Xoá hết
          </div>
        )}
      </Flex>
    </div>
  );
};

export default ChosenItem;
