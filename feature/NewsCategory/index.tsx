"use client";
import { getListArticle } from "@/api/apiArticle";
import imageNull from "@/assets/noValue.png";
import imageWait from "@/assets/wait.jpg";
import { ArticleCategoryList, DataArticle } from "@/model/DataArticle";
import ArticleListCard from "@/common/ArticleCard";
import { Flex, Loader, Pagination } from "@mantine/core";
import Image from "next/image";
import { useEffect, useState } from "react";
import style from "./NewsCategory.module.scss";
import ArticleCarousel from "../../common/carouselArticle";

export default function NewsCategory({
  params,
  data,
}: {
  params: { slug: string };
  data: ArticleCategoryList[];
}) {
  const [dataArticle, setDataArticle] = useState<DataArticle[]>();
  const [dataArticleBanner, setDataArticleBanner] = useState<DataArticle[]>();
  const [loading, setLoading] = useState(false);
  const [loadingBanner, setLoadingBanner] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8;
  const skip = (currentPage - 1) * itemsPerPage;

  const handlePageChange = (page: number) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };
  const callApiGetData = async () => {
    setLoading(true);
    const fetchData = async () => {
      const data = await getListArticle(
        `Status=1&ArticleCategoryId=${params.slug}&Skip=${skip}&Take=${itemsPerPage}`
      );
      const totalPages = Math.ceil(data.totalCount / itemsPerPage);
      setDataArticle(data.data);
      setTotalPages(totalPages);
      setLoading(false);
    };
    fetchData();
  };

  const callApiGetDataForBanner = async () => {
    setLoadingBanner(true);
    const fetchData = async () => {
      const data = await getListArticle(
        `Status=1&ArticleCategoryId=${params.slug}&Skip=${skip}&Take=${itemsPerPage}`
      );
      setDataArticleBanner(data.data);
      setLoadingBanner(false);
    };
    fetchData();
  };

  useEffect(() => {
    callApiGetData();
  }, [currentPage]);

  useEffect(() => {
    callApiGetDataForBanner();
  }, []);

  return (
    <>
      {loading && loadingBanner ? (
        <div className={style.loaderBox}>
          <div className={style.noValue}>
            <Image src={imageWait} alt="" />
            <Loader type="bars" color={"var(--clr-primary"} />
            <div>Đang lấy thông tin bài viết vui lòng đợi trong giây lát</div>
          </div>
        </div>
      ) : (
        <div className={style.newCategoryBox}>
          {!dataArticle || dataArticle.length === 0 ? (
            <div className={style.message}>
              <div className={style.noValue}>
                <Image src={imageNull} alt="" />
                <div>Danh mục bạn chọn hiện tại chưa có bài viết nào</div>
              </div>
            </div>
          ) : (
            <div className={style.Main}>
              <ArticleCarousel
                data={dataArticleBanner}
                dataCategory={data}
                type="carousel-row"
                typeSlide="rowSlide"
              />
              <Flex className={style.listNews} gap="30px">
                <ArticleListCard
                  data={dataArticle}
                  type="row"
                  height="180px"
                  summary
                />
              </Flex>
              <div className={style.pagination}>
                <Pagination
                  total={totalPages}
                  value={currentPage}
                  color="#1F67D2"
                  onChange={handlePageChange}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
