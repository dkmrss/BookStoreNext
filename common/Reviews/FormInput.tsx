
import { TblUserReview } from "@/model/TblUserReview";
import {
  Box,
  Button,
  Flex,
  Rating,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { useEffect, useState } from "react";
import style from "./Reviews.module.scss";

import { TblProduct } from "@/model/TblBook";
import { useSelector } from "react-redux";

const FormInput = ({ fetchDataReview, dataItem }: FormInputProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isReview, setIsReview] = useState(false);
  const dataUser = useSelector((state: any) => state.auth?.userInfo?.data);
  const entity = {
    id: 0,
    itemType: "product",
    replyCount: null,
    itemId: dataItem?.id || 0,
    itemTitle: dataItem?.product_name,
    isUserAdmin: 0,
    userId: null,
    userEmail: null,
    userName: null,
    relatedOrder: null,
    userAvatar: null,
    userNote: null,
    rate: null,
    title: null,
    content: null,
    files: null,
    searchFulltext: null,
    approved: 0,
    postTime: null,
    ipAddress: null,
    userAgent: null,
    orderNumber: null,
    isFeatured: 0,
    peopleIdVote: null,
    peopleLikeCount: null,
    peopleDislikeCount: null,
    creationDate: null,
    createdBy: null,
    lastUpdateDate: null,
    lastUpdateTime: null,
    lastUpdateBy: null,
  };

  const form = useForm<TblUserReview>({
    initialValues: {
      ...entity,
    },
    validate: {
      userName: isNotEmpty("Họ tên chưa nhập"),
      content: isNotEmpty("Nội dung đánh giá chưa nhập"),
    },
  });

  const handleClickSubmit = async (data: TblUserReview) => {
    if (data.rate) {
      setIsReview(false);
      const dataSubmit = {
        ...data,
        userName: phoneNumber
          ? data.userName + ` Số đt : ` + phoneNumber
          : data.userName,
      };

     
      modals.close("formInput");
      // fetchDataReview();
    } else setIsReview(true);
  };

  useEffect(() => {
    if (dataUser) {
      form.setValues({
        userName: dataUser?.customerName,
        userId: dataUser?.customerId,
      });
      setPhoneNumber(dataUser?.telephoneNumber);
    }
  }, [dataUser]);
  return (
    <Box
      component="form"
      onSubmit={form.onSubmit((e: TblUserReview) => {
        handleClickSubmit(e);
      })}
    >
      <Text fw={700}>Đánh giá sản phẩm</Text>
      <Flex align={"center"} gap={"md"}>
        <Rating size="md" mt={3} {...form.getInputProps("rate")} />
        {isReview && <Text className={style.error}>*Chưa chọn đánh giá</Text>}
      </Flex>

      <Text fw={700} mt={15}>
        Viết nhận xét
      </Text>

      <TextInput
        label="Họ tên"
        placeholder="Nhập họ tên của bạn"
        {...form.getInputProps("userName")}
        withAsterisk
        mt={"sm"}
      />
      <TextInput
        label="Số điện thoại"
        placeholder="Nhập số điện thoại"
        value={phoneNumber}
        type="number"
        onChange={(e) => setPhoneNumber(e.target.value)}
        mt={"sm"}
      />
      <TextInput
        label="Email"
        placeholder="Nhập địa chỉ email"
        type="email"
        {...form.getInputProps("userEmail")}
        mt={"sm"}
      />
      <Textarea
        label="Nội dung đánh giá"
        placeholder="Nhập đánh giá về sản phẩm"
        {...form.getInputProps("content")}
        withAsterisk
        mt={"sm"}
      />
      <Button className={style.btn} w={"100%"} mt={15} type="submit">
        Gửi đánh giá
      </Button>
    </Box>
  );
};

export default FormInput;

type FormInputProps = {
  dataItem: TblProduct | null;
  fetchDataReview?: () => Promise<void>;
};
