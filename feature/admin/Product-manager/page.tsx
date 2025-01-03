"use client";

import {
  deleteBook,
  getDataListProductBookNormal,
  updateStatus,
  updateTrash,
} from "@/api/ApiBookProduct";
import { Image } from "@mantine/core";
import {
  Button,
  message,
  Space,
  Table,
  Tag,
  Tooltip,
  Form,
  Select,
  Input,
  InputNumber,
  Menu,
  Card,
  Modal,
} from "antd";
import React, { useEffect, useState } from "react";
import EditModal from "./component/EditModal/EditModal";
import InfoModal from "./component/InfoModal/InfoModal";
import { ColumnsType } from "antd/es/table";
import { EditOutlined, EyeOutlined, DeleteOutlined, CommentOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { getDataListCategory } from "@/api/ApiCategory";
import CommentModal from "./component/UserComment";
import style from "./UserInformation.module.scss"
import HeaderSection from "@/components/HeaderSection";
interface Product {
  id: number;
  product_name: string;
  price: number;
  image: string;
  sale: number;
  quantity: number;
  status: number;
  trash: number;
}

const ProductsTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<any>({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [categories, setCategories] = useState<any[]>([]);
  const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [isInfoModalVisible, setInfoModalVisible] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isCommentModalVisible, setCommentModalVisible] = useState<boolean>(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [filterForm] = Form.useForm(); // Form để lưu giá trị bộ lọc
  const { confirm } = Modal;
  // Fetch product data
  const fetchProducts = async (
    page = 1,
    pageSize = 10,
    appliedFilters = {}
  ): Promise<void> => {
    setLoading(true);
    try {
      const query = {
        ...appliedFilters,
        limit: pageSize,
        offset: (page - 1) * pageSize,
      };
      const queryString = new URLSearchParams(query as any).toString();
      const response = await getDataListProductBookNormal(`?${queryString}`);
      setProducts(response.data);
      setPagination({
        ...pagination,
        current: page,
        total: response.totalCount || 0,
      });
    } catch (error) {
      message.error("Không thể lấy dữ liệu sản phẩm.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterSubmit = (values: any) => {
    const cleanedFilters: any = {};

    if (values.name) {
      cleanedFilters.name = values.name;
    }
    if (values.priceMin !== undefined && !isNaN(values.priceMin)) {
      cleanedFilters.priceMin = values.priceMin;
    }
    if (values.priceMax !== undefined && !isNaN(values.priceMax)) {
      cleanedFilters.priceMax = values.priceMax;
    }
    if (values.status !== undefined) {
      cleanedFilters.status = values.status;
    }
    if (values.sale !== undefined) {
      cleanedFilters.sale = values.sale;
    }
    if (values.category !== undefined) {
      cleanedFilters.category = values.category;
    }
    setFilters(cleanedFilters); // Lưu bộ lọc vào state
    setPagination({ ...pagination, current: 1 }); // Reset về trang đầu tiên
    fetchProducts(1, pagination.pageSize, cleanedFilters);
  };

  const fetchCategoryList = async () => {
    try {
      const response = await getDataListCategory("/0");
      if (response && response.data) {
        setCategories(response.data);
      } else {
        console.log("Dữ liệu danh mục không tồn tại");
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách danh mục:", error);
    }
  };

  useEffect(() => {
    fetchProducts(pagination.current, pagination.pageSize, filters);
    fetchCategoryList();
  }, []);

  const handleTableChange = (paginationConfig: any): void => {
    const { current, pageSize } = paginationConfig;
    setPagination({
      ...pagination,
      current,
      pageSize,
    });
    fetchProducts(current, pageSize, filters);
  };

  const handleUpdateStatus = async (id: number): Promise<void> => {
    try {
      const result = await updateStatus(id);
      if (result) {
        message.success("Cập nhật trạng thái thành công.");
        fetchProducts(pagination.current, pagination.pageSize);
      }
    } catch (error) {
      message.error("Cập nhật trạng thái thất bại.");
    }
  };

  const handleUpdateTrash = async (id: number): Promise<void> => {
    try {
      const result = await updateTrash(id);
      if (result) {
        message.success("Cập nhật trạng thái thùng rác thành công.");
        fetchProducts(pagination.current, pagination.pageSize);
      }
    } catch (error) {
      message.error("Cập nhật trạng thái thùng rác thất bại.");
    }
  };

  

  const showDeleteConfirm = (id: number) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa tin tức này?",
      icon: <ExclamationCircleOutlined />,
      content: "Hành động này không thể hoàn tác.",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async (): Promise<void> => {
        try {
          const result = await deleteBook(id); // Gọi API để xóa
          if (result.success) {
            message.success("Xóa sản phẩm thành công.");
            fetchProducts(pagination.current, pagination.pageSize); // Cập nhật lại danh sách
          } else {
            message.error(result.message || "Xóa sản phẩm thất bại.");
          }
        } catch (error) {
          message.error("Lỗi khi xóa sản phẩm!");
          console.error(error);
        }
      },
    });
  };

  const getCategoryName = (categoryId: number) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.category_name : "Không xác định";
  };

  const columns: ColumnsType<Product> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "5%",
      responsive: ["md"],
      // Đặt responsive ở đây
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "product_name",
      key: "product_name",
      width: "15%",
      // Đặt responsive
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: "10%",
      render: (price: number) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      width: "20%",
      render: (image: string) => (
        <Image
          src={`${
            process.env.NEXT_PUBLIC_URL || "http://localhost:3001"
          }/${image}`}
          alt="Sản phẩm"
          style={{ width: 100, height: 120, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Thể loại",
      dataIndex: "category_id",
      key: "category_id",
      width: "10%",
      render: (category_id: number) => <Tag color="blue">{getCategoryName(category_id)}</Tag>, // Hiển thị tên danh mục
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: "10%",
      render: (quantity: number) => `${quantity} sản phẩm`,
    },
    {
      title: "Trạng thái & Hành động",
      key: "status_actions",
      width: "15%",
      render: (_: any, record: Product) => (
        <Space direction="vertical">
          {/* Trạng thái sale */}
          <Tag color={record.sale === 1 ? "gold" : "default"}>
            {record.sale === 1 ? "Đang giảm giá" : "Không giảm giá"}
          </Tag>
          {/* Trạng thái */}
          <Tag
            color={record.status === 0 ? "green" : "red"}
            onClick={() => handleUpdateStatus(record.id)}
            style={{ cursor: "pointer" }}
          >
            {record.status === 0 ? "Hoạt động" : "Không hoạt động"}
          </Tag>
          {/* Trạng thái thùng rác */}
          <Tag
            color={record.trash === 1 ? "volcano" : "blue"}
            onClick={() => handleUpdateTrash(record.id)}
            style={{ cursor: "pointer" }}
          >
            {record.trash === 1 ? "Trong thùng rác" : "Bình thường"}
          </Tag>
        </Space>
      ),
    },
    

    {
      title: "Thao tác",
      key: "action",
      width: "15%",
      render: (_: any, record: Product) => (
        <Space direction="vertical" size="small">
          {/* Sửa */}
          <Tooltip title="Chỉnh sửa sản phẩm">
            <EditOutlined
              style={{ color: "blue", fontSize: "18px", cursor: "pointer" }}
              onClick={() => {
                setCurrentProduct(record);
                setEditModalVisible(true);
              }}
            />
          </Tooltip>

          {/* Chi tiết */}
          <Tooltip title="Xem chi tiết sản phẩm">
            <EyeOutlined
              style={{ color: "green", fontSize: "18px", cursor: "pointer" }}
              onClick={() => {
                setCurrentProduct(record);
                setInfoModalVisible(true);
              }}
            />
          </Tooltip>

          {/* Xóa vĩnh viễn */}
          <Tooltip title="Xóa sản phẩm vĩnh viễn">
            <DeleteOutlined
              style={{ color: "red", fontSize: "18px", cursor: "pointer" }}
              onClick={() => showDeleteConfirm(record.id)}
            />
          </Tooltip>

          <Tooltip title="Quản lý bình luận">
            <CommentOutlined
              style={{ fontSize: "18px", color: "blue", cursor: "pointer" }}
              onClick={() => {
                setSelectedBookId(record.id);
                setCommentModalVisible(true);
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

 

  return (
    <>
    <HeaderSection title={"Quản sản phẩm"} />
      <Card style={{ marginBottom: 16 }}>
        <Form
          layout="inline"
          form={filterForm}
          onFinish={handleFilterSubmit}
          className={style.form}
          style={{ marginBottom: 16, display: "flex", flexWrap: "wrap" }}
        >
          <Form.Item className={style.formItem} name="name" label="Tên sản phẩm">
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>
          <Form.Item className={style.formItem} name="category" label="Danh mục">
            <Select style={{ width: 200 }} placeholder="Chọn danh mục">
              {categories.map((category: any) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.category_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item className={style.formItem} name="priceMin" label="Giá từ">
            <InputNumber style={{ width: 120 }} min={0} />
          </Form.Item>
          <Form.Item  className={style.formItem} name="priceMax" label="Đến">
            <InputNumber style={{ width: 120 }} min={0} />
          </Form.Item>
          <Form.Item className={style.formItem} name="status" label="Trạng thái">
            <Select placeholder="Chọn trạng thái" style={{ width: 150 }}>
              <Select.Option value="0">Hoạt động</Select.Option>
              <Select.Option value="1">Không hoạt động</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item className={style.formItem} name="sale" label="Sale">
            <Select placeholder="Chọn sale" style={{ width: 150 }}>
              <Select.Option value="1">Đang giảm giá</Select.Option>
              <Select.Option value="0">Không giảm giá</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item className={style.formItem}>
            <Button  className={style.custombutton} htmlType="submit">
              Lọc
            </Button>
          </Form.Item>
          <Form.Item className={style.formItem}>
            <Button
             className={style.custombutton2}
              onClick={() => {
                filterForm.resetFields(); // Reset giá trị trong form
                setFilters({}); // Xóa bộ lọc trong state
                fetchProducts(1, pagination.pageSize, {}); // Lấy lại danh sách sản phẩm không có bộ lọc
              }}
            >
              Bỏ Lọc
            </Button>
          </Form.Item>
        </Form>
        <Button
          type="primary"
          className={style.custombutton}
          style={{ marginTop: 8 }}
          
          onClick={() => {
            setCurrentProduct(null);
            setEditModalVisible(true);
          }}
        >
          Thêm sản phẩm
        </Button>
      </Card>
      <Table
        columns={columns}
        dataSource={products}
        loading={loading}
        rowKey="id"
        pagination={pagination}
        onChange={handleTableChange}
      />
      <EditModal
        visible={isEditModalVisible}
        onCancel={() => {
          setEditModalVisible(false), setCurrentProduct(null);
        }}
        initialValues={currentProduct}
        productId={currentProduct?.id || null}
        fetchProducts={fetchProducts}
      />
      <InfoModal
        visible={isInfoModalVisible}
        onCancel={() => setInfoModalVisible(false)}
        productId={currentProduct?.id || null}
      />
      <CommentModal
        visible={isCommentModalVisible}
        onCancel={() => setCommentModalVisible(false)}
        bookId={selectedBookId}
      />
    </>
  );
};

export default ProductsTable;
