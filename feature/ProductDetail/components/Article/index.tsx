"use client";
import ArticleListCard from "@/common/ArticleCard";
import HeaderSection from "@/components/HeaderSection";
import { getListArticle } from "@/api/apiArticle";
import { DataArticle } from "@/model/DataArticle";
import { useEffect, useState } from "react";
import style from "./style.module.scss";
import { IconNews } from "@tabler/icons-react";

export default function ArticleList() {
  const [dataArticle, setDataArticle] = useState<DataArticle[]>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getListArticle("Status=1&Take=4");
      setDataArticle(data.data);
    };
    fetchData();
  }, []);

  return (
    <div className={style.articleList}>
      <div className={style.newTiltle}>
        <IconNews color="var(--clr-primary)" />
        <span>Bài viết liên quan</span>
      </div>
      {/* <ArticleListCard data={dataArticle} type="row" /> */}
    </div>
  );
}
