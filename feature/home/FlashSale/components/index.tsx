"use client";
import { useEffect, useState } from "react";
import style from "./Countdown.module.scss";

const Countdown = ({ totalTime, type, isArrived }: CountdownProps) => {
  const [day, setDay] = useState<string | number>(0);
  const [hours, setHours] = useState<string | number>(0);
  const [minutes, setMinutes] = useState<string | number>(0);
  const [seconds, setSeconds] = useState<string | number>(0);
  const [time, setTime] = useState<string | number>(totalTime);
  useEffect(() => {
    if (parseInt(totalTime) > 0) {
      setTime(totalTime);
    }
  }, [totalTime]);

  useEffect(() => {
    if (parseInt(totalTime) > 0) {
      const timerId = setInterval(() => {
        countDownTime();
      }, 1000);

      return () => {
        clearInterval(timerId);
      };
    }
  }, [totalTime]);

  useEffect(() => {
    if (parseInt(totalTime) > 0) {
      formatTime();
    }
  }, [time]);

  const checkTime = (i: string | number) => {
    if (typeof i === "number" || (typeof i === "string" && !isNaN(Number(i)))) {
      i = Number(i);
      if (i < 10) {
        i = "0" + i;
      }
    }
    return i;
  };

  const formatTime = () => {
    var countdown = Number(time);
    setDay(checkTime(Math.floor(countdown / 86400)));
    setHours(checkTime(Math.floor((countdown % 86400) / 3600)));
    setMinutes(checkTime(Math.floor((countdown % 3600) / 60)));
    setSeconds(checkTime(countdown % 60));
  };

  const countDownTime = () => {
    setTime((prevSeconds) => Number(prevSeconds) - 1);
  };
  return (
    <div>
      <div
        className={
          isArrived
            ? type === "product"
              ? style.productArrived
              : style.mainArrived
            : type === "product"
            ? style.product
            : style.main
        }
      >
        <div className={style.box}>
          <div className={style.dateSummary}>
            {isArrived ? "Bắt đầu sau:" : "Còn lại:"}
          </div>
        </div>
        <div className={style.boxtime}>
          <div className={style.time}>{parseInt(totalTime) < 0 ? 0 : day}</div>
        </div>
        <p className={style.dot}>:</p>
        <div className={style.boxtime}>
          <div className={style.time}>
            {parseInt(totalTime) < 0 ? 0 : hours}
          </div>
        </div>
        <p className={style.dot}>:</p>
        <div className={style.boxtime}>
          <div className={style.time}>
            {parseInt(totalTime) < 0 ? 0 : minutes}
          </div>
        </div>
        <p className={style.dot}>:</p>
        <div className={style.boxtime}>
          <div className={style.time}>
            {parseInt(totalTime) < 0 ? 0 : seconds}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;

type CountdownProps = {
  totalTime: string;
  type?: string;
  isArrived?: boolean;
};
