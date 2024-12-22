"use client";
import ProductSelection from "@/common/ProductSelection";
import { Category } from "@/model/TblCategory";
import React, { useState } from "react";
import style from "./SidebarMenu.module.scss";
import Link from "next/link";
import { Box, Flex, Group, Image, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";


interface dataProps {
  dataCategory?: Category[];
}


const SidebarMenu: React.FC<dataProps> = ({ dataCategory }) => {
  return (
    <div className={style.sidebar}>
      {dataCategory?.map((value) => (
        <div
          key={value.id}
        >
          <ProductSelection element={value} />
        </div>
      ))}
      <div className={`${style.ProductSelection}`} >
      <Link href={`/new-list`}>
        <Box>
          <Group wrap="nowrap" justify="space-between">
            <Flex align="center">
              <Image
                className={style.image}
                src={`http://localhost:3001/assets/Category/new.jpg`}
                alt={`Tin tức`}
              />
              <Text lineClamp={1} size="sm" fw={600} className={style.text}>
                Tin tức
              </Text>
            </Flex>
            <IconChevronRight className={style.iconChevronRight} size={20} />
          </Group>
        </Box>
      </Link>
    </div>
    </div>
  );
};

export default SidebarMenu;
