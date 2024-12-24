"use client";

import { useEffect, useState } from "react";
import { Pagination } from "@mantine/core";
import { useParams } from "next/navigation";
import style from "./productList.module.scss";
import { TblProduct } from "@/model/TblBook";
import ProductList from "./ProductList";
import TitleSection from "@/common/TitleSection";
import { isNullOrUndefined } from "@/extension/StringExtension";
import OutStandingList from "./OutStanding";

import { Article } from "@/model/DataArticle";
import ArticleListCard from "@/common/ArticleCard";
import { getSearchProduct } from "@/api/ApiBookProduct";

interface SearchListProps {
  dataArticle: Article[];
}

export default function SearchList({ dataArticle }: SearchListProps) {
  const params = useParams();

  const [data, setData] = useState<TblProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 12;
  const skip = (currentPage - 1) * itemsPerPage;

  const handlePageChange = (page: number) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  const decodeVietnamese = (encodedStr: string | string[]) => {
    try {
      const value = Array.isArray(encodedStr) ? encodedStr[0] : encodedStr;
      return decodeURIComponent(value);
    } catch (error) {
      console.error("Error decoding the string:", error);
      return null;
    }
  };

  const callApiGetData = async () => {
    setLoading(true);
    try {
      const response = await getSearchProduct(`?searchTerm=${params.slug}&offset=${skip}&limit=${itemsPerPage}`);
      if (!isNullOrUndefined(response?.data)) {
        setData(response.data);
        setTotal(response.totalCount || 0);
        setTotalPages(Math.ceil((response.totalCount || 0) / itemsPerPage));
      } else {
        setData([]);
        setTotal(0);
        setTotalPages(0);
      }
    } catch (error) {
      console.error("Error fetching search data:", error);
      setData([]);
      setTotal(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callApiGetData();
  }, [ ]);

  return (
    <>
      <div>
        <div className={style.title}>
          <TitleSection title={`Kết quả tìm kiếm: ${decodeVietnamese(params.slug)}`} />
          <p className={style.total}>Tìm thấy {total} sản phẩm</p>
        </div>
        <div className={style.bodyBox}>
        <div className={style.leftBox}>
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
        </div>
        {dataArticle?.length > 0 && (
          <div className={style.articleList}>
            <div className={style.newTitle}>
              <span>Bài viết liên quan</span>
            </div>
            <ArticleListCard data={dataArticle} type="row" />
          </div>
        )}
        
        </div>
        <OutStandingList />
      </div>
    </>
  );
}
