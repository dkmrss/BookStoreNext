"use client";
import { Banner } from "@/model/Banner";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect, useState } from "react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import style from "./embla.module.scss";
type PropType = {
  slides: Banner[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const dataArray = Object?.values(slides || []);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options, [
    Autoplay({ delay: 3000, stopOnMouseEnter: true, stopOnInteraction: false }),
  ]);

  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const changeImageUrl = (url: string) => {
    if (url.includes("192.168.3.96:9500")) {
      return url.replace("192.168.3.96:9500", "image-dev.hacom.vn");
    }

    if (url.includes("image-dev.hacom.vn:9500")) {
      return url.replace("image-dev.hacom.vn:9500", "image-dev.hacom.vn");
    }

    return url;
  };

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaMainApi);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className={style.embla}>
      <div className={style.embla__viewport} ref={emblaMainRef}>
        <div className={style.embla__container}>
          {dataArray?.map((item: any, index) => (
            <a
              href={item.bannerUrlTarget}
              className={style.embla__slide}
              key={index}
            >
              <img
                className={style.embla__slide__img}
                src={`http://localhost:3001/${item?.image}`}
                alt=""
              />
            </a>
          ))}
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
          </div>
        </div>
      </div>

      {/* <div className={style.embla_thumbs}>
        <div className={style.embla_thumbs__viewport} ref={emblaThumbsRef}>
          <div className={style.embla_thumbs__container}>
            {dataArray?.map((item, index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                item={item}
              />
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default EmblaCarousel;
