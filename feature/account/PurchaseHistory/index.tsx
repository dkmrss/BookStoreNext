"use client"
import React, { useEffect, useState } from "react";
import { Avatar, Card, Table, Pagination, Modal, Row, Col, Typography, Spin, Button, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { getOrders, cancelOrder } from "@/api/ApiPayment";
import ListItemDetail from "./ListItemDetail"; // Component for detailed modal
import style from "./PurchaseHistory.module.scss";

const { Title } = Typography;
const { confirm } = Modal;

const PurchaseHistory = () => {
  const [dataSaleOrder, setDataSaleOrder] = useState<any[]>([]);
  const [dataLength, setDataLength] = useState(0);
  const [dataTotalAmount, setDataTotalAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}"); // Fetch user from localStorage
  const itemsPerPage = 4;

  const fetchDataSaleOrder = async () => {
    if (!user.id) {
      console.error("User ID không tồn tại.");
      return;
    }

    const skip = (currentPage - 1) * itemsPerPage;
    const params = `?take=${itemsPerPage}&skip=${skip}&customer_id=${user.id}`;

    try {
      setLoading(true);
      const response = await getOrders(params);
      if (response?.success && response?.data) {
        setDataSaleOrder(response.data);
        setDataLength(response.totalCount);
        setTotalPages(Math.ceil(response.totalCount / itemsPerPage));

        // Calculate total amount
        const totalAmount = response.data.reduce(
          (acc: number, item: any) => acc + (item.total || 0),
          0
        );
        setDataTotalAmount(totalAmount);
      } else {
        console.log("Không có dữ liệu đơn hàng.");
        setDataSaleOrder([]);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API lấy danh sách đơn hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = (orderId: number) => {
    confirm({
      title: "Xác nhận hủy đơn hàng",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc chắn muốn hủy đơn hàng này không?",
      okText: "Hủy đơn",
      okType: "danger",
      cancelText: "Quay lại",
      onOk: async () => {
        try {
          const response = await cancelOrder(orderId, { status: "cancelled" });
          if (response.success) {
            message.success("Đơn hàng đã được hủy thành công.");
            fetchDataSaleOrder(); // Refresh danh sách đơn hàng
          } else {
            message.error(response.message || "Không thể hủy đơn hàng.");
          }
        } catch (error) {
          message.error("Lỗi khi hủy đơn hàng.");
          console.error(error);
        }
      },
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewOrderDetails = (orderId: number) => {
    setSelectedOrderId(orderId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedOrderId(null);
    setModalOpen(false);
  };

  useEffect(() => {
    fetchDataSaleOrder();
  }, [currentPage]);

  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Trạng thái",
      dataIndex: "delivered",
      key: "delivered",
      render: (status: number) =>
        status === 0
          ? "Đang xử lý"
          : status === 1
          ? "Đang giao"
          : status === 3 || status === 4
          ? "Đã hủy"
          : "Đã giao",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (total: number) =>
        `${total.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}`,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <>
          <Button type="link" onClick={() => handleViewOrderDetails(record.id)}>
            Xem chi tiết
          </Button>
          {record.delivered !== 2 && record.delivered !== 4 && (
            <Button type="link" danger onClick={() => handleCancelOrder(record.id)}>
              Hủy đơn
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <div className={style.purchaseHistory}>
      {/* User Information */}
      <Card className={style.userCard} bordered={false}>
        <Row align="middle" gutter={16}>
          <Col>
            <Avatar
              src={`${process.env.NEXT_PUBLIC_URL || "http://localhost:3001"}/${user.avatar}`}
              size={64}
            />
          </Col>
          <Col>
            <Title level={4}>{user.name || "Người dùng"}</Title>
          </Col>
        </Row>
      </Card>

      {/* Order Summary */}
      <Card className={style.orderSummary} bordered={false}>
        <Row gutter={16} justify="space-between">
          <Col span={12}>
            <Title level={5}>Tổng: {dataLength} Đơn hàng</Title>
          </Col>
          {/* <Col span={12}>
            <Title level={5}>
              {dataTotalAmount.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}{" "}
              Tổng tiền
            </Title>
          </Col> */}
        </Row>
      </Card>

      {/* Order List */}
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={dataSaleOrder}
          rowKey="id"
          pagination={false}
        />
      </Spin>

      {/* Pagination */}
      <Pagination
        current={currentPage}
        total={dataLength}
        pageSize={itemsPerPage}
        onChange={handlePageChange}
        style={{ marginTop: 16, textAlign: "center" }}
      />

      {/* Modal for Order Details */}
      {selectedOrderId && (
        <ListItemDetail
          orderId={selectedOrderId}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default PurchaseHistory;
