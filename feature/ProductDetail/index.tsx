"use client";
import Comments from "@/common/Comments";
import Reviews from "@/common/Reviews";
import { BookImage, TblProduct } from "@/model/TblBook";
import { comment } from "@/model/TblUserComment";
import { Review } from "@/model/TblUserReview";
import { useMediaQuery } from "@mantine/hooks";
import ArticleList from "./components/Article";
import ContentBox from "./components/Content";
import ImageGroup from "./components/ImageGroup";
import ProductDetailTopRight from "./components/ProductDetailTopRight";
import Summary from "./components/Summary";
import style from "./productDetail.module.scss";

type productDetailPageProps = {
  data: TblProduct ;
  dataComment: comment[] | null;
  dataReview: Review[] | null;
  dataInfo: BookImage[] | null;
};

const ProductDetailPage = ({
  data,
  dataComment,
  dataReview,
  dataInfo,
}: productDetailPageProps) => {
  const matches = useMediaQuery("(max-width: 800px)");
  
  return (
    <>
      {matches ? (
        <div className={style.flexBox800px}>
          <ImageGroup data={data || null} dataInfo={dataInfo || null} />
          <ProductDetailTopRight data={data || null} />
          <Summary data={data || null} />
         
          <ContentBox data={data?.product_detail || null} />
          <Reviews dataItem={data || null} dataReview={dataReview || null} />
          <Comments dataItem={data || null} dataComment={dataComment || null} />
        </div>
      ) : (
        <div className={style.flexBox}>
          <div className={style.leftBox}>
          <ImageGroup data={data || null} dataInfo={dataInfo || null} />
            <ContentBox data={data?.product_detail || null} />
            <Reviews dataItem={data || null} dataReview={dataReview || null} />
            <Comments
              dataItem={data || null}
              dataComment={dataComment || null}
            />
            
          </div>
          <div className={style.rightBox}>
            <ProductDetailTopRight data={data || null} />
            <Summary data={data || null} />
            <ArticleList />
            
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailPage;
