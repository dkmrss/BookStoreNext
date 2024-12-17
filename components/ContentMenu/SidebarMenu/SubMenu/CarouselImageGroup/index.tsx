import Slide2 from "@/assets/carousel_1.png";
import Slide1 from "@/assets/img-news-main-detail.png";
import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "./EmblaCarousel";
import { getListBannerSlideData } from "@/api/apiBanner";
import { tblBanner } from "@/model/Banner";
import { useEffect, useState } from "react";
import { StaticImageData } from "next/image";
interface dataProps {
  children: {
    value?: string;
    label: string;
    isNodata?: boolean;
    image?: StaticImageData;
  }[];
}
const MenuCarousel: React.FC<dataProps> = ({ children }) => {
  const OPTIONS: EmblaOptionsType = {};
  return (
    <>
      <EmblaCarousel children={children} options={OPTIONS} />
    </>
  );
};

export default MenuCarousel;
