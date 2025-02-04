import { Button, Flex, Loader, Text } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "@/assets/exbank.jpg";
import style from "./TransferForm.module.scss";
import { Image } from "antd";
import Image2 from "next/image";
interface FormPaymentProps {
  valueQr: string;
 
  handleCreateQrCode: any;
  showLoading: boolean;
}
const TransferForm = ({
  valueQr,
  
  handleCreateQrCode,
  showLoading,
}: FormPaymentProps) => {
  // const [showLoading, setShowLoading] = useState(true);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    let timer: any;
    if (valueQr) {
      timer = setTimeout(() => {
        setShowQR(true);
      }, 1000); // 10 giây
    } else {
      timer = setTimeout(() => {
        setShowQR(false);
      }, 10000); // 10 giây
    }
    return () => clearTimeout(timer);
  }, [valueQr]);

  return (
    <div className={style.main}>
      <div
        style={{
          height: "auto",
          margin: "0 auto",
          maxWidth: 64,
          width: "100%",
        }}
      ></div>
<Text mt={11} fs="italic" c={"#F43453"}>
      Quý Khách vui lòng không tắt trình duyệt cho đến khi nhận được thông báo
      kết quả giao dịch. Xin cảm ơn!
    </Text>
      

      <Flex mt={20} justify={"center"}>
        <div className={style.QRBox}>
          {showLoading === true && valueQr !== "" ? (
            <Image
            width={400}
            src={valueQr} // Hiển thị ảnh từ base64
            alt="Mã QR"
            />
          ) : (
            <div className={style.loader}>
              <Loader color="var( --clr-primary)" />
              <Text fw={700}>Vui lòng đợi một chút!</Text>
              <div>
              <p>Hiện QR lỗi, bạn có thể thử click vào nút để tạo lại QR</p>
              <Button
                type="button"
                variant="default"
                color="white"
                onClick={handleCreateQrCode}
                style={{
                  backgroundColor: "var(--clr-primary)",
                  borderRadius: 8,
                  marginTop: 12,
                }}
              >
                Tạo QR
              </Button>
            </div>
            </div>
          )}
         

          <p className={style.QRTitle}>
            Dùng ứng dụng ngân hàng quét mã QR code để chuyển khoản
          </p>

          {/* <Button
            type="button"
            variant="default"
            color="#C9C9C9"
            w={"100%"}
            style={{ backgroundColor: "#F0F0F0", borderRadius: 8 }}
          >
            Huỷ giao dịch
          </Button> */}

          <Text mt={10}>
            Hotline hỗ trợ:{" "}
            <Text span fw={700}>
              1800 8091
            </Text>
          </Text>

          <Button
            mt={10}
            radius={8}
            color="var( --clr-primary)"
            href="/"
            component={Link}
          >
            Xác nhận thanh toán thành công
          </Button>

          <Text mt={10}>
            Các ngân hàng hỗ trợ tiêu biểu 
            <Text mr={10}><a href={"https://vietqr.co/banks"} target="_blank" rel="noopener noreferrer">Xem thêm</a></Text>
            
          </Text>

          <Image2
            width={"600"}
            src={Logo} // Hiển thị ảnh từ base64
            alt="Mã QR"
            />
        </div>
      </Flex>
    </div>
  );
};

export default TransferForm;
