import { getDetailBookAll, getDetailBookInfo } from "@/api/ApiBookInfo";
import { getProductDetail } from "@/api/ApiBookProduct";
import { getDataListComment } from "@/api/ApiComment";
import { getDataListRating } from "@/api/ApiRating";
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
    const callApi = await getProductDetail(`/${params.slug}`);

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

  const callDataRating = async () => {
    const callApi = await getDataListRating(`/${params.slug}?limit=10&offset=0`);

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



  

  const data = await callDataProduct();

  const [ dataComment, dataInfo, dataRating] = await Promise.all([
    callDataComment(),
    callDataProductInfo(),
    callDataRating()
  ]);
 
  return (
    <div>
      
      <AppContainer>
        <ProductDetailPage
          data={data || null}
          dataReview={dataRating || null}
          dataComment={dataComment || null}
          dataInfo={dataInfo || null}
        />
      </AppContainer>
    </div>
  );
};

export default ProductDetail;
