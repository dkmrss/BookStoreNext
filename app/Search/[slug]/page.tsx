
import { getDataListNews } from "@/api/apiNew";
import AppContainer from "@/common/AppContainer";

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

const Search = async () => {

  const callDataListNewest = async () => {
      let callApi: any;
      callApi = await getDataListNews("?field=status&value=0&take=6&skip=0");
      if (!isNullOrUndefined(callApi) && !isNullOrUndefined(callApi?.data)) {
        const dataApi = callApi?.data;
        if (dataApi != null && !isNullOrUndefined(dataApi)) {
          return dataApi;
        } else {
          console.log("Dữ liệu không tồn tại");
        }
        close();
      } else {
        console.log("Dữ liệu không tồn tại");
      }
    };

  const dataArticle = await callDataListNewest();

  return (
    <div className={roboto.className}>
      
      <AppContainer>
        <SearchList dataArticle={dataArticle} />
      </AppContainer>
    </div>
  );
};

export default Search;
