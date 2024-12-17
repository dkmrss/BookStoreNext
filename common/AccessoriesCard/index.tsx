"use client";
import { Box } from "@mantine/core";
import Image, { StaticImageData } from "next/image";
import style from "./AccessoriesCard.module.scss";
import Link from "next/link";

type AccessoriesCard = {
  image: StaticImageData;
  title: string;
  url: string;
};

const AccessoriesCard = ({ image, title, url }: AccessoriesCard) => {
  return (
    <>
      <Link className={style.accessoriesCard} href={url}>
        <Box className={style.boxImage}>
          <Image
            src={image}
            className={style.imageAccesories}
            alt={url}
          ></Image>
        </Box>
        <span style={{ color: "white" }}>{title}</span>
      </Link>
    </>
  );
};

export default AccessoriesCard;
