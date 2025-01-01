
import { Image } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import React from "react";
import style from "./embla.module.scss";
import { BookImage } from "@/model/TblBook";

type PropType = {
  selected: boolean;
  index: number;
  onClick: () => void;
  item: BookImage;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick, item } = props;
  const { width } = useViewportSize();

  return (
    <>
      <div
        className={`${style.embla_thumbs__slide}
        ${selected && style.embla_thumbs__slide__selected}`}
        onClick={onClick}
      >
        <Image
          className={style.embla__slide__img}
          src={`${process.env.NEXT_PUBLIC_URL || "http://localhost:3001"}/${item?.book_images}`}
          alt=""
        />
      </div>
    </>
  );
};
