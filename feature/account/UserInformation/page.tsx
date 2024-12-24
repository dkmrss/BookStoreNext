"use client";
import { getDataListNews } from "@/api/apiNew";
import { getDataUser } from "@/api/ApiUser";
import ArticleCarousel from "@/common/carouselArticle";
import { Article } from "@/model/DataArticle";
import { User } from "@/model/User";
import {
  Box,
  Flex,
  Grid,
  Image,
  Paper,
  Text,
  Title
} from "@mantine/core";
import {
  IconCalendarMonth,
  IconHome,
  IconMail,
  IconPhone,
  IconTruck,
  IconUserCheck
} from "@tabler/icons-react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./UserInformation.module.scss";
const UserInformation = () => {
  const router = useRouter();
  
  const [dataArticleBanner, setDataArticleBanner] = useState<Article[]>();
  const [dataUser, setDataUser] = useState<User>();
  const [loadingBanner, setLoadingBanner] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  
  const isAuthenticated = (): boolean => {
    try {
      const token = localStorage.getItem("token");
      return !!token; // Trả về true nếu token tồn tại và không rỗng
    } catch (error) {
      console.error("Error checking authentication:", error);
      return false; // Trả về false nếu có lỗi
    }
  };

  const callApiGetDataForBanner = async () => {
    setLoadingBanner(true);
    const fetchData = async () => {
      const data = await getDataListNews(
        `?field=status&value=0&skip=0&take=4`
      );
      setDataArticleBanner(data.data);
      setLoadingBanner(false);
    };
    fetchData();
  };

  const callApiGetDetailUser= async () => {
    setLoadingUser(true);
    const user = localStorage.getItem("user"); // Lấy thông tin từ localStorage
    const userID = user ? JSON.parse(user).id : null; // Lấy id từ dữ liệu JSON
    const fetchData = async () => {
      const data = await getDataUser(
        `/${userID}`
      );
      setDataUser(data.data);
      setLoadingUser(false);
    };
    fetchData();
  };
  useEffect(() => {
    if (isAuthenticated()) {
      // Nếu đã xác thực, gọi API lấy dữ liệu
      callApiGetDataForBanner();
      callApiGetDetailUser();
    } else {
      // Nếu chưa xác thực, chuyển hướng về trang chủ
      router.push("/");
    }
  }, []);

  
  return (
    <Box
      className={style.userInformation}
    >
      <div className={style.topBox}>
        <div className={style.leftTopBox}>
          {/* <Box
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
              <Image
                src={`http://localhost:3001/${dataUser?.avatar}`}
                alt="logo"
                w={175}
                h={175}
                style={{ borderRadius: "10px" }}
              />
              <Text size="1.8rem" fw={700}>
                Xin chào!
              </Text>
              <Title order={4} c={"var(--clr-primary)"}>
                {dataUser?.name}
              </Title>
            </Flex>
            <Flex justify={"center"} gap={50} mt={10}>
              <Box className={style.moreInfor}>
                <Text size="14px">Ngày tham gia</Text>
                <IconCalendarMonth color="var(--clr-primary)" size={50} />
                <Text size="14px">
                  {moment(dataUser?.created_at).format("DD/MM/YYYY")}
                </Text>
              </Box>
              
             
            </Flex>
          </Box> */}
           <Box
      p="33px 15px"
      style={{
        border: "1px solid var(--clr-border-gray)",
        borderRadius: "10px",
        height: "100%",
      }}
    >
      {/* Phần hình đại diện và tên người dùng */}
      <Flex
        justify="center"
        style={{ flexDirection: "column" }}
        align="center"
        gap={8}
      >
        <Image
          src={`http://localhost:3001/${dataUser?.avatar}`} // Avatar mặc định nếu không có
          alt="User Avatar"
    className={style.avt}
          style={{ borderRadius: "50%" }}
        />
        <Text size="1.8rem" fw={700}>
          Xin chào!
        </Text>
        <Title order={4} c="var(--clr-primary)">
          {dataUser?.name || "Người dùng"}
        </Title>
      </Flex>

      {/* Phần thông tin chi tiết */}
      <Flex justify="space-between" direction="column" mt={20} gap={20}>
        {/* Ngày tham gia */}
        <Flex align="center" gap={10}>
          <IconCalendarMonth color="var(--clr-primary)" size={30} />
          <Text size="14px">
            Ngày tham gia:{" "}
            <strong>
              {moment(dataUser?.created_at).format("DD/MM/YYYY") || "Không rõ"}
            </strong>
          </Text>
        </Flex>

        {/* Email */}
        <Flex align="center" gap={10}>
          <IconMail color="var(--clr-primary)" size={30} />
          <Text size="14px">
            Email: <strong>{dataUser?.email || "Không rõ"}</strong>
          </Text>
        </Flex>

        {/* Số điện thoại */}
        <Flex align="center" gap={10}>
          <IconPhone color="var(--clr-primary)" size={30} />
          <Text size="14px">
            Số điện thoại: <strong>{dataUser?.phone || "Không rõ"}</strong>
          </Text>
        </Flex>

        {/* Địa chỉ */}
        <Flex align="center" gap={10}>
          <IconHome color="var(--clr-primary)" size={30} />
          <Text size="14px">
            Địa chỉ: <strong>{dataUser?.address || "Không rõ"}</strong>
          </Text>
        </Flex>

        {/* Trạng thái tài khoản */}

      </Flex>

      
      
    </Box>
        </div>
        
      </div>
      <Grid gutter={0}>
        
        <Grid.Col
          span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 6 }}
          pr={{ xs: "0px", sm: "8px", md: "8px", lg: "8px" }}
        >
          <Box className={style.option} bg={"#EDF1FD"}>
            <IconUserCheck color="var(--clr-primary)" size={60} />
            <Text c={"var(--clr-primary)"} size="20px">
              Chỉnh sửa thông tin
            </Text>
            <Paper shadow="xs" radius={10}>
              <Link href={"/account/user-edit"} className={style.link}>
                <Text className={style.showDetail}>Xem chi tiết</Text>
              </Link>
            </Paper>
          </Box>
        </Grid.Col>
        <Grid.Col
          span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 6 }}
          pr={{ xs: "0px", sm: "8px", md: "8px", lg: "8px" }}
        >
          <Box className={style.option} bg={"#EDF1FD"}>
            <IconTruck color="var(--clr-primary)" size={60} />
            <Text c={"var(--clr-primary)"} size="20px">
              Đơn hàng của bạn
            </Text>
            <Paper shadow="xs" radius={10}>
              <Link href={"/account/purchase-history"} className={style.link}>
                <Text className={style.showDetail}>Xem chi tiết</Text>
              </Link>
            </Paper>
          </Box>
        </Grid.Col>
      </Grid>
      <Title order={5} mt={20} mb={20}>
        Tin tức 
      </Title>
      <div className={style.articleCarousel}>
        <ArticleCarousel
          data={dataArticleBanner}
          type="carousel-col"
          auto
          typeSlide="colSlide"
        />
      </div>
    </Box>
  );
};

export default UserInformation;
