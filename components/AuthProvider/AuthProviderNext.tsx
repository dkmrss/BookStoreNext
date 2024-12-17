"use client";
import { SessionProvider } from "next-auth/react";

const AuthProviderNext = ({ children }: { children: any }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
export default AuthProviderNext;
