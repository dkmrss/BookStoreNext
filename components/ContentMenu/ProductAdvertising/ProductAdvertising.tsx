import Link from "next/link";
import style from "./ProductAdvertising.module.scss";

const ProductAdvertising = () => {
  const images = [
    {
      image:
        "https://hanoicomputercdn.com/media/banner/09_Nov2fb0942cc01f0692adc77f6c4cfdc10d.jpg",
    },
    {
      image:
        "https://hanoicomputercdn.com/media/banner/09_Nov28ff7ffb97b3f664fd74711de4e801d8.jpg",
    },
    {
      image: "https://hacom.vn/media/lib/30-05-2022/untitled-1.jpg",
    },
  ];

  return (
    <div className={style.ProductAdvertising}>
      {images?.map((value, index) => {
        return (
          <div key={index} className={style.images}>
            <Link href={"/"}>
              <img
                src={value.image}
                alt={`image-${index}`}
                className={style.image}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ProductAdvertising;
