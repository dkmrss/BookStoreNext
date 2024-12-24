import { useViewportSize } from "@mantine/hooks";
import React from "react";
import style from "./embla.module.scss";
import { Banner } from "@/model/Banner";

type PropType = {
  selected: boolean;
  index: number;
  onClick: () => void;
  item: Banner;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick, item } = props;
  const { width } = useViewportSize();

  return (
    <>
      {width > 800 ? (
        <div
          className={`${style.embla_thumbs__slide}${
            selected ? ` ${style.embla_thumbs__slide__selected}` : ""
          }`}
          onClick={onClick}
        >
          <div className={style.embla_thumbs__slide__number}> {item.title}</div>
        </div>
      ) : (
        <div
          className={
            selected
              ? style.embla_thumbs__slide__selected_screen_mb
              : style.embla_thumbs__slide_screen_mb
          }
          onClick={onClick}
        ></div>
      )}
    </>
  );
};
