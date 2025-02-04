"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FileInput,
  Flex,
  PasswordInput,
  Text,
  TextInput,
  Space,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import style from "./Register.module.scss";
import { registerUser } from "@/api/ApiUser";
import ReActiveModal from "@/app/login/Active/ReActiveModalWithoutPassWord";
import { modals } from "@mantine/modals";

const RegisterForm = () => {
  const router = useRouter();
  const [isAgree, setIsAgree] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);

  function openFormRsPassword(username: string) {
    modals.closeAll();
    modals.openConfirmModal({
      size: "600px",
      radius: "20px",
      centered: true,
      title: (
        <Text fw={700} lineClamp={2}>
          Đổi mật khẩu
        </Text>
      ),
      children: (
        <ReActiveModal
          isOpen={true}
          username={username}
          onClose={() => modals.closeAll()}
        />
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

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      phone: "",
      address: "",
    },
    validate: {
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : "Email không hợp lệ",
      password: (value) =>
        value.length >= 6 ? null : "Mật khẩu phải ít nhất 6 ký tự",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Mật khẩu xác nhận không khớp",
      name: (value) =>
        value.trim().length > 0 ? null : "Tên không được để trống",
      phone: (value) =>
        /^\d{10}$/.test(value) ? null : "Số điện thoại không hợp lệ",
      address: (value) =>
        value.trim().length > 0 ? null : "Địa chỉ không được để trống",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    if (!isAgree) {
      notifications.show({
        message: "Bạn cần đồng ý với điều khoản trước khi đăng ký!",
        color: "red",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("name", values.name);
      formData.append("phone", values.phone);
      formData.append("address", values.address);
      if (avatar) {
        formData.append("avatar", avatar);
      }

      const response = await registerUser(formData);

      if (response.success) {
        notifications.show({
          message: "Đăng ký thành công! Hãy nhâp mã kích hoạt được gửi đến mail của bạn.",
          color: "green",
        });
        openFormRsPassword(values.email);
      } else {
        notifications.show({
          message: response.message || "Đăng ký thất bại!",
          color: "red",
        });
      }
    } catch (error) {
      notifications.show({
        message: "Đã xảy ra lỗi trong quá trình đăng ký!",
        color: "red",
      });
    }
  };

  return (
    <Box
      className={style.registerPage}
      component="form"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <Box className={style.container}>
        {/* Thanh điều hướng */}
        <Box className={style.topNavBar}>
          <Box className={style.navBarContainer}>
            <Link href={"/login"} className={style.signIn}>
              <IconArrowLeft color="black" size={"26"} />
            </Link>
            <Box className={style.navBarTitle}>Đăng ký tài khoản</Box>
          </Box>
        </Box>
        <Space h="xl" />

        {/* Form đăng ký */}
        <Box className={style.loginForm}>
          <Box className={style.formGroup}>
            <TextInput
              label="Email"
              placeholder="Nhập email"
              withAsterisk
              classNames={{
                input: style.input,
                label: style.label,
              }}
              {...form.getInputProps("email")}
            />
            <TextInput
              label="Họ và tên"
              placeholder="Nhập họ và tên"
              withAsterisk
              classNames={{
                input: style.input,
                label: style.label,
              }}
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Số điện thoại"
              placeholder="Nhập số điện thoại"
              withAsterisk
              classNames={{
                input: style.input,
                label: style.label,
              }}
              {...form.getInputProps("phone")}
            />
            <TextInput
              label="Địa chỉ"
              placeholder="Nhập địa chỉ"
              withAsterisk
              classNames={{
                input: style.input,
                label: style.label,
              }}
              {...form.getInputProps("address")}
            />
            <PasswordInput
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              withAsterisk
              classNames={{
                input: style.input,
                label: style.label,
              }}
              {...form.getInputProps("password")}
            />
            <PasswordInput
              label="Xác nhận mật khẩu"
              placeholder="Nhập lại mật khẩu"
              withAsterisk
              classNames={{
                input: style.input,
                label: style.label,
              }}
              {...form.getInputProps("confirmPassword")}
            />

            {/* FileInput cho hình đại diện */}
            <FileInput
              label="Hình đại diện (tùy chọn)"
              placeholder="Chọn hình đại diện"
              accept="image/*"
              onChange={(file) => setAvatar(file)}
              classNames={{
                input: style.input,
                label: style.label,
              }}
              mt="md"
            />
          </Box>

          {/* Checkbox điều khoản */}
          <Checkbox
            label="Tôi đồng ý với các điều khoản bảo mật cá nhân"
            size="sm"
            checked={isAgree}
            onChange={() => setIsAgree(!isAgree)}
            mt="md"
          />

          {/* Nút đăng ký */}
          <Button
            type="submit"
            fullWidth
            mt="lg"
            size="md"
            className={isAgree ? style.submitButton : style.disabledButton}
            disabled={!isAgree}
          >
            Đăng ký
          </Button>
        </Box>

        {/* Liên kết đến trang đăng nhập */}
        <Flex justify="center" mt="lg">
          <Text>Bạn đã có tài khoản?</Text>
          <Link href="/login">
            <Text ml="sm" className={style.signIn}>
              Đăng nhập ngay
            </Text>
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};

export default RegisterForm;
