"use client";
import Accessory from "@/common/Accessory";
import { Divider } from "@mantine/core";
import { usePathname } from "next/navigation";
import CompanyInfo from "./CompanyInfomation";
import ContactInfo from "./ContactInfo/ContactInfo";
import style from "./Footer.module.scss";

const FooterComponent = () => {
  const pathname = usePathname();
  const showAccessory =
    pathname === "/" ||
    pathname.startsWith("/product-detail") ||
    pathname.startsWith("/category") ||
    pathname.startsWith("/Search");

  return (
    <div className={style.footerContainer}>
      {showAccessory ? (
        <div className={style.footer}>
          <Accessory />
          <ContactInfo />
        </div>
      ) : (
        <>
          <Divider className={style.divider1} size="sm" variant="solid" />
          <div className={style.footer}>
            <ContactInfo />
          </div>
        </>
      )}

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
