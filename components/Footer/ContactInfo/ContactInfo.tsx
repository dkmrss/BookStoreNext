"use client";

import { Box, Flex, Grid } from "@mantine/core";
import style from "./ContactInfo.module.scss";
import InfoCard from "./InfoCard";
import ZaloPay from "@/assets/zaloPay.png";
import AloPay from "@/assets/aleGo.png";
import Mastercard from "@/assets/masterCard.png";
import Momo from "@/assets/momo.png";
import Visa from "@/assets/visa.png";
import Vnpay from "@/assets/vnpay.png";
import Atm from "@/assets/atm.png";

const ContactInfo = () => {
  const infoData = [
    {
      title: "thông tin công ty",
      info: [
        "Giới thiệu công ty",
        "Tin tức công nghệ",
        "Tin tức tuyển dụng",
        "Thông tin liên hệ",
      ],
    },
    {
      title: "hỗ trợ khách hàng",
      info: [
        "Hướng dẫn mua hàng online",
        "Chính sách trả góp",
        "Yêu cầu báo giá",
        "Xây dựng cấu hình",
      ],
    },
    {
      title: "chính sách chung",
      info: [
        "Chính sách bảo mật",
        "Chính sách đối trả",
        "Chính sách vận chuyển",
        "Chính sách bảo mật thông tin",
      ],
    },
    {
      title: "thông tin khác",
      info: [
        "Tổng đài hỗ trợ miễn phí",
        "1800 8091 (8:30 - 19:00)",
      ],
    },
    {
      title: "phương thức thanh toán",
      info: [],
      images: [Mastercard, Visa, Vnpay, Atm],
    },
  ];
  return (
    <>
      <Box className={style.infoContainer}>
        <Grid gutter={0}>
          {infoData.map((item, index) => (
            <Grid.Col
              key={index}
              span={{
                base: 6,
                xs: 6,
                sm: 6,
                md: 4,
                lg: 3,
                xl: 12 / infoData.length,
              }}
              my={"5px"}
            >
              <InfoCard
                title={item.title}
                info={item.info}
                images={item.images}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ContactInfo;
