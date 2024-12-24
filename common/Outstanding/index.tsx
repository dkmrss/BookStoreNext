"use client";
import { Box, Button, Modal, ScrollArea, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTag, IconX } from "@tabler/icons-react";
import Link from "next/link";
import style from "./Outstanding.module.scss";

interface OutstandingProps {
  title: string;
  link: string;
}

interface OutstandingListProps {
  listOutstanding?: OutstandingProps[];
}

const Outstanding: React.FC<OutstandingListProps> = ({ listOutstanding }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Box className={style.outstanding}>
        <Text fw={500}>Nổi bật</Text>
        <Box className={style.listTag}>
          {listOutstanding?.slice(0, 9).map((item, index) => (
            <Box key={index} className={style.tag}>
              <IconTag size={"16px"} color="white" />
              <Link href={item.link} className={style.title}>
                {item.title}
              </Link>
            </Box>
          ))}
        </Box>
        <Button className={style.button} onClick={open}>
          Xem thêm
        </Button>
      </Box>
      <Modal
        opened={opened}
        onClose={close}
        size={550}
        title="Các từ khóa được tìm kiếm nhiều"
        closeButtonProps={{
          icon: <IconX size={18} color="red" />,
        }}
        className={style.seeMore}
        centered
      >
        <ScrollArea h={280} type="always" mt="md">
          <Box className={style.listTag}>
            {listOutstanding?.map((item, index) => (
              <Box key={index} className={style.tag}>
                <IconTag size={"16px"} color="white" />
                <Link href={item.link} className={style.title}>
                  {item.title}
                </Link>
              </Box>
            ))}
          </Box>
        </ScrollArea>
      </Modal>
    </>
  );
};

export default Outstanding;
