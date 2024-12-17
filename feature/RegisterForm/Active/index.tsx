import AuthService from "@/api/login/auth.service";
import { TextInput } from "@mantine/core";
import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import style from "./style.module.scss";
import { useRouter } from "next/navigation";

interface ReActiveModalProps {
  isOpen: boolean;
  phone: string; // Add email prop
}

const ActiveModal: React.FC<ReActiveModalProps> = ({ isOpen, phone }) => {
  const router = useRouter();
  const [opened, { close, open }] = useDisclosure(false);

  const [activeCode, setActiveCode] = useState("");
  const [focused, setFocused] = useState(false);
  const floating = focused || activeCode.length > 0 || undefined;

  const handleSendActivationEmail = async () => {
    open();
    try {
      const response = await AuthService.activeUser(phone, activeCode);

      if (response?.httpStatusCode && response?.success) {
        router.push("/login");
      } else {
      }
    } catch (error) {}
    close();
  };

  return (
    <div>
      {isOpen && (
        <div className="modal">
          <div className={style.modalContent}>
            <h2 style={{ textAlign: "center" }}>
              Bạn hãy nhập mã đã được gửi đến số điện thoại dùng để đăng ký
            </h2>
            <p className={style.span}>Số điện thoại đã đăng ký: {phone}</p>
            <div className={style.comfirmBox}>
              <TextInput
                label="Mã kích hoạt"
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
                onChange={(e: any) => setActiveCode(e.target.value)}
              />
              <button
                className={style.button}
                onClick={handleSendActivationEmail}
              >
                Xác nhận{" "}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveModal;
