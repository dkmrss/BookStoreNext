"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Avatar, Space, Typography, Row, Col, message } from "antd";
import { Button } from "@mantine/core";
import { MailOutlined, PhoneOutlined, HomeOutlined, CalendarOutlined } from "@ant-design/icons";
import Link from "next/link";
import moment from "moment";
import { getDataUser } from "@/api/ApiUser";
import ArticleCarousel from "@/common/carouselArticle";
import style from "./UserInformation.module.scss"
import { getDataListNews } from "@/api/apiNew";
import { IconDashboard } from "@tabler/icons-react";
const { Title, Text } = Typography;

const UserInformation: React.FC = () => {
  const router = useRouter();
  const [dataUser, setDataUser] = useState<any>();
  const [dataArticleBanner, setDataArticleBanner] = useState<any[]>();
  const [loading, setLoading] = useState(false);
  const [loadingBanner, setLoadingBanner] = useState(false);

  const callApiGetDataForBanner = async () => {
    setLoadingBanner(true);
    const fetchData = async () => {
      const data = await getDataListNews(
        "?field=status&value=0&skip=0&take=4"
      );
      setDataArticleBanner(data.data);
      setLoadingBanner(false);
    };
    fetchData();
  };

  const isAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    try {
      if (token && user) {
        const parsedUser = JSON.parse(user);
        return !!parsedUser;
      }
      return false;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return false;
    }
  };

  const callApiGetDetailUser = async () => {
    setLoading(true);
    try {
      const user = localStorage.getItem("user");
      const userID = user ? JSON.parse(user).id : null;
      if (!userID) throw new Error("Invalid user ID");

      // Fetch user data from your API
      const response = await getDataUser(`/${userID}`);
      setDataUser(response.data);
    } catch (error) {
      message.error("Lỗi khi lấy thông tin người dùng.");
    } finally {
      setLoading(false);
    }
  };

 

  useEffect(() => {
    if (isAuthenticated()) {
      callApiGetDataForBanner();
      callApiGetDetailUser();
    } else {
      router.push("/");
    }
  }, []);

  if (loading || !dataUser) return <Text>Đang tải...</Text>;

  return (
    <div style={{ padding: "20px" }}>
      <Card bordered style={{ marginBottom: "20px", textAlign: "center" }}>
        <Avatar
          src={`${process.env.NEXT_PUBLIC_URL || "http://localhost:3001"}/${dataUser.avatar}`}
          size={100}
        />
        <Title level={4} style={{ marginTop: "10px" }}>
          {dataUser.name || "Người dùng"}
        </Title>
        <Text type="secondary">{dataUser.email}</Text>
      </Card>

      <Card bordered style={{ marginBottom: "20px" }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div>
            <CalendarOutlined style={{ marginRight: "10px", color: "#1890ff" }} />
            Ngày tham gia:{" "}
            <strong>{moment(dataUser.created_at).format("DD/MM/YYYY") || "Không rõ"}</strong>
          </div>
          <div>
            <MailOutlined style={{ marginRight: "10px", color: "#1890ff" }} />
            Email: <strong>{dataUser.email || "Không rõ"}</strong>
          </div>
          <div>
            <PhoneOutlined style={{ marginRight: "10px", color: "#1890ff" }} />
            Số điện thoại: <strong>{dataUser.phone || "Không rõ"}</strong>
          </div>
          <div>
            <HomeOutlined style={{ marginRight: "10px", color: "#1890ff" }} />
            Địa chỉ: <strong>{dataUser.address || "Không rõ"}</strong>
          </div>
        </Space>
      </Card>

      {dataUser.role === 1 && (
        <Card bordered style={{ marginBottom: "20px" }}>
          {/* <Button type="primary" block>
            <Link href="/admin/StatisticsDashboard">Đi đến trang quản lý</Link>
          </Button> */}
          <Button
          leftSection={<IconDashboard />}
          color="var(--clr-bright-primary)"
          className={style.addToCartButton}
          component={Link} href="/admin/StatisticsDashboard"
        >
         Đi đến trang quản lý
        </Button>     
        </Card>
      )}

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Card title="Chỉnh sửa thông tin" hoverable>
            <Button color="var(--clr-bright-primary)" component={Link} href="/account/user-edit">
              Xem chi tiết
            </Button>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card title="Đơn hàng của bạn" hoverable>
            <Button color="var(--clr-bright-primary)" component={Link} href="/account/purchase-history">
              Xem chi tiết
            </Button>
          </Card>
        </Col>
      </Row>
      <Title >
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
    </div>
  );
};

export default UserInformation;
