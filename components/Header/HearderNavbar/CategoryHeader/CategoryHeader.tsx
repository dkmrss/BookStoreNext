"use client";
import React, { useEffect, useState } from "react";
import style from "./CategoryHeader.module.scss";
import { Box, Flex, Group, ScrollArea, Text, Title } from "@mantine/core";
import Link from "next/link";
import CategoryImage1 from "@/assets/IconMegaMenu/category1.png";
import CategoryImage2 from "@/assets/IconMegaMenu/category2.png";
import CategoryImage3 from "@/assets/IconMegaMenu/category3.png";
import CategoryImage4 from "@/assets/IconMegaMenu/category4.png";
import CategoryImage5 from "@/assets/IconMegaMenu/category5.png";
import CategoryImage6 from "@/assets/IconMegaMenu/category6.png";
import CategoryImage7 from "@/assets/IconMegaMenu/category7.png";
import CategoryImage8 from "@/assets/IconMegaMenu/category8.png";
import CategoryImage9 from "@/assets/IconMegaMenu/category9.png";
import CategoryImage10 from "@/assets/IconMegaMenu/category10.png";
import ButtonCategory from "@/common/ButtonCategory/ButtonCategory";
import Image from "next/image";
import { getDataListCategory } from "@/api/ApiCategory";
import AccessoriesList from "@/components/AccessoriesSection/AccessoriesList";
import AccessoriesListRes from "./AccessoriesList";

type DataProps = {};

const CategoryHeader: React.FC<DataProps> = ({}) => {
  const [dataCategory, setDataCategory] = useState([]);

  useEffect(() => {
    const fetchDataCategory = async () => {
      try {
        const response = await getDataListCategory("/0"); // Call proxy endpoint
        setDataCategory(response.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchDataCategory();
  }, []);

  return (
    <Box className={style.container}>
      <AccessoriesListRes accessoriesArr={dataCategory} />
      <Box className={style.box_right} p={8}></Box>
    </Box>
  );
};

export default CategoryHeader;
