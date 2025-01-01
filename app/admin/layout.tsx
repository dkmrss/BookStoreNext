import Account from "@/feature/account";
import style from "./style.module.scss";
import { Suspense } from "react";
import Admin from "@/feature/admin";

const AccountLayout = ({ children }: { children: any }) => {
  return (
    <div className={style.flexBox}>
      <div className={style.leftBox}>
        <Admin />
      </div>
      <div className={style.rightBox}>{children}</div>
    </div>
  );
};

export default AccountLayout;
