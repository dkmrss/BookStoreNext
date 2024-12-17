import { Box, Button, TextInput, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { cancelSaleOrder } from "@/api/apiSaleOrder";
import { useDisclosure } from "@mantine/hooks";
import style from "./infoSaleOder.module.scss";
import { modals } from "@mantine/modals";

const CancelOrder = ({
  id,
  onRefetch,
}: {
  id: number;
  onRefetch: () => void;
}) => {
  const [visible, { toggle, close, open }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      orderId: id,
      status: "CANCEL",
      description: "",
    },

    validate: {},
  });

  const handleSubmit = async (dataSubmit: any) => {
    open();
    await cancelSaleOrder(dataSubmit);
    close();
    onRefetch();
    modals.closeAll();
  };

  return (
    <div className={style.modalsBox}>
      <Box
        className={style.textLeft}
        component="form"
        onSubmit={form.onSubmit((e: any) => handleSubmit(e))}
      >
        <TextInput
          label="Lý do huỷ đơn (* có thể để trống)"
          placeholder="Nhập lý do huỷ đơn"
          {...form.getInputProps("description")}
        />
        <Group mt="md">
          <Button bg={"var(--clr-primary)"} type="submit">
            Huỷ đơn
          </Button>
        </Group>
      </Box>
    </div>
  );
};

export default CancelOrder;
