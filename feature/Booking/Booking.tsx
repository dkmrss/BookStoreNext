"use client";
import { createAppointment } from "@/api/apiAppointment";
import { getDataConfigWeb } from "@/api/apiConfigWeb";
import { TblAppointment } from "@/model/TblAppointment";
import { tblStore } from "@/model/TblStore";
import {
  Box,
  Button,
  Center,
  Grid,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector } from "react-redux";
import style from "./Booking.module.scss";

const Booking = () => {
  const initalData: TblAppointment = {
    id: 0,
    customerName: "",
    deviceType: "",
    faultDescription: "",
    phoneNumber: "",
    region: null,
    customerId: null,
  };

  const form = useForm<TblAppointment>({
    initialValues: {
      ...initalData,
    },
    validate: {
      customerName: isNotEmpty("Họ tên chưa nhập"),
      faultDescription: isNotEmpty("Mô tả lỗi chưa nhập"),
      region: isNotEmpty("Chưa chọn cửa hàng"),
      phoneNumber: (value) => {
        if (!value) {
          return "Số điện thoại chưa nhập"; // Trả về null nếu value là null hoặc không xác định
        }
        return /^\d{10}$/.test(value.trim())
          ? null
          : "Số điện thoại không hợp lệ";
      },
      deviceType: isNotEmpty("Loại thiết bị chưa nhập"),
    },
  });

  const dataUser = useSelector((state: any) => state.auth?.userInfo?.data);
  const [dataStore, setDataStore] = useState<tblStore[]>([]);
  const [captcha, setCaptcha] = useState(false);

  const onChangeCaptcha = (value: any) => {
    setCaptcha(true);
  };

  const handException = async (dataSubmit: TblAppointment) => {
    await createAppointment(dataSubmit);
    modals.closeAll();
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
      form.setValues({
        ...initalData,
        customerName: dataUser?.customerName,
        phoneNumber: dataUser?.telephoneNumber,
        customerId: dataUser?.customerId,
      });
    }
  }, [dataUser]);

  return (
    <Box
      w="100%"
      className={style.login}
      component="form"
      onSubmit={form.onSubmit((e) => handException(e))}
    >
      <Grid className={style.gridForm}>
        <Grid.Col span={{ md: 6 }}>
          <TextInput
            label="Họ và tên"
            // variant="filled"
            placeholder="Nguyen Van A"
            withAsterisk
            {...form.getInputProps("customerName")}
          ></TextInput>
        </Grid.Col>
        
      </Grid>
      <Grid className={style.gridForm}>
        <Grid.Col span={{ md: 6 }}>
          <TextInput
            label="Số điện thoại"
            // variant="filled"
            placeholder="0903.xxx.xxx"
            withAsterisk
            type="number"
            {...form.getInputProps("phoneNumber")}
          ></TextInput>
        </Grid.Col>
        <Grid.Col span={{ md: 6 }}>
          <TextInput
            label="Dòng máy cần sửa chữa"
            withAsterisk
            // variant="filled"
            placeholder="Dòng máy (VD: iPhone 11 Pro Max, ...)"
            {...form.getInputProps("deviceType")}
          ></TextInput>
        </Grid.Col>
      </Grid>
      <Textarea
        // variant="filled"
        label="Mô tả lỗi"
        placeholder="Mô tả lỗi (Bắt buộc)"
        minRows={4}
        autosize
        withAsterisk
        className={style.TAForm}
        {...form.getInputProps("faultDescription")}
      />
      <Center className={style.captcha}>
        <ReCAPTCHA
          sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          onChange={onChangeCaptcha}
        />
      </Center>
      <Center>
        <Button
          size="md"
          color="var(--clr-primary)"
          type="submit"
          disabled={!captcha}
        >
          TIẾP TỤC
        </Button>
      </Center>
    </Box>
  );
};

export default Booking;
