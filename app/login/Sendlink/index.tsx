"use client";
import icon7 from "@/assets/icon_7.png";
import AppContainer from "@/common/AppContainer";
// import CommonIcon from "@/common/Propsicon";
import { Box, Button, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import style from "./Sendlink.module.scss";

const HomeFooterIconCard1 = () => {
  const iconCards = [{ icon: icon7, title: "", hightlight: "" }];
  const [visible, { toggle, close, open }] = useDisclosure(false);
  
  return (
    <AppContainer>
      <Box className={style.Boxone} component="form">
        <LoadingOverlay
          visible={visible}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <div
          style={{
            marginTop: "-25px",
          }}
        >
          {/* <CommonIcon
            iconCards={iconCards}
            widthCard={"100%"}
            heightCard={80}
          /> */}
          <h2 style={{ textAlign: "center" }}>
            Bạn có cần chúng tôi gửi lại liên kết không?{" "}
          </h2>
          <span
            style={{
              fontSize: "14px",
              color: "#787878",
              margin: "auto",
              display: "block",
              textAlign: "center",
            }}
          >
            <text>
              Vui lòng đợi 40 giây để chờ  được gửi đến trước khi
            </text>
            <br />
            yêu cầu gửi lại liên kết khác
          </span>
          <>
            <Button
              className={style.title} //null class
              style={{
                //class thay thế
                width: "206px",
                height: "42px",
              }}
            >
              Gửi lại liên kết
            </Button>
          </>
        </div>
      </Box>
    </AppContainer>
  );
};

export default HomeFooterIconCard1;
