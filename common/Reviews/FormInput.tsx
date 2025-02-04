import { Review } from "@/model/TblUserReview";
import { Box, Button, Flex, Rating, Text, TextInput, Textarea } from "@mantine/core";
import {
  message
} from "antd";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { useEffect, useState } from "react";
import style from "./Reviews.module.scss";
import { TblProduct } from "@/model/TblBook";
import { useSelector } from "react-redux";
import { createRating } from "@/api/ApiRating"; // Import API tạo đánh giá

const FormInput = ({ fetchDataReview, dataItem }: FormInputProps) => {
  const [isReview, setIsReview] = useState(false);
  const dataUser = useSelector((state: any) => state.auth?.userInfo?.data);
  const parsedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const form = useForm<Partial<Review>>({
    initialValues: {
      user_id: parsedUser?.id || 0,
      product_id: dataItem?.id || 0,
      rating: 5, // Mặc định đánh giá 5 sao
      comment: "",
    },
    validate: {
      comment: (value) => (value ? null : "Nội dung đánh giá chưa nhập"),
    },
  });

  const handleClickSubmit = async (values: Partial<Review>) => {
    if (!values.rating) {
      setIsReview(true);
      return;
    }
   
    try {
      const response = await createRating({
        user_id: parsedUser?.id || 0,
        product_id: values.product_id || 0,
        comment: values.comment || "",
        rating: values.rating || 5, // Nếu không chọn thì mặc định 5 sao
      });

      if (response.success && response.message !== "Người dùng chưa mua sản phẩm này, không thể đánh giá") {
        message.success(response.message);
        modals.closeAll();
    } else {
        console.warn("⚠️ API trả về lỗi:", response.message);
        message.error(response.message || "Có lỗi xảy ra!");
        modals.closeAll();
    }
    } catch (error) {
      console.log(error);
      message.error("Đã xảy ra lỗi khi gửi đánh giá!");
    }
  };

  useEffect(() => {
    if (dataUser) {
      form.setValues({
        user_name: dataUser.customerName,
        user_id: dataUser.customerId,
      });
    }
  }, [dataUser]);

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit((values) => handleClickSubmit(values))}
    >
      <Text fw={700}>Đánh giá sản phẩm</Text>
      <Flex align={"center"} gap={"md"}>
        <Rating size="md" mt={3} {...form.getInputProps("rating")} />
        {isReview && <Text className={style.error}>*Chưa chọn đánh giá</Text>}
      </Flex>

      {/* <TextInput
        label="Họ tên"
        placeholder="Nhập họ tên của bạn"
        {...form.getInputProps("user_name")}
        withAsterisk
        mt={"sm"}
      /> */}
      <Textarea
        label="Nội dung đánh giá"
        placeholder="Nhập đánh giá về sản phẩm"
        {...form.getInputProps("comment")}
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
