"use client";

import { IconChevronRight } from "@tabler/icons-react";
import React, { useState } from "react";
import style from "./FrequentlyAskedQuestions.module.scss";

type propsType = {
  question: string;
  answer: string;
};

const questionsData: propsType[] = [
  {
    question: "Công ty  có ưu đãi gì khi mua iPhone 11 128GB cũ đẹp",
    answer:
      "Thứ nhất, bạn sẽ mua điện thoại cũ giá tốt, bền đẹp có nguồn gốc rõ ràng. Thứ 2, thu cũ đổi mới trợ giá 500.000đ (Trừ điện thoại phổ thông). Thứ 3, combo phụ kiện sẽ giảm giá khi mua kèm máy cũ",
  },
];

const QuestionCard: React.FC = () => {
  const [dropDown, setDropDown] = useState<number | null>(null);

  const dropDownToggle = (index: number) => {
    setDropDown(dropDown === index ? null : index);
  };

  return (
    <div className={style.questionsBox}>
      <h4 className={style.title}>CÂU HỎI THƯỜNG GẶP</h4>
      <div className={style.questionCard}>
        <ul className={style.questionList}>
          {questionsData.map((item, index) => (
            <li key={index} className={style.questionItem}>
              <button
                className={`${style.question} ${
                  dropDown === index ? style.activeBgColor : ""
                }`}
                onClick={() => dropDownToggle(index)}
              >
                <span
                  className={`${style.text} ${
                    dropDown === index ? style.activeText : ""
                  }`}
                >
                  {item.question}
                </span>
                <IconChevronRight
                  className={`${style.icon} ${
                    dropDown === index ? style.rotateIcon : ""
                  }`}
                />
              </button>
              <div
                className={`${style.answer} ${
                  dropDown === index ? style.answerShow : ""
                }`}
              >
                {item.answer}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuestionCard;
