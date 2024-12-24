import { Article } from "@/model/DataArticle";
import "./ContentDetail.css";
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
