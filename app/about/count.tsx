"use client";
import { ColorSchemeToggle } from "@/components/ColorSchemeToggle/ColorSchemeToggle";
import { Welcome } from "@/components/Welcome/Welcome";
import { Button } from "@mantine/core";
import { useEffect, useState } from "react";

export default function Count() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Button
        onClick={() => {
          setCount(count + 1);
        }}
        variant="filled"
      >
        Button
      </Button>
      <p>{count}</p>
    </>
  );
}
