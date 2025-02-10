import EmailSendRsPassword from "@/app/login/EmailSendRsPassword/index";

import {
  Box,
  Container,
  LoadingOverlay,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { useRouter } from "next/navigation";
import { useState } from "react";
import style from "./Reactive.module.scss";
import { PasswordRecovery } from "@/model/User";
import { notifications } from "@mantine/notifications";
import { forgotPassword, Reactive, resetPassword } from "@/api/ApiAuth";
import ReActiveModal from "../Active/ReActiveModalWithoutPassWord";

const ActiveModal = () => {
  const entity = {
    email: "",
  };

  const [visible, { toggle, close, open }] = useDisclosure(false);

  const form = useForm<PasswordRecovery>({
    initialValues: {
      ...entity,
    },

    validate: {},
  });

  const [focused, setFocused] = useState(false);
  const floating = focused || form.values.email.length > 0 || undefined;
  const router = useRouter();
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


  const handleSubmit = async (dataSubmit: PasswordRecovery) => {
    try {
      const data = await Reactive(dataSubmit);

      if (data.success) {
        notifications.show({
          message: data.message,
          color: "green",
        });
        openFormRsPassword(dataSubmit.email);
      } else {
        notifications.show({
          message: data?.response?.data?.message,
          color: "red",
        });
      }
    } catch (error: any) {
      
      notifications.show({
        message: error?.message,
        color: "red",
      });
    }
  };

  return (
    <Box
      className={style.Boxone}
      component="form"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <Container className={style.containerall}>
        <Title className={style.divtitle}>
          <span className={style.infoText}>
            Nhập email bạn đã sử dụng khi đăng ký tài khoản để lấy lại mật khẩu.
            Bạn sẽ nhận được mail để nhận mã khôi phục mật khẩu
          </span>
        </Title>
        <TextInput
          label="email"
          labelProps={{ "data-floating": floating }}
          withAsterisk
          mt="md"
          classNames={{
            root: style.root,
            input: style.input,
            label: style.label,
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...form.getInputProps("email")}
        />
        <div>
          <button className={style.button}>Gửi mã xác thực</button>
        </div>
      </Container>
    </Box>
  );
};

export default ActiveModal;
