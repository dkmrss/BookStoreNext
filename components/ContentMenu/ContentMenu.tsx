"use client";
import BannerCarousel from "@/common/BannerCarousel/ForMenu";
import { Banner } from "@/model/Banner";
import { Box } from "@mantine/core";
import style from "./ContentMenu.module.scss";
import SidebarMenu from "./SidebarMenu/SidebarMenu";
import { Category } from "@/model/TblCategory";
import { Article } from "@/model/DataArticle";
import ArticleCardBanner from "@/components/ContentMenu/ArticleCardBanner";
interface dataProps {
  data: Banner[];
  dataNews: Article[];
}
const ContentMenu: React.FC<dataProps> = ({ data, dataNews }) => {
 
  return (
    <Box className={style.container_menu}>
      <div className={style.banner}><BannerCarousel data={data} /></div>
      <div className={style.new}><ArticleCardBanner dataNews={dataNews} /></div>
    </Box>
  );
};

export default ContentMenu;
