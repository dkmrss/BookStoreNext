import { useState } from "react";
import { InputBase, Combobox, useCombobox } from "@mantine/core";
import {
  IconEye,
  IconStars,
  IconSortAscending,
  IconSortDescending,
  IconChevronDown,
} from "@tabler/icons-react";
import style from "./style.module.scss";

type SortProps = {
  priceFilter: string;
  handleChangePriceFilter: (filter: string) => void;
};

type GroceryOption = {
  icon: JSX.Element;
  value: string;
  label: string;
};

const groceries: GroceryOption[] = [
  {
    icon: <IconEye />,
    value: "all",
    label: "Xem tất cả",
  },
  // {
  //   icon: <IconStars />,
  //   value: "Mới nhất",
  // },
  {
    icon: <IconSortAscending />,
    value: "increase",
    label: "Giá từ thấp đến cao",
  },
  {
    icon: <IconSortDescending />,
    value: "decrease",
    label: "Giá từ cao đến thấp",
  },
];

function Sort({ priceFilter, handleChangePriceFilter }: SortProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = groceries.map((item, index) => (
    <Combobox.Option
      className={item.value === priceFilter ? style.selected : style.option}
      value={item.value}
      key={index}
      active={item.value === priceFilter}
    >
      {item.icon}
      {item.label}
    </Combobox.Option>
  ));

  const options2 = groceries.map((item, index) => (
    <div
      className={item.value === priceFilter ? style.selected2 : style.option2}
      key={index}
      onClick={() => handleChangePriceFilter(item.value)}
    >
      {item.label}
    </div>
  ));
  return (
    <div className={style.sortContainer}>
      <div className={style.sort2}>
        <div className={style.view}>
          <IconEye />
          <span>Xem nhiều</span>
        </div>
        {options2}
      </div>
      <div className={style.sort1}>
        <Combobox
          store={combobox}
          onOptionSubmit={(val) => {
            handleChangePriceFilter(val);
            combobox.closeDropdown();
          }}
        >
          <Combobox.Target>
            <InputBase
              component="button"
              type="button"
              pointer
              className={style.button}
              rightSection={<IconChevronDown />}
              rightSectionPointerEvents="none"
              onClick={() => combobox.toggleDropdown()}
            >
              {priceFilter && (
                <div className={style.value}>
                  {
                    groceries.filter((item) => item.value === priceFilter)[0]
                      ?.icon
                  }
                  {
                    groceries.filter((item) => item.value === priceFilter)[0]
                      ?.label
                  }
                </div>
              )}
            </InputBase>
          </Combobox.Target>

          <Combobox.Dropdown className={style.dropdown}>
            <Combobox.Options>{options}</Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
      </div>
    </div>
  );
}

export default Sort;
