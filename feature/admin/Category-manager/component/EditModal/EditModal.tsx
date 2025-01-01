import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Upload,
  Button,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  createCategory,
  updateCategory,
} from "@/api/ApiCategory";

interface EditModalProps {
  visible: boolean;
  onCancel: () => void;
  initialValues: any | null;
  fetchCategories: () => void; // Hàm gọi lại danh sách danh mục
}

const EditModal: React.FC<EditModalProps> = ({
  visible,
  onCancel,
  initialValues,
  fetchCategories,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  // Xử lý thay đổi file upload
  const handleChange = (info: any) => {
    setFileList(info.fileList); // Lưu danh sách file vào state
    if (info.fileList.length > 0) {
      form.setFieldsValue({ illustration: info.file }); // Lưu file object vào form
    } else {
      form.setFieldsValue({ illustration: null });
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("category_name", values.category_name);

      if (fileList[0]?.originFileObj) {
        formData.append("illustration", fileList[0].originFileObj);
      }

      if (initialValues?.id) {
        // Cập nhật danh mục
        const response = await updateCategory(initialValues.id, formData);
        if (response?.success) {
          message.success("Cập nhật danh mục thành công!");
          fetchCategories();
          onCancel();
        } else {
          message.error(response?.message || "Cập nhật danh mục thất bại!");
        }
      } else {
        // Thêm danh mục
        const response = await createCategory(formData);
        if (response?.success) {
          message.success("Thêm danh mục thành công!");
          fetchCategories();
          onCancel();
        } else {
          message.error(response?.message || "Thêm danh mục thất bại!");
        }
      }
    } catch (error) {
      message.error("Lỗi khi xử lý danh mục!");
      console.error(error);
    }
  };

  useEffect(() => {
    if (visible) {
      if (initialValues) {
        form.setFieldsValue(initialValues);
        if (initialValues.illustration) {
          setFileList([
            {
              url: `${
                process.env.NEXT_PUBLIC_URL || "http://localhost:3001"
              }/${initialValues.illustration}`,
              name: "Uploaded Image",
              status: "done",
            },
          ]);
        }
      } else {
        form.resetFields();
        setFileList([]);
      }
    }
  }, [visible, initialValues]);

  return (
    <Modal
      title={initialValues ? "Chỉnh sửa danh mục" : "Thêm danh mục"}
      visible={visible}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(handleSubmit)
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" initialValues={initialValues || {}}>
        {/* Tên danh mục */}
        <Form.Item
          name="category_name"
          label="Tên danh mục"
          rules={[{ required: true, message: "Tên danh mục không được bỏ trống" }]}
        >
          <Input />
        </Form.Item>

        {/* Ảnh minh họa */}
        <Form.Item
          name="illustration"
          label="Ảnh minh họa"
          rules={[{ required: true, message: "Ảnh minh họa không được bỏ trống" }]}
        >
          <Upload
            beforeUpload={() => false}
            fileList={fileList}
            onChange={handleChange}
            listType="picture"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
