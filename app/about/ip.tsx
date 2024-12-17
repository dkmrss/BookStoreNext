"use client";
import { ColorSchemeToggle } from "@/components/ColorSchemeToggle/ColorSchemeToggle";
import { Welcome } from "@/components/Welcome/Welcome";
import { useEffect, useState } from "react";

export default function AboutIp() {
  const [ip, setIp] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch("https://api.ipify.org?format=json")
        .then((res) => res.json())
        .then((data) => setIp(data.ip))
        .catch((err) => console.error(err));
    }, 5000);
  }, []);
  return (
    <>
      <p>about/ip + {ip}</p>
    </>
  );
}
