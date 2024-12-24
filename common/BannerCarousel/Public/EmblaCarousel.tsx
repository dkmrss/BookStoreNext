"use client";
import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import style from "./embla.module.scss";
import Autoplay from "embla-carousel-autoplay";
import { Banner } from "@/model/Banner";

type PropType = {
  slides: Banner[];
  options?: EmblaOptionsType;
  type: "forHome" | "forCategory";
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, type } = props;
  const dataArray = Object?.values(slides || []);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ delay: 3000, stopOnMouseEnter: true, stopOnInteraction: false }),
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const prependBaseUrl = (src: any) => {
    const baseUrl = "https://hanoicomputercdn.com";
    if (src.startsWith("/media")) {
      return baseUrl + src;
    }
    return src;
  };

  return (
    <div className={style[type]}>
      <section className={style.embla}>
        <div className={style.embla__viewport} ref={emblaRef}>
          <div className={style.embla__container}>
            {dataArray?.map((item: any, index) => (
              <a
                href={item.bannerUrlTarget}
                className={style.embla__slide}
                key={index}
              >
                <img
                  className={style.embla__slide_image}
                  src={prependBaseUrl(item.fileBanner)}
                  alt=""
                />
              </a>
            ))}
          </div>
        </div>

        <div className={style.embla__controls}>
          <div className={style.embla__buttons}>
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />

            {/* <div className={style.embla__dots}>
              {scrollSnaps?.map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={
                    index === selectedIndex
                      ? style.embla__dot
                      : style.embla__dot__selected
                  }
                />
              ))}
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmblaCarousel;
