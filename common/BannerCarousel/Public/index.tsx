import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "./EmblaCarousel";
import { Banner } from "@/model/Banner";


interface CarouselProps {
  data: Banner[];
  type: "forHome" | "forCategory";
}
const PublicCrousel: React.FC<CarouselProps> = ({ data, type }) => {
  const OPTIONS: EmblaOptionsType = { slidesToScroll: "auto" };
  return (
    <>
      <EmblaCarousel slides={data} options={OPTIONS} type={type} />
    </>
  );
};

export default PublicCrousel;
