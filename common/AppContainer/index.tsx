import React, { ReactNode } from "react";
import styles from "./AppContainer.module.scss";

const AppContainer: React.FC<AppContainerProps> = ({
  children,
  className,
  ...otherProps
}) => {
  return (
    <div className={`${styles.root} ${className}`} {...otherProps}>
      {children}
    </div>
  );
};

type AppContainerProps = {
  children?: ReactNode;
  className?: string;
};

export default AppContainer;
