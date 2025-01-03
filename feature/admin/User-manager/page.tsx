"use client";

import React, { useState, useEffect } from "react";
import { Table, Button, Space, Tooltip, Tag, Modal, message } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { getUserList, deleteUser, updateUserStatus, updateUserRole } from "@/api/ApiUser";
import HeaderSection from "@/components/HeaderSection";

interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  address: string;
  avatar: string;
  created_at: string;
  status: number;
  role: number;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const { confirm } = Modal;
  const fetchUsers = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const query = `?take=${pageSize}&skip=${(page - 1) * pageSize}`;
      const response = await getUserList(query);
      if (response?.success) {
        setUsers(response.data);
        setPagination({
          current: page,
          pageSize,
          total: response.totalCount,
        });
      } else {
        message.error(response.message || "Không thể lấy danh sách người dùng.");
      }
    } catch (error) {
      message.error("Lỗi khi lấy danh sách người dùng.");
    } finally {
      setLoading(false);
    }
  };


  const showDeleteConfirm = (id: number) => {
    confirm({
      title: "Bạn có chắc chắn muốn người dùng này?",
      icon: <ExclamationCircleOutlined />,
      content: "Hành động này không thể hoàn tác.",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
            const response = await deleteUser(id);
            if (response?.success) {
                message.success(response.message);
              fetchUsers(pagination.current, pagination.pageSize);
            } else {
              message.error(response.message || "Xóa người dùng thất bại.");
            }
          } catch (error) {
            message.error("Lỗi khi xóa người dùng.");
          }
      },
    });
  };
  

  const handleUpdateStatus = async (id: number) => {
    try {
      const response = await updateUserStatus(id);
      if (response?.success) {
        message.success(response.message);
        fetchUsers(pagination.current, pagination.pageSize);
      } else {
        message.error(response.message || "Cập nhật trạng thái thất bại.");
      }
    } catch (error) {
      message.error("Lỗi khi cập nhật trạng thái người dùng.");
    }
  };

  const handleUpdateRole = async (id: number) => {
    try {
      const response = await updateUserRole(id);
      if (response?.success) {
        message.success(response.message);
        fetchUsers(pagination.current, pagination.pageSize);
      } else {
        message.error(response.message || "Cập nhật vai trò thất bại.");
      }
    } catch (error) {
      message.error("Lỗi khi cập nhật vai trò người dùng.");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: number, record: User) => (
        <Tag
          color={status === 0 ? "green" : "red"}
          onClick={() => handleUpdateStatus(record.id)}
          style={{ cursor: "pointer" }}
        >
          {status === 0 ? "Hoạt động" : "Bị khóa"}
        </Tag>
      ),
    },
    {
        title: "Vai trò",
        dataIndex: "role",
        key: "role",
        render: (status: number, record: User) => (
          <Tag
            color={status === 0 ? "green" : "red"}
            onClick={() => handleUpdateRole(record.id)}
            style={{ cursor: "pointer" }}
          >
            {status === 0 ? "User" : "Admin"}
          </Tag>
        ),
      },
    {
      title: "Thao tác",
      key: "actions",
      render: (_: any, record: User) => (
        <Space>
          <Tooltip title="Xem chi tiết">
            <EyeOutlined
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => {
                setSelectedUser(record);
                setModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <DeleteOutlined
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => showDeleteConfirm(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
    <HeaderSection title={"Quản lý tài khoản người dùng"} />
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: (page, pageSize) => fetchUsers(page, pageSize),
        }}
      />
      <Modal
        title="Thông tin chi tiết người dùng"
        visible={isModalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {selectedUser && (
          <div>
            <p><strong>Họ tên:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Số điện thoại:</strong> {selectedUser.phone}</p>
            <p><strong>Địa chỉ:</strong> {selectedUser.address}</p>
            <p><strong>Vai trò:</strong> {selectedUser.role === 1 ? "Admin" : "User"}</p>
            <p><strong>Trạng thái:</strong> {selectedUser.status === 0 ? "Hoạt động" : "Khóa tài khoản"}</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default UserManagement;
