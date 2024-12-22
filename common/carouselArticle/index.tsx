"use client";
import { EmblaOptionsType } from "embla-carousel";
import React from "react";
import EmblaCarousel from "./EmblaCarousel";
import { TblItem } from "@/model/ProductList";
import { Article, ArticleCategoryList, DataArticle } from "@/model/DataArticle";
import style from "./embla.module.scss";
interface ArticleCarouselDemoProps {
  data: Article[] | undefined;
  dataCategory?: ArticleCategoryList[];
  auto?: boolean;
  type: "row" | "col" | "carousel-col" | "carousel-row";
  typeSlide: "rowSlide" | "colSlide";
}
const ArticleCarousel: React.FC<ArticleCarouselDemoProps> = ({
  data,
  auto,
  dataCategory,
  type,
  typeSlide,
}) => {
  const OPTIONS: EmblaOptionsType = { align: "start" };
  return (
    <div className={style[typeSlide]}>
      <EmblaCarousel
        data={data}
        type={type}
        options={OPTIONS}
        dataCategory={dataCategory}
        auto={auto}
      />
    </div>
  );
};

export default ArticleCarousel;
