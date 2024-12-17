"use client";
import { getListArticle } from "@/api/apiArticle";
import logo from "@/assets/dichvutot-01-01.png";
import ArticleCard from "@/common/ArticleCard/Card";
import { DataArticle } from "@/model/DataArticle";
import { Carousel } from "@mantine/carousel";
import {
  Box,
  Center,
  Flex,
  Grid,
  Image,
  Paper,
  Text,
  Title,
  em,
} from "@mantine/core";
import { useMediaQuery, useViewportSize } from "@mantine/hooks";
import {
  IconCalendarMonth,
  IconChevronLeft,
  IconChevronRight,
  IconDiscount,
  IconPremiumRights,
  IconTrophy,
  IconTruck,
} from "@tabler/icons-react";
import Autoplay from "embla-carousel-autoplay";
import moment from "moment";
import NextImage from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import style from "./UserInformation.module.scss";
import ArticleCarousel from "@/common/carouselArticle";
import { getMembershipCard } from "@/api/apiMembershipCard";
import { MembershipCard } from "@/model/TblMembershipCard";

const UserInformation = () => {
  const sale = [
    {
      id: 1,
      image:
        "https://dashboard.dienthoaivui.com.vn/uploads/wp-content/uploads/images/16b96275e90b52fc6d7c6278e3fba890.png",
      content: "Màn Hình GX - Giảm đến 60%",
      link: "#",
    },
    {
      id: 2,
      image:
        "https://dashboard.dienthoaivui.com.vn/uploads/wp-content/uploads/images/7ed6cfd564595a2fb081a4a7295f3b14.png",
      content: "Pin chính hãng Orizin - Giảm đến 46%",
      link: "#",
    },
    {
      id: 3,
      image:
        "https://dashboard.dienthoaivui.com.vn/uploads/wp-content/uploads/images/bc3734fd7d9e069ca09e13f24848abbd.png",
      content: "Pin chính hãng Vmas - Giảm đến 50%",
      link: "#",
    },
    {
      id: 4,
      image:
        "https://dashboard.dienthoaivui.com.vn/uploads/wp-content/uploads/images/7528708c17dc818c93b963f4e6971884.png",
      content: "Pin chính hãng Pisen - Giảm đến 48%",
      link: "#",
    },
    {
      id: 5,
      image:
        "https://dashboard.dienthoaivui.com.vn/uploads/wp-content/uploads/images/4b6142c68eaa6154b7e593d70221bcd8.png",
      content: "Thay màn hình Gen A | A+ - Giảm đến 35%",
      link: "#",
    },
  ];

  const userInfo = useSelector((state: any) => state.auth.userInfo);
  const [news, setNews] = useState<DataArticle[]>();
  const [dataMemberCard, setDataMemberCard] = useState<MembershipCard>();
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const isMobile = useMediaQuery(`(max-width: ${em(800)})`);

  const getRankDisplayName = (rank: number) => {
    switch (rank) {
      case 2:
        return "Silver";
      case 3:
        return "Gold";
      case 4:
        return "Platinum";
      case 5:
        return "Diamond";
      default:
        return "Chưa có";
    }
  };

  const handleFetchDataMembershipCard = async () => {
    const userData = localStorage.getItem("userInfo");
    const id = userData ? JSON.parse(userData).data.customerId : 0;
    const callApi = await getMembershipCard(`customerId=${id}`);
    setDataMemberCard(callApi);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getListArticle("Status=1&Take=8");
      setNews(data?.data);
    };
    fetchData();
    handleFetchDataMembershipCard();
  }, []);

  return (
    <Box
      className={style.userInformation}
      // maw={920}
      // w={isMobile ? width : width - 270}
    >
      <div className={style.topBox}>
        <div className={style.leftTopBox}>
          <Box
            p={"33px 15px"}
            bd={"1px solid var(--clr-border-gray)"}
            style={{ borderRadius: "10px", height: "100%" }}
          >
            <Flex
              justify={"center"}
              style={{ flexDirection: "column" }}
              align={"center"}
              gap={8}
            >
              {/* <Image
                component={NextImage}
                src={logo}
                alt="logo"
                w={175}
                h={50}
                style={{ borderRadius: "10px" }}
              /> */}
              <Text size="1.8rem" fw={700}>
                Xin chào!
              </Text>
              <Title order={4} c={"var(--clr-primary)"}>
                {userInfo?.data?.customerName ||
                  userInfo?.data?.userName ||
                  userInfo?.data?.email}
              </Title>
            </Flex>
            <Flex justify={"center"} gap={50} mt={10}>
              <Box className={style.moreInfor}>
                <Text size="14px">Ngày tham gia</Text>
                <IconCalendarMonth color="var(--clr-primary)" size={50} />
                <Text size="14px">
                  {moment(userInfo?.data?.creationDate).format("DD/MM/YYYY")}
                </Text>
              </Box>
              <Box className={style.moreInfor}>
                <Text size="14px">Hạng thành viên</Text>
                <IconTrophy color="var(--clr-primary)" size={50} />
                <Text size="14px">
                  {getRankDisplayName(dataMemberCard?.rankid || 0)}
                </Text>
              </Box>
              <Box className={style.moreInfor}>
                <Text size="14px">Điểm tích lũy</Text>
                <IconPremiumRights color="var(--clr-primary)" size={50} />
                <Text size="14px">{dataMemberCard?.exchangepoint || 0}</Text>
              </Box>
            </Flex>
          </Box>
        </div>
        <div className={style.rightTopBox}>
          <Center>
            <Title
              order={4}
              c={"#fff"}
              bg={"var(--clr-primary)"}
              p={"3px 6px"}
              style={{ borderRadius: "5px" }}
            >
              CHƯƠNG TRÌNH NỔI BẬT
            </Title>
          </Center>
          <div className={style.carouselBox}>
            <Carousel
              loop
              withIndicators={false}
              withControls
              plugins={[autoplay.current]}
              onMouseEnter={autoplay.current.stop}
              onMouseLeave={autoplay.current.reset}
              mt={10}
            >
              {sale?.map((item, index) => (
                <Carousel.Slide key={index} className={style.itemCarousel}>
                  <Link href={item?.link} className={style.link}>
                    <Box>
                      <img
                        style={{
                          objectFit: "fill",
                          width: "100%",
                          height: "inherit",
                        }}
                        src={item?.image}
                        alt="Ưu đãi"
                      />
                      <Center>
                        <Text c={"var(--clr-primary)"} fw={650} ta={"center"}>
                          {item?.content}
                        </Text>
                      </Center>
                    </Box>
                  </Link>
                </Carousel.Slide>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
      <Grid gutter={0}>
        {/* <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <Box className={style.option} bg={"#FEF5F0"}>
            <IconDiscount color="var(--clr-primary)" size={60} />
            <Text c={"var(--clr-primary)"} size="20px">
              Ưu đãi của bạn
            </Text>
            <Text>Ưu đãi</Text>
            <Paper shadow="xs" radius={10}>
              <Link href={"#"} className={style.link}>
                <Text className={style.showDetail}>Xem chi tiết</Text>
              </Link>
            </Paper>
          </Box>
        </Grid.Col> */}
        <Grid.Col
          span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 6 }}
          pr={{ xs: "0px", sm: "8px", md: "8px", lg: "8px" }}
        >
          <Box className={style.option} bg={"#EDF1FD"}>
            <IconTruck color="var(--clr-primary)" size={60} />
            <Text c={"var(--clr-primary)"} size="20px">
              Đơn hàng của bạn
            </Text>
            <Text>Đơn hàng</Text>
            <Paper shadow="xs" radius={10}>
              <Link href={"/account/purchase-history"} className={style.link}>
                <Text className={style.showDetail}>Xem chi tiết</Text>
              </Link>
            </Paper>
          </Box>
        </Grid.Col>
        <Grid.Col
          span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 6 }}
          pl={{ xs: "0px", sm: "8px", md: "8px", lg: "8px" }}
          mt={{ base: "10px", sm: "0px", md: "0px", lg: "0px" }}
        >
          <Box className={style.option} bg={"#F1F8FE"}>
            <IconTrophy color="var(--clr-primary)" size={60} />
            <Text c={"var(--clr-primary)"} size="20px">
              Hạng thành viên
            </Text>
            <Text>{getRankDisplayName(dataMemberCard?.rankid || 0)}</Text>
            <Paper shadow="xs" radius={10}>
              <Link href={"/account/rank-member"} className={style.link}>
                <Text className={style.showDetail}>Xem chi tiết</Text>
              </Link>
            </Paper>
          </Box>
        </Grid.Col>
      </Grid>
      <Title order={5} mt={20} mb={20}>
        Tin tức khuyến mãi
      </Title>
      <div className={style.articleCarousel}>
        <ArticleCarousel
          data={news}
          type="carousel-col"
          auto
          typeSlide="colSlide"
        />
      </div>
    </Box>
  );
};

export default UserInformation;
