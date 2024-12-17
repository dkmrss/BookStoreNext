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

const SearchGuarantee = () => {
  const [phone, setPhone] = useState<string>("");
  const [codeOrders, setCodeOrders] = useState<string>("");

  const handleExpection = () => {
    const phoneString = String(phone);
    if (phone === "" || codeOrders === "") {
      notifications.show({
        message: "Vui lòng nhập đầy đủ thông tin đơn hàng !!!",
      });
    } else if (phoneString.length !== 10) {
      notifications.show({
        message: "Số điện thoại không đúng định dạng !!!",
      });
    } else {
      setPhone("");
      setCodeOrders("");
      notifications.show({
        message: "Bạn vừa tra cứu đơn hàng",
      });
    }
  };

  return (
    <Box className={style.searchGuarantee}>
      <Grid>
        <Grid.Col span={{ md: 4 }}>
          <Box className={style.formGuarantee}>
            <TextInput
              label="Số điện thoại"
              placeholder="Số điện thoại trên phiếu tiếp nhận (bắt buộc)"
              type="number"
              withAsterisk
              value={phone}
              onChange={(event) => setPhone(event.currentTarget.value)}
            ></TextInput>
            <TextInput
              label="Mã đơn hàng"
              placeholder="Mã đơn hàng trên phiếu tiếp nhận"
              withAsterisk
              value={codeOrders}
              onChange={(event) => setCodeOrders(event.currentTarget.value)}
            ></TextInput>
            <Center className={style.captcha}>
              <ReCAPTCHA
                sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
              />
            </Center>
            <Button
              color="var(--clr-primary)"
              w="100%"
              onClick={handleExpection}
            >
              KIỂM TRA
            </Button>
          </Box>
        </Grid.Col>
        <Grid.Col span={{ md: 8 }}>
          <Box className={style.infoGuarantee}>
           
            <Text>
              Trang tra cứu và{" "}
              <Link href={"/"} className={style.link}>
                kiểm tra bảo hành
              </Link>{" "}
            </Text>
           
            <Text>
              Bên cạnh đó, thời gian sửa chữa thiết bị còn tùy thuộc vào tình
              trạng của máy, thời gian tiếp nhận. Vì thế, khi kiểm tra cụ thể,
              Công ty sẽ thông báo đến quý khách thời gian chính xác
              bàn giao sản phẩm.
            </Text>
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default SearchGuarantee;
