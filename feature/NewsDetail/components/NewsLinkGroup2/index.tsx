import ArticleCard from "@/common/ArticleCard/Card";
import { Article } from "@/model/DataArticle";
import style from "./NewsLink.module.scss";

type NewsLinkGroupProps = {
  dataArticleNewest: Article[];
};

const NewsLinkGroup2 = ({ dataArticleNewest }: NewsLinkGroupProps) => {
  return (
    <div className={style.articleBox}>
      {dataArticleNewest?.map((item, index) => (
        <div className={style.aritcle} key={index}>
          <ArticleCard data={item} type="col" />
        </div>
      ))}
    </div>
  );
};

export default NewsLinkGroup2;
