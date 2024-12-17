"use client";
import ListButtonSection from "@/common/ListButtonSection";
import TitleSection from "@/common/TitleSection";
import style from "./HeaderSection.module.scss";

type HeaderSection = {
  title: string;
 
};

const HeaderSection = ({ title,  }: HeaderSection) => {
  return (
    <>
      <div className={style.headerSection}>
        <TitleSection title={title} />
       
      </div>
    </>
  );
};

export default HeaderSection;
