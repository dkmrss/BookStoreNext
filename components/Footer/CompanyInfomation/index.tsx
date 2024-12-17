import { Box, Flex, Text } from "@mantine/core";
import Image from "next/image";
import FacebookLogo from "@/assets/FaceBookIcon.png";
import InstagramLogo from "@/assets/instagram.png";
import YouTubeLogo from "@/assets/youtubeIcon.png";
import Verify from "@/assets/logo-da-thong-bao-bo-cong-thuong.png";
import style from "./CompanyInfomation.module.scss";

const CompanyInfo = () => {
  return (
    <Box className={style.companyInfo}>
      <Flex w={"100%"} direction={"column"} gap={2}>
        <Text size="xs">@ 2024 Hệ thống chuỗi shop bán sách</Text>
        <Text size="xs">
          Thành phố Hà Nội
        </Text>
       
       
        <Text size="xs">Email: info@book.vn. Điện thoại: 1800 0000</Text>
      </Flex>
      <Flex
        w={"100%"}
        direction={"row"}
        align={"center"}
        justify={"center"}
        gap={2}
      >
        <Image width={35} src={FacebookLogo} alt="Facebook"></Image>
        <Image width={45} src={InstagramLogo} alt="Instagram"></Image>
        <Image width={35} src={YouTubeLogo} alt="Youtube"></Image>
       
      </Flex>
    </Box>
  );
};

export default CompanyInfo;
