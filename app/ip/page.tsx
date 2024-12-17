"use client";
import { ColorSchemeToggle } from "@/components/ColorSchemeToggle/ColorSchemeToggle";
import { Welcome } from "@/components/Welcome/Welcome";
import { useEffect, useState } from "react";
import AboutPage from "../about/page";
import HomePage from "../home/page";

export default function GetIp() {
  const [ip, setIp] = useState(null);

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIp(data.ip))
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <p>ip/page + {ip}</p>
    </>
  );
}
