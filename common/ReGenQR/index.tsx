"use client";
import { createQrCode } from "@/api/apiMBQR";
import { API_ROUTE } from "@/const/apiRoute";
import { NotificationExtension } from "@/extension/NotificationExtension";
import { isNullOrUndefined } from "@/extension/StringExtension";
import { apiCart } from "@/library/axios";
import {
  tblSaleOrderCommand,
  tblSaleOrderDetailCommands,
} from "@/model/TblSaleOrder";
import {
  Box,
  Center,
  Flex,
  NumberFormatter,
  Paper,
  Space,
  Text
} from "@mantine/core";
import { IconClipboardCheck } from "@tabler/icons-react";
import { AxiosResponse } from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import style from "./Confirm.module.scss";
import TransferForm from "./TransferForm";

const ReGenQR = ({ data }: { data: tblSaleOrderCommand }) => {
  const [valueQrCode, setValueQrCode] = useState("");
  const [payMentSuccess, setPayMentSuccess] = useState(false);
  const [isRender, setIsRender] = useState(false);
  const currentTime = moment().format("DD/MM/YYYY");

  const handleCreateQrCode = async () => {
    const dataGenQR = await createQrCode({
      terminalID: "MB_HACOM10",
      qrcodeType: 4,
      parterType: 2,
      initMethod: 14,
      transactionAmount: data?.totalAmount?.toString(),
      billNumber: "",
      referenceLabelTime: "",
      referenceLabelCode: data?.orderNumber,
      transactionPurpose: "",
      additionAddress: data?.shippingAddress,
      additionMobile: data?.buyerTelephone,
      additionEmail: data?.buyerName,
      createdBy: "",
      lastUpdateDate: "",
      lastUpdatedBy: "",
      lastUpdateLogin: "",
      creationDate: "",
      qrcodevalue: "",
    });
    if (dataGenQR?.response?.data?.message === "Thêm không thành công!") {
      setValueQrCode("");
    } else {
      setValueQrCode(dataGenQR?.data?.qrcodevalue);
    }
  };

  const handleGetDetailQRCode = async () => {
    if (data?.orderNumber) {
      try {
        const response: AxiosResponse = await apiCart.post(
          API_ROUTE.GET_DETAILS_QR_CODE_PAYMENT + `?id=${data?.orderNumber}`
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
    handleCreateQrCode();
    setIsRender(true);
  }, [data]);

  return (
    <div className={style.confirm}>
      <Box className={style.boxBR}>
        <Box mt={"10px"} className={style.infoCustomer} w={"100%"}>
          {payMentSuccess && (
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

              <Text c={"var(--clr-primary)"} fw={500}>
                Hoàn tất thanh toán
              </Text>
            </Flex>
          )}
          <Paper mt={"10px"}>
            <Box style={{ borderRadius: "10px" }}>
              <Flex w={"100%"} direction={"column"} align={"center"}>
                <Flex gap={"5px"}>
                  <Text>Cảm ơn Quý khách đã chọn</Text>
                </Flex>
                <Flex gap={"5px"}>
                  <Text>Trong 15 phút</Text>
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
                    <Text fw={700}>{data?.orderNumber}</Text>
                  </Flex>
                  <Space h={"10px"} />
                  <Flex gap={"5px"}>
                    <Text>Người đặt hàng: </Text>
                    <Text fw={700}>{data?.buyerName}</Text>
                  </Flex>
                  <Space h={"10px"} />
                  <Flex gap={"5px"}>
                    <Text>Ngày tạo đơn hàng: </Text>
                    <Text fw={700}>{currentTime}</Text>
                  </Flex>

                  <Space h={"10px"} />
                  <Flex gap={"5px"}>
                    <Text>Hình thức thanh toán: </Text>
                    <Text fw={700}>Thanh toán khi nhận hàng</Text>
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
                        value={data?.totalAmount || 0}
                        suffix="đ"
                      />
                    </Text>
                  </Flex>
                  <Space h={"10px"} />

                  <TransferForm
                    valueQr={valueQrCode}
                    handleGetDetailQRCode={handleGetDetailQRCode}
                    showLoading={isRender}
                    handleCreateQrCode={handleCreateQrCode}
                  />
                </Box>
              </Box>
              {data?.tblSaleOrderDetailModels?.map(
                (item: tblSaleOrderDetailCommands, index: number) => (
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
                            value={item?.totalAmount || 0}
                            suffix="đ"
                          />
                        </Text>
                      </Flex>
                    </Box>
                  </Flex>
                )
              )}

              {/* <Button
                fullWidth
                component={Link}
                href="/home"
                color="var(--clr-primary)"
                mt={"10px"}
              >
                Tiếp tục mua hàng
              </Button> */}
            </Box>
          </Paper>
        </Box>
      </Box>
    </div>
  );
};

export default ReGenQR;
