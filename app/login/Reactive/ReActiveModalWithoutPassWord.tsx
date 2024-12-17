import AuthService from "@/api/login/auth.service";
import { Center, Flex, Text, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import style from "./ReActiveModalWithoutPassWord.module.scss";

interface ReActiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  phone?: string;
}

const ReActiveModalWithoutPassword: React.FC<ReActiveModalProps> = ({
  isOpen,
  onClose,
  phone,
}) => {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [activeCode, setActiveCode] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleSendActivationEmail = async () => {
    setIsButtonDisabled(true);
    setCountdown(60); // Start the countdown from 60 seconds
    try {
      setError("");
      const response = await AuthService.reActivePass(username);
      if (response.httpStatusCode && response.success) {
        setError(
          "Gửi mã kích hoạt thành công , vui lòng kiểm tra tin nhắn của bạn"
        );
      } else {
        setError("Gửi mã kích hoạt thất bại vui lòng thử lại sau");
      }
    } catch (error) {
      setError("Failed to send activation email");
    } finally {
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(countdownInterval);
            setIsButtonDisabled(false);
          }
          return prev - 1;
        });
      }, 1000); // Decrease countdown every second
    }
  };

  const handleSendActiveCode = async () => {
    try {
      setError("");
      const response = await AuthService.activeUser(username, activeCode);
      if (response.httpStatusCode && response.success) {
        setError("Gửi mã kích hoạt thành công , vui lòng check hộp thư");
      } else {
        setError("Gửi mã kích hoạt thất bại vui lòng thử lại sau");
      }
    } catch (error) {
      setError("error");
    } finally {
    }
  };

  useEffect(() => {
    if (phone) {
      setUsername(phone);
    }
  }, [phone]);

  return (
    <div>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className={style.modalContent}>
              <h4>Bạn hãy nhập số điện thoại dùng để đăng ký</h4>

              <div className={style.comfirmBox}>
                <TextInput
                  type="number"
                  placeholder="Nhập số điện thoại"
                  classNames={{
                    root: style.root,
                    input: style.input,
                    label: style.label,
                  }}
                  value={username}
                  onChange={(e: any) => setUsername(e.target.value)}
                />
                <button
                  className={`${style.button1} ${
                    isButtonDisabled || username.length < 1
                      ? style.disabledButton
                      : ""
                  }`}
                  onClick={handleSendActivationEmail}
                  disabled={isButtonDisabled}
                >
                  {isButtonDisabled ? `${countdown} giây` : "Gửi mã"}
                </button>
              </div>
            </div>
            <div className={style.modalContent}>
              {/* <h4>Bạn hãy nhập mã kích hoạt vào đây</h4> */}

              <div className={style.comfirmBox}>
                <TextInput
                  label="Mã kích hoạt"
                  placeholder="nhập mã kích hoạt"
                  withAsterisk
                  classNames={{
                    root: style.root,
                    input: style.input,
                    label: style.label,
                  }}
                  value={activeCode}
                  onChange={(e: any) => setActiveCode(e.target.value)}
                />
                <button
                  className={`${style.button} ${
                    username.length < 1 ? style.disabledButton2 : ""
                  }`}
                  onClick={handleSendActiveCode}
                >
                  Kích hoạt
                </button>
              </div>
            </div>
            <Center m={"20px 0px"}>
              <Flex gap={"5px"}>
                <Text>Chưa nhận được mã kích hoạt? Nhấn lại vào nút</Text>
                <span className={style.signUp}>GỬI MÃ sau 60 giây</span>
              </Flex>
            </Center>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReActiveModalWithoutPassword;
