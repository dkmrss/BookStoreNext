"use client";
import { getDataListBanner } from "@/api/apiBanner";
import ContentMenu from "@/components/ContentMenu/ContentMenu";
import { isNullOrUndefined } from "@/extension/StringExtension";
import { Banner } from "@/model/Banner";
import { Article } from "@/model/DataArticle";
import { Category } from "@/model/TblCategory";
import { useEffect, useState } from "react";
interface dataProps {
  data: Banner[];
  dataNews: Article[];
}
const Menu: React.FC<dataProps> = ({ data , dataNews}) => {
  
  return (
    <div style={{ padding: "10px 0px" }}>
      <ContentMenu data={data} dataNews={dataNews}/>
    </div>
  );
};
export default Menu;
