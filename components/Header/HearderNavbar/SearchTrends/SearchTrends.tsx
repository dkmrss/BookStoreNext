"use client";
import React, { useEffect, useState } from "react";
import style from "./SearchTrends.module.scss";
import { Box, Grid, Title, Loader, Text } from "@mantine/core";
import TitleSearch from "@/common/TitleSearch/TitleSearch";
import { getDataListKeySearch } from "@/api/ApiKeySearch";
import Link from "next/link";
import { IconSearch } from "@tabler/icons-react";
// Import API

const SearchTrends = ({
  setIsFocus,
}: {
  setIsFocus: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [keySearch, setKeySearch] = useState<{ id: number; keyword: string }[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchKeySearch = async () => {
    try {
      const response = await getDataListKeySearch("?limit=5"); // Thay query nếu cần
      if (response?.success && response?.data) {
        const keywords = response.data.map((item: any) => ({
          id: item.id,
          keyword: item.keyword,
        }));
        setKeySearch(keywords);
        setError(null);
      } else {
        setError("Không thể lấy dữ liệu từ khóa tìm kiếm.");
        setKeySearch([]);
      }
    } catch (err) {
      console.error("Lỗi khi gọi API key search:", err);
      setError("Có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKeySearch();
  }, []);

  return (
    <Box
      style={{ "--radius": "0.5rem", borderRadius: "var(--radius)" }}
      p={5}
      className={style.SearchTrends}
    >
      <TitleSearch>Từ khóa được tìm kiếm nhiều</TitleSearch>
      <Box className={style.box} p={5}>
        {loading ? (
          <Loader color="var(--clr-primary)" size="lg" />
        ) : error ? (
          <Text color="red">{error}</Text>
        ) : keySearch.length > 0 ? (
          <div className={style.keyword}>
            {keySearch.map((element) => (
                <Box    
                className={style.keywordbox}  
                  onClick={() => {
                    setIsFocus(false);
                  }}
                >
                  <IconSearch color="#000" size={15} />
                  <Link href={`/Search/${element.keyword}`}>{element.keyword}</Link>
                </Box>
              
            ))}
          </div>
        ) : (
          <Text>Không có xu hướng tìm kiếm nào được tìm thấy.</Text>
        )}
      </Box>
    </Box>
  );
};

export default SearchTrends;
