"use client";
import InformationCard from "@/common/InformationCard";
import { Button, Flex, Tabs } from "@mantine/core";
import { useState } from "react";
import style from "./style.module.scss";
import ProductCarousel from "@/common/CarouselProductCard";
import { TblItem } from "@/model/ProductList";

interface ContentProps {
  data: TblItem[] | [];
}
const TabProduct: React.FC<ContentProps> = ({ data }) => {
  return (
    <div style={{ marginTop: 20, marginBottom: 20 }}>
      <Tabs
        variant="pills"
        color="var(--clr-bg-light-red)"
        defaultValue="gallery"
        classNames={{ tab: style.tab }}
      >
        <Tabs.List>
          <Tabs.Tab value="gallery">Sản phẩm liên quan</Tabs.Tab>
          {/* <Tabs.Tab value="messages">Tham khảo 2</Tabs.Tab> */}
        </Tabs.List>

        <Tabs.Panel value="gallery">
          <div className={style.productCarousel}>
            <ProductCarousel data={data} rows={1} auto detail />
          </div>
        </Tabs.Panel>

        {/* <Tabs.Panel value="messages">
          <div className={style.productCarousel}>
            <ProductCarousel data={data} rows={1} auto />
          </div>
        </Tabs.Panel> */}
      </Tabs>
    </div>
  );
};

export default TabProduct;
