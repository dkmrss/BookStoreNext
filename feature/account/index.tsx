"use client";

import { removeUserInfo } from "@/redux/slices/authSlice";
import { Box, Text, Flex, Tabs, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import style from "./account.module.scss";
import {
  IconCalendar,
  IconFlame,
  IconHeadset,
  IconHome,
  IconLogout,
  IconReceipt,
  IconStarFilled,
  IconUserCircle,
  IconUserHeart,
} from "@tabler/icons-react";

const Account = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  let parts = pathname.split("/account/");
  const [selected, setSelected] = useState(parts[1]);

  const handleRemoveToken = async () => {
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
    window.location.reload();
    router.replace(`/`);
    
  };

  const openModalLogout = () =>
    modals.openConfirmModal({
      title: "Bạn có muốn thoát tài khoản",
      zIndex: 1000,
      labels: { confirm: "Xác nhận", cancel: "Hủy" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleRemoveToken(),
      classNames: {
        body: style.body,
      },
    });

  useEffect(() => {
    let parts = pathname.split("/account/");
    setSelected(parts[1]);
  }, [pathname]);

  return (
    <Box className={style.main}>
      <div className={style.menu}>
        <Tooltip label="Trang chủ" color="var(--clr-primary)" position="bottom">
          <Link
            href={"user-information"}
            className={`${style.title} ${
              selected === "user-information" && style.titleActive
            }`}
          >
            <IconHome /> <p className={style.textLink}>Trang chủ</p>
          </Link>
        </Tooltip>
        <Tooltip
          label=" Tài khoản của bạn"
          color="var(--clr-primary)"
          position="bottom"
        >
          <Link
            href={"user-edit"}
            className={`${style.title} ${
              selected === "user-edit" && style.titleActive
            }`}
          >
            <IconUserCircle />
            <p className={style.textLink}> Tài khoản của bạn</p>
          </Link>
        </Tooltip>
        <Tooltip
          label="Lịch sử mua hàng"
          color="var(--clr-primary)"
          position="bottom"
        >
          <Link
            href={"purchase-history"}
            className={`${style.title} ${
              selected === "purchase-history" && style.titleActive
            }`}
          >
            <IconReceipt /> <p className={style.textLink}>Lịch sử mua hàng</p>
          </Link>
        </Tooltip>
      
       
        <Text onClick={openModalLogout} className={style.title}>
          <IconLogout />
          <p className={style.textLink}>Đăng xuất</p>
        </Text>
      </div>
    </Box>
  );
};

export default Account;
