import { ReactNode, forwardRef } from "react";
import { Text } from "@mantine/core";
import style from "./ButtonsCollection.module.scss";
import Link from "next/link";

type AppContainerProps = {
  children?: ReactNode;
  className?: string;
  hidden?: any;
  onClick?: () => void;
  to?: string;
  background?: boolean;
  hover?: boolean;
  href?: string;
  leftIcon?: ReactNode;
  transparent?: any;
  rightIcon?: ReactNode;
  totalItem?: number;
};

const ButtonsCollection = forwardRef<HTMLDivElement, AppContainerProps>(
  (
    {
      children,
      className,
      onClick,
      href = "",
      background = false,
      hover = false,
      leftIcon,
      transparent = false,
      rightIcon,
      hidden,
      totalItem,
      ...passProps
    },
    ref
  ) => {
    const props: Record<string, any> = {
      onClick,
      ...passProps,
    };

    let Comp: React.ElementType = "div";

    if (href) {
      props.href = href;
      Comp = Link;
    }

    const classes = `${style.wrapper} ${className ? style[className] : ""} ${
      href ? style.href : ""
    } ${background ? style.background : ""} ${hover ? style.hover : ""} ${
      hidden ? style.hidden : ""
    }`;

    return (
      <Comp ref={ref} className={classes} {...props}>
        {totalItem && <span className={style.totalItem}>{totalItem}</span>}
        {leftIcon && <span className={style.iconLeft}>{leftIcon}</span>}
        <Text c="#fff" fw={700} size="xs" className={style.title}>
          {children}
        </Text>
        {rightIcon && <span className={style.iconRight}>{rightIcon}</span>}
      </Comp>
    );
  }
);

export default ButtonsCollection;
