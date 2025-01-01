import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Upload,
  Button,
  message,
  Switch,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";

// Dynamic import ReactQuill (TextEditor)
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

import { createNews, updateNews } from "@/api/apiNew";

interface EditModalProps {
  visible: boolean;
  onCancel: () => void;
  initialValues: any | null;
  fetchNews: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  visible,
  onCancel,
  initialValues,
  fetchNews,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    if (visible) {
      if (initialValues) {
        form.setFieldsValue(initialValues);
        if (initialValues.avatar) {
          setFileList([
            {
              uid: "-1",
              name: "image",
              status: "done",
              url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3001"}${
                initialValues.avatar
              }`,
            },
          ]);
        }
      } else {
        form.resetFields();
        setFileList([]);
      }
    }
  }, [visible, initialValues, form]);

  const handleUploadChange = (info: any) => {
    setFileList(info.fileList);
  };

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("short_description", values.short_description);
    formData.append("content", values.content);
    formData.append("status", values.status ? "1" : "0");
    formData.append("trash", values.trash ? "1" : "0");

    if (fileList[0]?.originFileObj) {
      formData.append("avatar", fileList[0].originFileObj);
    }

    try {
      if (initialValues) {
        const response = await updateNews(initialValues.id, formData);
        if (response.success) {
          message.success("Cập nhật tin tức thành công!");
          fetchNews();
          onCancel();
        } else {
          message.error(response.message || "Cập nhật tin tức thất bại!");
        }
      } else {
        const response = await createNews(formData);
        if (response.success) {
          message.success("Thêm tin tức thành công!");
          fetchNews();
          onCancel();
        } else {
          message.error(response.message || "Thêm tin tức thất bại!");
        }
      }
    } catch (error) {
      message.error("Lỗi khi lưu tin tức!");
      console.error(error);
    }
  };

  return (
    <Modal
      title={initialValues ? "Chỉnh sửa tin tức" : "Thêm tin tức"}
      visible={visible}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(handleSubmit)
          .catch((info) => {
            console.error("Validate Failed:", info);
          });
      }}
      width={800}
    >
      <Form form={form} layout="vertical" initialValues={initialValues || {}}>
        {/* Tiêu đề */}
        <Form.Item
          name="title"
          label="Tiêu đề"
          rules={[{ required: true, message: "Tiêu đề không được để trống" }]}
        >
          <Input />
        </Form.Item>

        {/* Mô tả ngắn */}
        <Form.Item
          name="short_description"
          label="Mô tả ngắn"
          rules={[{ required: true, message: "Mô tả ngắn không được để trống" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        {/* Nội dung */}
        <Form.Item
          name="content"
          label="Nội dung"
          rules={[{ required: true, message: "Nội dung không được để trống" }]}
        >
          <ReactQuill theme="snow" />
        </Form.Item>

        {/* Ảnh đại diện */}
        <Form.Item
          name="avatar"
          label="Ảnh đại diện"
          rules={[{ required: true, message: "Ảnh đại diện không được để trống" }]}
        >
          <Upload
            beforeUpload={() => false}
            fileList={fileList}
            onChange={handleUploadChange}
            listType="picture"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>

        {/* Trạng thái */}
        <Form.Item name="status" label="Trạng thái" valuePropName="checked">
          <Switch checkedChildren="Không hoạt động" unCheckedChildren="Hoạt động" />
        </Form.Item>

        {/* Trash */}
        <Form.Item name="trash" label="Thùng rác" valuePropName="checked">
          <Switch checkedChildren="Đã xóa" unCheckedChildren="Bình thường" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
