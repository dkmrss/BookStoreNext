"use client";

import { removeUserInfo } from "@/redux/slices/authSlice";
import { Box, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import style from "./account.module.scss";
import {
  IconHome,
  IconCategory,
  IconPhoto,
  IconFileText,
  IconShoppingCart,
  IconLogout,
  IconUser,
} from "@tabler/icons-react";

const Admin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  let parts = pathname.split("/admin/");
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

    const isAuthenticated = (): boolean => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
    
      try {
        if (!token || !user) return false; // Trả về false nếu không có token hoặc user
    
        const parsedUser = JSON.parse(user); // Parse chuỗi JSON từ localStorage
        return parsedUser.role === 1; // Trả về true nếu role bằng 1
      } catch (error) {
        console.error("Error checking authentication:", error);
        return false; // Trả về false nếu có lỗi
      }
    };
    
    useEffect(() => {
      if (isAuthenticated()) {
        
      } else {
        // Nếu chưa xác thực, chuyển hướng về trang chủ
        router.push("/");
      }
    }, []);

  useEffect(() => {
    let parts = pathname.split("/admin/");
    setSelected(parts[1]);
  }, [pathname]);

  return (
    <Box className={style.main}>
      <div className={style.menu}>
        <Tooltip label="Trang chủ" color="var(--clr-primary)" position="bottom">
          <Link
            href={"product-manager"}
            className={`${style.title} ${
              selected === "product-manager" && style.titleActive
            }`}
          >
            <IconHome />
            <p className={style.textLink}>Quản lý sản phẩm</p>
          </Link>
        </Tooltip>
        <Tooltip
          label="Quản lý danh mục"
          color="var(--clr-primary)"
          position="bottom"
        >
          <Link
            href={"Category-manager"}
            className={`${style.title} ${
              selected === "Category-manager" && style.titleActive
            }`}
          >
            <IconCategory />
            <p className={style.textLink}>Quản lý danh mục</p>
          </Link>
        </Tooltip>
        <Tooltip
          label="Quản lý banner"
          color="var(--clr-primary)"
          position="bottom"
        >
          <Link
            href={"Banner-manager"}
            className={`${style.title} ${
              selected === "Banner-manager" && style.titleActive
            }`}
          >
            <IconPhoto />
            <p className={style.textLink}>Quản lý banner</p>
          </Link>
        </Tooltip>
        <Tooltip
          label="Quản lý tin tức"
          color="var(--clr-primary)"
          position="bottom"
        >
          <Link
            href={"News-manager"}
            className={`${style.title} ${
              selected === "News-manager" && style.titleActive
            }`}
          >
            <IconFileText />
            <p className={style.textLink}>Quản lý tin tức</p>
          </Link>
        </Tooltip>
        <Tooltip
          label="Quản lý đơn hàng"
          color="var(--clr-primary)"
          position="bottom"
        >
          <Link
            href={"Order-manager"}
            className={`${style.title} ${
              selected === "Order-manager" && style.titleActive
            }`}
          >
            <IconShoppingCart />
            <p className={style.textLink}>Quản lý đơn hàng</p>
          </Link>
        </Tooltip>
        <Tooltip
          label="Quản lý người dùng"
          color="var(--clr-primary)"
          position="bottom"
        >
          <Link
            href={"User-manager"}
            className={`${style.title} ${
              selected === "User-manager" && style.titleActive
            }`}
          >
            <IconUser />
            <p className={style.textLink}>Quản lý người dùng</p>
          </Link>
        </Tooltip>
      </div>
      <div className={style.logout}>
        <Tooltip label="Đăng xuất" color="var(--clr-primary)" position="bottom">
          <span className={style.title} onClick={openModalLogout}>
            <IconLogout />
            <p className={style.textLink}>Đăng xuất</p>
          </span>
        </Tooltip>
      </div>
    </Box>
  );
};

export default Admin;
