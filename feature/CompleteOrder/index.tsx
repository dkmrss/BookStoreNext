"use client";
import { CartDetail } from "@/model/Cart";
import {
  Box,
  Button,
  Center,
  Flex,
  NumberFormatter,
  Paper,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowLeft, IconClipboardCheck } from "@tabler/icons-react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./Confirm.module.scss";
import { createQrCode } from "@/api/apiMBQR";
import TransferForm from "./TransferForm";
import { apiCart } from "@/library/axios";
import { AxiosResponse } from "axios";
import { API_ROUTE } from "@/const/apiRoute";
import { isNullOrUndefined } from "@/extension/StringExtension";
import { NotificationExtension } from "@/extension/NotificationExtension";

const CompleteOrder = () => {
  const saleOrder = useSelector((state: any) => state.saleOrder);
  const dataOrder = useSelector((state: any) => state.completeOrder?.data);
  const order = useSelector((state: any) => state.order.order);
  console.log(order)
  const router = useRouter();
  const [valueQrCode, setValueQrCode] = useState("");
  const [payMentSuccess, setPayMentSuccess] = useState(false);
  const [isRender, setIsRender] = useState(false);
  const currentTime = moment().format("DD/MM/YYYY");

  const handleCreateQrCode = async () => {
    const data = await createQrCode({
      terminalID: "MB_HACOM10",
      qrcodeType: 4,
      parterType: 2,
      initMethod: 14,
      transactionAmount: order?.total?.toString(),
      billNumber: "",
      referenceLabelTime: "",
      referenceLabelCode: order?.id,
      transactionPurpose: "",
      additionAddress: order?.address,
      additionMobile: order?.phone,
      additionEmail: order?.name,
      createdBy: "",
      lastUpdateDate: "",
      lastUpdatedBy: "",
      lastUpdateLogin: "",
      creationDate: "",
      qrcodevalue: "",
    });
    if (data?.response?.data?.message === "Thêm không thành công!") {
      setValueQrCode("");
    } else {
      setValueQrCode(data?.data?.qrcodevalue);
    }
  };

  const handleGetDetailQRCode = async () => {
    if (order?.id) {
      try {
        const response: AxiosResponse = await apiCart.post(
          API_ROUTE.GET_DETAILS_QR_CODE_PAYMENT +
            `?id=${order?.id}`
        );
        if (!isNullOrUndefined(response) && response?.data?.success) {
          NotificationExtension.Success("Bạn đã thanh toán thành công!");
          setPayMentSuccess(true);
          window.scroll(0, 0);
        } else if (response != null)
          NotificationExtension.Fails(
            "Xác nhận thất bại! Vui lòng liên hệ hotline 1800.8091 để được hỗ trợ!"
          );
      } catch {
        NotificationExtension.Fails(
          "Xác nhận thất bại! Vui lòng liên hệ hotline 1800.8091 để được hỗ trợ!"
        );
      }
    }
  };

  useEffect(() => {
    if (order.method === 1) {
      handleCreateQrCode();
      setIsRender(true);
    }
  }, [order]);

  useEffect(() => {
    if (order === undefined) {
      router.replace(`/cart`);
    }
  }, []);

  return (
    <div className={style.confirm}>
      <Box className={style.boxBR}>
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
            <Title order={4}>Hoàn tất đặt hàng</Title>
          </Box>
        </Flex>

        <Box mt={"10px"} className={style.infoCustomer} w={"100%"}>
          <Flex
            align={"center"}
            justify={"center"}
            gap={"10px"}
            bg={"var(--clr-bg-light-red)"}
            p={"10px 0px"}
            style={{ borderRadius: "10px" }}
          >
            <IconClipboardCheck
              width={"20px"}
              height={"20px"}
              stroke={1.5}
              color="var(--clr-primary)"
            />

            {payMentSuccess ? (
              <Text c={"var(--clr-primary)"} fw={500}>
                Hoàn tất thanh toán
              </Text>
            ) : (
              <Text c={"var(--clr-primary)"} fw={500}>
                Hoàn tất đặt hàng
              </Text>
            )}
          </Flex>

          <Paper shadow="md" p={"10px"} mt={"10px"}>
            <Box style={{ borderRadius: "10px" }}>
              <Flex w={"100%"} direction={"column"} align={"center"}>
                <Flex gap={"5px"}>
                  <Text>Cảm ơn Quý khách đã chọn</Text>
                  <Text c={"var(--clr-primary)"} fw={500}>
                    
                  </Text>
                </Flex>
                <Flex gap={"5px"}>
                  <Text>Trong 15 phút</Text>
                  <Text c={"var(--clr-primary)"} fw={500}>
                    
                  </Text>
                  <Text>sẽ gọi để xác nhận đơn hàng</Text>
                </Flex>
                <Flex ta={"center"} mt={"5px"}>
                  <span
                    style={{
                      fontSize: "14px",
                      fontStyle: "italic",
                      color: "var(--clr-primary)",
                    }}
                  >
                    * Các đơn hàng từ 21h tối tới 8h sáng hôm sau,
                    <span
                      style={{
                        fontSize: "14px",
                        fontStyle: "italic",
                        color: "var(--clr-light-active-primary)",
                        fontWeight: "500",
                      }}
                    >
                      {" "}
                      {" "}
                    </span>
                    sẽ liên hệ tới Quý khách trước 8h30 sáng cùng ngày.
                  </span>
                </Flex>
              </Flex>

              <Box
                w={"100%"}
                bd={"1px solid #eeeeee"}
                bg={"rgb(223 249 193 / 59%)"}
                mt={"10px"}
                p={"10px"}
                style={{ borderRadius: "10px" }}
              >
                <Center>
                  <Text fw={500} size="20px">
                    ĐƠN HÀNG ĐANG ĐƯỢC XỬ LÝ
                  </Text>
                </Center>
                <Space h={"10px"} />
                <Box w={"100%"}>
                  <Flex gap={"5px"}>
                    <Text>Mã đơn hàng: </Text>
                    <Text fw={700}>{order?.id}</Text>
                  </Flex>
                  <Space h={"10px"} />
                  <Flex gap={"5px"}>
                    <Text>Người đặt hàng: </Text>
                    <Text fw={700}>{order?.name }</Text>
                  </Flex>
                  <Space h={"10px"} />
                  <Flex gap={"5px"}>
                    <Text>Ngày tạo đơn hàng: </Text>
                    <Text fw={700}>{currentTime}</Text>
                  </Flex>

                  <Space h={"10px"} />
                  <Flex gap={"5px"}>
                    <Text>Hình thức thanh toán: </Text>
                    {order.method === 1 ? (<Text fw={700}>Chuyển khoản Mb</Text>) : (<Text fw={700}>Thanh toán khi nhận hàng</Text>)}
                    
                  </Flex>
                  <Space h={"10px"} />
                  <Flex gap={"5px"}>
                    <Text>Phí giao hàng: </Text>
                    <Text fw={700}>0 ₫</Text>
                  </Flex>
                  <Space h={"10px"} />
                  <Flex gap={"5px"}>
                    <Text>Tổng tiền: </Text>
                    <Text fw={700}>
                      <NumberFormatter
                        thousandSeparator
                        value={order?.total}
                        suffix="đ"
                      />
                    </Text>
                  </Flex>
                  <Space h={"10px"} />
                  {order?.method === 1 ? (
                    <TransferForm
                      valueQr={valueQrCode}
                      handleGetDetailQRCode={handleGetDetailQRCode}
                      showLoading={isRender}
                      handleCreateQrCode={handleCreateQrCode}
                    />
                  ) : null}
                </Box>
              </Box>
              {saleOrder?.saleOrderDetail?.map(
                (item: CartDetail, index: number) => (
                  <Flex
                    key={index}
                    gap={"10px"}
                    w={"100%"}
                    bd={"1px solid #eeeeee"}
                    mt={"10px"}
                    p={"10px"}
                    style={{ borderRadius: "10px" }}
                  >
                    <img
                      src={item?.itemImage || ""}
                      alt="SP"
                      width={180}
                      height={180}
                    />
                    <Box>
                      <Text lineClamp={2}>{item?.itemName}</Text>
                      <Space h={"10px"} />
                      <Flex>
                        <Text>Số lượng: </Text>
                        <Space w={"10px"} />
                        <Text fw={700}>{item?.quantity}</Text>
                      </Flex>
                      <Space h={"10px"} />
                      <Flex>
                        <Text>Tổng tiền: </Text>
                        <Space w={"10px"} />
                        <Text c={"var(--clr-primary)"} fw={700}>
                          <NumberFormatter
                            thousandSeparator
                            value={item.totalAmount}
                            suffix="đ"
                          />
                        </Text>
                      </Flex>
                    </Box>
                  </Flex>
                )
              )}

              <Button
                fullWidth
                component={Link}
                href="/home"
                color="var(--clr-primary)"
                mt={"10px"}
              >
                Tiếp tục mua hàng
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </div>
  );
};

export default CompleteOrder;
