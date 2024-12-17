"use client";
import iconExtra from "@/assets/iconExtra.svg";
import iconGift from "@/assets/iconGift.svg";
import { TblItem } from "@/model/ProductList";
import { Box, Flex, NumberFormatter, Text } from "@mantine/core";
import Image from "next/image";
import { useState } from "react";
import style from "./Specifications.module.scss";
import {
  IconCaretDownFilled,
  IconCaretUpFilled,
  IconGift,
} from "@tabler/icons-react";

const Gifts = ({ data }: { data: TblItem | null }) => {
  const [dataPromotions, setDataPromotions] = useState<any[]>([]);
  const [giftsIncentivesCount, setGiftsIncentivesCount] = useState(2);

  const dataGiftsIncentives = [
    {
      title: "khi mua Balo, Cặp, Túi chống sốc cao cấp...",
      price: 50000,
      link: "_",
    },
    {
      title: "khi mua Ram Laptop thương hiệu KINGSTON",
      price: 100000,
      link: "_",
    },
    {
      title: "khi mua Ram Laptop thương hiệu LEXAR",
      price: 100000,
      link: "_",
    },
    {
      title: "khi mua Ghế công thái học thương hiệu LEGION",
      price: 200000,
      link: "_",
    },
    {
      title: "khi mua kèm phần mềm diệt virus",
      price: 40000,
      link: "_",
    },
    {
      title: "khi mua kèm Ổ HDD",
      price: 500000,
      link: "_",
    },
    {
      title: "khi mua Ram Laptop thương hiệu LEXAR",
      price: 100000,
      link: "_",
    },
  ];

  const handleExpandGiftsIncentives = () => {
    if (dataPromotions.length > 0) {
      // Kiểm tra nếu dataPromotions có ít nhất một phần tử
      if (dataPromotions.length > 2 && giftsIncentivesCount <= 2) {
        setGiftsIncentivesCount(dataPromotions.length);
      } else {
        setGiftsIncentivesCount(2);
      }
    } else {
      if (dataGiftsIncentives.length > 2 && giftsIncentivesCount <= 2) {
        setGiftsIncentivesCount(dataGiftsIncentives.length);
      } else {
        setGiftsIncentivesCount(2);
      }
    }
  };
  return (
    <>
      {dataPromotions.length > 0 && (
        <Box className={style.giftsIncentives}>
          <Box className={style.giftsIncentivesHeader}>
            <IconGift color="var(--clr-light-primary)" />
            <Text>Khuyến mại</Text>
          </Box>
          <Box className={style.giftsIncentivesWrapper}>
            {dataPromotions
              ?.slice(0, giftsIncentivesCount)
              ?.map((item, index) => (
                <Flex
                  className={style.giftsIncentivesItem}
                  justify={"space-between"}
                  align={"center"}
                  key={index}
                >
                  <Flex align={"center"} gap={10}>
                    <Box className={style.giftsIncentivesCount}>
                      {index + 1}
                    </Box>
                    <Text>{item}</Text>
                  </Flex>
                </Flex>
              ))}

            {giftsIncentivesCount < dataGiftsIncentives.length ? (
              <Text
                className={style.extra}
                onClick={handleExpandGiftsIncentives}
              >
                Xem thêm ưu đãi{" "}
                <IconCaretDownFilled color="var(--clr-light-primary)" />
              </Text>
            ) : (
              <Text
                className={style.extra}
                onClick={handleExpandGiftsIncentives}
              >
                Ẩn bớt <IconCaretUpFilled color="var(--clr-light-primary)" />
              </Text>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Gifts;
