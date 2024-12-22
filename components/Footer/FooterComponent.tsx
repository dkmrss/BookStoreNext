"use client";
import { getDataListCategory } from "@/api/ApiCategory";
import { Category } from "@/model/TblCategory";
import { Divider } from "@mantine/core";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AccessoriesSection from "../AccessoriesSection";
import CompanyInfo from "./CompanyInfomation";
import ContactInfo from "./ContactInfo/ContactInfo";
import style from "./Footer.module.scss";

const FooterComponent = () => {
  
 
 
  return (
    <div className={style.footerContainer}>
     
        <div className={style.footer}>
          <AccessoriesSection/>
          <ContactInfo />
        </div>
      

      <Divider className={style.divider} size="sm" my="sm" variant="solid" />

      <div className={style.soure}>
        <div className={style.container}>
          <CompanyInfo />
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
