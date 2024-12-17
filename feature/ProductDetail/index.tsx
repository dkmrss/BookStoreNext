"use client";
import { TblItem } from "@/model/ProductList";
import { TblUserComment } from "@/model/TblUserComment";
import { TblUserReview } from "@/model/TblUserReview";
import ImageGroup from "./components/ImageGroup";
import ProductDetailTopRight from "./components/ProductDetailTopRight";
import Reviews from "@/common/Reviews";
import Comments from "@/common/Comments";
import Specifications from "./components/Specifications";
import style from "./productDetail.module.scss";
import ProductCarousel from "@/common/CarouselProductCard";
import ContentBox from "./components/Content";
import ArticleListCard from "@/common/ArticleCard";
import InformationCard from "@/common/InformationCard";
import Gifts from "./components/Gifts";
import Summary from "./components/Summary";
import StoreAvailables from "./components/StoreAvailables";
import { useMediaQuery, useViewportSize } from "@mantine/hooks";
import QuestionCard from "@/common/FrequentlyAskedQuestions";
import TabProduct from "./components/ProductTab";
import ArticleList from "./components/Article";
import { BookImage, TblProduct } from "@/model/TblBook";

type productDetailPageProps = {
  data: TblProduct | null;
  dataComment: TblUserComment[] | null;
  dataReview: TblUserReview[] | null;
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
