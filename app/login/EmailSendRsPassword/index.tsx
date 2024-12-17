"use client";
import AuthService from "@/api/login/auth.service";
import HomeFooterIconCard1 from "@/app/login/Sendlink/index";
import email from "@/assets/icon_8.png";
import AppContainer from "@/common/AppContainer";
import { NotificationExtension } from "@/extension/NotificationExtension";
import { isNullOrUndefined } from "@/extension/StringExtension";
import {
  Box,
  Group,
  LoadingOverlay,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import Image from "next/image";
import { useState } from "react";
import style from "./rsPassword.module.scss";

const EmailSendRsPassword = ({ userName }: { userName: string }) => {
  const [recoverCode, setRecoverCode] = useState("");
  const [newPass, setNewPass] = useState("");
  const [visible, { toggle, close, open }] = useDisclosure(false);
  const [focused, setFocused] = useState(false);
  const floating = newPass
    ? focused || newPass.length > 0
    : recoverCode.length > 0 || undefined;

  const handleKeyDown = async (e: any) => {
    if (e.key === "Enter") {
      if (recoverCode.trim() !== "") {
        // Kiểm tra nếu nhấn Enter và input không rỗng
        open();
        const response = await AuthService.recoveryPass({
          userName: userName,
          code: recoverCode.trim(),
        });
        if (isNullOrUndefined(response) && isNullOrUndefined(response.data)) {
          NotificationExtension.Warn("Có lỗi xảy ra vui lòng thử lại");
        } else setNewPass(response.data);
        close();
      } else NotificationExtension.Warn("Bạn chưa nhập mã khôi phục");
    }
  };

  const handleButtonClick = () => {
    // Giả lập sự kiện nhấn Enter
    const enterEvent = new KeyboardEvent("keydown", { key: "Enter" });
    handleKeyDown(enterEvent);
  };

  // useEffect(() => {
  //   setNewPass("");
  // }, []);

  return (
    <AppContainer>
      <Box className={style.Boxone}>
        <LoadingOverlay
          visible={visible}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <div className={style.flexBox}>
          <Image className={style.email} src={email} alt="" />
          <Title
            ta="center"
            className={style.title}
            style={{
              fontSize: "22px",
              marginBottom: "25px",
            }}
          >
            Chúng tôi đã gửi cho bạn một tin nhắn có mã khôi phục để
            <br />
            đặt lại mật khẩu của bạn
          </Title>
          <div className={style.inputRow}>
            <TextInput
              label={
                newPass ? "Mật khẩu mới của bạn:" : "Nhập mã khôi phục tại đây:"
              }
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
              value={newPass ? newPass : recoverCode}
              onChange={(e) => setRecoverCode(e.currentTarget.value)}
              onKeyDown={handleKeyDown}
            />
            <div>
              {newPass ? (
                <></>
              ) : (
                <button onClick={handleButtonClick} className={style.button}>
                  Gửi mã khôi phục
                </button>
              )}
            </div>
          </div>
        </div>
      </Box>
    </AppContainer>
  );
};
export default EmailSendRsPassword;
