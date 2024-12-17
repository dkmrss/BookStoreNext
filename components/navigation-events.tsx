"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { NavigationProgress, nprogress } from "@mantine/nprogress";
import { useRouter } from "next/navigation";
export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  nprogress.start();
  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    router.push(url);
    return nprogress.complete();
  }, [pathname, searchParams]);

  return <NavigationProgress />;
}
