import style from "./poster.module.scss";

type PosterProps = {
  name: string;
  postingDate: string;
};

const Poster = ({ name, postingDate }: PosterProps) => {
  return (
    <>
      <div className={style.poster}>
        <img
          src="https://cdn2.dienthoaivui.com.vn/post/avata.png"
          alt="avatar"
        />
        <div>
          <div className={style.name}>{name}</div>
          <div className={style.postingDate}>{postingDate}</div>
        </div>
      </div>
    </>
  );
};

export default Poster;
