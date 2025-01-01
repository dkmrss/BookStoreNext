"use client";

import React, { useEffect, useState } from "react";
import { Table, Button, Space, Tag, Tooltip, message, Modal } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import {
  getDataListNews,
  deleteNews,
  updateStatusNews,
  updateTrashNews,
  getDataListNewsAdmin,
} from "@/api/apiNew";
import EditModal from "./component/EditModal/EditModal";
import InfoModal from "./component/InfoModal";
import style from "./UserInformation.module.scss"
interface News {
  id: number;
  title: string;
  short_description: string;
  content: string;
  avatar: string;
  created_at: string;
  status: number;
  trash: number;
}

const NewsTable: React.FC = () => {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [currentNews, setCurrentNews] = useState<News | null>(null);
  const [isInfoModalVisible, setInfoModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<News | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const { confirm } = Modal;
  const fetchNews = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await getDataListNewsAdmin(
        `?take=${pageSize}&skip=${(page - 1) * pageSize}`
      );
      if (response) {
        setNewsList(response.data);
        setPagination({
          ...pagination,
          current: page,
          total: response.totalCount || 0,
        });
      }
    } catch (error) {
      message.error("Không thể lấy dữ liệu tin tức.");
    } finally {
      setLoading(false);
    }
  };

  const showDeleteConfirm = (id: number) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa tin tức này?",
      icon: <ExclamationCircleOutlined />,
      content: "Hành động này không thể hoàn tác.",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const response = await deleteNews(id);
          if (response?.success) {
            message.success("Xóa tin tức thành công.");
            fetchNews(pagination.current, pagination.pageSize);
          }
        } catch (error) {
          message.error("Xóa tin tức thất bại.");
        }
      },
    });
  };

  const handleUpdateStatus = async (id: number) => {
    try {
      const response = await updateStatusNews(id);
      if (response?.success) {
        message.success("Cập nhật trạng thái thành công.");
        fetchNews(pagination.current, pagination.pageSize);
      }
    } catch (error) {
      message.error("Cập nhật trạng thái thất bại.");
    }
  };

  const handleUpdateTrash = async (id: number) => {
    try {
      const response = await updateTrashNews(id);
      if (response?.success) {
        message.success("Cập nhật trạng thái thùng rác thành công.");
        fetchNews(pagination.current, pagination.pageSize);
      }
    } catch (error) {
      message.error("Cập nhật trạng thái thùng rác thất bại.");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Mô tả ngắn",
      dataIndex: "short_description",
      key: "short_description",
    },
    {
      title: "Ảnh",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar: string) => (
        <img
          src={`${
            process.env.NEXT_PUBLIC_URL || "http://localhost:3001"
          }${avatar}`}
          alt="Avatar"
          style={{ width: 100, height: 50, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: number, record: News) => (
        <Tag
          color={status === 0 ? "green" : "red"}
          onClick={() => handleUpdateStatus(record.id)}
          style={{ cursor: "pointer" }}
        >
          {status === 0 ? "Hoạt động" : "Không hoạt động"}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_: any, record: News) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <EditOutlined
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => {
                setCurrentNews(record);
                setEditModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Xóa vĩnh viễn">
            <DeleteOutlined
              style={{ cursor: "pointer", color: "red" }}
              onClick={() => showDeleteConfirm(record.id)}
            />
          </Tooltip>
          <Tooltip title="Xem chi tiết">
            <EyeOutlined
              style={{ fontSize: "18px", cursor: "pointer", color: "green" }}
              onClick={() => {
                setSelectedArticle(record);
                setInfoModalVisible(true);
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setCurrentNews(null);
          setEditModalVisible(true);
        }}
        style={{ marginBottom: 16 }}
        className={style.custombutton}
      >
        Thêm Tin Tức
      </Button>
      <Table
        columns={columns}
        dataSource={newsList}
        rowKey="id"
        loading={loading}
        pagination={pagination}
        onChange={(paginationConfig) => {
          fetchNews(paginationConfig.current, paginationConfig.pageSize);
        }}
      />
      <EditModal
        visible={isEditModalVisible}
        onCancel={() => setEditModalVisible(false)}
        initialValues={currentNews}
        fetchNews={fetchNews}
      />
      <InfoModal
        visible={isInfoModalVisible}
        onCancel={() => setInfoModalVisible(false)}
        article={selectedArticle}
      />
    </>
  );
};

export default NewsTable;
