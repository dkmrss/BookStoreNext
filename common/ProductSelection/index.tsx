"use client";
import { Box, Flex, Group, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import React, { ReactNode } from "react";
import styles from "./ProductSelection.module.scss";
import Image, { StaticImageData } from "next/image";
const ProductSelection: React.FC<AppContainerProps> = ({
  children,
  className,
  element,
  ...otherProps
}) => {
  return (
    <div className={`${styles.ProductSelection} ${className}`} {...otherProps}>
      {/* <Link href={"/"}> */}
      <Link href={element.link}>
        <Box>
          <Group wrap="nowrap" justify="space-between">
            <Flex align="center">
              <Image
                className={styles.image}
                src={element.image}
                alt={element.text}
              />
              <Text lineClamp={1} size="sm" fw={600} className={styles.text}>
                {element.text}
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
  element: {
    id: number;
    text: string;
    image: StaticImageData;
    link: string;
  };
};

export default ProductSelection;
