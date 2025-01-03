"use client";

import React, { useEffect, useState } from "react";
import { isNullOrUndefined } from "@/extension/StringExtension";
import NewsCategory from "@/feature/NewsCategory";
import style from "./style.module.scss";
import { getDataListProductBookNormal } from "@/api/ApiBookProduct";
import ListProductNew from "@/feature/ListProductNew";

const NewList: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const callDataListProduct = async () => {
    try {
      const callApi = await getDataListProductBookNormal(
        "?limit=4&offset=0&active=0&trash=0"
      );

      if (
        !isNullOrUndefined(callApi) &&
        !isNullOrUndefined(callApi?.data) &&
        Array.isArray(callApi.data)
      ) {
        setData(callApi.data);
      } else {
        console.warn("Dữ liệu không tồn tại hoặc không hợp lệ.");
        setData([]);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callDataListProduct();
  }, []);

  return (
    <div className={style.newBox}>
      {loading ? (
        <div>Đang tải dữ liệu...</div>
      ) : (
        <>
          <div className={style.contentContainer}>
            <NewsCategory data={data} />
          </div>
          <div className={style.sideBarContainer}>
            <ListProductNew data={data} />
          </div>
        </>
      )}
    </div>
  );
};

export default NewList;
