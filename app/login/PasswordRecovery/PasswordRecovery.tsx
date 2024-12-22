import AuthService from "@/api/login/auth.service";
import EmailSendRsPassword from "@/app/login/EmailSendRsPassword/index";
import { PasswordRecovery } from "@/model/AuthService";
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
import ReActiveModalWithoutPassword from "../Reactive/ReActiveModalWithoutPassWord";
import style from "./Passwordrecovery.module.scss";

const PasswordRecoveryModal = () => {
  const entity = {
    username: "",
  };

  const [visible, { toggle, close, open }] = useDisclosure(false);

  const form = useForm<PasswordRecovery>({
    initialValues: {
      ...entity,
    },

    validate: {
      
    },
  });

  const [focused, setFocused] = useState(false);
  const floating = focused || form.values.username.length > 0 || undefined;
  const router = useRouter();
  function openFormRsPassword(username: string) {
    modals.closeAll();
    modals.openConfirmModal({
      size: "600px",
      radius: "20px",
      centered: true,
      title: (
        <Text fw={700} lineClamp={2}>
          Kích hoạt tài khoản
        </Text>
      ),
      children: <EmailSendRsPassword userName={username} />,
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
      zIndex: 1000,
      classNames: {
        header: style.header,
        content: style.content,
      },
    });
  }

  function openFormWithoutPassWord(username: string) {
    modals.closeAll();
    modals.openConfirmModal({
      size: "600px",
      radius: "20px",
      centered: true,
      title: (
        <Text fw={700} lineClamp={2}>
          Kích hoạt tài khoản
        </Text>
      ),
      children: (
        <ReActiveModalWithoutPassword
          isOpen={true}
          phone={username}
          onClose={() => modals.closeAll()}
        ></ReActiveModalWithoutPassword>
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
    if (form.isValid()) {
      open();
      const datarspassword = await AuthService.passwordRecovery(dataSubmit);
      if (datarspassword === "Tài khoản chưa được kích hoạt !") {
        openFormWithoutPassWord(dataSubmit.username);
      } else if (datarspassword === "Người dùng không tồn tại !") {
        router.push("/register");
        modals.closeAll();
        close();
      } else {
        close();
        console.log(datarspassword);
        openFormRsPassword(dataSubmit.username);
      }
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
            Nhập email bạn đã sử dụng khi đăng ký tài khoản để lấy lại
            mật khẩu. Bạn sẽ nhận được mail để nhận mã khôi phục  mật khẩu
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
          {...form.getInputProps("username")}
        />
        <div>
          <button className={style.button}>Gửi mã xác thực</button>
        </div>
      </Container>
    </Box>
  );
};

export default PasswordRecoveryModal;
