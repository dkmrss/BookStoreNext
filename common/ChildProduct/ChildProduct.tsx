"use client";
import React from "react";
import style from "./ChildProduct.module.scss";
import { Box, Flex, Grid, Image, NumberFormatter, Text } from "@mantine/core";
import Link from "next/link";

type props = {
  text?: string;
  image?: string;
  price?: string;
  hover?: any;
  to?: any;
  icon?: any;
  child?: any;
  list?: any;
  search?: any;
  setIsFocus: React.Dispatch<React.SetStateAction<boolean>>;
  handleSendClick?: (textSearch?: string) => void;
};

const ChildProduct: React.FC<props> = ({
  to,
  text,
  image,
  price,
  setIsFocus,
  icon = false,
  hover = false,
  child = false,
  list = false,
  search = false,
  handleSendClick,
}) => {
  const classes = `${style.box} ${child ? style.child : ""} ${
    hover ? style.hover : ""
  } ${list ? style.list : ""}  ${search ? style.search : ""}  `;

  const handleClickSuggest = () => {
    if (handleSendClick) {
      setIsFocus(false);
      handleSendClick(text);
    }
  };

  return (
    <Box className={classes}>
      {to ? (
        <Link href={to} onClick={() => setIsFocus(false)}>
          <Box className={`${style.container}`}>
            {!icon ? (
              <>
                <Image radius="md" src={image} alt="img_product" />
              </>
            ) : (
              <>{icon}</>
            )}
            <Box className={style.infoProduct}>
              <Text fw={500} size="xs" lineClamp={2} ml={8}>
                {text}
              </Text>
              <NumberFormatter
                style={{ height: "20px", lineHeight: "20px" }}
                thousandSeparator="."
                decimalSeparator=","
                value={price}
                suffix="  đ"
                className={style.formatNumber}
              />
            </Box>
          </Box>
        </Link>
      ) : (
        <Box
          className={`${style.container}`}
          onClick={() => handleClickSuggest()}
        >
          {!icon ? (
            <>
              <Image radius="md" src={image} alt="img_product" />
            </>
          ) : (
            <>{icon}</>
          )}
          <Box className={style.infoProduct}>
            <Text fw={500} size="xs" lineClamp={2} ml={8}>
              {text}
            </Text>
            <NumberFormatter
              style={{ height: "20px", lineHeight: "20px" }}
              thousandSeparator="."
              decimalSeparator=","
              value={price}
              suffix="  đ"
              className={style.formatNumber}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChildProduct;
