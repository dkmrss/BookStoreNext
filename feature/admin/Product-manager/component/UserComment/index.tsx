import React, { useEffect, useState } from "react";
import { Modal, Table, Button, message, Tag } from "antd";
import { getDataListComment, deleteComment } from "@/api/ApiComment";
import { ExclamationCircleOutlined, UploadOutlined } from "@ant-design/icons";
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

const CommentModal: React.FC<CommentModalProps> = ({ visible, onCancel, bookId }) => {
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
      const query = `?bookId=${bookId}&take=${pageSize}&skip=${skip}`;
      const response = await getDataListComment(query);
      if (response.success) {
        setComments(response.data);
        setPagination((prev) => ({
          ...prev,
          total: response.totalCount || 0,
        }));
      } else {
        message.error(response.message || "Không thể lấy danh sách bình luận.");
      }
    } catch (error) {
      message.error("Lỗi khi lấy danh sách bình luận.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const showDeleteConfirm = (id: number) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa bình luận này?",
      icon: <ExclamationCircleOutlined />,
      content: "Hành động này không thể hoàn tác.",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
            const response = await deleteComment(id);
            if (response.success) {
              message.success("Xóa bình luận thành công.");
              fetchComments(pagination.current, pagination.pageSize); // Refresh comments sau khi xóa
            } else {
              message.error(response.message || "Không thể xóa bình luận.");
            }
          } catch (error) {
            message.error("Lỗi khi xóa bình luận.");
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
        dataIndex: "content",
        key: "content",
        render: (content: string) => (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        ),
      },
    {
        title: "Thời gian",
        dataIndex: "date",
        key: "date",
        render: (created_at: string) => {
          const date = new Date(created_at);
          return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        },
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

export default CommentModal;
