import React, { ReactNode } from "react";
import style from "./TitleSearch.module.scss";
import { Box, Text } from "@mantine/core";

type TitleSearchProps = {
  children: ReactNode;
};

const TitleSearch: React.FC<TitleSearchProps> = ({ children }) => {
  return (
    <Box bg="#f3f3f3" className={style.titleSearch}>
      <Text p={5} fw={700}>
        {children}:
      </Text>
    </Box>
  );
};

export default TitleSearch;
