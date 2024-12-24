"use client";
import ArticleListCard from "@/common/ArticleCard";
import HeaderSection from "@/components/HeaderSection";
import { Article, DataArticle } from "@/model/DataArticle";
import { useEffect, useState } from "react";
import style from "./style.module.scss";
import { IconNews } from "@tabler/icons-react";
import { getDataListNews } from "@/api/apiNew";

export default function ArticleList() {
  const [dataArticle, setDataArticle] = useState<Article[]>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDataListNews("?field=status&value=0&take=6&skip=0");
      setDataArticle(data.data);
    };
    fetchData();
  }, []);

  return (
    <div className={style.articleList}>
      <div className={style.newTiltle}>
        <IconNews color="var(--clr-primary)" />
        <span>Tin tức mới</span>
      </div>
      <ArticleListCard data={dataArticle} type="row" />
    </div>
  );
}
