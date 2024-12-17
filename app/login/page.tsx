"use client";
import { totalCartPrice } from "@/api/apiCart";
import { getCustomerInfo } from "@/api/apiCustomer";
import AuthService from "@/api/login/auth.service";
import { NotificationExtension } from "@/extension/NotificationExtension";
import { isNullOrUndefined } from "@/extension/StringExtension";
import { getUserInfo, removeUserInfo } from "@/redux/slices/authSlice";
import { updateCart } from "@/redux/slices/cartSlice";
import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  PasswordInput,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import style from "./Login.module.scss";
import PasswordRecoveryModal from "./PasswordRecovery/PasswordRecovery";
import ReActiveModalWithoutPassword from "./Reactive/ReActiveModalWithoutPassWord";
import {
  createMemberShipCard,
  getMembershipCard,
  updateMemberShipCard,
} from "@/api/apiMembershipCard";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  const [captcha, setCaptcha] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clickEmail, setClickEmail] = useState(false);
  const [clickPassword, setClickPassword] = useState(false);

  const onChangeCaptcha = (value: any) => {
    setCaptcha(true);
  };

  const handleException = () => {
    if (username === "" || password === "") {
      notifications.show({
        message: "Vui lòng nhập đầy đủ thông tin đăng nhập !!!",
        autoClose: 2000,
      });
    } else {
      handleLogin();
    }
  };

  function openFormPasswordRecoveryModal() {
    modals.closeAll();
    modals.openConfirmModal({
      size: "500px",
      radius: "20px",
      centered: true,
      title: (
        <Text fw={700} lineClamp={2}>
          Khôi phục mật khẩu
        </Text>
      ),
      children: <PasswordRecoveryModal />,
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
      zIndex: 1000,
      classNames: {
        header: style.header,
        content: style.content,
      },
    });
  }

  function openFormWithoutPassWord() {
    modals.closeAll();
    modals.openConfirmModal({
      size: "600px",
      radius: "20px",
      centered: true,
      title: (
        <Text fw={700} lineClamp={2}>
          Kích hoạt tài khoản
        </Text>
      ),
      children: (
        <ReActiveModalWithoutPassword
          isOpen={true}
          phone={username}
          onClose={() => modals.closeAll()}
        ></ReActiveModalWithoutPassword>
      ),
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
      zIndex: 1000,
      classNames: {
        header: style.header,
        content: style.content,
      },
    });
  }

  const handleLogin = async () => {
    const user = await AuthService.login({
      username: username,
      password: password,
    });

    if (
      user &&
      user !== "Tài khoản chưa được kích hoạt !" &&
      user !== "Tài khoản hoặc mật khẩu chưa chính xác !"
    ) {
      localStorage.setItem("loginType", "phone");

      const customerInfo = await getCustomerInfo();

      if (
        !isNullOrUndefined(customerInfo) &&
        !isNullOrUndefined(customerInfo?.data)
      ) {
        localStorage.setItem("userInfo", JSON.stringify(customerInfo));
        dispatch(getUserInfo(customerInfo));
        const totalData = await totalCartPrice(customerInfo?.data?.customerId);
        const newCartHeader = {
          totalItem: totalData?.data?.quantity,
          totalPrice: totalData?.data?.totalAmount,
        };
        dispatch(updateCart(newCartHeader));
        router.push("/");
        const callApiGetCard = await getMembershipCard(
          `customerId=${customerInfo.data.customerId}`
        );
        if (callApiGetCard.length === 0) {
          const createCard = await createMemberShipCard(
            `customerId=${customerInfo.data.customerId}`
          );
          const updateCard = await updateMemberShipCard();
        } else {
          const updateCard = await updateMemberShipCard();
        }
      } else {
        NotificationExtension.Fails(customerInfo.message);
        localStorage.setItem("userInfo", "");
        dispatch(removeUserInfo());
      }
    } else {
      if (user === "Tài khoản chưa được kích hoạt !") {
        openFormWithoutPassWord();
      } else {
      }
    }
  };

  useEffect(() => {
    if (auth.userInfo) {
      router.push("/");
    }
  }, []);

  return (
    <div className={style.login}>
      <Box className={style.formLogin} mt={"10px"}>
        <Center>
          <Title order={3}>Đăng nhập </Title>
        </Center>
        {/* <Center>
          <Image src={logo} alt="logo-HACOM" width={180} height={100} />
        </Center> */}

        <Space h="xl" />
        <Text
          size="14px"
          c={clickEmail ? "var(--clr-text-primary)" : "#BDBDBD"}
          className={
            !clickEmail && username === "" ? style.setText : style.unsetText
          }
        >
          Nhập số điện thoại
        </Text>
        <Input
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
          onFocus={() => setClickEmail(!clickEmail)}
          onBlur={() => setClickEmail(!clickEmail)}
          variant="unstyled"
          className={clickEmail ? style.unsetInput : style.setInput}
          type="number"
          p={"0px 10px"}
        ></Input>

        <Space h={"xs"} />

        <Text
          size="14px"
          c={clickPassword ? "var(--clr-text-primary)" : "#BDBDBD"}
          className={
            !clickPassword && password === "" ? style.setText : style.unsetText
          }
        >
          Nhập mật khẩu
        </Text>
        <PasswordInput
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          onFocus={() => setClickPassword(!clickPassword)}
          onBlur={() => setClickPassword(!clickPassword)}
          variant="unstyled"
          className={clickPassword ? style.unsetInput : style.setInput}
          p={"0px 10px"}
          type="password"
        ></PasswordInput>

        <Box w={"100%"}>
          <Flex justify="flex-end" gap={"md"}>
            <p
              onClick={openFormWithoutPassWord}
              className={style.forgotPassword}
            >
              Kích hoạt tài khoản
            </p>
            <p
              onClick={openFormPasswordRecoveryModal}
              className={style.forgotPassword}
            >
              Quên mật khẩu ?
            </p>
          </Flex>
        </Box>

        <Center mt={20}>
          <ReCAPTCHA
            sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            onChange={onChangeCaptcha}
          />
        </Center>

        <Button
          fullWidth
          color="var(--clr-primary)"
          m={"10px 0px"}
          onClick={handleException}
          disabled={!captcha}
        >
          Đăng nhập
        </Button>

        <Center m={"15px 0px"}>
          <Flex gap={"5px"}>
            <Text>Bạn chưa có tài khoản ?</Text>
            <Link href={"/register"} className={style.signUp}>
              Đăng ký ngay
            </Link>
          </Flex>
        </Center>
      </Box>
    </div>
  );
};

export default Login;
