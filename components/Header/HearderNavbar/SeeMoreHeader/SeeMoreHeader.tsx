import { Box, Flex, Image, List, Text } from "@mantine/core";
import {
  IconBuildingWarehouse,
  IconShieldFilled,
  IconTruckDelivery,
} from "@tabler/icons-react";
import Link from "next/link";
import style from "./SeeMoreHeader.module.scss";
const SeeMoreHeader = () => {
  const image = [
    {
      iamges:
        "https://image.dienthoaivui.com.vn/35x35,webp,q/https://dashboard.dienthoaivui.com.vn/uploads/dashboard/social/facebook-rounded.png",
    },
    {
      iamges:
        "https://image.dienthoaivui.com.vn/35x35,webp,q/https://dashboard.dienthoaivui.com.vn/uploads/dashboard/social/insta-rounded.png",
    },
    {
      iamges:
        "https://image.dienthoaivui.com.vn/35x35,webp,q/https://dashboard.dienthoaivui.com.vn/uploads/dashboard/social/tiktok-rounded.png",
    },
    {
      iamges:
        "https://image.dienthoaivui.com.vn/35x35,webp,q/https://dashboard.dienthoaivui.com.vn/uploads/dashboard/social/zalo-rounded.png",
    },
  ];

  return (
    <Box className={style.container}>
      <Box>
        <Flex gap={10}>
          <Box pt={8} pb={8} pl={6} pr={6} className={style.box}>
            <Flex align="center" justify={"center"} gap={10}>
              <IconBuildingWarehouse
                height={40}
                width={40}
                color="var(--clr-primary)"
                style={{ color: "var(--clr-primary)" }}
              />
              <Text w={"100%"} fw={700} size="xs">
                Hệ thống <br /> 2 cửa hàng
              </Text>
            </Flex>
          </Box>
          <Box pt={8} pb={8} pl={6} pr={6} className={style.box}>
            <Flex align="center" justify={"center"} gap={10}>
              <IconShieldFilled
                height={40}
                width={40}
                color="var(--clr-primary)"
                style={{ color: "var(--clr-primary)" }}
              />
              <Text w={"100%"} fw={700} size="xs">
                Tra cứu <br /> bảo hành
              </Text>
            </Flex>
          </Box>
          <Box pt={8} pb={8} pl={6} pr={6} className={style.box}>
            <Link
              href={"/OrderCheck"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Flex align="center" justify={"center"} gap={10}>
                <IconTruckDelivery
                  height={40}
                  width={40}
                  color="var(--clr-primary)"
                  style={{ color: "var(--clr-primary)" }}
                />
                <Text w={"100%"} fw={700} size="xs">
                  Tra cứu <br /> Đơn hàng
                </Text>
              </Flex>
            </Link>
          </Box>
        </Flex>
      </Box>
      <Box mt={10}>
        <Text mb={5} fw={700} size="sm">
          Thông tin liên hệ miễn phí
        </Text>
        <List pl={10}>
          <List.Item>
            <Text className={`${style.text} ${style.dash}`}>
              Tư vấn sửa chữa:{" "}
              <Text span fw={700} inherit>
                1800.8091
              </Text>
            </Text>
          </List.Item>
          <List.Item>
            <Text className={`${style.text} ${style.dash}`}>
              khiếu nại góp ý:{" "}
              <Text span fw={700} inherit>
                1800.8091
              </Text>
            </Text>
          </List.Item>
        </List>
      </Box>
      {/* <Text mb={5} fw={700} tt="uppercase">
        Website thành viên
      </Text>
      <Flex mb={5} direction="column">
        <Text mb={3} size="xs" className={style.text}>
          Hệ thống bán lẻ di động toàn quốc
        </Text>
        <Link href={"/"}>
          <Image2
            width={140}
            height={34}
            src={Logo}
            alt="logo"
            style={{ borderRadius: "5px" }}
          />
        </Link>
      </Flex>
      <Flex mb={5} direction="column">
        <Text mb={3} size="xs" className={style.text}>
          {" "}
          Kênh thông tin giải trí công nghệ cho giới trẻ.{" "}
        </Text>
        <Link href={"/"}>
          <Image2
            width={140}
            height={34}
            src={Logo}
            alt="logo"
            style={{ borderRadius: "5px" }}
          />
        </Link>
      </Flex>
      <Flex mb={5} direction="column">
        <Text mb={3} size="xs" className={style.text}>
          {" "}
          Trang thông tin công nghệ mới nhất.{" "}
        </Text>
        <Link href={"/"}>
          <Image2
            width={140}
            height={34}
            src={Logo}
            alt="logo"
            style={{ borderRadius: "5px" }}
          />
        </Link>
      </Flex> */}
      <Text c="#747474" my={5} fw={700} tt="uppercase">
        Kết nối
      </Text>
      <Flex gap={10} mb={10}>
        {image.map((value, index) => (
          <Image src={value.iamges} key={index} alt="picture" />
        ))}
      </Flex>
    </Box>
  );
};

export default SeeMoreHeader;
