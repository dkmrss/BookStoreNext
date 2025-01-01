import React from "react";
import { Modal, Descriptions } from "antd";

interface InfoModalProps {
  visible: boolean;
  onCancel: () => void;
  article: {
    title: string;
    short_description: string;
    content: string;
    avatar: string;
    status: number;
    created_at: string;
  } | null;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onCancel, article }) => {
  return (
    <Modal
      title="Thông tin bài viết"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={1000}
    >
      {article ? (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Tiêu đề">
            {article.title}
          </Descriptions.Item>
          <Descriptions.Item label="Mô tả ngắn">
            {article.short_description}
          </Descriptions.Item>
          <Descriptions.Item label="Nội dung">
            <div
              dangerouslySetInnerHTML={{ __html: article.content }}
              style={{
                padding: "10px",
                background: "#f5f5f5",
                borderRadius: "5px",
                maxHeight: "300px",
                overflow: "auto",
              }}
            />
          </Descriptions.Item>
          
        </Descriptions>
      ) : (
        <p>Không có dữ liệu bài viết.</p>
      )}
    </Modal>
  );
};

export default InfoModal;
