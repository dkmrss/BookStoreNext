import { useEffect, useState } from "react";
import "./ContentDetail.css";
import { Article, DataArticle } from "@/model/DataArticle";
import style from "./style.module.scss";
const ContentDetail = ({ data }: { data: Article }) => {
  return (
    <>
      {data?.content && (
        <div
          className={style.contentText}
          dangerouslySetInnerHTML={{
            __html: data.content,
          }}
        />
      )}
    </>
  );
};

export default ContentDetail;
