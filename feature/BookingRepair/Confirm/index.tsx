import { TblItem } from "@/model/ProductList";
import { tblCustomerAppointment } from "@/model/TblCustomerAppointment";
import {
  Box,
  Button,
  Center,
  Flex,
  Paper,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconClipboardCheck, IconX } from "@tabler/icons-react";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import style from "./Confirm.module.scss";

const Confirm = ({
  data,
  dataProduct,
}: {
  data: tblCustomerAppointment;
  dataProduct: TblItem | null;
}) => {
  const [currentDate, setCurrentDate] = useState("");
  const currentTime = moment().format("DD/MM/YYYY");

  function convertToDateFormat(isoString: any) {
    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    const date = new Date();
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div className={style.confirm}>
      <Box className={style.boxBR}>
        {/* <Flex className={style.header}>
          <Box ta={"center"} w={"100%"}>
            <Title order={4}>Hoàn tất đặt hàng</Title>
          </Box>

          <IconX
            width={"20px"}
            height={"20px"}
            stroke={1.5}
            cursor={"pointer"}
            style={{
              marginRight: 10,
            }}
            onClick={() => modals.closeAll()}
          />
        </Flex> */}

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
            <Text c={"var(--clr-primary)"} fw={500}>
              Đặt lịch hoàn tất
            </Text>
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
                bg={"rgb(193, 228, 249)"}
                mt={"10px"}
                p={"10px"}
                style={{ borderRadius: "10px" }}
              >
                <Center>
                  <Text fw={500} size="20px">
                    ĐẶT LỊCH SỬA CHỮA THÀNH CÔNG
                  </Text>
                </Center>
                <Space h={"10px"} />
                <Box w={"100%"}>
                  <Flex gap={"5px"}>
                    <Text>Mã đơn hàng: </Text>
                    <Text fw={700}>012453</Text>
                  </Flex>
                  <Space h={"10px"} />
                  <Flex gap={"5px"}>
                    <Text>Ngày tạo đơn hàng: </Text>
                    <Text fw={700}>{currentTime}</Text>
                  </Flex>
                  <Space h={"10px"} />
                  <Flex gap={"5px"}>
                    <Text>Thời gian hẹn: </Text>
                    <Text fw={700}>
                      {convertToDateFormat(data.appointmentTime)}
                    </Text>
                  </Flex>
                  <Space h={"10px"} />
                  <Flex gap={"5px"}>
                    <Text>Người đặt: </Text>
                    <Text fw={700}>{data.fullName}</Text>
                  </Flex>
                  <Space h={"10px"} />
                  <Flex gap={"5px"}>
                    <Text>Số điện thoại: </Text>
                    <Text fw={700}>{data.mobile}</Text>
                  </Flex>
                  <Space h={"10px"} />
                  <Flex gap={"5px"}>
                    <Text>Nhận hàng tại: </Text>
                    <Text fw={700}>{data.storeAddress}</Text>
                  </Flex>
                  <Space h={"10px"} />
                  <Flex gap={"5px"}>
                    <Text>Hình thức thanh toán: </Text>
                    <Text fw={700}>Thanh toán tại cửa hàng</Text>
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
                      {dataProduct?.unitSellingPrice?.toLocaleString()} ₫
                    </Text>
                  </Flex>
                </Box>
              </Box>

              <Flex
                gap={"10px"}
                w={"100%"}
                bd={"1px solid #eeeeee"}
                mt={"10px"}
                p={"10px"}
                style={{ borderRadius: "10px" }}
              >
                <img
                  src={dataProduct?.primaryImage || ""}
                  alt="SP"
                  width={160}
                  height={160}
                />
                <Box mt={25}>
                  <Text>{dataProduct?.itemName}</Text>
                  <Text>Số lượng: 1</Text>
                  <Flex>
                    <Text>Giá: </Text>
                    <Space w={"5px"} />
                    <Text>
                      {dataProduct?.unitSellingPrice?.toLocaleString()} ₫
                    </Text>
                  </Flex>
                </Box>
              </Flex>

              <Button
                component={Link}
                href="/home"
                fullWidth
                color="var(--clr-primary)"
                mt={"10px"}
                onClick={() => modals.closeAll()}
              >
                <p
                  style={{
                    textDecoration: "none",
                    color: "#FFF",
                  }}
                >
                  Tiếp tục mua hàng
                </p>
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </div>
  );
};

export default Confirm;
