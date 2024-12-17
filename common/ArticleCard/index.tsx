// ProductCard.js
"use client";
import { Article, DataArticle } from "@/model/DataArticle";
import style from "./ArticleList.module.scss";

import ArticleCard from "./Card";

interface ProductCardProps {
  data: Article[] | undefined;
  type: "row" | "col";
  height?: string;
  summary?: boolean;
}

const ArticleListCard: React.FC<ProductCardProps> = ({
  data,
  type,
  height,
  summary,
}) => {
  return (
    <div className={style.containerBox}>
      <div className={style[type]}>
        {data?.map((item, index) => (
          <div className={style.articleBox} key={index}>
            <ArticleCard
              data={item}
              type={type}
              height={"130px"}
              summary={summary}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleListCard;
