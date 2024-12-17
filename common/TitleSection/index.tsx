"use client";
import style from "./TitleSection.module.scss";

type TitleSection = {
  title: String;
  forSEO?: boolean;
};

const TitleSection = ({ title, forSEO }: TitleSection) => {
  const handleNavigate = () => {};
  return (
    <>
      {forSEO ? (
        <div className={style.titleSection}>
          {/* <div className={style.markTitle}></div> */}
          <h1 onClick={handleNavigate}>{title}</h1>
          {/* <div className={style.markTitle2}></div>
        <div className={style.markTitle3}></div> */}
        </div>
      ) : (
        <div className={style.titleSection}>
          {/* <div className={style.markTitle}></div> */}
          <h2 onClick={handleNavigate}>{title}</h2>
          {/* <div className={style.markTitle2}></div>
        <div className={style.markTitle3}></div> */}
        </div>
      )}
    </>
  );
};

export default TitleSection;
