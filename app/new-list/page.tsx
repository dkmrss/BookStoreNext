import { getListArticleCategory } from "@/api/apiArticle";
import { isNullOrUndefined } from "@/extension/StringExtension";
import NewsCategory from "@/feature/NewsCategory";
import style from "./style.module.scss";
import { getDataListProductBookNormal } from "@/api/ApiBookProduct";
import ListProductNew from "@/feature/ListProductNew";

const NewList = async () => {
  const callDataListProduct = async () => {
    let callApi: any;
    callApi = await getDataListProductBookNormal("?limit=4&offset=0");
    if (!isNullOrUndefined(callApi) && !isNullOrUndefined(callApi?.data)) {
      const dataApi = callApi?.data;
      if (dataApi != null && !isNullOrUndefined(dataApi)) {
        return dataApi;
      } else {
        // NotificationExtension.Fails("Dữ liệu không tồn tại");
        console.log("Dữ liệu không tồn tại");
      }
      close();
    } else {
      // NotificationExtension.Fails("Dữ liệu không tồn tại");
      console.log("Dữ liệu không tồn tại");
    }
  };

  const data = await callDataListProduct();

  return (
    <div className={style.newBox}>
      
      <div className={style.contentContainer}>
        <NewsCategory data={data} />
      </div>
      <div className={style.sideBarContainer}>
        <ListProductNew data={data} />
      </div>
    </div>
  );
};

export default NewList;
