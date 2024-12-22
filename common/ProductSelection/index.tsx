"use client";
import { Box, Flex, Group, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import React, { ReactNode } from "react";
import styles from "./ProductSelection.module.scss";

import { Image } from "@mantine/core";
import { Category } from "@/model/TblCategory";
const ProductSelection: React.FC<AppContainerProps> = ({
  children,
  className,
  element,
  ...otherProps
}) => {
  return (
    <div className={`${styles.ProductSelection} ${className}`} {...otherProps}>
      {/* <Link href={"/"}> */}
      <Link href={`/category/${element.id}`}>
        <Box>
          <Group wrap="nowrap" justify="space-between">
            <Flex align="center">
              <Image
                className={styles.image}
                src={`http://localhost:3001/${element.illustration}`}
                alt={element.category_name}
              />
              <Text lineClamp={1} size="sm" fw={600} className={styles.text}>
                {element.category_name}
              </Text>
            </Flex>
            <IconChevronRight className={styles.iconChevronRight} size={20} />
          </Group>
        </Box>
      </Link>
    </div>
  );
};

type AppContainerProps = {
  children?: ReactNode;
  className?: string;
  element: Category;
};

export default ProductSelection;
