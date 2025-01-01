"use client";
import { getCartUser } from "@/api/ApiCarts"; // Gọi API lấy giỏ hàng
import {
  Box,
  Button,
  Center,
  Flex,
  NumberFormatter,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import style from "./CartHeader.module.scss";

interface CartItem {
  cart_id: number;
  quantity: number;
  product_name: string;
  price: number;
  saleprice: number;
  image: string;
}

const CartHeader = ({
  setOpenedCart,
}: {
  setOpenedCart: Dispatch<SetStateAction<boolean>>;
}) => {
  const [dataCart, setDataCart] = useState<CartItem[]>([]);
  const [totalCartValue, setTotalCartValue] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchCartData = async () => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    // Kiểm tra đăng nhập
    if (!user || !token) {
      setIsLoggedIn(false);
      return;
    }

    setIsLoggedIn(true);

    try {
      const parsedUser = JSON.parse(user);
      const response = await getCartUser(`?userId=${parsedUser.id}`);

      if (response.success && response.data) {
        setDataCart(response.data.cartItems || []); // Gán dữ liệu giỏ hàng từ API
        setTotalCartValue(response.data.totalCartValue || 0); // Gán tổng giá trị giỏ hàng
      } else {
        setDataCart([]);
        setTotalCartValue(0);
      }
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error);
      setDataCart([]);
      setTotalCartValue(0);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <Box className={style.main}>
      <Center>
        <Text style={{ fontSize: 18 }}>Giỏ hàng</Text>
      </Center>

      {isLoggedIn ? (
        dataCart.length > 0 ? (
          <Box mt={5}>
            {dataCart.slice(0, 4).map((item) => (
              <Flex key={item.cart_id} className={style.cartItem} gap={10}>
                <img
                  src={`${process.env.NEXT_PUBLIC_URL || "http://localhost:3001"}/${item.image}`}
                  alt={item.product_name}
                  width={90}
                  height={90}
                />
                <Box w="100%">
                  <Tooltip label={item.product_name} position="bottom">
                    <Text fw={500} lineClamp={2}>
                      {item.product_name}
                    </Text>
                  </Tooltip>
                  <Flex justify="space-between">
                    <Text c={"var(--clr-primary)"} fw={500}>
                      <NumberFormatter
                        thousandSeparator="."
                        decimalSeparator=","
                        value={
                          item.price - (item.price * item.saleprice) / 100
                        }
                        suffix="₫"
                      />
                    </Text>
                    <Text>x{item.quantity}</Text>
                  </Flex>
                </Box>
              </Flex>
            ))}
            <Center mt={10}>{dataCart.length > 4 && (
                 <Text size="sm" color="dimmed">
                  Và {dataCart.length - 4} sản phẩm khác...
                </Text>
                )}</Center>
              <Center mt={10}>
              
                <Button
                  component={Link}
                  href="/cart"
                  color={"var(--clr-light-primary)"}
                  onClick={() => setOpenedCart(false)}
                >
                  Xem chi tiết giỏ hàng
                </Button>
              </Center>
            
            <Flex justify="space-between" mt={10}>
              <Text fw={500}>Tổng giá trị giỏ hàng:</Text>
              <Text c={"var(--clr-primary)"} fw={500}>
                <NumberFormatter
                  thousandSeparator="."
                  decimalSeparator=","
                  value={totalCartValue}
                  suffix="₫"
                />
              </Text>
            </Flex>
          </Box>
        ) : (
          <Box mt={5}>
            <Center>
              <IconShoppingCart size={70} />
            </Center>
            <Center mt={5} pb={5}>
              <Text fw={500} size="16px">
                Giỏ hàng của bạn đang trống!
              </Text>
            </Center>
          </Box>
        )
      ) : (
        <Box mt={5}>
          <Center>
            <IconShoppingCart size={70} />
          </Center>
          <Center mt={5}>
            <Text fw={500} size="16px">
              Bạn cần đăng nhập để xem giỏ hàng!
            </Text>
          </Center>
          <Center mt={10}>
            <Button  component={Link} href="/login" color={"var(--clr-light-primary)"}>
              Đăng nhập
            </Button>
          </Center>
        </Box>
      )}
    </Box>
  );
};

export default CartHeader;
