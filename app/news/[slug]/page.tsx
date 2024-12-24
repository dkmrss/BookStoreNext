
import { getDataUserCommentDetail } from "@/api/apiUserComment";

import { isNullOrUndefined } from "@/extension/StringExtension";
import NewsDetail from "@/feature/NewsDetail";
import { Metadata } from "next";
import style from "./style.module.scss";
import { getDataListNews, getDetailNew } from "@/api/apiNew";
import { getDataListProductBookNormal } from "@/api/ApiBookProduct";
import ListProductNew from "@/feature/ListProductNew";

export const metadata: Metadata = {
  title: "Chi tiết bài viết",
  description: "Chi tiết bài viết",
};

const NewsDetailPage = async ({ params }: { params: { slug: string } }) => {
  const id = params.slug;

  const callDataNew = async () => {
    const callApi = await getDetailNew(`/${id}`);
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

  const [data, dataComment, dataArticleNewest, dataProduct] =
    await Promise.all([
      callDataNew(),
      fetchDataComment(),
      callDataListNewest(),
      callDataListProduct(),
    ]);

  return (
    <div className={style.newBox}>
      
      <div className={style.contentContainer}>
        <NewsDetail
          data={data}
          dataComment={dataComment}
          dataArticleNewest={dataArticleNewest}
        />
      </div>
      <div className={style.sideBarContainer}>
      <ListProductNew data={dataProduct} />
      </div>
    </div>
  );
};
export default NewsDetailPage;
