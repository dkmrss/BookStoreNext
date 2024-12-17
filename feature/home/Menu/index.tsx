"use client";
import { getDataListBanner } from "@/api/apiBanner";
import ContentMenu from "@/components/ContentMenu/ContentMenu";
import { isNullOrUndefined } from "@/extension/StringExtension";
import { Banner } from "@/model/Banner";
import { useEffect, useState } from "react";
interface dataProps {
  data: Banner[];
}
const Menu: React.FC<dataProps> = ({ data }) => {
  
  return (
    <div style={{ padding: "10px 0px" }}>
      <ContentMenu data={data} />
    </div>
  );
};
export default Menu;
