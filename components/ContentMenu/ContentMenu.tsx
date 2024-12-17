"use client";
import BannerCarousel from "@/common/BannerCarousel/ForMenu";
import { Banner } from "@/model/Banner";
import { Box } from "@mantine/core";
import style from "./ContentMenu.module.scss";
import SidebarMenu from "./SidebarMenu/SidebarMenu";
interface dataProps {
  data: Banner[];
}
const ContentMenu: React.FC<dataProps> = ({ data }) => {
  console.log("data", data)
  return (
    <Box className={style.container_menu}>
      <SidebarMenu />
      <BannerCarousel data={data} />
      {/* <ProductAdvertising /> */}
    </Box>
  );
};

export default ContentMenu;
