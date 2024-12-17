"use client";
import LinkCommon from "@/common/LinkCommon";
import { useMemo } from "react";
import ContentDetail from "./components/ContentDetail/ContentDetail";
import NewsLinkGroup from "./components/NewsLinkGroup";
import Poster from "./components/Poster";
import style from "./newsDetail.module.scss";
import { ArticleCategoryList, DataArticle } from "@/model/DataArticle";
import { TblUserComment } from "@/model/TblUserComment";
import Comments from "@/common/Comments";
import NewsLinkGroup2 from "./components/NewsLinkGroup2";

type newDetail = {
  data: DataArticle;
  dataComment: TblUserComment[] | null;
  dataArticleCategory: ArticleCategoryList[];
  dataArticleNewest: DataArticle[];
};

const NewsDetail = ({
  data,
  dataComment,
  dataArticleCategory,
  dataArticleNewest,
}: newDetail) => {
  const linksData = useMemo(() => {
    if (!data || !dataArticleCategory || !data.articleCategory) return [];
    const categoryIds = data.articleCategory
      .split(",")
      .filter(Boolean)
      .map(Number);

    return categoryIds
      .map((id) => {
        const matchingCategory = dataArticleCategory.find(
          (category) => category.id === id
        );
        return matchingCategory
          ? {
              linkName: matchingCategory.name,
              linkURL: `/new-list/${matchingCategory.id}`,
            }
          : null;
      })
      .filter(
        (link): link is { linkName: string; linkURL: string } => link !== null
      );
  }, [data, dataArticleCategory]);

  const formatDateStringToDay = (dateString: any) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const formattedDate = `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;
    return formattedDate;
  };

  return (
    <div className={style.newsDetailPage}>
      <div className={style.contentContainer}>
        <div className={style.banner}>
          <img src={`${data?.thumnail}`} alt="#" />
        </div>
        <div className={style.content}>
          <div className={style.newsContent}>
            <div className={style.mainContent}>
              <LinkCommon links={linksData} />
              <h1 className={style.title}>{data?.title}</h1>
              <Poster
                name={data?.createdBy || ""}
                postingDate={formatDateStringToDay(data?.creationDate) || ""}
              />
              <ContentDetail data={data} />
              <div className={style.relatedArticles}>
                <h2>Bài viết mới nhất</h2>
                <NewsLinkGroup2 dataArticleNewest={dataArticleNewest} />
              </div>
            </div>
          </div>
          <Comments
            dataArticle={data || null}
            dataComment={dataComment || null}
          />
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
