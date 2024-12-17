import { ReactNode } from "react";
import { Box, Flex, Text } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import style from "./SelectBox.module.scss";

type AppContainerProps = {
  children?: ReactNode;
  dataProps?: any;
  dataPath?: any;
  handelText?: any;
  className?: string;
  onClick?: () => void;
  handleSpecificPoint?: (text: string) => void;
  background?: any;
  hover?: any;
  href?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

const SelectBox: React.FC<AppContainerProps> = ({
  children,
  dataProps,
  dataPath,
  className,
  onClick,
  href,
  handelText,
  background = false,
  hover = false,
  handleSpecificPoint,
  leftIcon,
  rightIcon,
  ...passProps
}) => {
  const props: Record<string, any> = { onClick, ...passProps };
  const pathname = usePathname();
  const isActive = (path: any) => pathname === path;

  const classes = `${style.wrapper} ${className ? style[className] : ""} ${
    href ? style.href : ""
  } ${background ? style.background : ""} ${hover ? style.hover : ""}`;

  const BackgroundBox = `${style.box_select} ${
    dataPath ? style.dataPath : ""
  } ${dataProps ? style.dataProps : ""}`;

  const DataDoesNotContainPaths = () => (
    <>
      {dataProps?.map((value: any) => (
        <Box
          onClick={() => handleSpecificPoint && handleSpecificPoint(value.text)}
          key={value.id}
          className={`${classes} ${
            value.text === handelText ? style.active : null
          } `}
        >
          {leftIcon && <span className={style.iconLeft}>{leftIcon}</span>}
          <Text tt="capitalize" size="xs" fw={700} className={style.title}>
            {value.text}
          </Text>
          {rightIcon && <span className={style.iconRight}>{rightIcon}</span>}
        </Box>
      ))}
    </>
  );

  const DataContainsPath = () => (
    <>
      {dataPath?.map((value: any) => (
        <Link
          key={value.id}
          href={value.href}
          className={style.path}
          {...props}
        >
          <span className={style.iconLeft}>{value.Icon}</span>
          <Flex direction="column">
            <Text tt="capitalize" size="xs" fw={500} className={style.title}>
              {value.title}
            </Text>
            <Text tt="capitalize" size="xs" fw={700} className={style.title}>
              {value.text}
            </Text>
          </Flex>
        </Link>
      ))}
    </>
  );

  return (
    <Box className={`${BackgroundBox}`}>
      {!dataPath ? <DataDoesNotContainPaths /> : <DataContainsPath />}
    </Box>
  );
};

export default SelectBox;
