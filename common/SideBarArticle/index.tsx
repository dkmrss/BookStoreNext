"use client";
import { ScrollArea } from "@mantine/core";
import {
  IconApps,
  IconBook,
  IconBriefcase,
  IconDeviceFloppy,
  IconDeviceGamepad2,
  IconDiscount,
  IconDownload,
  IconFlag,
  IconHome,
  IconKeyboard,
  IconNews,
  IconPackage,
  IconZoomQuestion,
} from "@tabler/icons-react";

import { getListArticleCategory } from "@/api/apiArticle";
import { isNullOrUndefined } from "@/extension/StringExtension";
import { ArticleCategoryList } from "@/model/DataArticle";
import { useEffect, useState } from "react";
import style from "./style.module.scss";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMediaQuery } from "@mantine/hooks";

const colors = [
  "#ebebeb",
  "#ffd8d8",
  "#eaffd8",
  "#fff2da",
  "#d0fbff",
  "#dffff1",
  "#aef0a8",
  "#d8e9e5",
  "#e2e4ff",
  "#fbe3ff",
  "#ffebcc",
  "#e6f7ff",
  "#ffe6e6",
  "#fffbe6",
  "#e6ffe6",
  "#f0f0f0",
  "#e6e6ff",
  "#e6f2ff",
  "#ffe6f2",
];

const getIconForLabel = (label: string): React.ReactNode => {
  if (label.startsWith("Khuyến mại")) {
    return <IconDiscount height={25} width={25} color="var(--clr-primary)" />;
  }
  if (label.startsWith("Tư vấn")) {
    return (
      <IconZoomQuestion height={25} width={25} color="var(--clr-primary)" />
    );
  }
  switch (label) {
    case "trang chủ":
      return <IconHome height={25} width={25} color="var(--clr-primary)" />;
    case "Tin tức công nghệ":
      return <IconNews height={25} width={25} color="var(--clr-primary)" />;

    case "Download phần mềm, game":
      return <IconDownload height={25} width={25} color="var(--clr-primary)" />;
    case "Ứng dụng, Phần mềm":
      return <IconApps height={25} width={25} color="var(--clr-primary)" />;
    case "Game":
      return (
        <IconDeviceGamepad2 height={25} width={25} color="var(--clr-primary)" />
      );
    case "Tuyển dụng nhân sự":
      return (
        <IconBriefcase height={25} width={25} color="var(--clr-primary)" />
      );
    case "Review Sản Phẩm":
      return <IconPackage height={25} width={25} color="var(--clr-primary)" />;
    case "Sự kiện":
      return <IconFlag height={25} width={25} color="var(--clr-primary)" />;
    case "Kiến thức phần cứng":
      return <IconBook height={25} width={25} color="var(--clr-primary)" />;
    case "Kinh nghiệm - thủ thuật":
      return <IconKeyboard height={25} width={25} color="var(--clr-primary)" />;
    default:
      return (
        <IconDeviceFloppy height={25} width={25} color="var(--clr-primary)" />
      );
  }
};

const SideBar = ({ data }: { data: ArticleCategoryList[] }) => {
  const params = useParams();
  const { slug } = params;
  const slugValue = Array.isArray(slug) ? slug[0] : slug;
  const matches = useMediaQuery("(max-width: 999px)");
  
  return (
    <div className={style.sideBarContainer}>
      <div className={style.sideBarContent}>
        <nav className={style.navbar}>
          <ScrollArea className={style.links}>
            <div className={style.linksInner}>
              <Link
                href={`/home`}
                className={style.typeBox}
                style={{
                  backgroundColor: matches ? "rgb(199, 238, 122)" : undefined,
                }}
              >
                <IconHome height={25} width={25} color="var(--clr-primary)" />
                <div className={style.link}>
                  <span className={style.title}>Trang chủ</span>
                </div>
              </Link>
              {data.map((item, index) => (
                <Link
                  href={`/new-list/${item.id}`}
                  className={`${style.typeBox} ${
                    item.id === parseInt(slugValue) ? style.activeLink : ""
                  }`}
                  key={index}
                  style={{
                    backgroundColor: matches
                      ? colors[index % colors.length]
                      : undefined,
                  }}
                >
                  {getIconForLabel(item.name)}
                  <div className={`${style.link}`}>
                    <span
                      className={`${style.title} ${
                        item.id === parseInt(slugValue) ? style.activeLink : ""
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
