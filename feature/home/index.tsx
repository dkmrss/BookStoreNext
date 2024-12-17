import { getDataListProductBookCategory, getDataListProductBookNormal, getDataListProductBookSale } from "@/api/ApiBookProduct";
import { isNullOrUndefined } from "@/extension/StringExtension";
import FlashSale from "@/feature/home/FlashSale";
import Menu from "@/feature/home/Menu";
import ListProduct1 from "./ListProduct1";
import NewProduct from "./NewProduct";
import ListProduct2 from "./ListProduct2";
import { getDataListNews } from "@/api/apiNew";
import ArticleList from "./Article";
import { getDataListBanner } from "@/api/apiBanner";
const Home = async () => {
  const CallDataListProductBookNormal = async () => {
    const callApi = await getDataListProductBookNormal(
      "?limit=10&offset=0"
    );

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

  const CallDataBanner= async () => {
    const callApi = await getDataListBanner(
      "?limit=5&offset=0"
    );

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

  const callDataProductSale = async () => {
    const callApi = await getDataListProductBookSale(
      "?limit=10&offset=0"
    );

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

  const callDataProductCategory1 = async () => {
    const callApi = await getDataListProductBookCategory(
      "?category=19&limit=24&offset=0"
    );

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


  const callDataProductCategory2 = async () => {
    const callApi = await getDataListProductBookCategory(
      "?category=15&limit=12&offset=0"
    );

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

  const callDataNews= async () => {
    const callApi = await getDataListNews(
      "?field=status&value=0&take=4&skip=0"
    );

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

  const [
    dataProductNew,
    dataProductSale,
    dataProductCate1,
    dataProductCate2,
    dataNews,
    dataBanner,
  ] = await Promise.all([
    CallDataListProductBookNormal(),
    callDataProductSale(),
    callDataProductCategory1(),
    callDataProductCategory2(),
    callDataNews(),
    CallDataBanner(),
  ]);
  return (
    <>
      <Menu  data={dataBanner}/>
      <FlashSale data={dataProductSale} />
      <NewProduct data={dataProductNew} />
      <ListProduct1 data={dataProductCate1} />
      <ListProduct2 data={dataProductCate2} />
      <ListProduct2 data={dataProductCate2} />
      <ListProduct2 data={dataProductCate2} />
      <ArticleList data={dataNews} />
      {/* <PhoneBattery data={dataPhoneBattery} />
      <Screen data={dataScreen} />
      <Keyboard data={dataKeyboard} />
      <AirPurifier data={dataProductLaptopBattery} /> */}
    </>
  );
};

export default Home;
