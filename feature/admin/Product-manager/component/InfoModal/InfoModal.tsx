import React, { useEffect, useState } from "react";
import {
  Modal,
  Table,
  Button,
  Space,
  Tag,
  message,
  Form,
  Input,
  Upload,
  Select,
} from "antd";
import { ExclamationCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { Image } from "@mantine/core";
import {
  getDetailBookInfo,
  createBookInfo,
  updateBookInfo,
  deleteBookInfo,
  updateTrash,
  updateType,
} from "@/api/ApiBookInfo";

interface BookInfo {
  id: number;
  book_id: number;
  book_images: string;
  types: string;
  pages: number;
  trash: number;
}

interface InfoModalProps {
  visible: boolean;
  onCancel: () => void;
  productId: number | null; // ID của sản phẩm để fetch thông tin sách
}

const InfoModal: React.FC<InfoModalProps> = ({
  visible,
  onCancel,
  productId,
}) => {
  const [bookInfoList, setBookInfoList] = useState<BookInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [editingRecord, setEditingRecord] = useState<BookInfo | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [form] = Form.useForm();
  const [previewImage, setPreviewImage] = useState(null); // Lưu URL preview ảnh
  const [fileData, setFileData] = useState(null); // Lưu dữ liệu file để gửi sau
  const { confirm } = Modal;
  const handleBeforeUpload = (file: any) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Chỉ hỗ trợ định dạng JPG/PNG!");
      return Upload.LIST_IGNORE;
    }

    // Hiển thị preview
    const reader = new FileReader();
    reader.onload = (e: any) => {
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(file);

    // Lưu file để gửi sau khi nhấn nút submit
    setFileData(file);

    return false; // Không upload tự động
  };

  // Fetch book info when modal is opened or pagination changes
  useEffect(() => {
    if (visible && productId !== null) {
      fetchBookInfo(productId, pagination.current, pagination.pageSize);
    }
  }, [visible, productId, pagination.current, pagination.pageSize]);

  const fetchBookInfo = async (
    productId: number,
    page: number,
    pageSize: number
  ): Promise<void> => {
    setLoading(true);
    try {
      const query = `?field=book_id&value=${productId}&take=${pageSize}&skip=${
        (page - 1) * pageSize
      }`;
      const response = await getDetailBookInfo(query);
      if (response.success) {
        setBookInfoList(response.data);
        setPagination({
          ...pagination,
          current: page,
          total: response.totalCount || 0,
        });
      } else {
        message.error(response.message || "Không thể lấy thông tin sách.");
        setBookInfoList([]);
      }
    } catch (error) {
      message.error("Lỗi khi lấy thông tin sách.");
      setBookInfoList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record: BookInfo) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setEditModalVisible(true);
  };

  const showDeleteConfirm = (id: number) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa thông tin này?",
      icon: <ExclamationCircleOutlined />,
      content: "Hành động này không thể hoàn tác.",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const response = await deleteBookInfo(id);
          if (response.success) {
            message.success("Xóa thông tin sách thành công.");
            fetchBookInfo(
              productId as number,
              pagination.current,
              pagination.pageSize
            );
          } else {
            message.error(response.message || "Không thể xóa thông tin sách.");
          }
        } catch (error) {
          message.error("Lỗi khi xóa thông tin sách.");
        }
      },
    });
  };

  

  const handleUpdateTrash = async (id: number, trash: number) => {
    try {
      const response = await updateTrash(id, trash === 1 ? 0 : 1);
      if (response.success) {
        message.success("Cập nhật trạng thái thành công.");
        fetchBookInfo(
          productId as number,
          pagination.current,
          pagination.pageSize
        );
      } else {
        message.error(response.message || "Không thể cập nhật trạng thái.");
      }
    } catch (error) {
      message.error("Lỗi khi cập nhật trạng thái.");
    }
  };

  const handleUpdateType = async (id: number) => {
    try {
      const response = await updateType(id);
      if (response.success) {
        message.success("Cập nhật loại sách thành công.");
        fetchBookInfo(
          productId as number,
          pagination.current,
          pagination.pageSize
        );
      } else {
        message.error(response.message || "Không thể cập nhật loại sách.");
      }
    } catch (error) {
      message.error("Lỗi khi cập nhật loại sách.");
    }
  };

  const handleSave = async (values: any) => {
  console.log("Form Values:", values); // Kiểm tra giá trị trong form

  const formData = new FormData(); // Tạo FormData để gửi file
  formData.append("book_id", (productId || "1").toString());// Thêm các field khác vào FormData
  formData.append("types", values.types);
  formData.append("pages", values.pages);

  if (values.book_images) {
    formData.append("book_images", values.book_images); // Gắn file vào FormData
  }

  try {
    const response = editingRecord
      ? await updateBookInfo(editingRecord.id, formData) // Gửi FormData khi cập nhật
      : await createBookInfo(formData); // Gửi FormData khi thêm mới

    if (response.success) {
      message.success(
        `${editingRecord ? "Cập nhật" : "Thêm"} thông tin sách thành công.`
      );
      setEditModalVisible(false);
      fetchBookInfo(
        productId as number,
        pagination.current,
        pagination.pageSize
      );
    } else {
      message.error(response.message || "Không thể lưu thông tin sách.");
    }
  } catch (error) {
    message.error("Lỗi khi lưu thông tin sách.");
  }
};

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Book ID", dataIndex: "book_id", key: "book_id" },
    {
      title: "Hình ảnh",
      dataIndex: "book_images",
      key: "book_images",
      render: (image: string) => (
        <Image
          src={`${
            process.env.NEXT_PUBLIC_URL || "http://localhost:3001"
          }/${image}`}
          alt="Book"
          style={{ width: 80, height: 80, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Loại",
      dataIndex: "types",
      key: "types",
      render: (types: string, record: BookInfo) => (
        <Tag
          color={types === "cover" ? "blue" : "green"}
          onClick={() => handleUpdateType(record.id)}
        >
          {types}
        </Tag>
      ),
    },
    { title: "Số trang", dataIndex: "pages", key: "pages" },
    {
      title: "Thùng rác",
      dataIndex: "trash",
      key: "trash",
      render: (trash: number, record: BookInfo) => (
        <Tag
          color={trash === 1 ? "volcano" : "blue"}
          onClick={() => handleUpdateTrash(record.id, trash)}
        >
          {trash === 1 ? "Trong thùng rác" : "Bình thường"}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_: unknown, record: BookInfo) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Button type="link" onClick={() => showDeleteConfirm(record.id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Modal
        title="Thông tin sách"
        visible={visible}
        onCancel={onCancel}
        footer={null}
        width={1000}
      >
        <Button
          type="dashed"
          style={{ marginTop: "16px" }}
          block
          onClick={() => {
            setEditingRecord(null);
            form.resetFields();
            form.setFieldsValue({ book_id: productId });
            setEditModalVisible(true);
          }}
        >
          Thêm mới
        </Button>
        <Table
          dataSource={bookInfoList}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20"],
          }}
          onChange={(paginationConfig) => {
            setPagination({
              ...pagination,
              current: paginationConfig.current || 1,
              pageSize: paginationConfig.pageSize || 5,
            });
          }}
        />
        
      </Modal>
      <Modal
        title={editingRecord ? "Sửa thông tin sách" : "Thêm thông tin sách"}
        visible={isEditModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleSave} layout="vertical">
          <Form.Item
            name="book_id"
            label="Book ID"
            rules={[{ required: true }]}
          >
            <Input disabled type="number" />
          </Form.Item>
          <Form.Item
            name="types"
            label="Loại"
            rules={[{ required: true, message: "Vui lòng chọn loại sách!" }]}
          >
            <Select placeholder="Chọn loại sách">
              <Select.Option value="cover">Cover</Select.Option>
              <Select.Option value="read">Read</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="pages" label="Số trang" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="book_images" label="Hình ảnh">
            <Upload
              name="file"
              listType="picture"
              maxCount={1}
              beforeUpload={() => false} // Không tải file ngay lập tức
              onChange={(info) => {
                const { file } = info;
                form.setFieldsValue({ book_images: file }); // Lưu file object trực tiếp vào form // Debug file
              }}
              onRemove={() => {
                form.setFieldsValue({ book_images: null }); // Xóa file khi người dùng xóa ảnh
              }}
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
            {editingRecord ? ( // Nếu đang sửa, hiển thị ảnh từ server
              <Image
                width={200}
                src={`${
                  process.env.NEXT_PUBLIC_URL || "http://localhost:3001"
                }/${editingRecord.book_images}`}
                alt="Preview"
              />
            ) : (
              <Image
                width={200}
                src={form.getFieldValue("book_images") || ""}
                alt="Preview"
                style={{
                  display: form.getFieldValue("book_images") ? "block" : "none",
                }} // Ẩn nếu không có ảnh
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default InfoModal;
