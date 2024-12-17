"use client";

import { useState, useRef, useEffect } from "react";
import { Carousel } from "@mantine/carousel";
import { ActionIcon } from "@mantine/core";
import {
  IconX,
  IconZoomIn,
  IconZoomOut,
  IconFolders,
  IconMaximize,
  IconMinimize,
  IconHome,
  IconClock,
  IconPhoneCall,
  IconMapPinFilled,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import style from "./StoreCard.module.scss";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

type storeProp = {
  image: StaticImageData;
  name: string;
  address: string;
  workingTime: string;
  contact: string;
  joinGroup: string;
  storeMap: string;
  imageName: string;
  imageList: StaticImageData[];
};

const StoreCard: React.FC<storeProp> = ({
  image,
  name,
  address,
  workingTime,
  contact,
  joinGroup,
  storeMap,
  imageName,
  imageList,
}) => {
  const [selectedImage, setSelectedImage] = useState(imageList[0]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showOverlayFromCarousel, setShowOverlayFromCarousel] = useState(false);
  const [showOverlayFromImageStore, setShowOverlayFromImageStore] =
    useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const slides = imageList.map((url, index) => (
    <Carousel.Slide key={url.blurDataURL}>
      <div
        className={style.carouselImage}
        onClick={() => {
          setSelectedImage(url);
          setShowOverlay(true);
          setScale(1);
          setCurrentIndex(index);
          setShowOverlayFromCarousel(true);
          setShowOverlayFromImageStore(false);
        }}
      >
        <Image
          src={url}
          alt="store"
          style={{
            cursor: "pointer",
            width: "100%",
            height: "50px",
            objectFit: "cover",
          }}
        />
      </div>
    </Carousel.Slide>
  ));

  const closeModal = () => {
    setShowOverlay(false);
    setShowOverlayFromCarousel(false);
    setShowOverlayFromImageStore(false);
  };

  const handleZoomIn = (event: React.MouseEvent) => {
    event.stopPropagation();
    setScale((prevScale) => Math.min(prevScale + 0.5, 3));
  };

  const handleZoomOut = (event: React.MouseEvent) => {
    event.stopPropagation();
    setScale((prevScale) => Math.max(prevScale - 0.5, 1));
  };

  const handleMaximize = () => {
    if (overlayRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        overlayRef.current.requestFullscreen();
      }
    }
  };

  const handleFullscreenChange = () => {
    setIsFullscreen(Boolean(document.fullscreenElement));
  };

  const handleNextImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (currentIndex < imageList.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setSelectedImage(imageList[currentIndex + 1]);
    }
  };

  const handlePrevImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setSelectedImage(imageList[currentIndex - 1]);
    }
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div className={style.storeCard}>
      <div>
        <Image
          className={style.storeImage}
          src={image}
          alt={name}
          onClick={() => {
            setSelectedImage(image);
            setShowOverlayFromImageStore(true);
            setShowOverlay(true);
            setScale(1);
          }}
        />
      </div>
      <div className={style.infomation}>
        <div className={style.storeName}>
          <h2>{name}</h2>
        </div>
        <div className={style.storeAddress}>
          <IconHome className={style.icon} />
          <span>{address}</span>
        </div>
        <div className={style.workingTime}>
          <IconClock className={style.icon} />
          <span>{workingTime}</span>
        </div>
        <div className={style.contact}>
          <IconPhoneCall className={style.icon} />
          <span>
            Gọi ngay: <Link href="#">{contact}</Link>
          </span>
        </div>
        <div className={style.joinGroup}>
          <img
            src="https://image.dienthoaivui.com.vn/35x35,webp,q/https://dashboard.dienthoaivui.com.vn/uploads/dashboard/social/zalo-rounded.png"
            alt="Zalo"
          />
          <Link href={joinGroup}>Tham gia nhóm Zalo</Link>
        </div>
        <Link href={storeMap} className={style.storeMap}>
          <div className={style.buttonStoreMap}>
            <IconMapPinFilled className={style.iconMap} />
            <span>Bản đồ chỉ đường đến cửa hàng</span>
          </div>
        </Link>
        <div className={style.imageList}>
          <Carousel
            className={style.carousel}
            withIndicators
            slideSize="25%"
            containScroll="trimSnaps"
            slideGap="sm"
            align="start"
            controlSize={35}
            controlsOffset="xs"
            slidesToScroll={1}
          >
            {slides}
          </Carousel>
        </div>
      </div>

      {showOverlay && (
        <div
          className={style.overlay}
          ref={overlayRef}
          onClick={(e) => {
            if (!overlayRef.current?.contains(e.target as Node)) {
              closeModal();
            }
          }}
        >
          <div
            className={style.overlayContent}
            onClick={(e) => e.stopPropagation()}
          >
            {showOverlayFromCarousel ? (
              <div>
                <div className={style.imageCounter}>
                  {currentIndex + 1} / {imageList.length}
                </div>
                <div className={style.imageNameCounter}>
                  {imageName}-{currentIndex + 1}
                </div>
              </div>
            ) : showOverlayFromImageStore ? (
              <div className={style.imageNameCounter}>{address}</div>
            ) : null}
            <ActionIcon
              variant="transparent"
              className={style.zoomOutButton}
              onClick={handleZoomOut}
            >
              <IconZoomOut size={25} />
            </ActionIcon>
            <ActionIcon
              variant="transparent"
              className={style.zoomInButton}
              onClick={handleZoomIn}
            >
              <IconZoomIn size={25} />
            </ActionIcon>
            <ActionIcon variant="transparent" className={style.folderButton}>
              <IconFolders size={25} />
            </ActionIcon>
            <ActionIcon
              variant="transparent"
              className={style.maximizeButton}
              onClick={handleMaximize}
            >
              {isFullscreen ? (
                <IconMinimize size={25} />
              ) : (
                <IconMaximize size={25} />
              )}
            </ActionIcon>
            <ActionIcon
              variant="transparent"
              onClick={closeModal}
              className={style.closeButton}
            >
              <IconX size={25} />
            </ActionIcon>
            {!showOverlayFromImageStore && (
              <>
                <ActionIcon
                  variant="transparent"
                  className={style.chevronLeftButton}
                  onClick={handlePrevImage}
                >
                  <IconChevronLeft size={40} />
                </ActionIcon>
                <ActionIcon
                  variant="transparent"
                  className={style.chevronRightButton}
                  onClick={handleNextImage}
                >
                  <IconChevronRight size={40} />
                </ActionIcon>
              </>
            )}
            <Image
              src={selectedImage}
              alt="store"
              className={style.modalImage}
              style={{ transform: `scale(${scale})`, objectFit: "contain" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreCard;
