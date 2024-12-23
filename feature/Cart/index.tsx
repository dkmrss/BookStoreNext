"use client";
import {
  getCartUser,
  deleteCartProduct,
  clearCart,
  updateCartQuantity,
} from "@/api/ApiCarts";
import {
  Box,
  Button,
  Center,
  Flex,
  NumberFormatter,
  Paper,
  Text,
  Image,
  Title,
} from "@mantine/core";
import {
  IconMinus,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCartItems } from "@/redux/slices/cartSlice"; // Import Redux slice
import style from "./cart.module.scss";
import { useRouter } from "next/router";

interface CartItem {
  cart_id: number;
  quantity: number;
  product_name: string;
  price: number;
  saleprice: number;
  image: string;
  product_id: number;
}

const Cart = () => {
  const [dataCart, setDataCart] = useState<CartItem[]>([]);
  const [totalCartValue, setTotalCartValue] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  const fetchCartData = async () => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!user || !token) {
      setIsLoggedIn(false);
      return;
    }

    setIsLoggedIn(true);

    try {
      const parsedUser = JSON.parse(user);
      const response = await getCartUser(`?userId=${parsedUser.id}`);

      if (response.success && response.data) {
        const cartItems = response.data.cartItems || [];
        setDataCart(cartItems);
        setTotalCartValue(response.data.totalCartValue || 0);
        dispatch(setCartItems(cartItems)); // Cập nhật Redux
      } else {
        setDataCart([]);
      setTotalCartValue(0);
      dispatch(setCartItems([])); // Cập nhật Redux
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu giỏ hàng:", error);
      setDataCart([]);
      setTotalCartValue(0);
      dispatch(setCartItems([])); // Cập nhật Redux
    }
  };

  const handleDeleteItem = async (item: CartItem) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      await deleteCartProduct(user.id, item.product_id);

      await fetchCartData(); // Cập nhật giỏ hàng và tổng giá trị sau khi xóa
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      await clearCart(user.id);

      await fetchCartData(); // Cập nhật giỏ hàng và tổng giá trị sau khi xóa tất cả
    } catch (error) {
      console.error("Lỗi khi xóa toàn bộ giỏ hàng:", error);
    }
  };

  const handleIncreaseQuantity = async (item: CartItem) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      await updateCartQuantity(user.id, item.product_id, item.quantity + 1);

      await fetchCartData(); // Cập nhật giỏ hàng và tổng giá trị sau khi thay đổi số lượng
    } catch (error) {
      console.error("Lỗi khi tăng số lượng sản phẩm:", error);
    }
  };

  const handleDecreaseQuantity = async (item: CartItem) => {
    if (item.quantity <= 1) return;

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      await updateCartQuantity(user.id, item.product_id, item.quantity - 1);

      await fetchCartData(); // Cập nhật giỏ hàng và tổng giá trị sau khi thay đổi số lượng
    } catch (error) {
      console.error("Lỗi khi giảm số lượng sản phẩm:", error);
    }
  };

  const handleCheckout = () => {
    localStorage.setItem("cartItems", JSON.stringify(dataCart)); // Lưu vào localStorage
  dispatch(setCartItems(dataCart)); // Lưu trạng thái vào Redux
  window.location.href = "/payment";
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <Box className={style.cart}>
      {isLoggedIn ? (
        dataCart.length > 0 ? (
          <Box w="100%">
            <Title order={4}>Giỏ hàng</Title>
            <Box mt="15px">
              {dataCart.map((item) => (
                <Flex
                  key={item.cart_id}
                  m="10px 0px"
                  p="10px"
                  gap="5px"
                  style={{ border: "1px solid #eeeeee", borderRadius: "10px" }}
                >
                  <Image
                    src={`http://localhost:3001/${item.image}`}
                    alt={item.product_name}
                    width={90}
                    height={90}
                  />
                  <Box w="100%">
                    <Flex justify="space-between" align="center" gap={10}>
                      <Text fw={500} lineClamp={2}>
                        {item.product_name}
                      </Text>
                      <IconTrash
                        size={16}
                        onClick={() => handleDeleteItem(item)}
                        cursor="pointer"
                      />
                    </Flex>
                    <Flex justify="space-between" align="center">
                      <Text c="var(--clr-primary)" fw={500}>
                        <NumberFormatter
                          value={item.price - (item.price * item.saleprice) / 100}
                          thousandSeparator="."
                          decimalSeparator=","
                          suffix="₫"
                        />
                      </Text>
                      <Flex gap="10px" align="center">
                        <IconMinus
                          size="16px"
                          onClick={() => handleDecreaseQuantity(item)}
                          cursor="pointer"
                        />
                        <Text>{item.quantity}</Text>
                        <IconPlus
                          size="16px"
                          onClick={() => handleIncreaseQuantity(item)}
                          cursor="pointer"
                        />
                      </Flex>
                    </Flex>
                  </Box>
                </Flex>
              ))}
            </Box>
            <Paper shadow="xl" p="10px" mt="20px">
              <Flex justify="space-between">
                <Text fw={500}>Tổng tiền tạm tính:</Text>
                <Text c="var(--clr-primary)" fw={500}>
                  <NumberFormatter
                    value={totalCartValue}
                    thousandSeparator="."
                    decimalSeparator=","
                    suffix="₫"
                  />
                </Text>
              </Flex>
              <Flex justify="space-between" mt="10px">
                <Button color="var(--clr-light-primary)" onClick={handleClearCart}>
                  Xóa tất cả
                </Button>
                <Button color="var(--clr-text-green)" onClick={handleCheckout}>
                  Thanh toán
                </Button>
              </Flex>
            </Paper>
          </Box>
        ) : (
          <Center mt="50px">
            <Text fw={500}>Giỏ hàng của bạn đang trống!</Text>
          </Center>
        )
      ) : (
        <Center mt="50px">
          <Text fw={500}>Bạn cần đăng nhập để xem giỏ hàng!</Text>
        </Center>
      )}
    </Box>
  );
};

export default Cart;
