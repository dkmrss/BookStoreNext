import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, message, Row, Col, Table } from "antd";
import { updateOrderStatus, getOrderDetails } from "@/api/ApiPayment";
import { Order } from "@/model/Order";
import { Textarea } from "@mantine/core";

interface EditOrderModalProps {
  visible: boolean;
  onCancel: () => void;
  orderId: number | undefined;
  fetchOrders: () => void; // Function to refresh the order list
}

const EditOrderModal: React.FC<EditOrderModalProps> = ({
  visible,
  onCancel,
  orderId,
  fetchOrders,
}) => {
  const [form] = Form.useForm();
  const [orderDetails, setOrderDetails] = useState<any[]>([]);
  const [loadingDetails, setLoadingDetails] = useState<boolean>(false);
  const [order, setOrder] = useState<any>(null);

  const fetchOrderDetail = async () => {
    if (!orderId) return;
    try {
      setLoadingDetails(true);
      const response = await getOrderDetails(orderId); // Gọi API để lấy chi tiết đơn hàng
      if (response.success) {
        setOrder(response.data); // Lưu thông tin đơn hàng
        setOrderDetails(response.data.orderDetails); // Lưu chi tiết sản phẩm
        form.setFieldsValue({
          ...response.data,
          order_date: new Date(response.data.order_date).toLocaleString(),
        });
      } else {
        message.error(response.message || "Không thể lấy chi tiết đơn hàng.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
      message.error("Lỗi khi lấy chi tiết đơn hàng.");
    } finally {
      setLoadingDetails(false);
    }
  };

  useEffect(() => {
    if (visible) {
      fetchOrderDetail();
    }
  }, [visible, orderId]);

  const handleSave = async (values: any) => {
    try {
      const updatedOrder = {
        ...values,
        id: order?.id,
      };

      const response = await updateOrderStatus(order!.id, updatedOrder);

      if (response.success) {
        message.success("Cập nhật thông tin đơn hàng thành công.");
        fetchOrders(); // Refresh danh sách đơn hàng
        onCancel(); // Đóng modal
      } else {
        message.error(response.message || "Cập nhật thất bại.");
      }
    } catch (error) {
      message.error("Lỗi khi cập nhật đơn hàng.");
      console.error(error);
    }
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img
          src={`${
            process.env.NEXT_PUBLIC_URL || "http://localhost:3001"
          }/${image}`}
          alt="Hình ảnh sản phẩm"
          style={{ width: 60, height: 90, objectFit: "cover" }}
        />
      ),
    },
  ];

  return (
    <Modal
      title="Chỉnh sửa đơn hàng"
      visible={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      width={800}
    >
      <Form form={form} layout="vertical" onFinish={handleSave}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="ID" name="id">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Tên khách hàng" name="name">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Tổng giá" name="total">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Ngày đặt" name="order_date">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
          <Form.Item label="Địa chỉ giao" name="address">
          <Input disabled />
        </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Số điện thoại" name="phone">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        
        <Form.Item label="Ghi chú" name="note">
          <Textarea disabled />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Trạng thái thanh toán" name="payment">
              <Select disabled>
                <Select.Option value={0}>Chưa thanh toán</Select.Option>
                <Select.Option value={1}>Đã thanh toán</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Phương thức thanh toán" name="method">
              <Select disabled>
                <Select.Option value={0}>COD</Select.Option>
                <Select.Option value={1}>Chuyển khoản</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Trạng thái"
          name="delivered"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái." }]}
        >
          <Select>
            <Select.Option value={0}>Đang xử lý</Select.Option>
            <Select.Option value={1}>Đang giao</Select.Option>
            <Select.Option value={2}>Đã hủy</Select.Option>
            <Select.Option value={3}>Đã giao</Select.Option>
            <Select.Option value={4}>Khách hủy đơn</Select.Option>
          </Select>
        </Form.Item>
      </Form>
      <h3>Danh sách sản phẩm</h3>
      <Table
        columns={columns}
        dataSource={orderDetails}
        loading={loadingDetails}
        rowKey="product_id"
        pagination={false}
      />
    </Modal>
  );
};

export default EditOrderModal;
