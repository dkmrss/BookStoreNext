"use client";

import {
  getDataListCategory,
  getDataInfoCategory,
  updateStatusCategory,
  updateTrashCategory,
  deleteCategory,
  createCategory,
  updateCategory,
  getDataListCategoryAdmin,
} from "@/api/ApiCategory";
import { Button, message, Modal, Space, Table, Tag, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import EditModal from "./component/EditModal/EditModal";
import { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import style from "./UserInformation.module.scss"
import HeaderSection from "@/components/HeaderSection";
interface Category {
  id: number;
  category_name: string;
  illustration: string;
  status: number;
  trash: number;
}

const CategoryTable: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const { confirm } = Modal;
  const fetchCategories = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const query = `?take=${pageSize}&skip=${(page - 1) * pageSize}`;
      const response = await getDataListCategoryAdmin(query);
      if (response.success) {
        setCategories(response.data);
        setPagination({
          current: page,
          pageSize,
          total: response.totalCount || 0,
        });
      }
    } catch (error) {
      message.error("Không thể lấy danh sách danh mục.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleTableChange = (paginationConfig: any): void => {
    const { current, pageSize } = paginationConfig;
    setPagination({
      ...pagination,
      current,
      pageSize,
    });
    fetchCategories(current, pageSize);
  };

  const handleUpdateStatus = async (id: number) => {
    try {
      const result = await updateStatusCategory(id);
      if (result.success) {
        message.success("Cập nhật trạng thái thành công.");
        fetchCategories(pagination.current, pagination.pageSize);
      }
    } catch (error) {
      message.error("Cập nhật trạng thái thất bại.");
    }
  };

  const handleUpdateTrash = async (id: number) => {
    try {
      const result = await updateTrashCategory(id);
      if (result.success) {
        message.success("Cập nhật trạng thái thùng rác thành công.");
        fetchCategories(pagination.current, pagination.pageSize);
      }
    } catch (error) {
      message.error("Cập nhật trạng thái thùng rác thất bại.");
    }
  };


  const showDeleteConfirm = (id: number) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa danh mục này?",
      icon: <ExclamationCircleOutlined />,
      content: "Hành động này không thể hoàn tác.",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const result = await deleteCategory(id);
          if (result.success) {
            message.success("Xóa danh mục thành công.");
            fetchCategories(pagination.current, pagination.pageSize);
          } else {
            message.error(result.message || "Xóa danh mục thất bại.");
          }
        } catch (error) {
          message.error("Lỗi khi xóa danh mục.");
        }
      },
    });
  };


  const columns: ColumnsType<Category> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên danh mục",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Ảnh minh họa",
      dataIndex: "illustration",
      key: "illustration",
      render: (image: string) => (
        <img
          src={`${process.env.NEXT_PUBLIC_URL || "http://localhost:3001"}/${image}`}
          alt="Minh họa"
          style={{ width: 100, height: 100, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: number, record: Category) => (
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
      render: (trash: number, record: Category) => (
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
      key: "action",
      render: (_: any, record: Category) => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa danh mục">
            <EditOutlined
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => {
                setCurrentCategory(record);
                setEditModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Xóa danh mục">
            <DeleteOutlined
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => showDeleteConfirm(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
    <HeaderSection title={"Quản lý danh mục"} />
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        className={style.custombutton}
        onClick={() => {
          setCurrentCategory(null);
          setEditModalVisible(true);
        }}
      >
        Thêm danh mục
      </Button>
      <Table
        columns={columns}
        dataSource={categories}
        loading={loading}
        rowKey="id"
        pagination={pagination}
        onChange={handleTableChange}
      />
      <EditModal
        visible={isEditModalVisible}
        onCancel={() => {
          setEditModalVisible(false);
          setCurrentCategory(null);
        }}
        initialValues={currentCategory}
        fetchCategories={fetchCategories}
      />
    </>
  );
};

export default CategoryTable;
