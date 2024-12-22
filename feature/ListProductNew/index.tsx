"use client"
import ProductCarouselSale from "@/common/CarouselProductCard/forSale";
import { TblProduct } from "@/model/TblBook";
import { useEffect, useState } from "react";
import ProductCollum from "./ProductCollum";
import style from "./style.module.scss";

interface ProductCarouselProps {
  data: TblProduct[];
}

const ListProductNew: React.FC<ProductCarouselProps> = ({ data }) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={style.saleBackground} >
      <div className={style.flashSaleTitle}>
        <span className={style.title}>SẢN PHẨM MỚI</span>
      </div>
      {width < 1000 ? (<div className={style.flashSaleItem}>
        <ProductCarouselSale data={data} rows={1} auto />
      </div>):(<div className={style.flashSaleItem}>
        <ProductCollum data={data}  />
      </div>)}        
    </div>
  );
};
export default ListProductNew;
