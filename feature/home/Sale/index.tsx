"use client";
import { getListBannerSlideData } from "@/api/apiBanner";
import Slide3 from "@/assets/banner2.png";
import Slide2 from "@/assets/carousel_1.png";
import Slide1 from "@/assets/img-news-main-detail.png";
import PublicCrousel from "@/common/BannerCarousel/Public";
import HeaderSection from "@/components/HeaderSection";
import { tblBanner } from "@/model/Banner";
import { useEffect, useState } from "react";

interface dataProps {
  data: tblBanner[];
}
const SaleCarousel: React.FC<dataProps> = ({ data }) => {
  return (
    <div style={{ padding: "10px 0px" }}>
      <HeaderSection title={"ƯU ĐÃI HỌC SINH - SINH VIÊN"} />
      <PublicCrousel data={data} type="forHome" />
    </div>
  );
};
export default SaleCarousel;
