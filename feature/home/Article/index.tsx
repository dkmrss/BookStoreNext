"use client";
import ArticleListCard from "@/common/ArticleCard";
import HeaderSection from "@/components/HeaderSection";
import { Article } from "@/model/DataArticle";
import Link from "next/link";
import style from "./style.module.scss"
interface dataProps {
  data: Article[];
}
const ArticleList: React.FC<dataProps> = ({ data }) => {
  return (
    <div style={{ padding: "10px 0px" }}>
      <div className={style.titleBox}>
        <div>
        <HeaderSection title={"TIN TỨC"} />
        </div>
        <div className={style.linkBox}>
          <Link className={style.link} href={"/new-list"} >Xem thêm</Link>
        </div>
      </div>
      
      <ArticleListCard data={data} type="col" />
    </div>
  );
};

export default ArticleList;
