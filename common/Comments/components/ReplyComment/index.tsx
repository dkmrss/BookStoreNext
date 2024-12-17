import { Box, Flex, Text } from "@mantine/core";
import Image from "next/image";
import HacomLogo from "@/assets/dichvutot-01-01.png";
import style from "./ReplyComment.module.scss";
import { tblUserCommentReply } from "@/model/TblUserComment";

const ReplyComment = ({ data }: ReplyCommentProps) => {
  const formatDateStringToDay = (dateString: any) => {
    const dateObject = new Date(dateString);

    // Lấy ngày, tháng, năm từ đối tượng Date
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
    const day = dateObject.getDate();

    // Tạo chuỗi ngày tháng
    const formattedDate = `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;

    return formattedDate;
  };
  const getAbbreviation = (fullName: string) => {
    const match = fullName.match(/([^\s]+(?:\s+[^\s]+)*)\s+Số\s+đt :/);
    let words: string[] = [];
    if (match) {
      words = match[1].split(" ");
    } else words = fullName.split(" ");
    let abbreviation = "";

    words.forEach((word) => {
      abbreviation += word.charAt(0);
    });

    return abbreviation.toUpperCase();
  };

  const abbreviation = data?.map((item) =>
    getAbbreviation(item?.userName || "")
  );

  return (
    <>
      {data?.map((item, index) => (
        <div className={style.replyWrap} key={index}>
          <div className={style.arrowUp}></div>
          <Flex align="center" gap={10}>
            <div className={style.imgbox}>
              {item?.userName && item?.userName === "Admin Dichvutot" ? (
                <div className={style.admavtbox}>
                  <Image src={HacomLogo} alt="Avatar" className={style.logo} />
                </div>
              ) : item?.userAvatar ? (
                <Image src={item?.userAvatar} alt="Avatar" />
              ) : (
                <div className={style.avtbox}>
                  {abbreviation && abbreviation[index]}
                </div>
              )}
            </div>
            <Box className={style.chat}>
              <Text className={style.name}>{item?.userName}</Text>
              <Text className={style.date}>
                {formatDateStringToDay(item?.creationDate)}
              </Text>
              <Text
                className={style.comment}
                dangerouslySetInnerHTML={{ __html: item?.content || "" }}
              ></Text>
            </Box>
          </Flex>
        </div>
      ))}
    </>
  );
};

export default ReplyComment;

type ReplyCommentProps = {
  data: tblUserCommentReply[] | null;
};
