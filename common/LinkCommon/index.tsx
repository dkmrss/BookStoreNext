"use client";

import tag from "@/assets/tag.svg";
import { Box } from "@mantine/core";
import Image from "next/image";
import style from "./LinkCommon.module.scss";
import Link from "next/link";

interface Link {
  linkName: string;
  linkURL: string;
}

const LinkCommon = ({ links }: { links: Link[] }) => {
  return (
    <Box className={style.linksContainer}>
      {links.map((link, index) => (
        <Link key={index} href={link.linkURL} className={style.linkBox}>
          <Image src={tag} alt="tag" className={style.icon}></Image>
          <span className={style.name}>{link.linkName}</span>
        </Link>
      ))}
    </Box>
  );
};

export default LinkCommon;
