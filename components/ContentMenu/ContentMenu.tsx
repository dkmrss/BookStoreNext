"use client";
import BannerCarousel from "@/common/BannerCarousel/ForMenu";
import { Banner } from "@/model/Banner";
import { Box } from "@mantine/core";
import style from "./ContentMenu.module.scss";
import SidebarMenu from "./SidebarMenu/SidebarMenu";
import { Category } from "@/model/TblCategory";
interface dataProps {
  data: Banner[];
  dataCategory: Category[];
}
const ContentMenu: React.FC<dataProps> = ({ data, dataCategory }) => {
 
  return (
    <Box className={style.container_menu}>
      <SidebarMenu dataCategory={dataCategory}/>
      <BannerCarousel data={data} />
      {/* <ProductAdvertising /> */}
    </Box>
  );
};

export default ContentMenu;
