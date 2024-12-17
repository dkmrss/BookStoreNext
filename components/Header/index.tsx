"use client";
import React from "react";
import style from "./Header.module.scss";
import { Box } from "@mantine/core";
import TopHeader from "./TopHeader/TopHeader";
import HearderNavbar from "./HearderNavbar/HearderNavbar";

const Header = () => {
  return (
    <Box className={style.header}>
      {/* <TopHeader /> */}
      <HearderNavbar />
    </Box>
  );
};

export default Header;
