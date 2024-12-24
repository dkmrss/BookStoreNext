"use client";

import { getDataListKeySearch } from "@/api/ApiKeySearch";
import Outstanding from "@/common/Outstanding";
import { useEffect, useState } from "react";
 // Import API

export interface ListOutstanding {
  title: string;
  link: string;
}

const OutStandingList: React.FC = () => {
  const [data, setData] = useState<ListOutstanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOutstandingData = async () => {
    try {
      const response = await getDataListKeySearch("?limit=10"); // Gọi API lấy từ khóa
      if (response?.success && response?.data) {
        const formattedData = response.data.map((item: any) => ({
          title: item.keyword,
          link: `/Search/${encodeURIComponent(item.keyword)}`, // Tạo link tìm kiếm
        }));
        setData(formattedData);
        setError(null);
      } else {
        setError("Không thể lấy dữ liệu từ khóa tìm kiếm.");
        setData([]);
      }
    } catch (err) {
      console.error("Lỗi khi gọi API:", err);
      setError("Có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOutstandingData();
  }, []);

  if (loading) {
    return <div>Đang tải...</div>; // Hiển thị spinner hoặc trạng thái tải
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>; // Hiển thị lỗi
  }

  return (
    <div style={{ padding: "10px 0px", display: "flex", gap: 10 }}>
      <Outstanding listOutstanding={data} />
    </div>
  );
};

export default OutStandingList;
