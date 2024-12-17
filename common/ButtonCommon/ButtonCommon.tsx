"use client";
import { Flex, Text } from "@mantine/core";
import Link from "next/link";
import React, { ReactNode } from "react";
import style from "./ButtonCommon.module.scss";
const ButtonCommon: React.FC<AppContainerProps> = ({
  children,
  className,
  text,
  Icon,
  to,
  onClick,
  ...otherProps
}) => {
  return (
    <Link
      onClick={onClick}
      href={to}
      className={`${style.button} ${className}`}
      {...otherProps}
    >
      <Flex gap={10} p={5} mb={8} align="center" className={style.buttonCheck}>
        {Icon}
        <Text size="xs" fw={700}>
          {text}
        </Text>
      </Flex>
    </Link>
  );
};

type AppContainerProps = {
  children?: ReactNode;
  className?: string;
  text: string;
  Icon: any;
  to: string;
  onClick?: () => any;
};

export default ButtonCommon;
