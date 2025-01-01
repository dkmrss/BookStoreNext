"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Flex,
  Textarea,
  TextInput,
  Select,
  Paper,
  Text,
  Title,
  Image,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { clearCart, setCartItems } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import { createOrder } from "@/api/ApiPayment";
import { NotificationExtension } from "@/extension/NotificationExtension";
import { setOrder } from "@/redux/slices/orderSlice";

const Payment = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Lấy thông tin giỏ hàng và người dùng từ Redux
  const cartItems = useSelector((state: any) => state.cart.items);
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });

  const [selectedMethod, setSelectedMethod] = useState<string | null>("0");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Hàm thay đổi giá trị thông tin khách hàng
  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }));
  };

  // Hàm kiểm tra giá trị các trường
  const validateFields = (): boolean => {
    if (!customerInfo.name.trim()) {
      NotificationExtension.Fails("Vui lòng nhập họ và tên!");
      return false;
    }
    if (!customerInfo.phone.trim() || !/^\d{10,12}$/.test(customerInfo.phone)) {
      NotificationExtension.Fails("Vui lòng nhập số điện thoại hợp lệ (10-12 số)!");
      return false;
    }
    if (!customerInfo.address.trim()) {
      NotificationExtension.Fails("Vui lòng nhập địa chỉ nhận hàng!");
      return false;
    }
    if (!selectedMethod || selectedMethod === "") {
      NotificationExtension.Fails("Vui lòng chọn phương thức thanh toán!");
      return false;
    }
    return true;
  };

  // Hàm xử lý đặt hàng
  const handleDoOrder = async () => {
    if (!validateFields()) {
      return; // Dừng nếu không vượt qua được validation
    }

    if (!user || !token) {
      setIsLoggedIn(false);
      NotificationExtension.Fails("Bạn cần đăng nhập để tiếp tục!");
      return;
    }

    setIsLoggedIn(true);
    const parsedUser = JSON.parse(user);
    const userId = parsedUser.id;

    if (!cartItems || cartItems.length === 0) {
      NotificationExtension.Fails("Giỏ hàng trống!");
      return;
    }

    const orderDetails = cartItems.map((item: any) => ({
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
    }));

    const orderData = {
      customer_id: userId,
      name: customerInfo.name,
      phone: customerInfo.phone,
      address: customerInfo.address,
      total: cartItems.reduce((acc: number, item: any) => acc + item.total_price, 0),
      method: selectedMethod === "0" ? 0 : 1,
      payment: selectedMethod === "0" ? 0 : 1,
      note: customerInfo.note,
      orderDetails,
    };

    setLoading(true);
    try {
      const response = await createOrder(orderData);
      if (response.success) {
        NotificationExtension.Success("Đặt hàng thành công!");
        dispatch(clearCart());
        localStorage.removeItem("cartItems");
        dispatch(setOrder(response.data));
        router.replace("/completeOrder");
      } else {
        NotificationExtension.Fails("Đặt hàng thất bại. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error);
      NotificationExtension.Fails("Có lỗi xảy ra khi đặt hàng.");
    } finally {
      setLoading(false);
    }
  };

  // Lấy lại giỏ hàng từ localStorage nếu Redux không có dữ liệu
  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      const storedCartItems = localStorage.getItem("cartItems");
      if (storedCartItems) {
        dispatch(setCartItems(JSON.parse(storedCartItems)));
      }
    }
  }, [cartItems, dispatch]);

  return (
    <Box p="20px" w="100%">
      <Title order={4}>Thông tin đơn hàng</Title>
      <Paper shadow="xs" p="20px" mt="10px">
        <TextInput
          label="Họ và tên"
          placeholder="Nhập họ và tên"
          required
          value={customerInfo.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
        <TextInput
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          required
          mt="10px"
          value={customerInfo.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
        />
        <TextInput
          label="Địa chỉ"
          placeholder="Nhập địa chỉ nhận hàng"
          required
          mt="10px"
          value={customerInfo.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
        />
        <Textarea
          label="Ghi chú"
          placeholder="Ghi chú cho đơn hàng (tuỳ chọn)"
          mt="10px"
          value={customerInfo.note}
          onChange={(e) => handleInputChange("note", e.target.value)}
        />
        <Select
          label="Phương thức thanh toán"
          placeholder="Chọn phương thức"
          mt="10px"
          data={[
            { value: "0", label: "Thanh toán khi nhận hàng (COD)" },
            { value: "1", label: "Thanh toán online Mb bank" },
          ]}
          value={selectedMethod}
          onChange={setSelectedMethod}
        />
      </Paper>

      {/* Danh sách sản phẩm */}
      <Box mt="20px">
        <Title order={5}>Danh sách sản phẩm</Title>
        {cartItems.map((item: any) => (
          <Flex
            key={item.product_id}
            mt="10px"
            p="10px"
            style={{ border: "1px solid #eee", borderRadius: "8px" }}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_URL || "http://localhost:3001"}/${item.image}`}
              alt={item.product_name}
              width={60}
              height={60}
              style={{ borderRadius: "8px" }}
            />
            <Box ml="10px" w="100%">
              <Text fw="bold">{item.product_name}</Text>
              <Flex justify="space-between" mt="5px">
                <Text>
                  Số lượng: <strong>{item.quantity}</strong>
                </Text>
                <Text>
                  Tổng: <strong>{item.total_price * item.quantity} ₫</strong>
                </Text>
              </Flex>
            </Box>
          </Flex>
        ))}
      </Box>

      {/* Tổng tiền và nút thanh toán */}
      <Flex justify="space-between" mt="20px">
        <Text>Tổng tiền:</Text>
        <Text fw="bold">
          {cartItems.reduce((acc: number, item: any) => acc + item.total_price, 0)} ₫
        </Text>
      </Flex>

      <Button
        color="var(--clr-primary)"
        fullWidth
        mt="20px"
        onClick={handleDoOrder}
        loading={loading}
      >
        Đặt hàng
      </Button>
    </Box>
  );
};

export default Payment;
