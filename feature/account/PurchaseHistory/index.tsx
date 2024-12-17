"use client";
import style from "./PurchaseHistory.module.scss";
import { useEffect, useRef, useState } from "react";
import {
  Flex,
  Box,
  Group,
  Avatar,
  Text,
  Paper,
  Tabs,
  CloseButton,
  Button,
  NumberFormatter,
} from "@mantine/core";

import { DateInput, DatePickerInput, DateTimePicker } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";

import { useSelector } from "react-redux";
import { getDataListSaleOder } from "@/api/apiSaleOrder";
import { isNullOrUndefined } from "@/extension/StringExtension";
import InfoSaleOder from "./infoSaleOder";
import { tblSaleOrderCommand } from "@/model/TblSaleOrder";

const data = [
  {
    img: "https://image.dienthoaivui.com.vn/300x300,webp,q100/https://dashboard.dienthoaivui.com.vn/uploads/wp-content/uploads/2023/04/iphone-11-64gb.jpg",
    productName: "Demo",
    status: "Đã nhận hàng",
    productPrice: "0",
  },
];

const PurchaseHistory = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [dataSaleOder, setDataSaleOder] = useState<tblSaleOrderCommand[]>([]);
  const icon = <IconCalendar style={{ width: 18, height: 18 }} stroke={1.5} />;
  const today = new Date();
  const [dataLength, setDataLength] = useState(null);
  const [dataTotalAmount, setDataTotalAmount] = useState(0);
  const firstCallRef = useRef(true);

  const dataUser = useSelector((state: any) => state.auth?.userInfo?.data);

  const handleTabChange = (value: string | null) => {
    if (value !== null) {
      setActiveTab(value);
    }
  };

  const handleFetchDataSaleOder = async () => {
    let fillter = `?Skip=0&Take=100&BuyerId=${dataUser?.customerId}`;

    if (startDate !== null && endDate !== null) {
      const dateObjectStart = startDate;
      const dateObjectEnd = endDate;
      dateObjectEnd.setHours(23, 59, 59, 999);
      const formattedDateStart = dateObjectStart.toISOString();
      const formattedDateEnd = dateObjectEnd.toISOString();
      fillter =
        fillter +
        `&StartDate=${formattedDateStart}` +
        `&EndDate=${formattedDateEnd}`;
    }
    if (startDate !== null && endDate == null) {
      const dateObjectStart = startDate;
      const dateObjectEnd = today;
      dateObjectEnd.setHours(23, 59, 59, 999);
      const formattedDateStart = dateObjectStart.toISOString();
      const formattedDateEnd = dateObjectEnd.toISOString();
      fillter =
        fillter +
        `&StartDate=${formattedDateStart}` +
        `&EndDate=${formattedDateEnd}`;
    }
    if (activeTab !== "all") {
      fillter = fillter + `&Status=${activeTab}`;
    }

    const callApi = await getDataListSaleOder(fillter);
    if (!isNullOrUndefined(callApi) && !isNullOrUndefined(callApi?.data)) {
      const dataApi = callApi?.data;
      if (dataApi != null && !isNullOrUndefined(dataApi)) {
        setDataSaleOder(dataApi);
        const totalAmountSum = dataApi.reduce(
          (total: number, item: tblSaleOrderCommand) => {
            return total + (item.totalAmount || 0);
          },
          0
        );

        if (firstCallRef.current) {
          setDataLength(dataApi.length);
          setDataTotalAmount(totalAmountSum); // Lưu độ dài dữ liệu cho lần gọi đầu tiên
          firstCallRef.current = false; // Đánh dấu rằng lần gọi đầu tiên đã hoàn thành
        }
      } else {
        console.log("Dữ liệu không tồn tại");
      }
      close();
    } else {
      console.log("Dữ liệu không tồn tại");
    }
  };

  useEffect(() => {
    if (dataUser) {
      handleFetchDataSaleOder();
    }
  }, [dataUser, activeTab]);

  return (
    <>
      <Box className={style.purchaseHistory} p="sm">
        <Group>
          <Avatar src={null} alt="no image here" color="var(--clr-primary)" />
          <Flex justify="flex-start" direction="column">
            <Text size="xl">{dataUser?.customerName}</Text>
            <Box className={style.customerCode}>DVTNew</Box>
          </Flex>
        </Group>
        <Paper className={style.order} shadow="xl" radius="md" p="md" mt="sm">
          <Group justify="space-between" grow>
            <Box w={{ base: 200, sm: 400, lg: 500 }}>
              <Flex direction="column" align="center">
                <Text size="xl" fw={700}>
                  {dataLength || 0}
                </Text>
                <Text>đơn hàng</Text>
              </Flex>
            </Box>
            <Box w={{ base: 200, sm: 400, lg: 500 }} className={style.boxTotal}>
              <Flex direction="column" align="center">
                <Text size="xl" fw={700}>
                  <NumberFormatter
                    thousandSeparator="."
                    decimalSeparator=","
                    value={dataTotalAmount}
                    suffix="₫"
                  />
                </Text>
                <Text>Tổng tiền tích lũy</Text>
              </Flex>
            </Box>
          </Group>
        </Paper>
        <div className={style.dateTime}>
          <Box className={style.calendar} mt="lg">
            <Text className={style.text}>Chọn ngày bắt đầu:</Text>
            <DateInput
              clearable
              value={startDate}
              onChange={setStartDate}
              placeholder="Chọn ngày bắt đầu"
              maxDate={endDate || undefined} // Giới hạn ngày bắt đầu không được vượt quá ngày kết thúc
            />
            <Text className={style.text}>Chọn ngày kết thúc:</Text>
            <DateInput
              clearable
              value={endDate}
              onChange={setEndDate}
              placeholder="Chọn ngày kết thúc"
              minDate={startDate || undefined} // Giới hạn ngày kết thúc không được trước ngày bắt đầu
              maxDate={today} // Giới hạn ngày kết thúc không được vượt quá ngày hiện tại
            />
          </Box>
          <Button
            mt="lg"
            color="var(--clr-primary)"
            onClick={() => handleFetchDataSaleOder()}
          >
            Lọc
          </Button>
        </div>
        <Box className={style.groupButton} mt="lg">
          <Tabs
            variant="pills"
            color="var(--clr-primary)"
            value={activeTab}
            onChange={handleTabChange}
          >
            <Box className={style.tabContainer}>
              <Tabs.List className={style.tabList}>
                <Tabs.Tab className={style.tab} value="all">
                  Tất cả
                </Tabs.Tab>
                <Tabs.Tab className={style.tab} value="NEW">
                  Chờ xác nhận
                </Tabs.Tab>
                <Tabs.Tab className={style.tab} value="WAIT_SHIPPING">
                  Đang vận chuyển
                </Tabs.Tab>
                <Tabs.Tab className={style.tab} value="SUCCESS">
                  Đã giao hàng
                </Tabs.Tab>
                <Tabs.Tab className={style.tab} value="CANCEL">
                  Đã hủy
                </Tabs.Tab>
                <Tabs.Tab className={style.tab} value="QRCODE_GEN_SUCCESS">
                  Chưa thanh toán
                </Tabs.Tab>
                <Tabs.Tab className={style.tab} value="QRCODE_GEN_FALL">
                  Lỗi QR chưa thanh toán
                </Tabs.Tab>
                <Tabs.Tab className={style.tab} value="QRCODE_PAY_FALL">
                  Thanh toán thất bại
                </Tabs.Tab>
              </Tabs.List>
            </Box>

            <Tabs.Panel value="all">
              <Box>
                <InfoSaleOder
                  dataSaleOder={dataSaleOder}
                  handleFetchDataSaleOder={handleFetchDataSaleOder}
                />
              </Box>
            </Tabs.Panel>
            <Tabs.Panel value="NEW">
              <Box>
                <InfoSaleOder
                  dataSaleOder={dataSaleOder}
                  handleFetchDataSaleOder={handleFetchDataSaleOder}
                />
              </Box>
            </Tabs.Panel>
            <Tabs.Panel value="WAIT_SHIPPING">
              <Box>
                <InfoSaleOder
                  dataSaleOder={dataSaleOder}
                  handleFetchDataSaleOder={handleFetchDataSaleOder}
                />
              </Box>
            </Tabs.Panel>
            <Tabs.Panel value="SUCCESS">
              <Box>
                <InfoSaleOder
                  dataSaleOder={dataSaleOder}
                  handleFetchDataSaleOder={handleFetchDataSaleOder}
                />
              </Box>
            </Tabs.Panel>

            <Tabs.Panel value="CANCEL">
              <Box>
                <InfoSaleOder
                  dataSaleOder={dataSaleOder}
                  handleFetchDataSaleOder={handleFetchDataSaleOder}
                />
              </Box>
            </Tabs.Panel>

            <Tabs.Panel value="QRCODE_GEN_SUCCESS">
              <Box>
                <InfoSaleOder
                  dataSaleOder={dataSaleOder}
                  handleFetchDataSaleOder={handleFetchDataSaleOder}
                />
              </Box>
            </Tabs.Panel>
            <Tabs.Panel value="QRCODE_PAY_FALL">
              <Box>
                <InfoSaleOder
                  dataSaleOder={dataSaleOder}
                  handleFetchDataSaleOder={handleFetchDataSaleOder}
                />
              </Box>
            </Tabs.Panel>
            <Tabs.Panel value="QRCODE_GEN_FALL">
              <Box>
                <InfoSaleOder
                  dataSaleOder={dataSaleOder}
                  handleFetchDataSaleOder={handleFetchDataSaleOder}
                />
              </Box>
            </Tabs.Panel>
          </Tabs>
        </Box>
        <Box className={style.history}></Box>
      </Box>
    </>
  );
};

export default PurchaseHistory;
