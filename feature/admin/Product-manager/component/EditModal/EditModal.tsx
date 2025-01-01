import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Switch,
  Upload,
  Button,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic"; // Nếu sử dụng React Quill (TextEditor)
import { getDataListCategory } from "@/api/ApiCategory";
import style from "./UserInformation.module.scss"
// TextEditor (Dynamic Import for SSR)
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import "react-quill/dist/quill.snow.css"; // Styles for TextEditor
import { createBook, updateBook } from "@/api/ApiBookProduct";

interface EditModalProps {
  visible: boolean;
  onCancel: () => void;
  initialValues: any | null
  productId: number | null;
  fetchProducts: (page?: number, pageSize?: number) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  visible,
  onCancel,
  initialValues,
  productId,
  fetchProducts,
}) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]); // State để lưu danh sách danh mục
  const [fileList, setFileList] = useState<any[]>([]); // State để lưu danh sách file upload
  // Hàm gọi API để lấy danh mục
  const fetchCategoryList = async () => {
    try {
      const response = await getDataListCategory("/0");
      if (response && response.data) {
        return response.data;
      } else {
        console.log("Dữ liệu danh mục không tồn tại");
        return [];
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách danh mục:", error);
      return [];
    }
  };
 

  // Xử lý thay đổi file upload
  const handleChange = (info: any) => {
    setFileList(info.fileList); // Lưu danh sách file vào state
    if (info.fileList.length > 0) {
      form.setFieldsValue({ image: info.file }); // Lưu file object vào form
    } else {
      form.setFieldsValue({ image: null });
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      // Chuẩn bị dữ liệu gửi lên
      const formData = new FormData();
      formData.append("product_name", values.product_name);
      formData.append("publisher", values.publisher);
      formData.append("author", values.author);
      formData.append("category_id", values.category_id.toString());
      formData.append("sale", values.sale ? "1" : "0");
      formData.append("quantity", values.quantity.toString());
      formData.append("price", values.price.toString());
      formData.append("saleprice", values.saleprice.toString());
      formData.append("product_detail", values.product_detail);
      formData.append("status", values.status.toString());
      formData.append("trash", values.trash.toString());

      if (fileList[0]?.originFileObj) {
        formData.append("image", fileList[0].originFileObj); // Đưa file ảnh vào FormData
      }

      if (productId === null){
        const response = await createBook( formData);
        if (response.success) {
          message.success("Thêm sản phẩm thành công!");
          fetchProducts();
          onCancel(); // Đóng modal sau khi cập nhật thành công
        } else {
          message.error(response.message || "Thêm sản phẩm thất bại!");
        }
      }
      else{const response = await updateBook(productId, formData);
        if (response.success) {
          message.success("Cập nhật sản phẩm thành công!");
          fetchProducts();
          onCancel(); // Đóng modal sau khi cập nhật thành công
        } else {
          message.error(response.message || "Cập nhật sản phẩm thất bại!");
        }}
      
    } catch (error) {
      message.error("Lỗi khi cập nhật sản phẩm!");
      console.error(error);
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      const categoryList = await fetchCategoryList(); // Gọi API để lấy danh sách danh mục
      setCategories(categoryList);
    };

    loadCategories();
  }, []);

  useEffect(() => {
    console.log(initialValues)
    if (visible) {
      if (initialValues) {
        form.setFieldsValue(initialValues); // Nếu có giá trị ban đầu, gán giá trị vào form
      } else {
        form.resetFields(); // Nếu không, reset toàn bộ form
      }
    }
  }, [visible, initialValues, form]);
  return (
    <Modal
      title="Chỉnh sửa sản phẩm"
      visible={visible}
      onCancel={onCancel}
      width={1000}
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
        {/* Tên sản phẩm */}
        <Form.Item
          name="product_name"
          label="Tên sản phẩm"
          rules={[
            { required: true, message: "Tên sản phẩm không được bỏ trống" },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Nhà xuất bản */}
        <Form.Item
          name="publisher"
          label="Nhà xuất bản"
          rules={[
            { required: true, message: "Nhà xuất bản không được bỏ trống" },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Tác giả */}
        <Form.Item
          name="author"
          label="Tác giả"
          rules={[{ required: true, message: "Tác giả không được bỏ trống" }]}
        >
          <Input />
        </Form.Item>

        {/* Danh mục */}
        <Form.Item
          name="category_id"
          label="Danh mục"
          rules={[{ required: true, message: "Danh mục không được bỏ trống" }]}
        >
          <Select placeholder="Chọn danh mục">
            {categories.map((category: any) => (
              <Select.Option key={category.id} value={category.id}>
                {category.category_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Có giảm giá */}
        <Form.Item name="sale" label="Giảm giá" valuePropName="checked">
          <Switch
            checkedChildren="Có"
            unCheckedChildren="Không"
            onChange={(checked) => {
              form.setFieldsValue({ sale: checked ? 1 : 0 }); // Gán giá trị 1 hoặc 0 vào form
            }}
          />
        </Form.Item>

        {/* Ảnh */}
        <Form.Item
          name="image"
          label="Ảnh sản phẩm"
          rules={[
            { required: true, message: "Ảnh sản phẩm không được bỏ trống" },
          ]}
        >
          <Upload
            beforeUpload={() => false} // Không tải file ngay lập tức
            fileList={fileList}
            onChange={handleChange}
            listType="picture"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>

        {/* Số lượng */}
        <Form.Item
          name="quantity"
          label="Số lượng"
          rules={[{ required: true, message: "Số lượng không được bỏ trống" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        {/* Giá gốc */}
        <Form.Item
          name="price"
          label="Giá gốc"
          rules={[{ required: true, message: "Giá gốc không được bỏ trống" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        {/* Giá khuyến mãi */}
        <Form.Item
          name="saleprice"
          label="Giá khuyến mãi(giảm 15% thì ghi 15)"
          rules={[
            { required: true, message: "Giá khuyến mãi không được bỏ trống" },
          ]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        {/* Chi tiết sản phẩm */}
        <Form.Item
          name="product_detail"
          label="Chi tiết sản phẩm"
          rules={[
            {
              required: true,
              message: "Chi tiết sản phẩm không được bỏ trống",
            },
          ]}
        >
          <ReactQuill theme="snow" />
        </Form.Item>

        {/* Trạng thái */}
        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[
            { required: true, message: "Trạng thái không được bỏ trống" },
          ]}
        >
          <Select>
            <Select.Option value={0}>Hoạt động</Select.Option>
            <Select.Option value={1}>Không hoạt động</Select.Option>
          </Select>
        </Form.Item>

        {/* Trash */}
        <Form.Item
          name="trash"
          label="Thùng rác"
          rules={[
            {
              required: true,
              message: "Trạng thái thùng rác không được bỏ trống",
            },
          ]}
        >
          <Select>
            <Select.Option value={1}>Đã xóa</Select.Option>
            <Select.Option value={0}>Bình thường</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
