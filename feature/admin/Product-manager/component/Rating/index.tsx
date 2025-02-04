import React, { useEffect, useState } from "react";
import { Modal, Table, Button, message, Tag } from "antd";
import { getDataListComment, deleteComment } from "@/api/ApiComment";
import { ExclamationCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { deleteRating, getDataListRating } from "@/api/ApiRating";
interface Comment {
  id: number;
  user_name: string;
  content: string;
  created_at: string;
}

interface CommentModalProps {
  visible: boolean;
  onCancel: () => void;
  bookId: number | null; // ID của sản phẩm để lấy danh sách bình luận
}

const RatingModal: React.FC<CommentModalProps> = ({ visible, onCancel, bookId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const { confirm } = Modal;
  // Fetch comments khi mở modal hoặc thay đổi trang
  useEffect(() => {
    if (visible && bookId) {
      fetchComments(pagination.current, pagination.pageSize);
    }
  }, [visible, bookId, pagination.current, pagination.pageSize]);

  const fetchComments = async (current: number, pageSize: number): Promise<void> => {
    if (!bookId) return;
    setLoading(true);
    try {
      const skip = (current - 1) * pageSize;
      const query = `/${bookId}?limit=${pageSize}&offset=${skip}`;
      const response = await getDataListRating(query);
      if (response.success) {
        setComments(response.data);
        setPagination((prev) => ({
          ...prev,
          total: response.totalCount || 0,
        }));
      } else {
        message.error(response.message || "Không thể lấy danh sách đánh giá.");
      }
    } catch (error) {
      message.error("Lỗi khi lấy danh sách đánh giá.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const showDeleteConfirm = (id: number) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa đánh giá này?",
      icon: <ExclamationCircleOutlined />,
      content: "Hành động này không thể hoàn tác.",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
            const response = await deleteRating(id);
            if (response.success) {
              message.success("Xóa đánh giá thành công.");
              fetchComments(pagination.current, pagination.pageSize); // Refresh comments sau khi xóa
            } else {
              message.error(response.message || "Không thể xóa đánh giá.");
            }
          } catch (error) {
            message.error("Lỗi khi xóa đánh giá.");
            console.error(error);
          }
      },
    });
  };


  const columns = [
    {
      title: "Người dùng",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
        title: "Nội dung",
        dataIndex: "comment",
        key: "comment",
        render: (content: string) => (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        ),
      },
      {
        title: "Đánh giá",
        dataIndex: "rating",
        key: "rating",
        render: (content: string) => (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        ),
      },
    {
      title: "Thao tác",
      key: "action",
      render: (_: any, record: Comment) => (
        <Button
          danger
          onClick={() => showDeleteConfirm(record.id)}
        >
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <Modal
      title="Danh sách bình luận"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
    >
      <Table
        columns={columns}
        dataSource={comments}
        rowKey="id"
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: (page, size) => {
            setPagination((prev) => ({
              ...prev,
              current: page,
              pageSize: size || 5,
            }));
          },
          showSizeChanger: true,
        }}
      />
    </Modal>
  );
};

export default RatingModal;
