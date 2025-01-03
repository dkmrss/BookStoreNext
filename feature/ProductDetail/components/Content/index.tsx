"use client";
import { Box, Button, Flex, Text } from "@mantine/core";
import { useState, useEffect } from "react";
import style from "./style.module.scss";
import { IconInfoOctagon } from "@tabler/icons-react";

interface ContentProps {
  data: string | null;
}
const ContentBox: React.FC<ContentProps> = ({ data }) => {
  
  const [processedHTML, setProcessedHTML] = useState<string | null>(null);

  

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
      <Box className={style.header}>
        <Text>Mô tả sản phẩm</Text>
      </Box>
      <div
        className={style.showcontentBox}
      >
        <div
          className={style.content}
          dangerouslySetInnerHTML={{ __html: processedHTML }}
        ></div>
      
      </div>
    </div>
  );
};

export default ContentBox;
