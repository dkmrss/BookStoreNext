"use client";

import {
  Box,
  Button,
  Modal,
  PasswordInput,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { changePassword } from "@/api/ApiAuth";


const ChangePasswordModal = ({
  isOpen,
  onClose,
  userId,
}: {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
}) => {
  const form = useForm({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validate: {
      oldPassword: (value) =>
        value.trim() ? null : "Mật khẩu hiện tại không được để trống",
      newPassword: (value) =>
        value.trim().length >= 6
          ? null
          : "Mật khẩu mới phải ít nhất 6 ký tự",
      confirmPassword: (value, values) =>
        value === values.newPassword
          ? null
          : "Xác nhận mật khẩu không khớp",
    },
    validateInputOnChange: true,
  });

  const handleChangePassword = async (values: typeof form.values) => {
    try {
      const response = await changePassword(
        userId,
        values.oldPassword,
        values.newPassword
      );

      if (response.success) {
        notifications.show({
          message: "Đổi mật khẩu thành công!",
          color: "green",
        });
        onClose();
      } else {
        notifications.show({
          message: response.message || "Đổi mật khẩu thất bại!",
          color: "red",
        });
      }
    } catch (error: any) {
      notifications.show({
        message: error.message || "Đã xảy ra lỗi khi đổi mật khẩu.",
        color: "red",
      });
    }
  };

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title="Đổi mật khẩu"
      size="sm"
    >
      <Box
        component="form"
        onSubmit={form.onSubmit(handleChangePassword)}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <PasswordInput
          label="Mật khẩu hiện tại"
          placeholder="Nhập mật khẩu hiện tại"
          withAsterisk
          {...form.getInputProps("oldPassword")}
        />
        <PasswordInput
          label="Mật khẩu mới"
          placeholder="Nhập mật khẩu mới"
          withAsterisk
          {...form.getInputProps("newPassword")}
        />
        <PasswordInput
          label="Xác nhận mật khẩu"
          placeholder="Nhập lại mật khẩu mới"
          withAsterisk
          {...form.getInputProps("confirmPassword")}
        />
        <Button type="submit" fullWidth>
          Đổi mật khẩu
        </Button>
      </Box>
    </Modal>
  );
};

export default ChangePasswordModal;
