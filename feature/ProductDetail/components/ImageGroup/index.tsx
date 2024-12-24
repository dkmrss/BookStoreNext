import { BookImage, TblProduct } from "@/model/TblBook";
import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "./EmblaCarousel";

type ImageGroupProps = {
  data: TblProduct | null;
  dataInfo: BookImage[] | null;
};

const ImageGroup = ({ data, dataInfo }: ImageGroupProps) => {
  const OPTIONS: EmblaOptionsType = {};
  return (
    <div>
      <EmblaCarousel
        data={data}
        slides={dataInfo|| []}
        options={OPTIONS}
      />
    </div>
  );
};

export default ImageGroup;
