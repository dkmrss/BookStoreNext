"use client";
import { Box, Button, Flex, Text, Textarea, Title } from "@mantine/core";
import style from "./Comments.module.scss";

import { IconChevronDown, IconChevronUp, IconSend } from "@tabler/icons-react";
import { useState } from "react";
import { ArticleCategoryList, DataArticle } from "@/model/DataArticle";
import { TblItem } from "@/model/ProductList";
import { comment, TblUserComment } from "@/model/TblUserComment";
import { modals } from "@mantine/modals";
import FormInfoUser from "./FormInfoUser";
import ReplyComment from "./components/ReplyComment";
import UserComment from "./components/UserComment";
import {
  createUserComment,
  createUserCommentReply,
} from "@/api/apiUserComment";
import { TblProduct } from "@/model/TblBook";

const Comments = ({ dataItem, dataArticle, dataComment }: CommentsProps) => {
  const [seeMore, setSeeMore] = useState(false);
  const [inputComment, setInputComment] = useState("");
  const [inputReply, setInputReply] = useState("");
  const [isNull, setIsNull] = useState(false);

  const [pageSize, setPageSize] = useState(5);
  const [isReply, setIsReply] = useState<{
    index: number;
    idComment: number;
  }>();
  const [loading, setLoading] = useState(true);

  const handleSendComment = () => {
    modals.openConfirmModal({
      modalId: "FormInfoUser",
      title: (
        <>
          <Title order={5}>Nhập thông tin</Title>
        </>
      ),
      centered: true,
      children: (
        <FormInfoUser
          // data={userInfo?.data || []}
          handleSubmitComment={handleSubmitComment}
        />
      ),
      zIndex: 1000,
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
      size: "20rem",
      classNames: {
        header: style.header,
        content: style.content,
      },
    });
  };

  const handleSendReply = () => {
    modals.openConfirmModal({
      modalId: "FormInfoUser",
      title: (
        <>
          <Title order={5}>Nhập thông tin</Title>
        </>
      ),
      centered: true,
      children: (
        <FormInfoUser
          // data={userInfo?.data || []}
          handleSubmitCommentReply={handleSubmitCommentReply}
        />
      ),
      zIndex: 1000,
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
      size: "20rem",
      classNames: {
        header: style.header,
        content: style.content,
      },
    });
  };

  const handleSubmitComment = async (dataSummit: {
    userName: string;
    userEmail: string;
  }) => {
    const data = {
      id: 0,
      itemType: dataItem ? "product" : "article",
      replyCount: null,
      itemId: dataItem ? dataItem?.id : dataArticle?.id,
      itemTitle: dataItem ? dataItem?.product_name : dataArticle?.title,
      isUserAdmin: null,
      userId: null,
      userEmail: dataSummit.userEmail,
      userName: dataSummit.userName,
      relatedOrder: null,
      userAvatar: null,
      userNote: null,
      rate: null,
      title: null,
      content: inputComment,
      files: null,
      searchFulltext: null,
      approved: "0",
      postTime: null,
      ipAddress: null,
      userAgent: null,
      orderNumber: null,
      isFeatured: null,
      peopleIdVote: null,
      peopleLikeCount: null,
      peopleDislikeCount: null,
      priorStatus: null,
      status: null,
      creationDate: null,
      createdBy: null,
      lastUpdateDate: null,
      lastUpdateBy: null,
    };

    await createUserComment(data);
    setInputComment("");

    modals.close("FormInfoUser");
  };

  const handleSubmitCommentReply = async (dataSummit: {
    userName: string;
    userEmail: string;
  }) => {
    const data = {
      id: 0,
      commentId: isReply?.idComment,
      isUserAdmin: null,
      userId: null,
      userEmail: dataSummit.userEmail,
      userName: dataSummit.userName,
      userAvatar: null,
      userNote: null,
      rate: null,
      title: null,
      content: inputReply,
      files: null,
      approved: null,
      postTime: null,
      ipAddress: null,
      orderNumber: null,
      isFeatured: null,
      peopleIdVote: null,
      peopleLikeCount: null,
      peopleDislikeCount: null,
      creationDate: null,
      createdBy: null,
      lastUpdateDate: null,
      lastUpdateBy: null,
    };

    await createUserCommentReply(data);

    setInputReply("");
    setIsReply(undefined);

    modals.close("FormInfoUser");
    // fetchDataComment();
  };

  const handleAddReply = (index: number, idComment: number) => {
    if (index === isReply?.index) {
      setIsReply(undefined);
    } else setIsReply({ index: index, idComment: idComment });
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
              disabled={inputComment ? false : true}
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
              <UserComment
                data={item}
               
              />
              
            </Box>
          ))}
        </Box>
      )}

      {!dataComment ? (
        <div></div>
      ) : pageSize === 5 && dataComment && pageSize > dataComment?.length ? (
        <div></div>
      ) : dataComment && pageSize >= dataComment?.length ? (
        <Flex className={style.seeMore} onClick={() => setPageSize(5)}>
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
  dataArticle?: DataArticle | null;
  dataComment: comment[] | null;
};
