import { IconClockHour5, IconShieldCheck } from "@tabler/icons-react";
import style from "./FixAndGuarantee.module.scss";

interface FAGProps {
  time?: string | null;
  guarantee?: string | null;
}

const FixAndGuarantee: React.FC<FAGProps> = ({ time, guarantee }) => {
  return (
    <div>
      <div className={style.info}>
        {time && (
          <div className={style.fix}>
            <IconClockHour5 color="#DB2A11" /> <span>Sửa: {time}</span>
          </div>
        )}
        {guarantee && (
          <div className={style.guarantee}>
            <IconShieldCheck color="#43AE4F" />{" "}
            <span>Bảo hành: {guarantee}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FixAndGuarantee;
