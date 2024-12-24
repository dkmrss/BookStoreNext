"use client";
import { Box, Button, Flex, Text, Textarea, Title } from "@mantine/core";
import style from "./Comments.module.scss";
import { Article } from "@/model/DataArticle";
import { TblProduct } from "@/model/TblBook";
import { comment } from "@/model/TblUserComment";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useState } from "react";
import UserComment from "./components/UserComment";
import { createComment } from "@/api/ApiComment";
import { NotificationExtension } from "@/extension/NotificationExtension";

const isAuthenticated = (): boolean => {
  try {
    const token = localStorage.getItem("token");
    return !!token; // Trả về true nếu token tồn tại và không rỗng
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false; // Trả về false nếu có lỗi
  }
};

const Comments = ({ dataItem, dataArticle, dataComment }: CommentsProps) => {
  const [seeMore, setSeeMore] = useState(false);
  const [inputComment, setInputComment] = useState("");
  const [pageSize, setPageSize] = useState(4);

  const handleSendComment = async () => {
    if (!isAuthenticated()) {
      NotificationExtension.Warn("Bạn cần đăng nhập để gửi bình luận.");
      
      return;
    }

    if (!inputComment.trim()) {
      NotificationExtension.Warn("BVui lòng nhập nội dung bình luận.");
      
      return;
    }

    const parsedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const bookId = dataItem?.id || dataArticle?.id;
    const commentData = {
      user_id: parsedUser?.id || null,
      book_id: bookId || 0,
      content: inputComment,
    };
console.log(commentData)
    try {
      const response = await createComment(commentData); // Gọi API để tạo bình luận
      if (response?.success) {
        setInputComment(""); // Xóa nội dung comment
        NotificationExtension.Success("Bình luận của bạn đã được gửi thành công!");
        // Thêm hàm fetch để cập nhật danh sách bình luận nếu cần
      } else {
        console.error("Tạo bình luận thất bại:", response?.message);
        NotificationExtension.Fails("Gửi bình luận thất bại, vui lòng thử lại.");
        
      }
    } catch (error) {
      console.error("Lỗi khi tạo bình luận:", error);
      NotificationExtension.Fails("Lỗi khi tạo bình luận");
    }
  };

  const handleClickSeeMore = () => {
    setPageSize(pageSize + 10);
  };

  return (
    <div className={style.main}>
      <Box mb={15}>
        <Box className={style.submitComment}>
          <Textarea
            w={"100%"}
            variant="unstyled"
            placeholder="Mời bạn để lại bình luận..."
            value={inputComment}
            onChange={(event) => setInputComment(event.currentTarget.value)}
          />
          <Flex w={"100%"} justify={"flex-end"}>
            <Button
              className={style.button}
              onClick={handleSendComment}
              disabled={!inputComment}
            >
              <Text fw="600" size="sm" c="#fff">
                Gửi bình luận
              </Text>
            </Button>
          </Flex>
        </Box>
      </Box>
      {dataComment && dataComment?.length > 0 && (
        <Box className={`${style.commentWrap} ${seeMore && style.expand} `}>
          {dataComment?.slice(0, pageSize).map((item, index) => (
            <Box key={index} className={style.comment}>
              <UserComment data={item} />
            </Box>
          ))}
        </Box>
      )}
      {!dataComment ? (
        <div></div>
      ) : pageSize === 4 && dataComment && pageSize > dataComment?.length ? (
        <div></div>
      ) : dataComment && pageSize >= dataComment?.length ? (
        <Flex className={style.seeMore} onClick={() => setPageSize(4)}>
          <Text>Ẩn bớt</Text>
          <IconChevronUp size={18} color="#0052CC" />
        </Flex>
      ) : (
        <Flex className={style.seeMore} onClick={() => handleClickSeeMore()}>
          <Text>Xem thêm</Text>
          <IconChevronDown size={18} color="#0052CC" />
        </Flex>
      )}
    </div>
  );
};

export default Comments;

type CommentsProps = {
  dataItem?: TblProduct | null;
  dataArticle?: Article | null;
  dataComment: comment[] | null;
};
