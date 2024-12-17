import { getListArticle } from "@/api/apiArticle";
import AppContainer from "@/common/AppContainer";
import BreadCrumb from "@/common/BreadCrumb";
import { isNullOrUndefined } from "@/extension/StringExtension";
import SearchList from "@/feature/Search";
import { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Product Detail Page",
  description: "Product Detail Page",
};

const Search = async ({ params }: { params: { slug: string } }) => {
  const decodeVietnamese = (encodedStr: string) => {
    try {
      return decodeURIComponent(encodedStr);
    } catch (error) {
      console.error("Error decoding the string:", error);
      return null;
    }
  };
  const breadcrumbSearch = [
    {
      categoryId: 0,
      categoryName: "Trang chủ",
      categoryUrl: "home",
    },
    {
      categoryId: 1,
      categoryName: `kết quả tìm kiếm cho: "${decodeVietnamese(params.slug)}"`,
      categoryUrl: `/Search/${params.slug}`,
    },
  ];

  const callApiGetDataArticle = async () => {
    let callapi = await getListArticle(
      `Status=1&Skip=0&Take=14&KeySearch=${params.slug}`
    );

    if (!isNullOrUndefined(callapi) && !isNullOrUndefined(callapi?.data)) {
      const dataApi = callapi?.data;
      if (dataApi != null && !isNullOrUndefined(dataApi)) {
        return dataApi;
      }
    } else {
      console.log("Dữ liệu không tồn tại");
    }
  };

  const dataArticle = await callApiGetDataArticle();

  return (
    <div className={roboto.className}>
      <BreadCrumb notCategory listBCData={breadcrumbSearch || null} />
      <AppContainer>
        <SearchList dataArticle={dataArticle} params={params} />
      </AppContainer>
    </div>
  );
};

export default Search;
