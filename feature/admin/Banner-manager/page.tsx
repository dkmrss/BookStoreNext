"use client";

import React, { useEffect, useState } from "react";
import { Button, Table, Space, Tag, Tooltip, message, Modal } from "antd";
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import style from "./UserInformation.module.scss"
import EditModal from "./component/EditModal/EditModal";
import {
  deleteBanner,
  getDataListBannerAdmin,
  updateBannerStatus,
  updateTrashBanner,
} from "@/api/apiBanner";
import HeaderSection from "@/components/HeaderSection";

interface Banner {
  id: number;
  banner_name: string;
  image: string;
  link: string;
  position: number;
  status: number;
  trash: number;
}

const BannerTable: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [currentBanner, setCurrentBanner] = useState<Banner | null>(null);
  const { confirm } = Modal;
  // Fetch banners with pagination
  const fetchBanners = async (
    page = 1,
    pageSize = 10
  ): Promise<void> => {
    setLoading(true);
    try {
      const query = `?take=${pageSize}&skip=${(page - 1) * pageSize}`;
      const response = await getDataListBannerAdmin(query);
      if (response?.data) {
        setBanners(response.data);
        setPagination({
          ...pagination,
          current: page,
          total: response.totalCount || 0,
        });
      }
    } catch (error) {
      message.error("Không thể lấy dữ liệu banner.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number): Promise<void> => {
    try {
      const response = await updateBannerStatus(id);
      if (response?.success) {
        message.success("Cập nhật trạng thái thành công.");
        fetchBanners(pagination.current, pagination.pageSize);
      }
    } catch (error) {
      message.error("Cập nhật trạng thái thất bại.");
    }
  };

  const handleUpdateTrash = async (id: number): Promise<void> => {
    try {
      const response = await updateTrashBanner(id);
      if (response?.success) {
        message.success("Cập nhật trạng thái thùng rác thành công.");
        fetchBanners(pagination.current, pagination.pageSize);
      }
    } catch (error) {
      message.error("Cập nhật trạng thái thùng rác thất bại.");
    }
  };

  

  const showDeleteConfirm = (id: number) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa banner này?",
      icon: <ExclamationCircleOutlined />,
      content: "Hành động này không thể hoàn tác.",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const response = await deleteBanner(id);
          if (response?.success) {
            message.success("Xóa banner thành công.");
            fetchBanners(pagination.current, pagination.pageSize);
          }
        } catch (error) {
          message.error("Xóa banner thất bại.");
        }
      },
    });
  };

  const handleTableChange = (paginationConfig: any): void => {
    const { current, pageSize } = paginationConfig;
    fetchBanners(current, pageSize);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
    const day = date.getDate().toString().padStart(2, "0");
  
    return `${day}/${month}/${year}`; // Định dạng DD/MM/YYYY
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên Banner",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img
          src={`${
            process.env.NEXT_PUBLIC_URL || "http://localhost:3001"
          }/${image}`}
          alt="Banner"
          style={{ width: 100, height: 50, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "date_start",
      key: "date_start",
      render: (date_start: string) => formatDate(date_start),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "date_end",
      key: "date_end",
      render: (date_end: string) => formatDate(date_end),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: number, record: Banner) => (
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
          title: "Thùng rác",
          dataIndex: "trash",
          key: "trash",
          render: (trash: number, record: Banner) => (
            <Tag
              color={trash === 1 ? "volcano" : "blue"}
              onClick={() => handleUpdateTrash(record.id)}
              style={{ cursor: "pointer" }}
            >
              {trash === 1 ? "Trong thùng rác" : "Bình thường"}
            </Tag>
          ),
        },
    {
      title: "Thao tác",
      key: "actions",
      render: (_: any, record: Banner) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <EditOutlined
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => {
                setCurrentBanner(record);
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
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchBanners(pagination.current, pagination.pageSize);
  }, []);

  return (
    <>
    <HeaderSection title={"Quản lý banner"} />
      <Button
        type="primary"
        onClick={() => {
          setCurrentBanner(null);
          setEditModalVisible(true);
        }}
        style={{ marginBottom: 16 }}
        className={style.custombutton}
      >
        Thêm Banner
      </Button>
      <Table
        columns={columns}
        dataSource={banners}
        rowKey="id"
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
      />
      <EditModal
        visible={isEditModalVisible}
        onCancel={() => setEditModalVisible(false)}
        initialValues={currentBanner}
        fetchBanners={() =>
          fetchBanners(pagination.current, pagination.pageSize)
        }
      />
    </>
  );
};

export default BannerTable;
