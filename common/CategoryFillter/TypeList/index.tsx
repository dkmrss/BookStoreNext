"use client";
import { Image } from "@mantine/core";
import style from "./brand.module.scss";
import Link from "next/link";

interface TypeData {
  link: string;
  imageSrc: string;
  title: string;
}

interface TypeProps {
  data: TypeData[];
  type: "text" | "widthImg";
}

const colors = [
  "#ebebeb", "#ffd8d8", "#eaffd8", "#fff2da", "#d0fbff",
  "#dffff1", "#aef0a8", "#d8e9e5", "#e2e4ff", "#fbe3ff",
  "#ffebcc", "#e6f7ff", "#ffe6e6", "#fffbe6", "#e6ffe6",
  "#f0f0f0", "#e6e6ff", "#e6f2ff", "#ffe6f2"
];

const TypeLists: React.FC<TypeProps> = ({ data, type }) => {
  return (
    <div className={style.containerBox}>
      <div className={style.box}>
        {type === "text" ? (
          <>
            {data.map((item, index) => (
              <Link href={item?.link} className={style.typeBox} key={index}>
                <span className={style.title}>{item.title}</span>
              </Link>
            ))}
          </>
        ) : (
          <>
            {data.map((item, index) => (
              <a
                href={item?.link}
                className={style.typeBox}
                style={{ backgroundColor: colors[index % colors.length] }}
                key={index}
              >
                <Image src={item?.imageSrc} alt="#" />
                <span className={style.title}>{item.title}</span>
              </a>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TypeLists;
