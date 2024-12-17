"use client";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import style from "./SlideMenu.module.scss";

const SlideMenu = () => {
  // const autoplay = useRef(Autoplay({ delay: 2000 }));

  return (
    <div className={style.slideMenu}>
      <Carousel
        withIndicators
        height={200}
        // plugins={[autoplay.current]}
        // onMouseEnter={autoplay.current.stop}
        // onMouseLeave={autoplay.current.reset}
      >
        <Carousel.Slide>1</Carousel.Slide>
        <Carousel.Slide>2</Carousel.Slide>
        <Carousel.Slide>3</Carousel.Slide>
      </Carousel>
    </div>
  );
};

export default SlideMenu;
