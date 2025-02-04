"use client";
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
import { notifications } from "@mantine/notifications";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import style from "./Login.module.scss";
import { login } from "@/api/ApiAuth";
import { modals } from "@mantine/modals";
import PasswordRecoveryModal from "./PasswordRecovery/PasswordRecovery";
import Link from "next/link";
import ActiveModal from "./Reactive/Reactive";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clickEmail, setClickEmail] = useState(false);
  const [clickPassword, setClickPassword] = useState(false);


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

  function openFormActiveModal() {
    modals.closeAll();
    modals.openConfirmModal({
      size: "500px",
      radius: "20px",
      centered: true,
      title: (
        <Text fw={700} lineClamp={2}>
          Kích hoạt tài khoản
        </Text>
      ),
      children: <ActiveModal />,
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
      zIndex: 1000,
      classNames: {
        header: style.header,
        content: style.content,
      },
    });
  }

  const isAuthenticated = (): boolean => {
    try {
      const token = localStorage.getItem("token");
      return !!token; // Trả về true nếu token tồn tại và không rỗng
    } catch (error) {
      console.error("Error checking authentication:", error);
      return false; // Trả về false nếu có lỗi
    }
  };

  const handleLogin = async () => {
    try {
      const data = await login({
        email: username,
        password: password,
      });
  
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.data));

        notifications.show({
          message: data.message ,
          color: "green",
        });
        router.push("/")
        window.location.reload();
        // Lưu thông tin người dùng và điều hướng
      } else {
        notifications.show({
          message: data.message ,
          color: "red",
        });
      }
    } catch (error: any) {
      notifications.show({
        message: error?.response?.data?.message,
        color: "red",
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/"); // Chuyển về trang Home nếu đã đăng nhập
    }
  }, []);

  return (
    <div className={style.login}>
      <Box className={style.formLogin}>
        <Center>
          <Title order={3}>Đăng nhập</Title>
        </Center>

        <Space h="xl" />

        {/* Nhập số điện thoại hoặc email */}
        <Text
          size="14px"
          c={clickEmail ? "var(--clr-text-primary)" : "#BDBDBD"}
          className={
            !clickEmail && username === "" ? style.setText : style.unsetText
          }
        >
          Nhập email
        </Text>
        <Input
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
          onFocus={() => setClickEmail(true)}
          onBlur={() => setClickEmail(false)}
          variant="unstyled"
          className={clickEmail ? style.unsetInput : style.setInput}
          type="email"
        />

        <Space h="xs" />

        {/* Nhập mật khẩu */}
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
          onFocus={() => setClickPassword(true)}
          onBlur={() => setClickPassword(false)}
          variant="unstyled"
          className={clickPassword ? style.unsetInput : style.setInput}
        />

        <Box w="100%" mt={20}>
          <Flex justify="space-between">
          <Text onClick={openFormActiveModal} className={style.forgotPassword}>Kích hoạt tài khoản</Text>
            <Text onClick={openFormPasswordRecoveryModal} className={style.forgotPassword}>Quên mật khẩu?</Text>
            
          </Flex>
          
        </Box>
      
        {/* Nút đăng nhập */}
        <Button
          fullWidth
          color="var(--clr-primary)"
          mt={20}
          onClick={handleLogin}
        >
          Đăng nhập
        </Button>

        <Box w="100%" mt={20}>
        <Flex justify="center" mt="lg">
          <Text>Bạn chưa có tài khoản?</Text>
          <Link href="/register">
            <Text ml="sm" className={style.signIn}>
              Đăng ký ngay
            </Text>
          </Link>
        </Flex>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
