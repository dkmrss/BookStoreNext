"use client";
import {
  deleteCartProduct,
  getCartProduct,
  totalCartPrice,
} from "@/api/apiCart";
import logo from "@/assets/dichvutot-01-01.png";
import { CartDetail } from "@/model/Cart";
import { updateCart } from "@/redux/slices/cartSlice";
import { addSaleOrder } from "@/redux/slices/saleOrderSlice";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  NumberFormatter,
  Paper,
  Text,
  Title,
  em,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconArrowLeft,
  IconMinus,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./cart.module.scss";

type InitialValue = {
  checked: boolean;
  key: string;
  quantity: number;
};

const Cart = () => {
  const saleOrder = useSelector((state: any) => state.saleOrder);
  const dispatch = useDispatch();
  const [values, setValues] = useState<CartDetail[]>([]);
  const isMobile = useMediaQuery(`(max-width: ${em(800)})`);
  const allChecked = values.every((value) => value.checked);

  const fetchData = async () => {
    try {
      const userData = localStorage.getItem("userInfo");
      const id = userData ? JSON.parse(userData).data.customerId : 0;
      const cartData = await getCartProduct(id);
      const cartDetailModel = cartData.data.tblShoppingCartDetailModel;
      if (cartDetailModel) {
        const cartItem = cartDetailModel.map((item: any) => ({
          ...item,
          checked: true,
          totalAmount: (item?.quantity || 0) * (item?.itemSalePrice || 0),
        }));
        setValues(cartItem);
        const newSaleOrder = {
          saleOrderDetail: cartItem?.map((orderDetail: any) => ({
            ...orderDetail,
            cartDetailId: orderDetail.id,
          })),
          // saleOrderDetail: cartItem,
          totalAmount: cartItem.reduce((total: number, item: CartDetail) => {
            return total + (item.quantity || 0) * (item.itemSalePrice || 0);
          }, 0),
        };
        dispatch(addSaleOrder(newSaleOrder));
      } else {
        console.log("Dữ liệu không tồn tại");
      }
    } catch (error) {
      console.log("Lỗi khi lấy dữ liệu giỏ hàng", error);
    }
  };

  const handleAddToSaleOrder = (data: CartDetail[]) => {
    const checkedItems = data.filter((item) => item.checked);
    const newSaleOrder = {
      saleOrderDetail: checkedItems?.map((orderDetail) => ({
        ...orderDetail,
        cartDetailId: orderDetail.id,
      })),
      // saleOrderDetail: checkedItems,
      totalAmount: checkedItems.reduce((total: number, item: CartDetail) => {
        return total + (item.quantity || 0) * (item.itemSalePrice || 0);
      }, 0),
    };

    dispatch(addSaleOrder(newSaleOrder));
  };

  const handleCheckAll = (value: boolean) => {
    setValues((prevData) =>
      prevData.map((item) => ({ ...item, checked: !allChecked }))
    );
  };

  const handleCheckItem = (value: boolean, index: number) => {
    const updatedValues = [...values];
    updatedValues[index] = {
      ...updatedValues[index],
      checked: value,
    };
    setValues(updatedValues);
    handleAddToSaleOrder(updatedValues);
  };

  const handleIncreaseQuantity = (index: number) => {
    const updatedValues = [...values];
    updatedValues[index] = {
      ...updatedValues[index],
      quantity: updatedValues[index].quantity + 1,
      totalAmount:
        (updatedValues[index].quantity + 1) *
        updatedValues[index].itemSalePrice,
    };

    setValues(updatedValues);
    handleAddToSaleOrder(updatedValues);
  };

  const handleDecreaseQuantity = (index: number) => {
    const updatedValues = [...values];
    if (updatedValues[index].quantity > 1) {
      updatedValues[index] = {
        ...updatedValues[index],
        quantity: updatedValues[index].quantity - 1,
        totalAmount:
          (updatedValues[index].quantity - 1) *
          updatedValues[index].itemSalePrice,
      };

      setValues(updatedValues);
      handleAddToSaleOrder(updatedValues);
    }
  };

  const handleDeleteItem = async (item: CartDetail) => {
    await deleteCartProduct(
      [item.id],
      [{ id: item.itemId, itemName: item.itemName }]
    );
    fetchData();
    const userData = localStorage?.getItem("userInfo");
    const customerId = userData ? JSON.parse(userData).data.customerId : 0;

    const totalData = await totalCartPrice(customerId);
    const newCartHeader = {
      totalItem: totalData?.data?.quantity,
      totalPrice: totalData?.data?.totalAmount,
    };
    dispatch(updateCart(newCartHeader));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={style.cart}>
      {values.length > 0 ? (
        <Box w={isMobile ? "100%" : "50%"}>
          <Flex
            p={"5px 0px"}
            style={{ borderBottom: "1px solid #eeeeee" }}
            w={"100%"}
          >
            <Link href={"/home"} style={{ paddingTop: "5px" }}>
              <IconArrowLeft
                width={"20px"}
                height={"20px"}
                stroke={1.5}
                cursor={"pointer"}
              />
            </Link>
            <Box ta={"center"} w={"100%"}>
              <Title order={4}>Trang chủ</Title>
            </Box>
          </Flex>
          <Flex mt={"30px"}>
            <Box
              p={"5px 10px"}
              bg={"var(--clr-primary)"}
              style={{ borderRadius: "10px" }}
            >
              <Text c={"#fff"}>Giỏ hàng</Text>
            </Box>
          </Flex>
          <Box mt={"15px"}>
            <Checkbox
              label="Chọn tất cả"
              color="var(--clr-primary)"
              checked={allChecked}
              onChange={(event) => handleCheckAll(event.currentTarget.checked)}
            />
            {values.map((item, index) => (
              <Flex
                key={index}
                m={"10px 0px"}
                p={"10px"}
                gap={"5px"}
                style={{ border: "1px solid #eeeeee", borderRadius: "10px" }}
              >
                <Checkbox
                  color="var(--clr-primary)"
                  checked={item.checked || false}
                  onChange={(event) =>
                    handleCheckItem(event.currentTarget.checked, index)
                  }
                />
                <img
                  src={item.itemImage || ""}
                  alt="Ảnh SP"
                  width={"130px"}
                  height={"130px"}
                />
                <Box w={"100%"}>
                  <Flex justify={"space-between"} align={"center"} gap={10}>
                    <Text fw={500} style={{ width: "calc(100% - 26px)" }}>
                      {item.itemName}
                    </Text>
                    <IconTrash
                      size={16}
                      onClick={() => handleDeleteItem(item)}
                      cursor={"pointer"}
                    />
                  </Flex>
                  <Flex justify={"space-between"} align={"center"}>
                    <Text c={"var(--clr-primary)"} fw={500}>
                      <NumberFormatter
                        className={style.promotionPrice}
                        value={item.itemSalePrice}
                        thousandSeparator="."
                        decimalSeparator=","
                        suffix="₫"
                      />
                    </Text>
                    <Flex
                      gap={"10px"}
                      align={"center"}
                      bg={"#EEEEEE"}
                      p={"0px 5px"}
                      style={{ borderRadius: "10px" }}
                    >
                      <IconMinus
                        size={"16px"}
                        onClick={() => handleDecreaseQuantity(index)}
                        cursor={"pointer"}
                      />
                      <Text>{item.quantity}</Text>
                      <IconPlus
                        size={"16px"}
                        onClick={() => handleIncreaseQuantity(index)}
                        cursor={"pointer"}
                      />
                    </Flex>
                  </Flex>
                </Box>
              </Flex>
            ))}
          </Box>
          <Paper shadow="xl" p={"10px"} pos={"relative"} h={"135px"}>
            <Box w={"96.5%"} pos={"absolute"}>
              <Flex justify="space-between" align="center" w={"100%"}>
                <Text fw={500}>Tổng tiền tạm tính:</Text>
                <Text c={"var(--clr-primary)"} fw={500}>
                  <NumberFormatter
                    thousandSeparator
                    value={saleOrder.totalAmount}
                    suffix="đ"
                  />
                </Text>
              </Flex>
              <Button
                color="var(--clr-primary)"
                fullWidth
                mt={"10px"}
                disabled={!values.some((item) => item.checked)}
                component={Link}
                href="/payment"
              >
                <Text fw={500}>Mua ngay</Text>
              </Button>
              <Button
                variant="outline"
                className={style.button}
                // bg={hovered ? "var(--clr-primary)" : "#fff"}
                bd={"1px solid var(--clr-primary)"}
                w={"100%"}
                mt={"10px"}
                component={Link}
                href="/home"
              >
                Chọn thêm sản phẩm khác
              </Button>
            </Box>
          </Paper>
        </Box>
      ) : (
        <Box w={isMobile ? "100%" : "50%"}>
          <Center>
            <Image
              src={logo}
              alt="logo-HACOM"
              width={160}
              height={40}
              style={{
                marginTop: "10px",
                borderRadius: "12px",
                marginBottom: "20px",
              }}
            />
          </Center>
          <Center>
            <Text fw={500} size="16px">
              Giỏ hàng của bạn đang trống!
            </Text>
          </Center>
          <Center mt={"10px"}>
            <Text fw={500} size="16px">
              Hãy chọn thêm sản phẩm để mua sắm nhé.
            </Text>
          </Center>
          <Center mt={"30px"}>
            <Button color="var(--clr-primary)">
              <Link
                href={"/home"}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <Flex gap={"10px"} align={"center"}>
                  <IconArrowLeft />
                  <Text fw={500} size="18px">
                    Quay về trang chủ
                  </Text>
                </Flex>
              </Link>
            </Button>
          </Center>
        </Box>
      )}
    </div>
  );
};

export default Cart;
