import React from "react";
import {
  Box,
  Text,
  Flex,
  TextInput,
  Select,
  Textarea,
  Center,
  Button,
} from "@mantine/core";
import { IconX, IconUrgent, IconBrandTelegram } from "@tabler/icons-react";
import style from "./Contact.module.scss";
import { useForm } from "@mantine/form";

interface ContactAfterProps {
  isClosing: boolean;
  handleClose: () => void;
}

const ContactForm: React.FC<ContactAfterProps> = ({
  isClosing,
  handleClose,
}) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      gender: "",
      message: "",
    },

    validate: {
      name: (value) =>
        value.length < 2 ? "Họ và tên phải có từ 2 ký tự trở lên !" : null,
      email: (value) =>
        !/^\S+@\S+$/.test(value) && value.length > 0
          ? "Email sai định dạng !"
          : null,
      phoneNumber: (value) =>
        value.length !== 10 ? "Số điện thoại sai định dạng !" : null,
      gender: (value) =>
        value.length === 0 ? "Vui lòng chọn giới tính của mình !" : null,
    },
  });

  return (
    <Box w={350} className={isClosing ? style.formAfter : style.formFirst}>
      <Box
        bg={"var(--clr-primary)"}
        p={10}
        w={"100%"}
        style={{ borderRadius: "10px 10px 0px 0px" }}
      >
        <Flex justify={"space-between"} align={"center"}>
          <Text c={"#fff"}>Chat với nhân viên tư vấn !</Text>
          <IconX onClick={handleClose} cursor={"pointer"} color="#fff" />
        </Flex>
        <Flex align={"center"} gap={20}>
          <IconUrgent size={100} color="#fff" />
          <Text c={"#fff"} fw={500}>
            Hỗ trợ khách hàng
          </Text>
        </Flex>
      </Box>
      <form onSubmit={form.onSubmit(console.log)} className={style.formContact}>
        <Text size="14px">Thông tin cơ bản</Text>
        <TextInput
          placeholder="Nhập tên của bạn *"
          key={form.key("name")}
          {...form.getInputProps("name")}
        />
        <TextInput
          placeholder="Nhập email của bạn"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />
        <TextInput
          placeholder="Nhập số điện thoại của bạn *"
          key={form.key("phoneNumber")}
          {...form.getInputProps("phoneNumber")}
          type="number"
        />
        <Text size="14px">Thông tin bổ sung</Text>
        <Select
          placeholder="Giới tính *"
          data={["Anh", "Chị"]}
          key={form.key("gender")}
          {...form.getInputProps("gender")}
          comboboxProps={{ zIndex: 1000 }}
          clearable
        />
        <Textarea
          placeholder="Tin nhắn"
          maxRows={4}
          key={form.key("message")}
          {...form.getInputProps("note")}
        />
        <Center>
          <Button
            type="submit"
            mt="sm"
            leftSection={<IconBrandTelegram />}
            color="var(--clr-primary)"
            w={"55%"}
            radius={"30px"}
          >
            Gửi tin nhắn
          </Button>
        </Center>
      </form>
    </Box>
  );
};

export default ContactForm;
