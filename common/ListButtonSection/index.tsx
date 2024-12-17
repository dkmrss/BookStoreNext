import Link from "next/link";
import style from "./ListButtonSection.module.scss";

type button = {
  label: string;
  value: string;
};

type ListButtonSection = {
  listButton?: button[];
};

const ListButtonSection = ({ listButton }: ListButtonSection) => {
  return (
    <>
      {listButton && (
        <div className={style.listButton}>
          {listButton.map((value, index) => {
            return (
              <Link
                key={index}
                href={`/category/${value.value}`}
                className={style.buttonSection}
              >
                {value.label}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ListButtonSection;
