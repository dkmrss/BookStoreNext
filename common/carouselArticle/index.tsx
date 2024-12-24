"use client";
import { Article } from "@/model/DataArticle";
import { EmblaOptionsType } from "embla-carousel";
import React from "react";
import style from "./embla.module.scss";
import EmblaCarousel from "./EmblaCarousel";
interface ArticleCarouselDemoProps {
  data: Article[] | undefined;
  auto?: boolean;
  type: "row" | "col" | "carousel-col" | "carousel-row";
  typeSlide: "rowSlide" | "colSlide";
}
const ArticleCarousel: React.FC<ArticleCarouselDemoProps> = ({
  data,
  auto,
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
        
        auto={auto}
      />
    </div>
  );
};

export default ArticleCarousel;
