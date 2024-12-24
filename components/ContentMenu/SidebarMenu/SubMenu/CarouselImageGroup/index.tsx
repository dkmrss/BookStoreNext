import { EmblaOptionsType } from "embla-carousel";
import { StaticImageData } from "next/image";
import EmblaCarousel from "./EmblaCarousel";
interface dataProps {
  children: {
    value?: string;
    label: string;
    isNodata?: boolean;
    image?: StaticImageData;
  }[];
}
const MenuCarousel: React.FC<dataProps> = ({ children }) => {
  const OPTIONS: EmblaOptionsType = {};
  return (
    <>
      <EmblaCarousel children={children} options={OPTIONS} />
    </>
  );
};

export default MenuCarousel;
