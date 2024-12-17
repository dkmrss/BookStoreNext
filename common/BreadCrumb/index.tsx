"use client";

import {
  IconChevronRight,
  IconChevronsRight,
  IconHome,
} from "@tabler/icons-react";
import { Text } from "@mantine/core";
import React from "react";
import style from "./BreadCrumb.module.scss";
import Link from "next/link";

interface BreadcrumbItem {
  categoryId: number;
  categoryName: string | null;
  categoryUrl: string | null;
}

interface BreadCrumbProps {
  listBCData: BreadcrumbItem[] | null;
  isTab?: boolean;
  notCategory?: boolean;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({
  listBCData,
  isTab,
  notCategory,
}): JSX.Element => {
  return (
    <>
      {!isTab ? (
        <nav className={style.allBC}>
          <div className={style.breadcrumb}>
            <IconHome color={"red"} size={15} />
            {listBCData?.map((item: BreadcrumbItem, index: number) => (
              <div key={index} className={style.itemBC}>
                {index === listBCData.length - 1 ? (
                  <div>
                    <Text
                      style={{ lineHeight: "1rem" }}
                      truncate="end"
                      size="12px"
                    >
                      {item.categoryName}
                    </Text>
                  </div>
                ) : (
                  <div className={style.crumbBox}>
                    <Link
                      href={
                        notCategory || item.categoryUrl === "home"
                          ? `/${item.categoryUrl}`
                          : `/category/${item.categoryUrl}`
                      }
                    >
                      <Text
                        style={{ lineHeight: "1rem" }}
                        truncate="end"
                        size="12px"
                      >
                        {item.categoryName}
                      </Text>
                    </Link>
                    <IconChevronRight size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      ) : (
        <div className={style.allTagBC}>
          <div className={style.breadcrumb}>
            {listBCData?.map((item: BreadcrumbItem, index: number) => (
              <div key={index} className={style.itemBC}>
                {index === listBCData.length - 1 ? (
                  <>
                    <div>
                      <span>{item.categoryName}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Link href={`/category/${item.categoryUrl}`}>
                        {item.categoryName}
                      </Link>
                    </div>
                    <IconChevronsRight />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BreadCrumb;
