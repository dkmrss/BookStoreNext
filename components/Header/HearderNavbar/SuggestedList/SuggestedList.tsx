"use client";
import ChildProduct from "@/common/ChildProduct/ChildProduct";
import TitleSearch from "@/common/TitleSearch/TitleSearch";
import { Box } from "@mantine/core";
import { IconPaperclip } from "@tabler/icons-react";
import React from "react";
import style from "./SuggestedList.module.scss";

const SuggestedList = ({
  setIsFocus,
  data,
  handleSendClick,
}: {
  setIsFocus: React.Dispatch<React.SetStateAction<boolean>>;
  data: string[];
  handleSendClick?: (textSearch?: string) => void;
}) => {
  return (
    <Box className={style.SuggestedList}>
      <TitleSearch>Danh sách gợi ý</TitleSearch>
      <Box className={style.box} pb={5}>
        {data?.map((element, index) => {
          return (
            <Box key={index}>
              <ChildProduct
                icon={<IconPaperclip size={14} />}
                hover
                text={element}
                list
                setIsFocus={setIsFocus}
                handleSendClick={handleSendClick}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default SuggestedList;
