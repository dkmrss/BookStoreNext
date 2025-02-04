"use client";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Statistic, List, Tag, Spin } from "antd";
import { Bar, Column, Line } from "@ant-design/plots";
import { getMonthlyRevenue, getDailyRevenue, getTotalProductsSold, getOrderCountByStatus, getBestSellingBooks, getTopKeywords } from "@/api/APiStatistics";

const StatisticsDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [dailyRevenue, setDailyRevenue] = useState<number>(0);
  const [totalProductsSold, setTotalProductsSold] = useState<number>(0);
  const [orderStatusCounts, setOrderStatusCounts] = useState([]);
  const [bestSellingBooks, setBestSellingBooks] = useState([]);
  const [topKeywords, setTopKeywords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [monthlyRev, dailyRev, totalSold, orderStatus, bestBooks, keywords] = await Promise.all([
          getMonthlyRevenue(),
          getDailyRevenue(),
          getTotalProductsSold(),
          getOrderCountByStatus(),
          getBestSellingBooks(5),
          getTopKeywords(5),
        ]);

        setMonthlyRevenue(monthlyRev.data);
        setDailyRevenue(dailyRev.data?.revenue || 0);
        setTotalProductsSold(totalSold.data?.totalQuantitySold || 0);
        setOrderStatusCounts(orderStatus.data);
        setBestSellingBooks(bestBooks.data);
        setTopKeywords(keywords.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Spin size="large" style={{ display: "block", margin: "50px auto" }} />;

  return (
    <Row gutter={16}>
      {/* Doanh thu hôm nay
      <Col span={8}>
        <Card>
          <Statistic title="Doanh thu hôm nay" value={dailyRevenue} suffix="VND" />
        </Card>
      </Col> */}

      {/* Tổng số sản phẩm đã bán */}
      <Col span={8}>
        <Card>
          <Statistic title="Tổng sản phẩm đã bán" value={totalProductsSold} />
        </Card>
      </Col>

     

      {/* Số lượng đơn hàng theo trạng thái */}
      <Col span={24} style={{ marginTop: 20 }}>
  <Card title="Số lượng đơn hàng theo trạng thái">
    <Row gutter={[16, 16]}>
      {orderStatusCounts.map((item: any) => (
        <Col xs={24} sm={12} md={8} lg={6} key={item.delivered}>
          <Card 
            bordered={false} 
            style={{ 
              textAlign: "center",
              backgroundColor: item.delivered === 4 
                ? "#d4edda"  // Màu xanh lá cho "Khách hủy đơn"
                : item.delivered === 2 
                ? "#f8d7da"  // Màu đỏ cho "Đã hủy"
                : "#cce5ff", // Màu xanh cho các trạng thái khác
            }}
          >
            <Tag 
              color={item.delivered === 4 ? "green" : item.delivered === 2 ? "red" : "blue"} 
              style={{ fontSize: 16, padding: "5px 10px" }}
            >
              {["Đang xử lý", "Đang giao", "Đã hủy", "Đã giao", "Khách hủy đơn"][item.delivered]}
            </Tag>
            <Statistic value={item.orderCount} />
          </Card>
        </Col>
      ))}
    </Row>
  </Card>
</Col>

<Col span={24} style={{ marginTop: 20 }}>
  <Card title="Doanh thu hàng tháng">
    <Column
      data={monthlyRevenue}
      xField="month"      // Trục X là tháng
      yField="revenue"    // Trục Y là doanh thu
      seriesField="month"
      color="#1890ff"
    />
  </Card>
</Col>
      {/* Danh sách sách bán chạy */}
      <Col span={12} style={{ marginTop: 20 }}>
        <Card title="Top sách bán chạy">
          <List
            dataSource={bestSellingBooks}
            renderItem={(item: any) => (
              <List.Item>
                <b>{item.product_name}</b> - {item.totalSold} lượt bán
              </List.Item>
            )}
          />
        </Card>
      </Col>

      {/* Từ khóa tìm kiếm nhiều nhất */}
      <Col span={12} style={{ marginTop: 20 }}>
        <Card title="Từ khóa tìm kiếm phổ biến">
          <List
            dataSource={topKeywords}
            renderItem={(item: any) => (
              <List.Item>
                <Tag color="magenta">{item.keyword}</Tag> - {item.time_search} lần tìm kiếm
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default StatisticsDashboard;
