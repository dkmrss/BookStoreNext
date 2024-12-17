"use client";
import React, { useRef } from "react";
import style from "./TopHeader.module.scss";
import { Box, Flex, Group, Image, Text, useMantineTheme } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconBulbFilled,
  IconMicroscope,
  IconBriefcaseFilled,
} from "@tabler/icons-react";
import AppContainer from "@/common/AppContainer";
import Autoplay from "embla-carousel-autoplay";

const TopHeader = () => {
  const data = [
    {
      id: 1,
      image: <IconBulbFilled />,
      text: "Chuyên Môn",
    },
    {
      id: 2,
      image: <IconMicroscope />,
      text: "Chuyên Sâu",
    },
    {
      id: 1,
      image: <IconBriefcaseFilled />,
      text: "Chuyên Nghiệp",
    },
  ];
  const autoplay = useRef(Autoplay({ delay: 4000 }));
  // const theme = useMantineTheme();
  // const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <Box className={style.top_header}>
      <Box className={style.container}>
        <Box className={style.group}>
          {data?.map((value, index) => (
            <Flex gap={5} c={"var(--clr-primary)"}>
              {value.image}
              <Text fw={800} c={"black"}>
                {value.text}
              </Text>
            </Flex>
          ))}
        </Box>
        <Carousel
          slideSize={{ base: "100%", sm: "50%" }}
          slideGap={{ base: 0, sm: "md" }}
          align="center"
          className={style.Carousel}
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
          loop
        >
          {data?.map((value, index) => (
            <Carousel.Slide key={index} className={style.carousel_slide}>
              <Flex c={"var(--clr-primary)"} gap={5}>
                {value.image}
                <Text fw={800} c={"black"}>
                  {value.text}
                </Text>
              </Flex>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default TopHeader;
