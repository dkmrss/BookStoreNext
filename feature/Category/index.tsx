"use client";

import TitleSection from "@/common/TitleSection";
import { TblProduct } from "@/model/TblBook";
import { Pagination } from "@mantine/core";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./Category.module.scss";
import OutStandingList from "./OutStanding";
import ProductList from "./ProductList";
import { getDataListProductBookCategory } from "@/api/ApiBookProduct";
import { Category } from "@/model/TblCategory";
import { getDataInfoCategory } from "@/api/ApiCategory";

export default function CategoryList() {
  const params = useParams();

  const [data, setData] = useState<TblProduct[]>([]);
  const [dataCategory, setDataCategory] = useState<Category>();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  let itemsPerPage = 30;
  const skip = (currentPage - 1) * itemsPerPage;

  const handlePageChange = (page: number) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  
  const callApiGetData = async () => {
    setLoading(true);
    const fetchData = async () => {
      const data = await getDataListProductBookCategory(
        `?category=${params.slug}&offset=${skip}&limit=${itemsPerPage}`
      );
      const totalPages = Math.ceil(data?.totalCount / itemsPerPage);
      setData(data.data);
      setTotalPages(totalPages);
      setLoading(false);
    };
    fetchData();
  };

  const callApiGetDetailCategory = async () => {
    setLoading(true);
    const fetchData = async () => {
      const data = await getDataInfoCategory(
        `/${params.slug}`
      );
      setDataCategory(data.data);
      setLoading(false);
    };
    fetchData();
  };

  useEffect(() => {
    callApiGetData();
  }, [currentPage]);
  useEffect(() => {
    callApiGetDetailCategory();
  }, []);
  return (
    <>
      <div>
        <div className={style.title}>
          <TitleSection  title={dataCategory?.category_name} />
        </div>

        <ProductList data={data || []} />
        <div className={style.paginationContainer}>
          <Pagination
            total={totalPages}
            value={currentPage}
            classNames={style}
            color="var(--clr-light-active-primary)"
            onChange={handlePageChange}
          />
        </div>
        <OutStandingList />
       
      </div>
    </>
  );
}
