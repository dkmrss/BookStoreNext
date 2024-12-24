
import { addToCart } from "@/api/ApiCarts";
import { NotificationExtension } from "@/extension/NotificationExtension";
import { TblProduct } from "@/model/TblBook";
import {
  Box,
  Flex,
  Loader,
  NumberFormatter,
  Text
} from "@mantine/core";
import { IconShoppingCartPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import style from "./ProductDetailTopRightProps.module.scss";

type ProductDetailTopRightProps = {
  data: TblProduct;
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


  const handleBuyNow = async () => {
    handleAddToCart();
    router.push("/cart");
  };

  

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
                      onClick={handleAddToCart}
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
