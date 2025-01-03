"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Tooltip,
  Space,
  message,
  Select,
  Tag,
  Modal,
  Form,
  Input,
  Card,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getOrders, deleteOrder } from "@/api/ApiPayment";
import EditOrderModal from "./component/EditModal/EditModal";
import { Order } from "@/model/Order";
import style from "./UserInformation.module.scss"
import HeaderSection from "@/components/HeaderSection";
const OrderTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [filters, setFilters] = useState<any>({});
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] =
    useState<boolean>(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [filterForm] = Form.useForm();

  const fetchOrders = async (
    page = 1,
    pageSize = 10,
    filters: { [key: string]: any } = {}
  ): Promise<void> => {
    setLoading(true);
    try {
      // Lọc bỏ các giá trị undefined trong filters
      const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== undefined)
      );

      const query = new URLSearchParams({
        ...cleanedFilters,
        take: pageSize.toString(),
        skip: ((page - 1) * pageSize).toString(),
      }).toString();

      const response = await getOrders(`?${query}`);
      setOrders(response.data);
      setPagination({
        ...pagination,
        current: page,
        total: response.totalCount || 0,
      });
    } catch (error) {
      message.error("Không thể lấy danh sách đơn hàng.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterSubmit = (values: any) => {
    const cleanedFilters = Object.fromEntries(
      Object.entries(values).filter(
        ([_, value]) => value !== undefined && value !== ""
      )
    );
    fetchOrders(1, pagination.pageSize, cleanedFilters);
  };

  const handleClearFilters = () => {
    filterForm.resetFields();
    setFilters({});
    setPagination((prev) => ({ ...prev, current: 1 }));
    fetchOrders(1, pagination.pageSize);
  };

  const handleDeleteOrder = async () => {
    if (selectedOrderId !== null) {
      try {
        const response = await deleteOrder(selectedOrderId);
        if (response.success) {
          message.success("Xóa đơn hàng thành công.");
          fetchOrders(pagination.current, pagination.pageSize);
        } else {
          message.error(response.message || "Xóa đơn hàng thất bại.");
        }
      } catch (error) {
        message.error("Lỗi khi xóa đơn hàng.");
        console.error(error);
      } finally {
        setDeleteModalVisible(false);
        setSelectedOrderId(null);
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Thông tin đơn hàng",
      key: "orderInfo",
      render: (_: any, record: Order) => (
        <div>
          <p>
            <strong>Tên:</strong> {record.name || "Không rõ"}
          </p>
          <p>
            <strong>Địa chỉ:</strong> {record.address || "Không rõ"}
          </p>
          <p>
            <strong>SĐT:</strong> {record.phone || "Không rõ"}
          </p>
          <p>
            <strong>Tổng giá:</strong> {`${record.total.toLocaleString()} VND`}
          </p>
        </div>
      ),
    },
    {
      title: "Ngày đặt",
      dataIndex: "order_date",
      key: "order_date",
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: "Trạng thái",
      dataIndex: "delivered",
      key: "delivered",
      render: (status: number) => {
        const statusMap: { [key: number]: string } = {
          0: "Đang xử lý",
          1: "Đang giao",
          2: "Đã hủy",
          3: "Đã giao",
          4: "Khách hủy đơn",
        };
        const colorMap: { [key: number]: string } = {
          0: "blue",
          1: "orange",
          2: "red",
          3: "green",
          4: "purple",
        };
        return <Tag color={colorMap[status]}>{statusMap[status]}</Tag>;
      },
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_: any, record: Order) => (
        <Space>
          <Tooltip title="Chỉnh sửa, xem chi tiết đơn hàng">
            <EditOutlined
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => {
                setSelectedOrder(record);
                setEditModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Xóa đơn hàng">
            <DeleteOutlined
              style={{ cursor: "pointer", color: "red" }}
              onClick={() => {
                setSelectedOrderId(record.id);
                setDeleteModalVisible(true);
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
    <HeaderSection title={"Quản lý đơn hàng"} />
    <Card style={{ marginBottom: 16 }}>
      <Form
        layout="inline"
        onFinish={handleFilterSubmit}
        form={filterForm}
        className={style.form}
        style={{ marginBottom: 16 }}
      >
        <Form.Item className={style.formItem} name="phone" label="Số điện thoại">
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>
        <Form.Item  className={style.formItem} name="customer_id" label="Customer ID">
          <Input placeholder="Nhập ID khách hàng" />
        </Form.Item>
        <Form.Item className={style.formItem} name="delivered" label="Trạng thái">
          <Select placeholder="Chọn trạng thái" style={{ width: 150 }}>
            <Select.Option value="0">Đang xử lý</Select.Option>
            <Select.Option value="1">Đang giao</Select.Option>
            <Select.Option value="2">Đã hủy</Select.Option>
            <Select.Option value="3">Đã giao</Select.Option>
            <Select.Option value="4">Khách hủy đơn</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item className={style.formItem} name="method" label="Phương thức">
          <Select placeholder="Chọn phương thức" style={{ width: 150 }}>
            <Select.Option value="0">COD</Select.Option>
            <Select.Option value="1">Chuyển khoản</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item className={style.formItem} name="payment" label="Thanh toán">
          <Select
            placeholder="Chọn trạng thái thanh toán"
            style={{ width: 150 }}
          >
            <Select.Option value="0">Chưa thanh toán</Select.Option>
            <Select.Option value="1">Đã thanh toán</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item className={style.formItem}>
          <Button className={style.custombutton} type="primary" htmlType="submit">
            Lọc
          </Button>
        </Form.Item>
        <Form.Item className={style.formItem}>
          <Button className={style.custombutton2} onClick={handleClearFilters}>Bỏ lọc</Button>
        </Form.Item>
      </Form>
      </Card>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: (page, pageSize) => fetchOrders(page, pageSize),
        }}
      />
      <EditOrderModal
        visible={isEditModalVisible}
        onCancel={() => setEditModalVisible(false)}
        orderId={selectedOrder?.id}
        fetchOrders={() => fetchOrders(pagination.current, pagination.pageSize)}
      />
      <Modal
        title="Xác nhận xóa đơn hàng"
        visible={isDeleteModalVisible}
        onOk={handleDeleteOrder}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
      >
        <p>Bạn có chắc chắn muốn xóa đơn hàng này không?</p>
      </Modal>
    </>
  );
};

export default OrderTable;
