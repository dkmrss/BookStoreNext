"use client";
import {
  deleteCartProduct,
  getCartProduct,
  totalCartPrice,
} from "@/api/apiCart";
import { CartDetail } from "@/model/Cart";
import { updateCart } from "@/redux/slices/cartSlice";
import { addSaleOrder } from "@/redux/slices/saleOrderSlice";
import {
  Box,
  Button,
  Center,
  Flex,
  NumberFormatter,
  ScrollArea,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconShoppingCart, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./CartHeader.module.scss";

const CartHeader = ({
  setOpenedCart,
}: {
  setOpenedCart: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const saleOrder = useSelector((state: any) => state.saleOrder);
  const [dataCart, setDataCart] = useState<CartDetail[]>([]);

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

  const fetchData = async () => {
    try {
      const userData = localStorage.getItem("userInfo");
      const id = userData ? JSON.parse(userData).data.customerId : 0;
      const cartData = await getCartProduct(id);
      const cartDetailModel = cartData.data.tblShoppingCartDetailModel;
      if (cartDetailModel) {
        const cartItem = cartDetailModel.map((item: any) => ({
          ...item,
          totalAmount: (item?.quantity || 0) * (item?.itemSalePrice || 0),
        }));
        setDataCart(cartItem);

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box className={style.main}>
      <Center>
        <Text style={{ fontSize: 18 }}>Giỏ hàng</Text>
      </Center>
      <ScrollArea.Autosize className={style.cartBox} mt={5}>
        {dataCart.length > 0 ? (
          dataCart.map((item, index) => (
            <Flex key={index} className={style.cartItem}>
              <img
                src={item.itemImage || ""}
                alt="Ảnh SP"
                width={"90px"}
                height={"90px"}
              />
              <Box w={"100%"}>
                <Flex justify={"space-between"} gap={10}>
                  <Tooltip label={item.itemName} position="bottom">
                    <Text
                      fw={500}
                      lineClamp={2}
                      style={{
                        width: "calc(100% - 26px)",
                        fontSize: 15,
                        minHeight: 30,
                      }}
                    >
                      {item.itemName}
                    </Text>
                  </Tooltip>

                  <IconX
                    size={18}
                    onClick={() => handleDeleteItem(item)}
                    cursor={"pointer"}
                    style={{ marginTop: 3 }}
                  />
                </Flex>

                <Flex gap={10}>
                  <Text c={"var(--clr-primary)"} fw={500}>
                    <NumberFormatter
                      className={style.promotionPrice}
                      value={item.itemSalePrice}
                      thousandSeparator="."
                      decimalSeparator=","
                      suffix="₫"
                    />
                  </Text>

                  <Text>
                    <NumberFormatter
                      className={style.price}
                      value={item.itemPrice}
                      thousandSeparator="."
                      decimalSeparator=","
                      suffix="₫"
                    />
                  </Text>
                </Flex>

                <Text>x{item.quantity}</Text>
              </Box>
            </Flex>
          ))
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
        )}
      </ScrollArea.Autosize>

      <Box mt={5}>
        <Flex justify={"space-between"}>
          <Text fw={500}>Tổng tiền tạm tính:</Text>
          <Text c={"var(--clr-primary)"} fw={500}>
            <NumberFormatter
              thousandSeparator="."
              decimalSeparator=","
              value={saleOrder.totalAmount || 0}
              suffix="  đ"
            />
          </Text>
        </Flex>

        <Flex gap={20} mt={10}>
          <Button
            component={Link}
            href="/cart"
            variant="outline"
            color="var(--clr-text-dark)"
            w={"60%"}
            onClick={() => setOpenedCart(false)}
          >
            Chỉnh sửa giỏ hàng
          </Button>
          <Button
            component={Link}
            href="/payment"
            w={"40%"}
            color={"var(--clr-primary)"}
            onClick={() => setOpenedCart(false)}
          >
            Thanh toán
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default CartHeader;
