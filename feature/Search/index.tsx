"use client";
import imageNull from "@/assets/noValue.png";
import ProductCard from "@/common/ProductCard";
import { Box, Pagination } from "@mantine/core";
import Image from "next/image";
import { useEffect, useState } from "react";
import style from "./productList.module.scss";
import { TblItem } from "@/model/ProductList";
import { DataArticle } from "@/model/DataArticle";
import { getSearchProduct } from "@/api/apiProduct";
import { isNullOrUndefined } from "@/extension/StringExtension";
import ArticleListCard from "@/common/ArticleCard";
import { IconNews } from "@tabler/icons-react";
import { dataAritcleNull } from "@/const/fakedata";
import Fillter from "./Fillter";
import { AttributeOptionType } from "@/model/TblCategory";

interface ProductProps {
  dataArticle: DataArticle[];
  params: { slug: string };
}

const SearchList: React.FC<ProductProps> = ({ dataArticle, params }) => {
  const [data, setData] = useState<TblItem[]>([]);
  const [filteredData, setFilteredData] = useState<TblItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [selectedAttributeFilter, setSelectedAttributeFilter] = useState<
    (AttributeOptionType | null)[]
  >([]);
  const itemsPerPage = 24;

  const handlePageChange = (page: number) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  const handleChangePriceFilter = (filter: string) => {
    setPriceFilter(filter);
  };

  const decodeVietnamese = (encodedStr: string) => {
    try {
      return decodeURIComponent(encodedStr);
    } catch (error) {
      console.error("Error decoding the string:", error);
      return null;
    }
  };

  const callDataProduct = async () => {
    try {
      setIsLoadingProduct(true);
      const urlApi = `?q=${params.slug}`;

      const callapi = await getSearchProduct(urlApi);

      if (!isNullOrUndefined(callapi) && !isNullOrUndefined(callapi?.data)) {
        const dataApi = callapi?.data;
        const totalData = callapi?.totalCount;
        const totalPages = Math.ceil(totalData / itemsPerPage);

        if (dataApi.length > 0) {
          setData(dataApi);
          setTotal(totalData.length);
          setTotalPages(totalPages);
        } else {
          setData([]);
          setTotal(0);
          setTotalPages(0);
        }
      } else {
        console.log("Dữ liệu không tồn tại");
        setData([]);
        setTotal(0);
        setTotalPages(0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoadingProduct(false);
    }
  };

  useEffect(() => {
    callDataProduct();
  }, [params, currentPage, priceFilter]);

  useEffect(() => {
    // Apply price range filtering and sorting
    let filteredData = data;

    // Apply price range filter if it's not [0, 0]
    if (priceRange[0] !== 0 || priceRange[1] !== 0) {
      filteredData = filteredData.filter((item) => {
        const price = item?.marketPrice || 0;
        return price >= priceRange[0] && price <= priceRange[1];
      });
    }

    // Apply sorting
    filteredData.sort((a, b) => {
      const priceA =
        a?.marketPrice !== null && a?.marketPrice !== undefined
          ? a?.marketPrice
          : Infinity;
      const priceB =
        b?.marketPrice !== null && b?.marketPrice !== undefined
          ? b?.marketPrice
          : Infinity;

      if (priceFilter === "increase") {
        return priceA - priceB;
      } else if (priceFilter === "decrease") {
        return priceB - priceA;
      }

      return 0; // Default return
    });

    setFilteredData(filteredData);
    setTotal(filteredData.length);
    setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
  }, [data, priceFilter, priceRange]);

  return (
    <>
      <div className={style.titleBox}>
        <h1 className={style.title}>
          Bạn đang tìm kiếm : {decodeVietnamese(params.slug)}
        </h1>
        <p className={style.total}>( Tìm thấy {total} sản phẩm )</p>
      </div>
      <div className={style.bodyBox}>
        <div className={style.leftBox}>
          <Fillter
            priceFilter={priceFilter}
            handleChangePriceFilter={handleChangePriceFilter}
            setPriceRange={setPriceRange}
            priceRange={priceRange}
            selectedAttributeFilter={selectedAttributeFilter}
            setSelectedAttributeFilter={setSelectedAttributeFilter}
          />
          {filteredData.length === 0 ? (
            <div className={style.noValue}>
              <Image src={imageNull} alt="" />
              <div>
                <p>Để tìm được kết quả chính xác hơn, bạn vui lòng:</p>
                <div className={style.customList}>
                  Kiểm tra lỗi chính tả của từ khóa đã nhập
                </div>
                <div className={style.customList}>
                  Thử lại bằng từ khóa khác
                </div>
                <div className={style.customList}>
                  Thử lại bằng những từ khóa tổng quát hơn
                </div>
                <div className={style.customList}>
                  Thử lại bằng những từ khóa ngắn gọn hơn
                </div>
                <div className={style.customList}>Thay đổi bộ lọc</div>
              </div>
            </div>
          ) : (
            <>
              <Box className={style.productListBox}>
                {filteredData
                  ?.slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((item: TblItem, index: number) => {
                    return (
                      <div className={style.product} key={index}>
                        <ProductCard data={item} />
                      </div>
                    );
                  })}
              </Box>
              <div className={style.paginationContainer}>
                <Pagination
                  total={totalPages}
                  value={currentPage}
                  classNames={style}
                  color="var(--clr-light-active-primary)"
                  onChange={handlePageChange}
                />
              </div>
            </>
          )}
        </div>
        {dataArticle?.length > 0 ? (
          <div className={style.articleList}>
            <div className={style.newTiltle}>
              <IconNews color="var(--clr-primary)" />
              <span>Bài viết liên quan</span>
            </div>

            <ArticleListCard data={dataArticle} type="row" />
          </div>
        ) : (
          <div className={style.articleList}>
            <div className={style.newTiltle}>
              <IconNews color="var(--clr-primary)" />
              <span>Bài viết liên quan</span>
            </div>

            <ArticleListCard data={dataAritcleNull} type="row" />
          </div>
        )}
      </div>
    </>
  );
};

export default SearchList;
