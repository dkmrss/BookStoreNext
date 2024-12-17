import Account from "@/feature/account";
import style from "./style.module.scss";
import { Suspense } from "react";

const AccountLayout = ({ children }: { children: any }) => {
  return (
    <div className={style.flexBox}>
      <div className={style.leftBox}>
        <Account />
      </div>
      <div className={style.rightBox}>{children}</div>
    </div>
  );
};

export default AccountLayout;
