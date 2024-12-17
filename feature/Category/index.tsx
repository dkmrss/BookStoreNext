"use client";

import { getListBannerSlideData } from "@/api/apiBanner";
import {
  getDataListProductNormal,
  getDetailCategory,
  getListAttributeFilter,
  getListBrandSearch,
} from "@/api/apiProduct";
import BreadCrumb from "@/common/BreadCrumb";
import { dataBannerFake, listOutstanding } from "@/const/fakedata";
import { isNullOrUndefined } from "@/extension/StringExtension";
import { tblBanner } from "@/model/Banner";
import { TblItem } from "@/model/ProductList";
import { TblBrand } from "@/model/TblBrand";
import {
  AttributeOptionType,
  TblAttributeFilter,
  TblAttributeFilterOption,
} from "@/model/TblCategory";
import { Pagination } from "@mantine/core";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import BannerList from "./BannerCarousel";
import style from "./Category.module.scss";
import Fillter from "./Fillter";
import FooterContent from "./FooterBox";
import OutStandingList from "./OutStanding";
import ProductList from "./ProductList";
import TitleSection from "@/common/TitleSection";
import BreadCrumbCategory from "@/common/BreadCrumb/forCategory";

export default function Category() {
  const params = useParams();

  const [data, setData] = useState<TblItem[]>([]);
  const [dataBrand, setDataBrand] = useState<TblBrand[]>([]);
  const [dataCategory, setDataCategory] = useState<any>();
  const [dataBanner, setDataBanner] = useState<tblBanner[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number | undefined]>([
    0,
    undefined,
  ]);
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProduct, setTotalProduct] = useState(0);

  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>([]);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [dataAttributeFilter, setDataAttributeFilter] = useState<
    TblAttributeFilter[]
  >([]);
  const [selectedAttributeFilter, setSelectedAttributeFilter] = useState<
    (AttributeOptionType | null)[]
  >([]);
  const [dataAttributeFilterOption, setDataAttributeFilterOption] = useState<
    TblAttributeFilterOption[]
  >([]);
  const [firstRender, setFirstRender] = useState<boolean>(true);

  let itemsPerPage = 30;
  const skip = (currentPage - 1) * itemsPerPage;

  const handlePageChange = (page: number) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  // const handleClickRangerPriceSearch = (value: [number, number]) => {
  //   setPriceRange(value);
  // };

  const handleChangePriceFilter = (filter: string) => {
    setPriceFilter(filter);
  };

  const callApiGetData = async () => {
    try {
      let callapi;
      setIsLoadingProduct(true);
      if (dataCategory && currentPage) {
        let urlApi = `?Skip=${skip}&Take=${itemsPerPage}&Active=true&CategoryId=${dataCategory.id}`;
        if (priceRange && priceRange.length > 0) {
          priceRange[0] && (urlApi += `&MinPrice=${priceRange[0]}`);
          priceRange[1] && (urlApi += `&MaxPrice=${priceRange[1]}`);
        }

        if (selectedAttributeFilter && selectedAttributeFilter.length > 0) {
          const filteredAttributes = selectedAttributeFilter.filter(
            (attribute) => attribute !== null && attribute !== undefined
          );
          urlApi += filteredAttributes
            .map((attribute) => {
              return attribute?.value
                ? `&AttributeValues=${attribute.value}`
                : ""; // Kiểm tra giá trị của attribute trước khi thêm vào chuỗi
            })
            .filter(Boolean) // Lọc bỏ các giá trị rỗng
            .join(""); // Kết hợp chuỗi thành một chuỗi duy nhất
        }
        if (selectedBrandIds && selectedBrandIds.length > 0) {
          urlApi += selectedBrandIds
            .map((brandId) => {
              return `&BrandId=${brandId}`;
            })
            .filter(Boolean) // Lọc bỏ các giá trị rỗng
            .join("");
        }
        if (priceFilter === "increase") {
          urlApi += `&SortOrder=0`;
        } else if (priceFilter === "decrease") {
          urlApi += `&SortOrder=1`;
        }

        callapi = await getDataListProductNormal(urlApi);

        if (!isNullOrUndefined(callapi) && !isNullOrUndefined(callapi?.data)) {
          const dataApi = callapi?.data;
          const totalData = callapi?.totalCount;
          const totalPages = Math.ceil(totalData / itemsPerPage);

          if (dataApi.length > 0) {
            setIsLoadingProduct(false);
            setData(dataApi);
            setTotalProduct(totalData);
            setTotalPages(totalPages);
          } else {
            setIsLoadingProduct(false);
            setData([]);
            setTotalProduct(0);
            setTotalPages(0);
          }
        } else {
          console.log("Dữ liệu không tồn tại");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoadingProduct(false);
    }
  };

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }
    if (dataCategory) {
      callApiGetData();
    } else {
      setData([]);
      setTotalProduct(0);
    }
  }, [currentPage]);

  useEffect(() => {
    if (dataCategory) {
      setCurrentPage(1);
      callApiGetData();
    } else {
      setData([]);
      setTotalProduct(0);
    }
  }, [
    // currentPage,
    dataCategory,
    priceRange,
    priceFilter,
    selectedBrandIds,
    selectedAttributeFilter,
  ]);

  const breadcrumb = [
    {
      categoryId: 105,
      categoryName: "Trang chủ",
      categoryUrl: "home",
    },
    {
      categoryId: 0,
      categoryName: "Danh mục",
      categoryUrl: `/${dataCategory?.categoryCode}`,
    },
    {
      categoryId: 351,
      categoryName: `${dataCategory?.categoryName}`,
      categoryUrl: `/${dataCategory?.categoryName}`,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isLoadingProduct]);

  useEffect(() => {
    const queryString = window.location.href;
    // postLoggingAction({
    //   userName: localStorage.getItem("userName") || "",
    //   actionType: "HomePageClickedLink",
    //   actionDetail: queryString,
    // });

    const { slug } = params;
    const fetchCategoryBySlug = async () => {
      const category = await getDetailCategory(`?categoryPath=${slug}`);
      setDataCategory(category?.data);
    };
    fetchCategoryBySlug();
    const numbersArray = queryString.split("?p=")[1]?.match(/\d+(?:[.,]\d+)?/g);
    if (numbersArray) {
      const numberWithPadding = numbersArray.map(
        (num) => Number(num.replace(",", ".")) * 1000000
      );
      if (queryString.split("?p=")[1]?.includes("duoi")) {
        setPriceRange([0, numberWithPadding[0] || 0]);
      } else {
        setPriceRange(
          numbersArray
            ? [numberWithPadding[0] || 0, numberWithPadding[1] || undefined]
            : [0, undefined]
        );
      }
    }
  }, []);

  useEffect(() => {
    const dataOption = dataAttributeFilter.map((item) => ({
      id: item.id,
      attributeName: item.attributeName,
      options: item.attributeValues.map((attribute) => ({
        value: attribute.id.toString(),
        label: attribute.value,
      })),
    }));
    setDataAttributeFilterOption(dataOption);
  }, [dataAttributeFilter]);

  useEffect(() => {
    const callApiGetSelectOption = async () => {
      if (dataCategory) {
        const callapi = await getListAttributeFilter(
          `?categoryId=${dataCategory?.id.toString()}`
        );
        if (!isNullOrUndefined(callapi) && !isNullOrUndefined(callapi?.data)) {
          const dataApi = callapi?.data;
          if (dataApi != null && !isNullOrUndefined(dataApi)) {
            setDataAttributeFilter(dataApi);
          }
        } else {
          console.log("Dữ liệu không tồn tại");
        }
      }
    };

    const callApiBrand = async () => {
      if (dataCategory) {
        try {
          let url = `?CategoryId=${dataCategory.id}&Skip=0&Take=1000`;
          const callApi = await getListBrandSearch(url);
          if (
            !isNullOrUndefined(callApi) &&
            !isNullOrUndefined(callApi?.data)
          ) {
            const dataApi = callApi?.data;
            if (dataApi != null && !isNullOrUndefined(dataApi)) {
              setDataBrand(dataApi.lists);
            }
          } else {
            console.log("Dữ liệu không tồn tại");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    const fetchDataBanner = async () => {
      const banner = await getListBannerSlideData(
        `CategoryId=${dataCategory.id}&Skip=0&Take=8&Status=A`
      );
      setDataBanner(banner?.data);
    };

    if (dataCategory !== undefined && dataCategory !== null) {
      fetchDataBanner();
      callApiBrand();
      callApiGetSelectOption();
    }
  }, [dataCategory]);

  return (
    <>
      <div>
        {dataBanner.length > 0 ? (
          <BannerList data={dataBanner || []} />
        ) : (
          <BannerList data={dataBannerFake} />
        )}
        <BreadCrumbCategory listBCData={breadcrumb || null} />
        <Fillter
          dataBrand={dataBrand || []}
          selectedBrandIds={selectedBrandIds}
          setSelectedBrandIds={setSelectedBrandIds}
          // dataType={clonedDataType}
          selectedAttributeFilter={selectedAttributeFilter}
          setSelectedAttributeFilter={setSelectedAttributeFilter}
          dataAttributeFilterOption={dataAttributeFilterOption}
          priceFilter={priceFilter}
          handleChangePriceFilter={handleChangePriceFilter}
          setPriceRange={setPriceRange}
          priceRange={priceRange}
        />
        <div className={style.title}>
          <TitleSection forSEO title={dataCategory?.categoryName} />
        </div>

        <ProductList data={data || []} itemsPerPage={itemsPerPage} />
        <div className={style.paginationContainer}>
          <Pagination
            total={totalPages}
            value={currentPage}
            classNames={style}
            color="var(--clr-light-active-primary)"
            onChange={handlePageChange}
          />
        </div>
        <OutStandingList data={listOutstanding} />
        {/* <FooterContent data={demoContent} dataComment={dataCommentFake} /> */}
      </div>
    </>
  );
}
