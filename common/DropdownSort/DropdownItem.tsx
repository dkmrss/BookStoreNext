import { TablerIconsProps } from "@tabler/icons-react";
import React from "react";
import styles from "./DropdownSort.module.scss";

interface DropdownItemProps {
  icon: React.ComponentType<TablerIconsProps>; 
  label: string;
  value: string;
  onSelect: (value: string) => void;
  isSelected: boolean;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  icon: Icon, 
  label,
  value,
  onSelect,
  isSelected,
}) => {
  return (
    <div
      className={isSelected ? styles.selectedDropdownItem : styles.dropdownItem} 
      onClick={() => onSelect(value)}
    >
      <Icon className={styles.icon}/> 
      {label}
    </div>
  );
};
