"use client"
import { useEffect, useState } from "react";
import HeaderSection from "../HeaderSection";
import AccessoriesList from "./AccessoriesList";
import styles from "./AccessoriesSection.module.scss";
import { getDataListCategory } from "@/api/ApiCategory";

const AccessoriesSection =  () => {
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
    <section className={styles.accessoriesSection}>
      <HeaderSection title="Danh mục sản phẩm" />
      <AccessoriesList accessoriesArr={dataCategory} />
    </section>
  );
};

export default AccessoriesSection;