"use client";
import {
  Box,
  Button,
  Group,
  Avatar,
  Text,
  Paper,
  Pagination,
  Modal,
  NumberFormatter,
  Flex,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { getOrders } from "@/api/ApiPayment";
import ListItemDetail from "./ListItemDetail"; // Component for detailed modal
import style from "./PurchaseHistory.module.scss";

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

  return (
    <Box className={style.purchaseHistory} p="sm">
      {/* User Information */}
      <Group>
        <Avatar
          src={`http://localhost:3001/${user.avatar}`}
          alt={user.name || "User"}
          color="var(--clr-primary)"
        />
        <Flex justify="flex-start" direction="column">
          <Text size="xl">{user.name || "Người dùng"}</Text>
        </Flex>
      </Group>

      {/* Order Summary */}
      <Paper className={style.orderSummary} shadow="xl" radius="md" p="md" mt="sm">
        <Group justify="space-between" grow>
          <Box w={{ base: 200, sm: 400, lg: 500 }}>
            <Flex direction="column" align="center">
              <Text size="xl" fw={700}>
                {dataLength}
              </Text>
              <Text>Đơn hàng</Text>
            </Flex>
          </Box>
          <Box w={{ base: 200, sm: 400, lg: 500 }} className={style.boxTotal}>
            <Flex direction="column" align="center">
              <Text size="xl" fw={700}>
                <NumberFormatter
                  thousandSeparator="."
                  decimalSeparator="," value={dataTotalAmount} suffix="₫" />
              </Text>
              <Text>Tổng tiền</Text>
            </Flex>
          </Box>
        </Group>
      </Paper>

      {/* Order List */}
      <Box mt="lg">
        {loading ? (
          <Text>Đang tải...</Text>
        ) : dataSaleOrder.length > 0 ? (
          dataSaleOrder.map((order) => (
            <Paper
              key={order.id}
              className={style.orderItem}
              shadow="sm"
              radius="md"
              p="md"
              mb="lg"
            >
              <Flex direction="column" gap="sm">
                <Text fw={700}>{order.name}</Text>
                <Text>Số điện thoại: {order.phone}</Text>
                <Text>Địa chỉ: {order.address}</Text>
                <Text>
                  Trạng thái: {order.delivered === 0
                    ? "Đang xử lý"
                    : order.delivered === 1
                    ? "Đang giao"
                    : "Đã giao"}
                </Text>
                <Text>
                  Tổng tiền: {" "}
                  <NumberFormatter
                    thousandSeparator="."
                    decimalSeparator="," value={order.total} suffix="₫" />
                </Text>

                <Button
                  variant="outline"
                  color="var(--clr-primary)"
                  onClick={() => handleViewOrderDetails(order.id)}
                >
                  Xem chi tiết
                </Button>
              </Flex>
            </Paper>
          ))
        ) : (
          <Text>Không có đơn hàng nào.</Text>
        )}
      </Box>

      {/* Pagination */}
      <Box className={style.pagination} mt="lg">
        <Pagination total={totalPages} value={currentPage} onChange={handlePageChange} />
      </Box>

      {/* Modal for Order Details */}
      {selectedOrderId && (
        <ListItemDetail
          orderId={selectedOrderId}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </Box>
  );
};

export default PurchaseHistory;
