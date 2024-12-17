import { Flex, Text } from "@mantine/core";
import style from "./Tab.module.scss";

type Tab = {
  type: string;
  active?: boolean;
  title: string;
  icon?: JSX.Element;
};

const Tab = ({ type, active, title, icon }: Tab) => {
  return (
    <>
      {type === "detailProduct" ? (
        <div
          className={`${style.boxDetailProduct} ${
            active ? style.boxActiveDetailProduct : ""
          }`}
        >
          <Flex justify={"center"} align={"center"} gap={3}>
            {icon}
            {title}
          </Flex>
        </div>
      ) : (
        <div
          className={`${style.boxReference} ${
            active && style.boxActiveReference
          } `}
        >
          <Text>{title}</Text>
        </div>
      )}
    </>
  );
};

export default Tab;
