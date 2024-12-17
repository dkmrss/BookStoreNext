// ProductCard.js
"use client";
import GuaranteeIcon from "@/assets/guarantee.png";
import {
  Box,
  Button,
  Image,
  NumberFormatter,
  Rating,
  Text,
  Tooltip,
} from "@mantine/core";
import { updateCart } from "@/redux/slices/cartSlice";
import Image2 from "next/image";
import NullImage from "@/assets/NullImage.png";
import style from "./productCard.module.scss";
import {
  IconCheck,
  IconClockHour4,
  IconPhone,
  IconShield,
  IconShoppingCartPlus,
} from "@tabler/icons-react";
import { TblItem } from "@/model/ProductList";
import Link from "next/link";
import { createCartProduct, totalCartPrice } from "@/api/apiCart";
import { useDispatch } from "react-redux";
import { TblProduct } from "@/model/TblBook";

interface ProductCardProps {
  data: TblProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const  marketPrice= data?.price ?? 0;
  const percent = data?.saleprice ?? 0;
 
  const dispatch = useDispatch();

  const roundToNearestHundred = (value: number) => {
    return Math.round(value / 100) * 100;
  };
  const  unitSellingPrice = roundToNearestHundred((marketPrice - (marketPrice / percent )))
  // const handleAddCart = async () => {
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
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
  // };

 

  return (
    // <a className={style.productCard} href={data?.link}>
    <div className={style.productCard}>
      <Box className={style.infoBox}>
        <Link
          className={style.link}
          href={data?.id ? `/product-detail/${data.id}` : "#"}
        >
          <Box className={style.imgBox}>
            {data?.image ? (
              <Image src={`http://localhost:3001/${data?.image}`} alt={data?.image || ""} />
            ) : (
              <Image2 src={NullImage} alt={data?.image ?? "Product"} />
            )}
          </Box>
          <Box className={style.ratingBox}>
            <Rating size="xs" value={5} fractions={2} readOnly />
            {/* <div className={style.code}>
              <span className={style.codeText}>Mã:</span>
              {data?.itemCode}
            </div> */}
          </Box>

          <Box className={style.nameBox}>
            <Tooltip
              position="bottom-start"
              label={data?.product_name}
              color="rgba(36, 36, 36, 1)"
            >
              <h3 className={style.nameText}>{data?.product_name}</h3>
            </Tooltip>
          
            <Box className={style.priceBox}>
            {data?.sale === 1 ? (
              <span className={style.price}>
                <NumberFormatter
                  thousandSeparator
                  value={
                    unitSellingPrice === 0 ? marketPrice | 0 : unitSellingPrice
                  }
                  suffix="đ"
                />
              </span>
            ):(
              <span className={style.price}>
                <NumberFormatter
                  thousandSeparator
                  value={
                    marketPrice
                  }
                  suffix="đ"
                />
              </span>
            )}
              
            </Box>
            {data?.sale === 1 ? (
              <Box className={style.priceBox}>
                  <>
                    <span className={style.prePrice}>
                      <NumberFormatter
                        thousandSeparator
                        value={marketPrice}
                        suffix="đ"
                      />
                    </span>{" "}
                    <span className={style.prePrice2}>
                      (tiết kiệm {percent}%)
                    </span>
                  </>
                
            </Box>
            ) :(
              <Box className={style.priceBox}>
                  <>
                    <span className={style.prePriceNotSale}>
                      <NumberFormatter
                        thousandSeparator
                        value={marketPrice}
                        suffix="đ"
                      />
                    </span>{" "}
                    
                  </>
            </Box>
            )}
            
          </Box>
        </Link>
        {/* {renderContent()} */}
      </Box>
    </div>
  );
};

export default ProductCard;
