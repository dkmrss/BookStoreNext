import style from "./poster.module.scss";

type PosterProps = {
  
  postingDate: string;
};

const Poster = ({ postingDate }: PosterProps) => {
  return (
    <>
      <div className={style.poster}>
        <img
          src="https://cdn2.dienthoaivui.com.vn/post/avata.png"
          alt="avatar"
        />
        <div>
          <div className={style.name}></div>
          <div className={style.postingDate}>{postingDate}</div>
        </div>
      </div>
    </>
  );
};

export default Poster;
