"use client";
import InformationCard from "@/common/InformationCard";
import { Button, Flex } from "@mantine/core";
import { useState } from "react";
import style from "./footerCategory.module.scss";
import Comments from "@/common/Comments";
import { comment } from "@/model/TblUserComment";

interface ContentProps {
  data: string;
  dataComment: comment[] | null;
}
const FooterContent: React.FC<ContentProps> = ({ data, dataComment }) => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMoreClick = () => {
    setShowMore(!showMore);
  };
  return (
    <div className={style.footerCategory}>
      <div className={style.leftBox}>
        <div
          className={`${style.contentBox} ${showMore && style.showcontentBox}`}
        >
          <div
            className={style.content}
            dangerouslySetInnerHTML={{ __html: data }}
          ></div>
          {!showMore ? (
            <div className={style.overlay}>
              <Button
                className={style.button}
                variant="default"
                radius={"md"}
                id="showMoreButton"
                onClick={handleShowMoreClick}
              >
                Xem thêm
              </Button>
            </div>
          ) : (
            <Flex justify={"center"} mb={20}>
              <Button
                className={style.buttonClose}
                variant="default"
                radius={"md"}
                onClick={handleShowMoreClick}
              >
                Thu gọn
              </Button>
            </Flex>
          )}
        </div>
        <Comments dataItem={null} dataComment={dataComment || null} />
      </div>
      <div className={style.InformationBox}>
        <InformationCard />
      </div>
    </div>
  );
};

export default FooterContent;
