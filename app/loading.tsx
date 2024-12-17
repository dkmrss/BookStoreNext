"use client";
import { LoadingOverlay, Skeleton } from "@mantine/core";
import { NavigationProgress, nprogress } from "@mantine/nprogress";
import { useEffect } from "react";
export default function Loading() {
  return (
    <>
      <LoadingOverlay
        visible={true}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "pink", type: "bars" }}
      />
      {/* <NavigationProgress /> */}
      <Skeleton height={50} circle mb="xl" />
      <Skeleton height={8} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} width="70%" radius="xl" />
    </>
  );
}
