"use client";

import { Box, Text, NumberFormatter, Table, Image, Modal } from "@mantine/core";
import { useEffect, useState } from "react";
// Replace with your actual API call
import style from "./ListItemDetail.module.scss";
import { getOrderDetails } from "@/api/ApiPayment";

interface ListItemDetailProps {
  orderId: number | null;
  isOpen: boolean;
  onClose: () => void;
}
const orderStatus: Record<number, string> = {
  0: "Đang xử lý",
  1: "Đang giao",
  2: "Đã hủy",
  3: "Đã giao",
  4: "Đã hủy"
};


const ListItemDetail: React.FC<ListItemDetailProps> = ({
  orderId,
  isOpen,
  onClose,
}) => {
  const [orderDetail, setOrderDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrderDetail = async () => {
    if (!orderId) return;
    try {
      setLoading(true);
      const response = await getOrderDetails(orderId);
      if (response.success) {
        setOrderDetail(response.data);
      } else {
        console.error("Failed to fetch order details");
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchOrderDetail();
    }
  }, [isOpen, orderId]);

  return (
    <Modal opened={isOpen} onClose={onClose} size="1000px">
      {loading ? (
        <Text>Đang tải...</Text>
      ) : orderDetail ? (
        <Box className={style.listItemDetail}>
          <Text fw={700} size="lg" mb="sm">
            Thông tin đơn hàng
          </Text>
          <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
    <Table.Tr>
      <Table.Th>Thông tin</Table.Th>
      <Table.Th>Chi tiết</Table.Th>
    </Table.Tr>
  </Table.Thead>
  <Table.Tbody>
    <Table.Tr>
      <Table.Td>Họ và tên</Table.Td>
      <Table.Td>{orderDetail.name}</Table.Td>
    </Table.Tr>
    <Table.Tr>
      <Table.Td>Số điện thoại</Table.Td>
      <Table.Td>{orderDetail.phone}</Table.Td>
    </Table.Tr>
    <Table.Tr>
      <Table.Td>Địa chỉ</Table.Td>
      <Table.Td>{orderDetail.address}</Table.Td>
    </Table.Tr>
    <Table.Tr>
      <Table.Td>Trạng thái</Table.Td>
      <Table.Td>
      <Table.Td>
  {orderStatus[orderDetail.delivered] || "Không xác định"}
</Table.Td>
      </Table.Td>
    </Table.Tr>
    <Table.Tr>
      <Table.Td>Tổng tiền</Table.Td>
      <Table.Td>
        <NumberFormatter
          value={orderDetail.total}
          thousandSeparator="."
          decimalSeparator=","
          suffix="₫"
        />
      </Table.Td>
    </Table.Tr>
    <Table.Tr>
      <Table.Td>Ghi chú</Table.Td>
      <Table.Td>{orderDetail.note || "Không có"}</Table.Td>
    </Table.Tr>
    <Table.Tr>
      <Table.Td>Ngày đặt hàng</Table.Td>
      <Table.Td>{new Date(orderDetail.order_date).toLocaleDateString()}</Table.Td>
    </Table.Tr>
    <Table.Tr>
      <Table.Td>Phương thức thanh toán</Table.Td>
      <Table.Td>{orderDetail.method === 1 ? "Online" : "COD"}</Table.Td>
    </Table.Tr>
  </Table.Tbody>
          </Table>

          <Text fw={700} size="lg" mb="sm">
            Chi tiết sản phẩm
          </Text>
          <Table striped highlightOnHover>
  <Table.Thead>
    <Table.Tr>
      <Table.Th>Hình ảnh</Table.Th>
      <Table.Th>Tên sản phẩm</Table.Th>
      <Table.Th>Số lượng</Table.Th>
      <Table.Th>Giá</Table.Th>
      <Table.Th>Tổng</Table.Th>
    </Table.Tr>
  </Table.Thead>
  <Table.Tbody>
    {orderDetail.orderDetails.map((item: any, index: number) => (
      <Table.Tr key={index}>
        <Table.Td>
          <Image
            src={`${process.env.NEXT_PUBLIC_URL || "http://localhost:3001"}/${item.image}`}
            alt={item.product_name}
            className={style.image}
            radius="md"
          />
        </Table.Td>
        <Table.Td>{item.product_name}</Table.Td>
        <Table.Td>{item.quantity}</Table.Td>
        <Table.Td>
          <NumberFormatter
            value={item.price}
            thousandSeparator="."
            decimalSeparator=","
            suffix="₫"
          />
        </Table.Td>
        <Table.Td>
          <NumberFormatter
            value={item.quantity * item.price}
            thousandSeparator="."
            decimalSeparator=","
            suffix="₫"
          />
        </Table.Td>
      </Table.Tr>
    ))}
  </Table.Tbody>
</Table>
        </Box>
      ) : (
        <Text>Không có thông tin đơn hàng.</Text>
      )}
    </Modal>
  );
};

export default ListItemDetail;
