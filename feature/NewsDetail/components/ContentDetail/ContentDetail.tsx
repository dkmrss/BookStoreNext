import { useEffect, useState } from "react";
import "./ContentDetail.css";
import { TblItem } from "@/model/ProductList";
import { DataArticle } from "@/model/DataArticle";
import { getDataListProductFull } from "@/api/apiProduct";
import { isNullOrUndefined } from "@/extension/StringExtension";
import style from "./style.module.scss";
const ContentDetail = ({ data }: { data: DataArticle }) => {
  const [dataContent, setDataContent] = useState("");
  const [dataProduct, setDataProduct] = useState<{ [key: number]: TblItem[] }>(
    {}
  );
  const [dataListHTMLProduct, setDataListHTMLProduct] = useState<string[]>([]);
  const [dataArrayProduct, setDataArrayProduct] = useState({
    0: {
      length: 0,
      string: "",
    },
  });

  const formatCurrency = (number: any) => {
    let strNumber = String(number);
    let result = "";
    while (strNumber.length > 3) {
      result = "." + strNumber.slice(-3) + result;
      strNumber = strNumber.slice(0, -3);
    }
    result = strNumber + result;
    result += " Đ";
    return result;
  };

  function replaceHtml(htmlString: any) {
    let replaceDir = htmlString.replace(
      /<div dir="auto">/g,
      '<div dir="auto" class="paddingDiv">'
    );
    // Thay thế đường dẫn hình ảnh
    let replacedSrc = replaceDir.replace(
      /src="\/media/gi,
      'src="https://hanoicomputercdn.com/media'
    );
    const replaceCallback = (index: number) => {
      if (dataProduct[index] === undefined) {
        return `Chưa load dc ${index}`; // Trả về chuỗi rỗng nếu dataProduct[index] là undefined
      }
      return `<div class="flexBox">
                ${dataProduct[index]
                  .map(
                    (item: TblItem) =>
                      `
                      <div class="mainCard" >
                      <div class="propertyCard">
                    ${`<img
                        class="mainImg"
                        src="${item?.primaryImage || ""}"
                        alt="${item?.itemName ?? "Product"}"
                      />`}
                       
                  </div>
                  <div className={productCardStyle.information}>
                    <div className={productCardStyle.detail}>
                      <div class="name">
                        <p>${`${item?.itemName}`}</p>
                      </div>
                        <div class="prices">
                        ${`
                          <div>
                              <p class="oldPrice">
                                ${formatCurrency(item?.marketPrice)}
                              </p>
                              <p class="newPrice">
                              ${formatCurrency(
                                item?.unitSellingPrice ?? item?.marketPrice
                              )}
                              </p>
                          </div>
                        `}
                        </div>
                        ${`
                        <div class="name">
                          <a class="moreBox" href="/product-detail/${item.url}">
                            <div class="more">Xem chi tiết</div>
                          </a>
                          </div>
                        `}
                      </div>
                    </div>
                  </div>`
                  )
                  .join("\n")}</div>`;
    };

    for (var i = 0; i < dataListHTMLProduct.length; i++) {
      if (dataProduct[i] !== undefined) {
        replacedSrc = replacedSrc.replace(
          dataListHTMLProduct[i],
          replaceCallback(i)
        );
      }
    }

    return replacedSrc;
  }

  const fetchData = async (
    item: { length: number; string: string },
    index: number
  ) => {
    try {
      const callapi = await getDataListProductFull(
        `?${item.string}&Skip=0&Take=${item.length}`
      );
      if (!isNullOrUndefined(callapi) && !isNullOrUndefined(callapi?.data)) {
        const dataApi = callapi?.data;
        if (dataApi != null && !isNullOrUndefined(dataApi)) {
          setDataProduct((prevData) => ({ ...prevData, [index]: dataApi }));
        }
      } else {
        console.log("Dữ liệu không tồn tại");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const getIdArray = async () => {
      const regex = /\[Products:(.*?)\]/g;
      const matches = data?.content ? data.content.match(regex) : null;
      const dataList = matches ? matches.map((match) => match) : [];
      function extractIds(string: any) {
        const regex = /\d+/g;
        return string.match(regex).map(Number);
      }
      const result = matches
        ? matches.reduce((acc: any, currentString, index) => {
            const ids = extractIds(currentString);
            acc[index] = {
              length: ids.length,
              string: ids.map((item: any) => `ItemIds=${item}`).join("&"),
            };
            return acc;
          }, {})
        : {};
      setDataListHTMLProduct(dataList);
      setDataArrayProduct(result);
    };
    getIdArray();
  }, [data]);

  useEffect(() => {
    Object.entries(dataArrayProduct).forEach(([key, item]) => {
      fetchData(item, parseInt(key));
    });
  }, [dataArrayProduct]);

  useEffect(() => {
    if (data?.content) {
      const dataContent = replaceHtml(data.content);
      setDataContent(dataContent);
    }
  }, [data, dataArrayProduct, dataProduct]);
  return (
    <>
      {data?.content && (
        <div
          className={style.contentText}
          dangerouslySetInnerHTML={{
            __html: dataContent,
          }}
        />
      )}
    </>
  );
};

export default ContentDetail;
