import Booking from "@/feature/Booking/Booking";
import NewsCategory from "@/feature/NewsCategory";
import style from "./style.module.scss";
import SideBar from "@/common/SideBarArticle";
import { getListArticleCategory } from "@/api/apiArticle";
import { isNullOrUndefined } from "@/extension/StringExtension";

const NewList = async ({ params }: { params: { slug: string } }) => {
  const callDataListCategoryAricles = async () => {
    let callApi: any;
    callApi = await getListArticleCategory("&Take=20");
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

  const data = await callDataListCategoryAricles();

  return (
    <div className={style.newBox}>
      <div className={style.sideBarContainer}>
        <SideBar data={data} />
      </div>
      <div className={style.contentContainer}>
        <NewsCategory params={params} data={data} />
      </div>
    </div>
  );
};

export default NewList;
