// ProductCard.js
"use client";
import NullImage from "@/assets/NullImage.png";
import {
  Box,
  Button,
  Image,
  NumberFormatter,
  Rating,
  Tooltip
} from "@mantine/core";
import {
  IconPhone,
  IconShoppingCartPlus
} from "@tabler/icons-react";
import Image2 from "next/image";
import Link from "next/link";
import style from "./productCard.module.scss";

import { addToCart } from "@/api/ApiCarts";
import { NotificationExtension } from "@/extension/NotificationExtension";
import { TblProduct } from "@/model/TblBook";
import { useState } from "react";

interface ProductCardProps {
  data: TblProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const  marketPrice= data?.price ?? 0;
  const percent = data?.saleprice ?? 0;
 
  
  const [notification, setNotification] = useState<{ message: string; error: boolean } | null>(null);
  const roundToNearestHundred = (value: number) => {
    return Math.round(value / 100) * 100;
  };
  const  unitSellingPrice = roundToNearestHundred((marketPrice - (marketPrice / percent )))
  
  const handleAddToCart = async () => {
    // Lấy thông tin user và token từ localStorage
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
  
    if (!user || !token) {
      // Nếu chưa đăng nhập, hiển thị thông báo lỗi
      NotificationExtension.Warn("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
      return;
    }
  
    const parsedUser = JSON.parse(user); // Parse user từ localStorage
  
    try {
      // Gọi API addToCart
      const response = await addToCart(parsedUser.id, data.id, 1); // Thêm sản phẩm với số lượng mặc định là 1
    } catch (error: any) {
      // Hiển thị thông báo lỗi nếu API thất bại
      
      NotificationExtension.Fails("Không thể thêm sản phẩm vào giỏ hàng!");
    }
  };
 
  


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
              <Image src={`${process.env.NEXT_PUBLIC_URL || "http://localhost:3001"}/${data?.image}`} alt={data?.image || ""} />
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
            {/* Nút thêm vào giỏ hàng */}
        
          </Box>
        </Link>
          
      </Box>
      {data?.quantity >= 1 ? (<Button
          leftSection={<IconShoppingCartPlus />}
          color="var(--clr-bright-primary)"
          onClick={handleAddToCart}
          className={style.addToCartButton}
        >
          Thêm vào giỏ
        </Button> ):(<Button
          leftSection={<IconPhone />}
          color="var(--clr-bright-primary)"
          disabled
          className={style.addToCartButton}
        >
          Liên hệ ngay
        </Button> )}
          
    </div>
  );
};

export default ProductCard;
