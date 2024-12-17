
import PublicCrousel from "@/common/BannerCarousel/Public";
import HeaderSection from "@/components/HeaderSection";
import { tblBanner } from "@/model/Banner";
interface dataProps {
  data: tblBanner[];
}
const SalePayment: React.FC<dataProps> = ({ data }) => {
  return (
    <div style={{ padding: "10px 0px" }}>
      <HeaderSection title={"ƯU ĐÃI THANH TOÁN"} />
      <PublicCrousel data={data} type="forHome" />
    </div>
  );
};

export default SalePayment;
