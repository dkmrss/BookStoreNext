import {
  getDataDetailNew,
  getListArticle,
  getListArticleCategory,
} from "@/api/apiArticle";
import { getDataUserCommentDetail } from "@/api/apiUserComment";
import SideBar from "@/common/SideBarArticle";
import { isNullOrUndefined } from "@/extension/StringExtension";
import NewsDetail from "@/feature/NewsDetail";
import { Metadata } from "next";
import style from "./style.module.scss";

export const metadata: Metadata = {
  title: "Chi tiết bài viết",
  description: "Chi tiết bài viết",
};

const NewsDetailPage = async ({ params }: { params: { slug: string } }) => {
  const id = params.slug;

  const callDataNew = async () => {
    const callApi = await getDataDetailNew(`?id=${id}`);
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

  const fetchDataComment = async () => {
    try {
      const callapi = await getDataUserCommentDetail(id);
      if (!isNullOrUndefined(callapi) && !isNullOrUndefined(callapi?.data)) {
        const dataApi = callapi?.data;
        if (dataApi != null && !isNullOrUndefined(dataApi)) {
          return dataApi;
        }
      } else {
        console.log("Dữ liệu không tồn tại");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  const callDataListCategoryAricles = async () => {
    let callApi: any;
    callApi = await getListArticleCategory("&Take=20");
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

  const callDataListNewest = async () => {
    let callApi: any;
    callApi = await getListArticle("Take=6&skip=1");
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

  const [data, dataArticleCategory, dataComment, dataArticleNewest] =
    await Promise.all([
      callDataNew(),
      callDataListCategoryAricles(),
      fetchDataComment(),
      callDataListNewest(),
    ]);

  return (
    <div className={style.newBox}>
      <div className={style.sideBarContainer}>
        <SideBar data={dataArticleCategory} />
      </div>
      <div className={style.contentContainer}>
        <NewsDetail
          data={data}
          dataComment={dataComment}
          dataArticleCategory={dataArticleCategory}
          dataArticleNewest={dataArticleNewest}
        />
      </div>
    </div>
  );
};
export default NewsDetailPage;
