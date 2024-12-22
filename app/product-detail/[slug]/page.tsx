import { getDetailBook, getDetailBookInfo } from "@/api/ApiBookProduct";
import { getDataListComment } from "@/api/ApiComment";
import { getDataUserReviewDetail } from "@/api/apiUserReview";
import AppContainer from "@/common/AppContainer";
import { isNullOrUndefined } from "@/extension/StringExtension";
import ProductDetailPage from "@/feature/ProductDetail";

import { Metadata } from "next";



export const metadata: Metadata = {
  title: "Product Detail Page",
  description: "Product Detail Page",
};

const ProductDetail = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const callDataProduct = async () => {
    const callApi = await getDetailBook(`/${params.slug}`);

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

  const callDataProductInfo = async () => {
    const callApi = await getDetailBookInfo(`?field=book_id&value=${params.slug}&take=10&skip=0`);

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

  const callDataComment = async () => {
    const callApi = await getDataListComment(`?bookId=${params.slug}&take=10&skip=0`);

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

  const fetchDataReview = async (idPath: number) => {
    if (idPath) {
      try {
        const callapi = await getDataUserReviewDetail(`/${idPath}`);
        if (!isNullOrUndefined(callapi) && !isNullOrUndefined(callapi?.data)) {
          // setTotalCount(callapi.totalCount);
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
    }
  };


  

  const data = await callDataProduct();

  const [dataReview, dataComment, dataInfo] = await Promise.all([
    fetchDataReview(data?.id),
    callDataComment(),
    callDataProductInfo()
  ]);
  console.log("data",dataComment)
  return (
    <div>
      
      <AppContainer>
        <ProductDetailPage
          data={data || null}
          dataReview={dataReview || null}
          dataComment={dataComment || null}
          dataInfo={dataInfo || null}
        />
      </AppContainer>
    </div>
  );
};

export default ProductDetail;
