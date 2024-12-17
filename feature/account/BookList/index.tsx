"use client";
import { Tabs, rem } from "@mantine/core";
import { IconShield, IconTool } from "@tabler/icons-react";
import GuaranteeBookingList from "./GuaranteeBooking";
import RepairList from "./RepairBooking";
import style from "./style.module.scss";

const BookList = () => {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <Tabs
      variant="pills"
      color="var(--clr-bg-light-red)"
      classNames={{ tab: style.tab }}
      defaultValue="repair"
    >
      <Tabs.List>
        <Tabs.Tab value="repair" leftSection={<IconTool style={iconStyle} />}>
          Lịch sửa
        </Tabs.Tab>
        <Tabs.Tab
          value="guarantee"
          leftSection={<IconShield style={iconStyle} />}
        >
          Lịch bảo hành
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="repair">
        <RepairList />
      </Tabs.Panel>

      <Tabs.Panel value="guarantee">
        <GuaranteeBookingList />
      </Tabs.Panel>
    </Tabs>
  );
};

export default BookList;
