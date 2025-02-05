"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  TextInput,
  PasswordInput,
  Text,
  Box,
  Group,
  Space,
  Title,
  Container,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { Active, forgotPassword, resetPassword } from "@/api/ApiAuth";
import style from "./ReActiveModalWithoutPassWord.module.scss";
import { useRouter } from "next/navigation";

interface ReActiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}

const ReActiveModal: React.FC<ReActiveModalProps> = ({
  isOpen,
  onClose,
  username,
}) => {
  const [countdown, setCountdown] = useState(60);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
const router = useRouter();
  const form = useForm({
    initialValues: {
      token: "",
      
    },
    validate: {
      
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isButtonDisabled) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsButtonDisabled(false);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isButtonDisabled]);

  const handleSendActivationEmail = async () => {
    setIsButtonDisabled(true);
    try {
      const data = await forgotPassword({ email: username });
      if (data.success) {
        notifications.show({
          message: data.message,
          color: "green",
        });
        router.push("/login");
      } else {
        notifications.show({
          message: data.message,
          color: "red",
        });
      }
    } catch (error: any) {
      notifications.show({
        message: error?.response?.data?.message || "Đã xảy ra lỗi",
        color: "red",
      });
    }
  };

  const handleFinish = async (values: typeof form.values) => {
    console.log(values)
    try {
      const data = await Active({ token: values.token});
      if (data.success) {
        notifications.show({
          message: data.message,
          color: "green",
        });
        onClose();
      } else {
        notifications.show({
          message: data.message,
          color: "red",
        });
      }
    } catch (error: any) {
      notifications.show({
        message: error?.response?.data?.message || "Sai token, vui lòng lấy token tại mail mới nhất",
        color: "red",
      });
    }
  };

  return (
    <Box
      className={style.Boxone}
      component="form"
      onSubmit={form.onSubmit(handleFinish)}
    >
      <Container className={style.containerall}>
      <Text mt={20}>
        Hãy nhập mã kích hoạt được gửi đến email của bạn và thiết lập lại mật
        khẩu mới.
      </Text>

      
        <TextInput
          label="Mã kích hoạt"
          placeholder="Nhập mã kích hoạt"
          required
          {...form.getInputProps("token")}
        />

        <Space h="md" />

        <Group>
          <Button className={style.button} type="submit">Xác nhận</Button>
          <Button
            variant="default"
            disabled={isButtonDisabled}
            onClick={handleSendActivationEmail}
            
          >
            {isButtonDisabled ? `Gửi lại mã (${countdown}s)` : "Gửi lại mã"}
          </Button>
        </Group>
        </Container>
    </Box>
  );
};

export default ReActiveModal;
