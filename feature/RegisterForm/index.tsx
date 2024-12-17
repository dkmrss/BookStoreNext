"use client";
import { createCustomerWithOutTokenPhone } from "@/api/apiCustomer";
import AuthService from "@/api/login/auth.service";
import logoHacom from "@/assets/logo-hacom-compressed4.svg";
import { Register } from "@/model/AuthService";
import { tblCustomer } from "@/model/TblCustomer";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  PasswordInput,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { IconArrowLeft } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector } from "react-redux";
import ActiveModal from "./Active";
import style from "./Register.module.scss";

const RegisterForm = () => {
  const [customer, setCustomer] = useState<tblCustomer>({
    customerNumber: "",
    customerName: "",
    customerType: "",
    validatedFlag: "",
    address: "",
    contactName: "",
    telephoneNumber: "",
    email: "",
    taxCode: "",
    sex: "",
    dateOfBirth: "",
    createdBy: "",
    lastUpdateDate: "",
    lastUpdatedBy: "",
    lastUpdateLogin: "",
    shipToProvince: "",
    shipToDistrict: "",
    shipToWard: "",
    identifiedNumber: "",
    groupId: 0,
    userName: "",
    avatar: "",
    taxCompany: "",
    taxAddress: "",
    orderCount: 0,
    totalValue: 0,
    orderCountSuccess: 0,
    totalValueSuccess: 0,
    banned: 0,
    loginToken: "",
    productReviewCount: 0,
    questionAsk: 0,
    questionAnswer: 0,
    loyaltyPoint: 0,
    loyaltyLevel: 0,
    articleComment: 0,
    contactId: 0,
    mobileNumber: "",
    hobby: "",
    brand: "",
    job: "",
    shipToAddress: "",
    tblCustomerSiteCommands: [],
  });

  const entity = {
    fullName: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  const form = useForm<Register>({
    validateInputOnChange: true,
    initialValues: {
      ...entity,
    },

    validate: {
      fullName: (value) =>
        value && value.trim() ? null : "Họ và tên không được để trống",
      phone: (value) =>
        /^\d{10}$/.test(value.trim()) ? null : "Số điện thoại không hợp lệ",
      password: (value) =>
        value && value.length >= 5 && value.length <= 100
          ? null
          : "Mật khẩu phải chứa từ 5 đến 100 kí tự",
      confirmPassword: (value, entity) =>
        value && value === entity?.password
          ? null
          : "Xác nhận mật khẩu không khớp",
    },
  });

  const router = useRouter();
  const auth = useSelector((state: any) => state.auth);
  const [isAgree, setIsAgree] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const [clickName, setClickName] = useState(false);
  const floatingName =
    clickName || form.values.fullName.length > 0 || undefined;
  const [clickPhone, setClickPhone] = useState(false);
  const floatingPhone = clickPhone || form.values.phone.length > 0 || undefined;
  const [clickPassword, setClickPassword] = useState(false);
  const floatingPassword =
    clickPassword || form.values.password.length > 0 || undefined;
  const [clickRePassword, setClickRePassword] = useState(false);
  const floatingRePassword =
    clickRePassword || form.values.confirmPassword.length > 0 || undefined;

  const onChangeCaptcha = (value: any) => {
    setCaptcha(true);
  };

  function openFormActive() {
    modals.openConfirmModal({
      zIndex: 1000,
      id: "modelCancel",
      size: "600px",
      radius: "20px",
      centered: true,
      classNames: {
        header: style.header,
        content: style.content,
      },
      children: (
        <ActiveModal phone={form.values.phone} isOpen={true}></ActiveModal>
      ),
      cancelProps: { display: "none" },
      confirmProps: { display: "none" },
    });
  }

  const handleCreateAccount = async (dataSubmit: Register) => {
    const dataApi = await AuthService.registerPhone(
      { ...dataSubmit, username: dataSubmit.phone },
      openFormActive
    );

    if (dataApi && dataApi.success) {
      await createCustomerWithOutTokenPhone({
        ...customer,
        userName: dataSubmit.phone,
        customerName: dataSubmit.fullName,
        email: dataSubmit.phone,
        telephoneNumber: dataSubmit.phone,
      });
    }
  };

  useEffect(() => {
    if (auth.userInfo) {
      router.push("/");
    }
  }, []);

  return (
    <Box
      className={style.registerPage}
      component="form"
      onSubmit={form.onSubmit((e: Register) => {
        handleCreateAccount(e);
      })}
    >
      <Box className={style.container}>
        <Box className={style.topNavBar}>
          <Box className={style.navBarContainer}>
            <Link href={"/login"} className={style.signIn}>
              <IconArrowLeft color="black" size={"26"} />
            </Link>
            <Box className={style.navBarTitle}>Đăng ký tài khoản</Box>
          </Box>
        </Box>
        <Space h="xl" />
        <Box
          className={style.loginForm}
          component="form"
          onSubmit={form.onSubmit((e: Register) => {
            handleCreateAccount(e);
          })}
        >
          <Box className={style.formGroup}>
            <div className={style.inputBox}>
              <TextInput
                label="Họ và tên"
                labelProps={{ "data-floating": floatingName }}
                withAsterisk
                mt="md"
                classNames={{
                  root: style.root,
                  input: style.input,
                  label: style.label,
                }}
                onFocus={() => setClickName(true)}
                onBlur={() => setClickName(false)}
                {...form.getInputProps("fullName")}
              />
            </div>
            <div className={style.inputBox}>
              <TextInput
                label="Số điện thoại"
                labelProps={{ "data-floating": floatingPhone }}
                withAsterisk
                type="number"
                mt="md"
                classNames={{
                  root: style.root,
                  input: style.input,
                  label: style.label,
                }}
                onFocus={() => setClickPhone(true)}
                onBlur={() => setClickPhone(false)}
                {...form.getInputProps("phone")}
              />
            </div>
            <div className={style.inputBox}>
              <PasswordInput
                label="Mật khẩu"
                labelProps={{ "data-floating": floatingPassword }}
                withAsterisk
                mt="md"
                classNames={{
                  root: style.root,
                  input: style.input,
                  label: style.label,
                }}
                onFocus={() => setClickPassword(true)}
                onBlur={() => setClickPassword(false)}
                {...form.getInputProps("password")}
              />
            </div>
            <div className={style.inputBox}>
              <PasswordInput
                label="Nhập lại mật khẩu"
                labelProps={{ "data-floating": floatingRePassword }}
                withAsterisk
                mt="md"
                classNames={{
                  root: style.root,
                  input: style.input,
                  label: style.label,
                }}
                onFocus={() => setClickRePassword(true)}
                onBlur={() => setClickRePassword(false)}
                {...form.getInputProps("confirmPassword")}
              />
            </div>
          </Box>
        </Box>

        <Checkbox
          label={"Tôi đồng ý với các điều khoản bảo mật cá nhân"}
          size="16"
          checked={isAgree}
          mb={10}
          onChange={() => setIsAgree((prev) => !prev)}
        />

        <Center>
          <ReCAPTCHA
            sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            onChange={onChangeCaptcha}
          />
        </Center>

        <Button
          className={isAgree ? style.btn : style.btnDisabled}
          type="submit"
          disabled={!isAgree}
        >
          Đăng ký
        </Button>

        <Center m={"15px 0px"}>
          <Flex gap={"5px"}>
            <Text>Bạn đã có tài khoản?</Text>
            <Link href={"/login"} className={style.signIn}>
              Đăng nhập ngay
            </Link>
          </Flex>
        </Center>

        <Box>
          <Text c="var(--clr-primary)">
            Nếu bạn vô tình đóng cửa sổ nhập mã xác nhận hãy về giao diện đăng
            nhập và chọn chức năng kích hoạt tài khoản
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterForm;
