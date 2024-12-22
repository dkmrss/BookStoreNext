"use client";
import { getDataListBanner } from "@/api/apiBanner";
import ContentMenu from "@/components/ContentMenu/ContentMenu";
import { isNullOrUndefined } from "@/extension/StringExtension";
import { Banner } from "@/model/Banner";
import { Category } from "@/model/TblCategory";
import { useEffect, useState } from "react";
interface dataProps {
  data: Banner[];
  dataCategory: Category[];
}
const Menu: React.FC<dataProps> = ({ data , dataCategory}) => {
  
  return (
    <div style={{ padding: "10px 0px" }}>
      <ContentMenu data={data} dataCategory={dataCategory}/>
    </div>
  );
};
export default Menu;
