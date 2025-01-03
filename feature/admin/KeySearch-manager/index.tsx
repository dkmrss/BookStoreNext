"use client";

import React, { useEffect, useState } from "react";
import { Table, Button, Space, message, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { getDataListKeySearch, deleteKeyword } from "@/api/ApiKeySearch";
import HeaderSection from "@/components/HeaderSection";

const KeywordManager: React.FC = () => {
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [isDeleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [selectedKeywordId, setSelectedKeywordId] = useState<number | null>(null);

  // Fetch keywords with pagination
  const fetchKeywords = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const query = `?take=${pageSize}&skip=${(page - 1) * pageSize}`;
      const response = await getDataListKeySearch(query);
      setKeywords(response.data);
      setPagination({
        ...pagination,
        current: page,
        total: response.totalCount || 0,
      });
    } catch (error) {
      message.error("Không thể lấy danh sách từ khóa.");
    } finally {
      setLoading(false);
    }
  };

  // Delete keyword
  const handleDeleteKeyword = async () => {
    if (selectedKeywordId !== null) {
      try {
        await deleteKeyword(selectedKeywordId);
        message.success("Xóa từ khóa thành công.");
        fetchKeywords(pagination.current, pagination.pageSize);
      } catch (error) {
        message.error("Xóa từ khóa thất bại.");
      } finally {
        setDeleteModalVisible(false);
        setSelectedKeywordId(null);
      }
    }
  };

  // Define table columns
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Từ khóa",
      dataIndex: "keyword",
      key: "keyword",
    },
    {
        title: "Số lần tìm kiếm",
        dataIndex: "time_search",
        key: "time_search",
      },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Space>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => {
              setSelectedKeywordId(record.id);
              setDeleteModalVisible(true);
            }}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchKeywords();
  }, []);

  return (
    <><HeaderSection title={"Quản lý từ khóa tìm kiếm"} />
      <Table
        columns={columns}
        dataSource={keywords}
        rowKey="id"
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: (page, pageSize) => fetchKeywords(page, pageSize),
        }}
      />
      <Modal
        title="Xác nhận xóa từ khóa"
        visible={isDeleteModalVisible}
        onOk={handleDeleteKeyword}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
      >
        <p>Bạn có chắc chắn muốn xóa từ khóa này không?</p>
      </Modal>
    </>
  );
};

export default KeywordManager;
