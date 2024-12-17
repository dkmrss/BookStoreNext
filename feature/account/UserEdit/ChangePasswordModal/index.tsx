import AuthService from "@/api/login/auth.service";
import { UpdatePassword } from "@/model/AuthService";
import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";

const ChangePasswordModal = () => {
  const data = {
    passOld: "",
    passNew: "",
    rePassNew: "",
  };

  const [visible, { toggle, close, open }] = useDisclosure(false);

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: { ...data },
    validate: {
      passNew: (value, values) => {
        if (value.length < 8) {
          return "Mật khẩu phải nhiều hơn 8 ký tự";
        }
        if (value === values.passOld) {
          return "Mật khẩu mới không được trùng với mật khẩu cũ";
        }
        // if (!/[A-Z]/.test(value)) {
        //   return "Mật khẩu phải chứa ít nhất 1 chữ in hoa";
        // }
        // if (!/[0-9]/.test(value)) {
        //   return "Mật khẩu phải chứa ít nhất 1 chữ số";
        // }
        // if (!/[!@#$%^&*]/.test(value)) {
        //   return "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt";
        // }
        return null;
      },
      rePassNew: (value, values) => {
        if (value !== values.passNew) {
          return "Mật khẩu xác nhận không khớp";
        }
        return null;
      },
    },
  });

  const handleSubmit = async (dataSubmit: UpdatePassword) => {
    open();
    await AuthService.callApiUpdatePassword(dataSubmit, clearForm);
    close();
  };
  const clearForm = () => {
    form.reset();
    modals.closeAll();
  };

  const formChangePassword = (
    <>
      <Box
        className={"modal"}
        component="form"
        w={{ base: 250, sm: 300, lg: 410 }}
        h="auto"
        mx="auto"
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <LoadingOverlay
          visible={false}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Group grow wrap="nowrap" mt={{ base: 2, sm: 4, lg: 6 }} gap={"lg"}>
          <PasswordInput
            label={"Mật khẩu cũ"}
            placeholder={"Nhập mật khẩu"}
            withAsterisk
            mt="md"
            type="password"
            {...form.getInputProps("passOld")}
          />
        </Group>
        <Group grow wrap="nowrap" mt={{ base: 4, sm: 6, lg: 8 }} gap={"lg"}>
          <PasswordInput
            label={"Mật khẩu mới"}
            placeholder={"Nhập mật khẩu"}
            mt="md"
            type="password"
            withAsterisk
            {...form.getInputProps("passNew")}
          />
        </Group>
        <Group grow wrap="nowrap" mt={{ base: 4, sm: 6, lg: 8 }} gap={"lg"}>
          <PasswordInput
            label={"Nhập lại mật khẩu mới"}
            placeholder={"Nhập mật khẩu"}
            mt="md"
            type="password"
            withAsterisk
            {...form.getInputProps("rePassNew")}
          />
        </Group>

        <Group justify="flex-end" mt={{ base: 10, sm: 12, lg: 16 }}>
          <Button
            type="submit"
            color="var(--clr-primary)"
            loading={visible}
            w={"100%"}
          >
            Xác nhận
          </Button>
        </Group>
      </Box>
    </>
  );

  return <>{formChangePassword}</>;
};

export default ChangePasswordModal;
