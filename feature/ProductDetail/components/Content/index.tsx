"use client";
import InformationCard from "@/common/InformationCard";
import { Button, Flex } from "@mantine/core";
import { useState, useEffect } from "react";
import style from "./style.module.scss";

interface ContentProps {
  data: string | null;
}
const ContentBox: React.FC<ContentProps> = ({ data }) => {
  const [showMore, setShowMore] = useState(false);
  const [processedHTML, setProcessedHTML] = useState<string | null>(null);

  const handleShowMoreClick = () => {
    setShowMore(!showMore);
  };

  useEffect(() => {
    if (data) {
      // Replace occurrences of 'src="/media' and 'src="/Media' with the desired URL

      const modifiedHTML = data.replace(
        /src="\/media/gi,
        'src="https://hanoicomputercdn.com/media'
      );
      setProcessedHTML(modifiedHTML);
    }
  }, [data]);

  if (!processedHTML) {
    return null; // Or display a suitable message instead of null
  }

  return (
    <div className={style.footerCategory}>
      <div
        className={`${style.contentBox} ${showMore && style.showcontentBox}`}
      >
        <div
          className={style.content}
          dangerouslySetInnerHTML={{ __html: processedHTML }}
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
          <Flex justify={"center"}>
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
    </div>
  );
};

export default ContentBox;
