"use client";
import React, { ReactNode } from "react";
import style from "./ButtonCategory.module.scss";
import { Box, Flex, Group, Image, Text } from "@mantine/core";
import Link from "next/link";
const ButtonCategory: React.FC<AppContainerProps> = ({
  children,
  className,
  data,
  image,
  setHiddenDrawerCategory,
  hiddenDrawerCategory,
  setValueActive,
  valueActive,
  ...otherProps
}) => {
  return (
    <Link
      href={`${data?.value}`}
      className={`${style.button} ${className} ${
        data?.isNodata && style.disable
      }`}
      {...otherProps}
      onClick={() => {
        setHiddenDrawerCategory(!hiddenDrawerCategory);
        setValueActive(!valueActive);
      }}
    >
      <Flex gap={10} p={5} align="center" className={style.buttonCheck}>
        {image !== "" && (
          <Image className={style.images} w={55} src={image} alt={image} />
        )}
        <Text className={style.text} size="xs">
          {data?.label !== "" ? data?.label : null}
        </Text>
      </Flex>
    </Link>
  );
};

type AppContainerProps = {
  children?: ReactNode;
  className?: string;
  data?: {
    value?: string | undefined;
    label: string;
    isNodata?: boolean | undefined;
  };
  image?: any;
  setHiddenDrawerCategory: React.Dispatch<React.SetStateAction<boolean>>;
  hiddenDrawerCategory: boolean;
  setValueActive: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  valueActive: boolean | undefined;
};

export default ButtonCategory;
