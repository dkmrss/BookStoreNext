"use client";
import {
  Box,
  Grid,
  NumberInput,
  TextInput,
  Center,
  Button,
  Title,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";
import style from "./SearchGuarantee.module.scss";
import { useState } from "react";
import { getDataListSaleOder } from "@/api/apiSaleOrder";
import { isNullOrUndefined } from "@/extension/StringExtension";
import { tblSaleOrderCommand } from "@/model/TblSaleOrder";
import InfoSaleOder from "./infoSaleOder";

const SearchGuarantee = () => {
  const [codeOrders, setCodeOrders] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [dataSaleOder, setDataSaleOder] = useState<tblSaleOrderCommand[]>([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [captcha, setCaptcha] = useState(false);

  const handleExpection = () => {
    if (codeOrders === "" && phone === "") {
      notifications.show({
        message: "Vui lòng nhập mã đơn hàng hoặc số điện thoại đặt hàng!!!",
      });
    } else if (codeOrders !== "" && phone !== "") {
      notifications.show({
        message: "Vui lòng chỉ nhập mã đơn hàng hoặc số điện thoại",
      });
    } else {
      handleFetchDataSaleOder();
    }
  };

  const handleFetchDataSaleOder = async () => {
    setIsSubmit(true);
    let fillter = `?Skip=0&Take=100`;

    if (phone !== "" && codeOrders === "") {
      fillter = fillter + `&KeySearch=${phone}`;
    } else {
      fillter = fillter + `&KeySearch=${codeOrders}`;
    }

    const callApi = await getDataListSaleOder(fillter);
    if (!isNullOrUndefined(callApi) && !isNullOrUndefined(callApi?.data)) {
      const dataApi = callApi?.data;
      if (dataApi != null && !isNullOrUndefined(dataApi)) {
        setDataSaleOder(dataApi);
        setCodeOrders("");
        setPhone("");
        setCaptcha(false);
      } else {
        console.log("Dữ liệu không tồn tại");
      }
      close();
    } else {
      console.log("Dữ liệu không tồn tại");
    }
  };

  const onChangeCaptcha = (value: any) => {
    setCaptcha(true);
  };

  return (
    <Box className={style.searchGuarantee}>
      <div className={style.alignBox}>
        <div className={style.topBox}>
          <Box className={style.formGuarantee}>
            <Text className={style.title}>Tra cứu đơn hàng</Text>
            <TextInput
              label="Mã đơn hàng"
              placeholder="Mã đơn hàng trên phiếu tiếp nhận"
              withAsterisk
              value={codeOrders}
              onChange={(event) => setCodeOrders(event.currentTarget.value)}
            ></TextInput>
            <Text fw={700}>Hoặc</Text>
            <TextInput
              label="Số điện thoại"
              placeholder="Số điện thoại dùng để đặt hàng"
              withAsterisk
              value={phone}
              onChange={(event) => setPhone(event.currentTarget.value)}
            ></TextInput>

            {/* <Center className={style.captcha}>
              <ReCAPTCHA
                sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
                onChange={onChangeCaptcha}
              />
            </Center> */}
            <Button
              color="var(--clr-primary)"
              w="100%"
              onClick={handleExpection}
              // disabled={!captcha}
            >
              KIỂM TRA
            </Button>
          </Box>
          <Box className={style.infoGuarantee}>
            <Title order={3}>
              Trang tra cứu và kiểm tra tình trạng đơn hàng
            </Title>
            <Text>
              Trang tra cứu và{" "}
              <Link href={"/"} className={style.link}>
                kiểm tra đơn hàng
              </Link>{" "}
              tại Hệ thống sửa chữa điện thoại - máy tính đề cập đến những thông
              tin đơn hàng mà quý khách đã đặt của chúng tôi. Quý khách có thể
              nhập số điện thoại hoặc mã đơn hàng để kiểm tra. Chúng tôi cam kết
              sẽ bảo mật các thông tin mà quý khách cung cấp dựa trên những
              chính sách, điều khoản.
            </Text>
            <Text>
              Nếu bạn muốn huỷ đơn vui lòng liên hệ tổng đài theo số điện thoại:{" "}
              <span className={style.link}>18008091</span>{" "}
            </Text>
          </Box>
        </div>
        {isSubmit === true ? (
          <div className={style.bottomBox}>
            <Box className={style.listOrder}>
              <InfoSaleOder dataSaleOder={dataSaleOder} />
            </Box>
          </div>
        ) : null}
      </div>
    </Box>
  );
};

export default SearchGuarantee;
