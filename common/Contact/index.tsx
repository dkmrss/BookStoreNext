"use client";
import { useState, useEffect } from "react";
import style from "./Contact.module.scss";
import { useDisclosure } from "@mantine/hooks";
import ContactOption from "./ContactOption";
import ContactForm from "./ContactForm";

const Contact = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const checkScrollTop = () => {
    if (!showScroll && window.scrollY > 50) {
      setShowScroll(true);
    } else if (showScroll && window.scrollY <= 50) {
      setShowScroll(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      close();
      setIsClosing(false);
    }, 420);
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [showScroll]);

  return (
    <div
      className={!opened ? style.contactFirst : style.contactAfter}
      style={{ zIndex: "1000" }}
    >
      {!opened ? (
        <ContactOption
          showScroll={showScroll}
          scrollToTop={scrollToTop}
          open={open}
        />
      ) : (
        <ContactForm isClosing={isClosing} handleClose={handleClose} />
      )}
    </div>
  );
};

export default Contact;
