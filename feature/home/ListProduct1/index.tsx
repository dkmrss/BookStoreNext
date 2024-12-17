"use client";
import ProductCarousel from "@/common/CarouselProductCard";
import HeaderSection from "@/components/HeaderSection";
import { TblItem } from "@/model/ProductList";
import { TblProduct } from "@/model/TblBook";

interface dataProps {
  data: TblProduct[];
}
const ListProduct1: React.FC<dataProps> = ({ data }) => {
  const title = "Light Novel";
  
  return (
    <div style={{ padding: "10px 0px" }}>
      <HeaderSection title={title} />
      <ProductCarousel data={data} rows={2} />
    </div>
  );
};

export default ListProduct1;
