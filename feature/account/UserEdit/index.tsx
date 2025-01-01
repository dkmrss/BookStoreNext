"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FileInput,
  Flex,
  PasswordInput,
  Select,
  Text,
  TextInput,
  Title,
  Space,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import style from "./UserInfo.module.scss";
import { updateUser, getDataUser } from "@/api/ApiUser"; // API calls for user info
import ChangePasswordModal from "./ChangePasswordModal";

const UserEditForm = () => {
  const router = useRouter();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [dataUser, setDataUser] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    id: null,
  });
  const [loadingUser, setLoadingUser] = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const callApiGetDetailUser = async () => {
    setLoadingUser(true);
    const user = localStorage.getItem("user"); // Lấy thông tin từ localStorage
    const userID = user ? JSON.parse(user).id : null; // Lấy id từ dữ liệu JSON
    if (userID) {
      try {
        const response = await getDataUser(`/${userID}`);
        setDataUser(response.data);
      } catch (error) {
        notifications.show({
          message: "Không thể tải thông tin người dùng.",
          color: "red",
        });
      } finally {
        setLoadingUser(false);
      }
    } else {
      setLoadingUser(false);
      notifications.show({
        message: "Không tìm thấy ID người dùng.",
        color: "red",
      });
    }
  };

  useEffect(() => {
    callApiGetDetailUser();
  }, []);

  const form = useForm({
    initialValues: {
      name: dataUser.name || "",
      phone: dataUser.phone || "",
      address: dataUser.address || "",
    },
    validate: {
      name: (value) =>
        value.trim().length > 0 ? null : "Tên không được để trống",
      phone: (value) =>
        /^\d{10}$/.test(value) ? null : "Số điện thoại không hợp lệ",
      address: (value) =>
        value.trim().length > 0 ? null : "Địa chỉ không được để trống",
    },
    validateInputOnChange: true,
  });

  useEffect(() => {
    if (!loadingUser) {
      form.setValues({
        name: dataUser.name || "",
        phone: dataUser.phone || "",
        address: dataUser.address || "",
      });
    }
  }, [dataUser, loadingUser]);

  const handleSubmit = async (values: typeof form.values) => {
  
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("phone", values.phone);
      formData.append("address", values.address);
      if (avatar) {
        formData.append("avatar", avatar);
      }

      const response = await updateUser(dataUser.id || 0, formData);

      if (response.success) {
        notifications.show({
          message: "Cập nhật thông tin thành công!",
          color: "green",
        });
        window.location.reload();// Reload the page to reflect changes
      } else {
        notifications.show({
          message: response.message || "Cập nhật thông tin thất bại!",
          color: "red",
        });
      }
    } catch (error) {
      notifications.show({
        message: "Đã xảy ra lỗi trong quá trình cập nhật!",
        color: "red",
      });
    }
  };

  return (
    <Box className={style.editPage}>
      <Box className={style.container}>
        <Flex align="center" mb="lg">
          <Link href="/user-information">
            <Button
              variant="subtle"
              leftSection={<IconArrowLeft size={18} />}
              size="sm"
            >
              Quay lại
            </Button>
          </Link>
        </Flex>
        <Title order={2} mb="xl">
          Chỉnh sửa thông tin người dùng
        </Title>

        {/* User Info Form */}
        {!loadingUser ? (
          <Box
            component="form"
            onSubmit={form.onSubmit(handleSubmit)}
            className={style.form}
          >
            <TextInput
              label="Email"
              value={dataUser.email}
              disabled
              withAsterisk
              classNames={{
                input: style.input,
                label: style.label,
              }}
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

            <FileInput
              label="Hình đại diện"
              placeholder="Chọn hình đại diện"
              accept="image/*"
              classNames={{
                input: style.input,
                label: style.label,
              }}
              onChange={(file) => setAvatar(file)}
            />

            {/* Button to open password modal */}
            

            <Button type="submit" fullWidth mt="xl" size="md">
              Lưu thay đổi
            </Button>
          </Box>
        ) : (
          <Text>Đang tải thông tin người dùng...</Text>
        )}
      </Box>
      <Button
              variant="outline"
              color="var(--clr-primary)"
              fullWidth
              mt="lg"
              onClick={() => setIsPasswordModalOpen(true)}
            >
              Đổi mật khẩu
            </Button>
      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        userId={user.id}
      />
    </Box>
  );
};

export default UserEditForm;
