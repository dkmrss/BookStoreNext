import ProductCarousel from "@/common/CarouselProductCard";
import HeaderSection from "@/components/HeaderSection";
import style from "./style.module.scss";
import TitleImage from "@/assets/70px Block Hotsale.webp";
import Image from "next/image";

import { TblProduct } from "@/model/TblBook";
import ProductCarouselSale from "@/common/CarouselProductCard/forSale";

interface ProductCarouselProps {
  data: TblProduct[];
}

const FlashSale: React.FC<ProductCarouselProps> = ({ data }) => {
  return (
    <div className={style.saleContainer}>
      <h2 className={style.flashSaleTitle}>
        <span>Ưu Đãi Đặc Biệt</span>
      </h2>
      <div className={style.saleGrid}>
      <ProductCarouselSale data={data} rows={1} auto />
      </div>
    </div>
   
  );
};
export default FlashSale;
