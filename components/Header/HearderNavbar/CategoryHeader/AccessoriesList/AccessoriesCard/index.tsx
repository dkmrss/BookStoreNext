"use client";
import { Box } from "@mantine/core";
import { Image } from "@mantine/core";
import style from "./AccessoriesCard.module.scss";
import Link from "next/link";

type AccessoriesCard = {
  image: string;
  title: string;
  url: number;
};

const AccessoriesCard2 = ({ image, title, url }: AccessoriesCard) => {
  return (
    
      <Link className={style.accessoriesCard} href={"url"}>
        <Box className={style.boxImage}>
          <Image
            src={`http://localhost:3001/${image}`}
            className={style.imageAccesories}
            alt={title}
          ></Image>
          <span style={{ color: "white" }}>{title}</span>
        </Box>
        
      </Link>
   
  );
};

export default AccessoriesCard2;
