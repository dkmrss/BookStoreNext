import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Upload,
  Button,
  Switch,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment"; // Thư viện xử lý ngày giờ
import { createBanner, updateBanner } from "@/api/apiBanner";


interface EditModalProps {
  visible: boolean;
  onCancel: () => void;
  initialValues: any | null;
  fetchBanners: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  visible,
  onCancel,
  initialValues,
  fetchBanners,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    if (visible) {
      if (initialValues) {
        form.setFieldsValue({
          ...initialValues,
          date_start: moment(initialValues.date_start),
          date_end: moment(initialValues.date_end),
        }); // Gán giá trị ban đầu nếu chỉnh sửa
        if (initialValues.image) {
          setFileList([
            {
              uid: "-1",
              name: "banner-image",
              status: "done",
              url: `${
                process.env.NEXT_PUBLIC_URL || "http://localhost:3001"
              }/${initialValues.image}`,
            },
          ]);
        }
      } else {
        form.resetFields(); // Xóa form nếu thêm mới
        setFileList([]);
      }
    }
  }, [visible, initialValues, form]);

  const handleFileChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("date_start", values.date_start.format("YYYY-MM-DD"));
    formData.append("date_end", values.date_end.format("YYYY-MM-DD"));
    formData.append("status", values.status ? "1" : "0");
    formData.append("trash", values.trash ? "1" : "0");

    if (fileList[0]?.originFileObj) {
      formData.append("image", fileList[0].originFileObj); // Đưa file ảnh vào FormData
    }

    try {
      if (initialValues) {
        // Update banner
        const response = await updateBanner(initialValues.id, formData);
        if (response.success) {
          message.success("Cập nhật banner thành công!");
          fetchBanners();
          onCancel();
        } else {
          message.error(response.message || "Cập nhật banner thất bại!");
        }
      } else {
        // Create new banner
        const response = await createBanner(formData);
        if (response.success) {
          message.success("Thêm banner thành công!");
          fetchBanners();
          onCancel();
        } else {
          message.error(response.message || "Thêm banner thất bại!");
        }
      }
    } catch (error) {
      message.error("Lỗi khi lưu banner!");
      console.error(error);
    }
  };

  return (
    <Modal
      title={initialValues ? "Chỉnh sửa Banner" : "Thêm Banner"}
      visible={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          status: initialValues ? initialValues.status : 1,
          trash: initialValues ? initialValues.trash : 0,
        }}
      >
        {/* Tên Banner */}
        <Form.Item
          name="title"
          label="Tên Banner"
          rules={[{ required: true, message: "Tên banner không được bỏ trống" }]}
        >
          <Input />
        </Form.Item>

        {/* Ngày Bắt Đầu */}
        <Form.Item
          name="date_start"
          label="Ngày bắt đầu"
          rules={[{ required: true, message: "Ngày bắt đầu không được bỏ trống" }]}
        >
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
        </Form.Item>

        {/* Ngày Kết Thúc */}
        <Form.Item
          name="date_end"
          label="Ngày kết thúc"
          rules={[{ required: true, message: "Ngày kết thúc không được bỏ trống" }]}
        >
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
        </Form.Item>

        {/* Ảnh Banner */}
        <Form.Item
          name="image"
          label="Ảnh Banner"
          rules={[{ required: !initialValues, message: "Ảnh không được bỏ trống" }]}
        >
          <Upload
            beforeUpload={() => false} // Không tải file ngay lập tức
            fileList={fileList}
            onChange={handleFileChange}
            listType="picture"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>

        {/* Trạng thái */}
        <Form.Item
          name="status"
          label="Trạng thái"
          valuePropName="checked"
        >
          <Switch checkedChildren="Hoạt động" unCheckedChildren="Không hoạt động" />
        </Form.Item>

        {/* Trash */}
        <Form.Item
          name="trash"
          label="Thùng rác"
          valuePropName="checked"
        >
          <Switch checkedChildren="Đã xóa" unCheckedChildren="Bình thường" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
