import { getDataConfigWeb } from "@/api/apiConfigWeb";
import { NotificationExtension } from "@/extension/NotificationExtension";
import { TblItem } from "@/model/ProductList";
import { tblCustomerAppointment } from "@/model/TblCustomerAppointment";
import { tblStore } from "@/model/TblStore";
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Paper,
  Select,
  Space,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { isEmail } from "@mantine/form";
import { modals } from "@mantine/modals";
import { IconIdBadge2, IconX } from "@tabler/icons-react";
import moment from "moment";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector } from "react-redux";
import style from "./BookingRepair.module.scss";
import { useViewportSize } from "@mantine/hooks";

const BookingRepair = ({
  data,
  setData,
  dataProduct,
  handleCreateCustomerAppointment,
}: {
  data: tblCustomerAppointment;
  setData: Dispatch<SetStateAction<tblCustomerAppointment>>;
  dataProduct: TblItem | null;
  handleCreateCustomerAppointment: (time: string) => Promise<void>;
}) => {
  const [dataStore, setDataStore] = useState<tblStore[]>([]);
  const [time, setTime] = useState<string>("");
  const [captcha, setCaptcha] = useState(false);
  const dataUser = useSelector((state: any) => state.auth?.userInfo?.data);
  const { height } = useViewportSize();
  const handleChangeValue = (value: string | null, key: string) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const onChangeCaptcha = (value: any) => {
    setCaptcha(true);
  };

  const handleValidate = async () => {
    const validateEmail = isEmail(true);
    const warnings = [];

    if (!data.fullName?.trim()) {
      warnings.push("Họ và tên không được bỏ trống !");
    }
    if (!data.mobile?.trim()) {
      warnings.push("Số điện thoại không được bỏ trống !");
    } else if (data.mobile?.trim().length != 10) {
      warnings.push("Số điện thoại phải có 10 chữ số !");
    }
    if (data.email?.trim() && !validateEmail(data.email?.trim())) {
      warnings.push("Email sai định dạng!");
    }
    if (!data.storeAddress?.trim()) {
      warnings.push("Bạn chưa chọn cửa hàng!");
    }
    if (!time.trim()) {
      warnings.push("Vui lòng cho biết thời gian lịch hẹn của bạn !");
    }

    if (warnings.length > 0) {
      for (let i = 0; i < warnings.length; i++) {
        NotificationExtension.Warn(warnings[i]);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    } else {
      handleCreateCustomerAppointment(time);
    }
  };

  useEffect(() => {
    const fetchDataStore = async () => {
      const dataApi = await getDataConfigWeb();
      setDataStore(dataApi?.data?.store);
    };

    fetchDataStore();
  }, []);

  useEffect(() => {
    if (dataUser) {
      handleChangeValue(dataUser?.customerName, "fullName");
      handleChangeValue(dataUser?.telephoneNumber, "mobile");
      handleChangeValue(dataUser?.customerId, "customerId");
    }
  }, [dataUser]);

  return (
    <div
      className={style.bookingRepair}
      // style={{ height: `${(height / 100) * 60}px` }}
    >
      <Box className={style.boxBR}>
        {/* <Flex className={style.header}>
          <Box ta={"center"} w={"100%"}>
            <Title order={4}>Đặt lịch sửa chữa</Title>
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
        <Paper w={"100%"} shadow="md" radius={"lg"} p={"md"}>
          <Flex gap={"10px"}>
            <img
              src={dataProduct?.primaryImage || ""}
              alt="SP"
              width={160}
              height={160}
            />
            <Box mt={30}>
              <Text>{dataProduct?.itemName}</Text>
              <Flex>
                <Text>Giá: </Text>
                <Space w={"5px"} />
                <Text c={"var(--clr-primary)"}>
                  {dataProduct?.unitSellingPrice?.toLocaleString()} ₫
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Paper>
        <Box mt={"10px"} className={style.infoCustomer} w={"100%"}>
          <Flex
            align={"center"}
            justify={"center"}
            gap={"10px"}
            bg={"var(--clr-bg-light-red)"}
            p={"10px 0px 20px 0px"}
            style={{ borderRadius: "10px 10px 0px 0px" }}
          >
            <IconIdBadge2
              width={"20px"}
              height={"20px"}
              stroke={1.5}
              color="var(--clr-primary)"
            />
            <Text c={"var(--clr-primary)"} fw={500}>
              Thông tin đặt lịch sửa chữa
            </Text>
          </Flex>
          <Paper shadow="md" radius="lg" p={"lg"} className={style.formInfo}>
            <TextInput
              label={"Thông tin khách hàng:"}
              withAsterisk
              placeholder="Họ và tên (bắt buộc)"
              radius={"md"}
              value={data?.fullName || ""}
              onChange={(event) =>
                handleChangeValue(event.currentTarget.value, "fullName")
              }
              styles={{
                label: {
                  fontSize: "1rem",
                  fontWeight: "bold",
                  lineHeight: 1.333,
                  margin: "5px 0px",
                },
              }}
            ></TextInput>
            <Space h={"xs"} />
            <TextInput
              placeholder="Số điện thoại (bắt buộc)"
              radius={"md"}
              value={data?.mobile || ""}
              type="number"
              onChange={(event) =>
                handleChangeValue(event.currentTarget.value, "mobile")
              }
            ></TextInput>
            <Space h={"xs"} />
            <TextInput
              placeholder="Email nhận hóa đơn (không bắt buộc)"
              radius={"md"}
              value={data?.email || ""}
              onChange={(event) =>
                handleChangeValue(event.currentTarget.value, "email")
              }
            ></TextInput>
            <Space h={"xs"} />

            <Space h={"xs"} />
            <Box
              bg={"var(--clr-bg-gray-light)"}
              p={"10px"}
              style={{ borderRadius: "10px" }}
            >
              {/* <Title order={5}>Lựa chọn cửa hàng:</Title> */}
              {/* <Space h={"xs"} /> */}
              <Grid grow>
                <Select
                  label={"Lựa chọn cửa hàng:"}
                  m={5}
                  mb={10}
                  w={"100%"}
                  clearable
                  searchable
                  withAsterisk
                  placeholder="Chọn cửa hàng"
                  data={dataStore.map((store) => store.address || "")}
                  styles={{
                    label: {
                      fontSize: "1rem",
                      fontWeight: "bold",
                      lineHeight: 1.333,
                      margin: "5px 0px",
                    },
                  }}
                  classNames={{ dropdown: style.dropdown }}
                  value={data.storeAddress}
                  onChange={(event) => handleChangeValue(event, "storeAddress")}
                />
              </Grid>
            </Box>
            {/* <Title order={5} m={"5px 0px"}>
              Chọn thời gian hẹn trước:
            </Title> */}

            <DateInput
              label={"Chọn thời gian hẹn trước:"}
              minDate={new Date()}
              // maxDate={dayjs(new Date()).add(1, "month").toDate()}
              classNames={{ wrapper: style.wrapper }}
              placeholder="Chọn thời gian hẹn trước"
              radius={"md"}
              clearable
              withAsterisk
              value={time ? new Date(time) : null}
              onChange={(date) =>
                setTime(
                  date ? moment(date).format("YYYY-MM-DD[T]HH:mm:ss") : ""
                )
              }
              styles={{
                label: {
                  fontSize: "1rem",
                  fontWeight: "bold",
                  lineHeight: 1.333,
                  margin: "5px 0px",
                },
              }}
            />
            <Title order={5} m={"5px 0px"}>
              Thông tin bổ sung:
            </Title>
            <Textarea
              placeholder="Ghi chú đơn hàng"
              radius={"md"}
              minRows={4}
              autosize
              value={data?.note || ""}
              onChange={(event) =>
                handleChangeValue(event.currentTarget.value, "note")
              }
            ></Textarea>
            <Center m={"10px 0px"}>
              <ReCAPTCHA
                sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
                onChange={onChangeCaptcha}
              />
            </Center>
            <Button
              fullWidth
              color={"var(--clr-primary)"}
              h={"10%"}
              disabled={!captcha ? true : false}
              onClick={handleValidate}
            >
              <Flex direction={"column"} m={"8px 0px"}>
                <Text fw={500}>ĐẶT LỊCH SỬA CHỮA</Text>
                <Text size="14px">(Sửa chữa tại cửa hàng)</Text>
              </Flex>
            </Button>
            <Space h={"xs"} />
            <Button
              fullWidth
              variant="outline"
              color="var(--clr-primary)"
              component={Link}
              href="/home"
              style={{
                textDecoration: "none",
                color: "var(--clr-primary)",
              }}
              onClick={() => modals.closeAll()}
            >
              Chọn sản phẩm khác
            </Button>
          </Paper>
        </Box>
      </Box>
    </div>
  );
};

export default BookingRepair;
