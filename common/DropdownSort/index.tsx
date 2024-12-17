"use client";
import { IconChevronDown, TablerIconsProps } from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";
import { DropdownItem } from "./DropdownItem";
import styles from "./DropdownSort.module.scss";

interface DropdownProps {
  title: string;
  icon: React.ComponentType<TablerIconsProps>;
  options: {
    icon: React.ComponentType<TablerIconsProps>;
    label: string;
    value: string;
  }[];
  onSelect: (value: string) => void;
}

const Dropdown = ({
  icon: TitleIcon,
  title,
  options,
  onSelect,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (value: string) => {
    setSelectedOption(value);
    onSelect(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOptionObject = options.find(
    (option) => option.value === selectedOption
  );

  return (
    <div className={styles.dropdown} ref={selectRef}>
      <button
        className={
          !isOpen ? styles.dropdownToggle : styles.openedDropdownToggle
        }
        onClick={toggleDropdown}
      >
        {selectedOptionObject ? (
          <>
            <selectedOptionObject.icon className={styles.iconTitle} />
            {selectedOptionObject.label}
          </>
        ) : (
          <>
            <TitleIcon className={styles.iconTitle} />
            {title}
          </>
        )}
        <IconChevronDown className={styles.iconDropDown} />
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option) => (
            <DropdownItem
              key={option.value}
              icon={option.icon}
              label={option.label}
              value={option.value}
              onSelect={handleSelect}
              isSelected={selectedOption === option.value}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
