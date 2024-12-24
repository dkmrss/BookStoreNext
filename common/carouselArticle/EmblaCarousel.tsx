"use client";
import ArticleCard from "@/common/ArticleCard/Card";
import { Article } from "@/model/DataArticle";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import React from "react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import style from "./embla.module.scss";

type PropType = {
  data: Article [] | undefined;
  
  options?: EmblaOptionsType;
  auto?: boolean;
  type: "row" | "col" | "carousel-col" | "carousel-row";
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { data, options, auto, type } = props;

  const plugins = [];
  if (auto) {
    plugins.push(
      Autoplay({
        delay: 3000,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
      })
    );
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className={`${style[type]} `}>
      <div className={style.embla__viewport} ref={emblaRef}>
        <div className={style.embla__container}>
          {data?.map((item, index) => (
            <div className={style.embla__slide} key={index}>
              <ArticleCard
                data={item}
                type={type}
                height="100%"
                summary
                
              />
            </div>
          ))}
        </div>
      </div>

      <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />

      <div className={style.embla__dots}>
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
      </div>
    </section>
  );
};

export default EmblaCarousel;
