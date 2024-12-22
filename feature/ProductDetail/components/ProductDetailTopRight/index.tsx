import { createCollectionForm } from "@/api/apiCollectionForm";
import { TblProduct } from "@/model/TblBook";
import { TblCollectionForm } from "@/model/TblCollectionForm";
import {
  Box,
  Flex,
  Loader,
  NumberFormatter,
  Text
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconShoppingCartPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import style from "./ProductDetailTopRightProps.module.scss";

type ProductDetailTopRightProps = {
  data: TblProduct | null;
};

type dataTechnicalType = {
  groupName: string | null;
  configItems: dataTechnicalConfigItem[];
};

type dataTechnicalConfigItem = {
  itemIds: number[];
  value: string | null;
};

const ProductDetailTopRight = ({ data }: ProductDetailTopRightProps) => {
  const router = useRouter();
  const [dataTechnical, setDataTechnical] = useState<dataTechnicalType[]>([]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const entity = {
    id: 0,
    fullname: "",
    mobile: "",
    email: "",
    productName: null,
    productId: null,
    keyword: null,
  };

  const form = useForm<TblCollectionForm>({
    initialValues: {
      ...entity,
    },

    validate: {
      fullname: isNotEmpty("Vui lòng nhập họ và tên"),
      mobile: (value) =>
        value
          ? value.length != 10
            ? "Số điện thoại phải có 10 chữ số"
            : null
          : "Vui lòng nhập số điện thoại",

      email: (value) =>
        value ? (/^\S+@\S+$/.test(value) ? null : "email không hợp lệ") : null,
    },
  });

  const handleBuyNow = async () => {
    // handleAddCart();
    router.push("/cart");
  };

  const handleSubmitOrderForm = async (dataSubmit: TblCollectionForm) => {
    const dataCollection = {
      ...dataSubmit,
      productId: data?.id,
      productName: data?.product_name,
    };
    const success = await createCollectionForm(dataCollection);
    if (success === true) {
      form.reset();
    }
  };

  // const handleAddCart = async () => {
  //   setIsLoading(true); // Set loading state to true

  //   const userData = localStorage.getItem("userInfo");
  //   const id = userData ? JSON.parse(userData).data.customerId : 0;
  //   const newData = {
  //     customerId: id,
  //     tblShoppingCartDetailCommand: [
  //       {
  //         itemCode: data?.itemCode,
  //         itemName: data?.itemName,
  //         itemId: data?.id,
  //         quantity: 1,
  //         itemPrice: data?.marketPrice,
  //         itemSalePrice: data?.unitSellingPrice,
  //         itemImage: data?.primaryImage,
  //         totalAmount: data?.unitSellingPrice || 0,
  //         itemUrl: data?.url,
  //       },
  //     ],
  //   };
  //   await createCartProduct(newData);

  //   // fetchDataHeader();
  //   const totalData = await totalCartPrice(id);
  //   const newCartHeader = {
  //     totalItem: totalData?.data?.quantity,
  //     totalPrice: totalData?.data?.totalAmount,
  //   };
  //   dispatch(updateCart(newCartHeader));

  //   // Add a delay of 10 seconds after the cart operations
  //   await new Promise((resolve) => setTimeout(resolve, 5000));

  //   setIsLoading(false); // Set loading state to false after processing
  // };

 
  const  marketPrice= data?.price ?? 0;
  const percent = data?.saleprice ?? 0;
 

  const roundToNearestHundred = (value: number) => {
    return Math.round(value / 100) * 100;
  };
  const  unitSellingPrice = roundToNearestHundred((marketPrice - (marketPrice / percent )))

  
  

  

  return (
    <div className={style.boxRightTop}>
      
     
      <Box className={style.price}>
          <Text fw={700} style={{ fontSize: 16 }}>
            Giá khuyến mãi:
          </Text>
          <Flex align={"center"} gap={10}>
            <Text className={style.remainingPrice}>
              <NumberFormatter
                value={unitSellingPrice || 0}
                thousandSeparator="."
                decimalSeparator=","
                suffix="₫"
              />
            </Text>

            <Text className={style.textPrice} td="line-through" c={"#787878"}>
              <NumberFormatter
                value={data?.price || 0}
                thousandSeparator="."
                decimalSeparator=","
                suffix="₫"
              />
            </Text>
            <Text className={style.textPrice} c={"#787878"}>
              (Tiết kiệm{" "}
              <NumberFormatter
                value={marketPrice - unitSellingPrice}
                thousandSeparator="."
                decimalSeparator=","
                suffix="₫"
              />
              )
            </Text>
          </Flex>
        </Box>
        <Box>
              <Box className={style.buy}>
                <div className={style.buttonWrap}>
                  <div className={style.buyButtons}>
                    <button
                      className={style.buyButton}
                      onClick={() => handleBuyNow()}
                    >
                      <span className={style.buyText1}>Mua ngay</span>
                      <span className={style.buyText2}>
                        (Nhận tại nhà hoặc tại cửa hàng)
                      </span>
                    </button>

                    <button
                      className={style.buttonAddToCart}
                      // onClick={() => handleAddCart()}
                      disabled={isLoading}
                    >
                      {isLoading ? ( // Show loader when loading
                        <Loader
                          color={"var(--clr-primary)"}
                          size="sm"
                          className={style.iconCart}
                        />
                      ) : (
                        <IconShoppingCartPlus
                          className={style.iconCart}
                          size={18}
                        />
                      )}
                      <span className={style.buyText2}>
                        {" "}
                        {isLoading ? "Đang xử lý..." : "Thêm vào giỏ hàng"}
                      </span>
                    </button>
                  </div>
                </div>
              </Box>
            </Box>
    </div>
  );
};

export default ProductDetailTopRight;
