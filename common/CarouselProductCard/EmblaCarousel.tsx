"use client";
import ProductCard from "@/common/ProductCard";
import { TblProduct } from "@/model/TblBook";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import React from "react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import style from "./embla.module.scss";
type PropType = {
  data: TblProduct[];
  options?: EmblaOptionsType;
  rows: Number;
  auto?: boolean;
  minWidth?: boolean;
  detail?: boolean;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { data, options, rows, auto, minWidth, detail } = props;
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

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  return (
    <section className={`${style.embla} ${detail && style.emblaDetail}`}>
      <div className={style.embla__viewport} ref={emblaRef}>
        <div className={style.embla__container}>
          {rows === 2 ? (
            <>
              {(() => {
                const datas = [];
                for (let i = 0; i < data.length; i += 2) {
                  datas.push(
                    <div
                      className={style.embla__slide}
                      style={{ minWidth: minWidth ? "230px" : "initial" }}
                      key={i}
                    >
                      <ProductCard data={data[i]} />
                      {i + 1 < data.length && (
                        <ProductCard data={data[i + 1]} />
                      )}
                    </div>
                  );
                }
                return datas;
              })()}
            </>
          ) : (
            <>
              {data?.map((item, index) => (
                <div className={style.embla__slide} key={index}>
                  <ProductCard data={item} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* <div className={style.embla__controls}>
        <div className={style.embla__buttons}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div> */}

      <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
    </section>
  );
};

export default EmblaCarousel;
