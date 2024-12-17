import { Box, Button, Text, Title } from "@mantine/core";
import style from "./Specifications.module.scss";
import { modals } from "@mantine/modals";
import { TblItem } from "@/model/ProductList";
import { TblProduct } from "@/model/TblBook";

const Specifications = ({ data }: { data: TblProduct | null }) => {
  const handleOpenDetail = () => {
    modals.openConfirmModal({
      title: (
        <>
          <Title order={5}>Thông số chi tiết</Title>
        </>
      ),
      centered: true,
      zIndex: 1000,
      children: (
        <Box
          className={`${style.specTable} ${style.tableDetail}`}
          dangerouslySetInnerHTML={{ __html: data?.itemSpec || "" }}
        ></Box>
      ),
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
      size: "1200px",
      radius: "12px",
    });
  };

  if (!data?.itemSpec) {
    return null;
  }

  return (
    <Box className={style.main}>
      <Text className={style.titleHeader}>Thông số kỹ thuật</Text>
      <Box
        className={style.specTable}
        dangerouslySetInnerHTML={{ __html: data.itemSpec }}
      ></Box>
      <Box className={style.buttonDetailWrapper}>
        <Button
          className={style.buttonDetail}
          variant="default"
          radius={"md"}
          onClick={handleOpenDetail}
        >
          Xem thêm
        </Button>
      </Box>
    </Box>
  );
};

export default Specifications;
