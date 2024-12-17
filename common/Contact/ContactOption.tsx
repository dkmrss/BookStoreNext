import React from "react";
import { Box, Text, Flex } from "@mantine/core";
import {
  IconChevronUp,
  IconMessages,
  IconPhoneCall,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import style from "./Contact.module.scss";
import zalo from "@/assets/zalo 3.webp";
import { useViewportSize } from "@mantine/hooks";

interface ContactFirstProps {
  showScroll: boolean;
  scrollToTop: () => void;
  open: () => void;
}

const ContactOption: React.FC<ContactFirstProps> = ({
  showScroll,
  scrollToTop,
  open,
}) => {
  const handleCall = () => {
    window.location.href = "tel:18008091";
  };

  const frameSize = useViewportSize();
  return (
    <Box>
      {showScroll && (
        <Flex justify={"end"}>
          <Box
            ta={"center"}
            bg={"var(--clr-primary)"}
            style={{ borderRadius: "5px", cursor: "pointer" }}
            p={frameSize.width < 600 ? 2 : 5}
            onClick={scrollToTop}
          >
            <IconChevronUp
              size={frameSize.width < 600 ? 12 : 18}
              color="#fff"
            />
            <Text
              size={frameSize.width < 600 ? "8px" : "10px"}
              fw={500}
              c={"#fff"}
            >
              Lên đầu
            </Text>
          </Box>
        </Flex>
      )}
      <Flex mt={10} gap={10} justify={"end"}>
        <Link href={"#"}>
          <Image
            src={zalo}
            alt="zalo"
            width={frameSize.width < 600 ? 32 : 45}
            height={frameSize.width < 600 ? 32 : 45}
            style={{ borderRadius: "50px", cursor: "pointer" }}
          />
        </Link>
        {/* <Flex
          bg={"var(--clr-primary)"}
          w={45}
          h={45}
          style={{ borderRadius: "50px", cursor: "pointer" }}
          justify={"center"}
          align={"center"}
          onClick={open}
        >
          <IconMessages size={30} color="#fff" />
        </Flex> */}
      </Flex>
      <Flex
        mt={2}
        style={{ cursor: "pointer" }}
        justify={"end"}
        onClick={handleCall}
      >
        <Box
          bg={"var(--clr-primary)"}
          p={"8px 30px 8px 12px"}
          style={{ borderRadius: "20px" }}
          h={frameSize.width < 600 ? 21 : 42}
          className={style.phoneContact}
        >
          <Text c={"#fff"} fw={500} size={frameSize.width < 600 ? "xs" : "md"}>
            Gọi: 1800 8091
          </Text>
        </Box>
        <Flex
          bg={"#fff"}
          align={"center"}
          justify={"center"}
          bd={"1px solid var(--clr-primary)"}
          p={frameSize.width < 600 ? "5px 5px" : "10px 10px"}
          w={frameSize.width < 600 ? 26 : 52}
          h={frameSize.width < 600 ? 26 : 52}
          style={{ borderRadius: "50px", zIndex: "1000" }}
        >
          <IconPhoneCall
            color="var(--clr-primary)"
            size={frameSize.width < 600 ? 16 : 32}
          />
        </Flex>
      </Flex>

      {/* <Flex
        bg={"var(--clr-primary)"}
        mt={10}
        p={"5px 120px 5px 10px"}
        gap={5}
        align={"center"}
        justify={"start"}
        style={{ borderRadius: "10px 10px 0px 0px" }}
      >
        <IconMessages color="#fff" size={18} />
        <Text c={"#fff"} size="14px">
          Chat với nhân viên tư vấn !
        </Text>
      </Flex> */}
    </Box>
  );
};

export default ContactOption;
