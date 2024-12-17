import PublicCrousel from "@/common/BannerCarousel/Public";
import { tblBanner } from "@/model/Banner";

interface CarouselProps {
  data: tblBanner[];
}
const BannerList: React.FC<CarouselProps> = ({ data }) => {
  return (
    <div style={{ padding: "10px 0px", display: "flex", gap: 10 }}>
      <PublicCrousel data={data} type="forCategory" />
    </div>
  );
};

export default BannerList;
