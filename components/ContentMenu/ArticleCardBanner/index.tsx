"use client";

import React from "react";
import { Button, Typography } from "antd";
import { Article } from "@/model/DataArticle";
import styles from "./style.module.scss";
import Link from "next/link";

const { Title, Paragraph } = Typography;

interface ArticleCardBannerProps {
  dataNews: Article[];
}

const ArticleCardBanner: React.FC<ArticleCardBannerProps> = ({ dataNews }) => {
  return (
    <div className={styles.container}>
      {dataNews.slice(0, 2).map((article) => (
        <Link href={`/news/${article?.id}`}
          key={article.id}
          className={styles.card}
          style={{
            backgroundImage: `url(${
              process.env.NEXT_PUBLIC_URL || "http://localhost:3001"
            }${article.avatar})`,
          }}
        >
          {/* Overlay */}
          <div className={styles.overlay}>
            {/* Category Tag */}
            <div className={styles.tag}>Tin tức</div>

            {/* Content */}
            <div>
              <Title level={5} className={styles.title}>
                {article.title}
              </Title>
              <Paragraph className={styles.description}>
                {article.short_description}
              </Paragraph>
              
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ArticleCardBanner;
