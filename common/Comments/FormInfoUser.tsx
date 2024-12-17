import { tblCustomer } from "@/model/TblCustomer";
import { Box, Button, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import style from "./Comments.module.scss";
import { useSelector } from "react-redux";

type FormInfoUserType = {
  userName: string;
  userEmail: string;
  phoneNumber: string;
};

const FormInfoUser = ({
  handleSubmitComment,
  handleSubmitCommentReply,
  data,
}: FormInfoUserProps) => {
  const entity = {
    userName: "",
    userEmail: "",
    phoneNumber: "",
  };
  // const [phoneNumber, setPhoneNumber] = useState("");
  const dataUser = useSelector((state: any) => state.auth?.userInfo?.data);
  const form = useForm<FormInfoUserType>({
    initialValues: {
      ...entity,
    },
    validate: {
      userName: isNotEmpty("Họ tên chưa nhập"),
      phoneNumber: (value) => {
        if (!value) {
          return "Số điện thoại chưa nhập"; // Trả về null nếu value là null hoặc không xác định
        }
        return /^\d{10}$/.test(value.trim())
          ? null
          : "Số điện thoại không hợp lệ";
      },
    },
  });

  const handleClickSubmit = (data: FormInfoUserType) => {
    const dataSubmit = {
      userName: data.phoneNumber
        ? data.userName + ` Số đt : ` + data.phoneNumber
        : data.userName,
      userEmail: data.userEmail,
    };
    if (handleSubmitComment) handleSubmitComment(dataSubmit);
    else if (handleSubmitCommentReply) handleSubmitCommentReply(dataSubmit);
  };

  useEffect(() => {
    if (data) {
      form.setFieldValue("userName", data?.customerName || "");
      form.setFieldValue("userEmail", data?.email || "");
      form.setFieldValue("phoneNumber", data?.telephoneNumber || "");
    }
  }, []);

  useEffect(() => {
    if (dataUser) {
      form.setValues({
        userName: dataUser?.customerName,
        phoneNumber: dataUser?.telephoneNumber,
      });
    }
  }, [dataUser]);
  return (
    <Box
      component="form"
      onSubmit={form.onSubmit((e: FormInfoUserType) => {
        handleClickSubmit(e);
      })}
    >
      <TextInput
        label="Họ và tên"
        placeholder="Họ và tên"
        mt={"md"}
        withAsterisk
        // value={data?.customerName || ""}
        {...form.getInputProps("userName")}
      />
      <TextInput
        label="Email"
        placeholder="Email (Để nhận phản hồi qua mail)"
        mt={"md"}
        type="email"
        // value={data?.email || ""}
        {...form.getInputProps("userEmail")}
      />
      <TextInput
        label="Số điện thoại"
        placeholder="Số điện thoại (Để nhận phản hồi)"
        mt={"md"}
        type="number"
        withAsterisk
        // value={phoneNumber}
        {...form.getInputProps("phoneNumber")}
      />

      <Button className={style.button} mt={"lg"} w={"100%"} type="submit">
        Cập nhật
      </Button>
    </Box>
  );
};

export default FormInfoUser;

type FormInfoUserProps = {
  data?: tblCustomer;
  handleSubmitComment?: (data: { userName: string; userEmail: string }) => void;
  handleSubmitCommentReply?: (data: {
    userName: string;
    userEmail: string;
  }) => void;
};
