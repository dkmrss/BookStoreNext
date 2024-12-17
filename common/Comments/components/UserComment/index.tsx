import { Box, Flex, Text } from "@mantine/core";
import style from "./UserComment.module.scss";
import { TblUserComment } from "@/model/TblUserComment";
import Image from "next/image";

const UserComment = ({ data, handleAddReply }: UserCommentProps) => {
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
      words = match[1]?.split(" ");
    } else words = fullName.split(" ");
    let abbreviation = "";
    words.forEach((word) => {
      abbreviation += word.charAt(0);
    });

    return abbreviation.toUpperCase();
  };

  const abbreviation = getAbbreviation(data.userName || "");
  return (
    <div>
      <Flex className={style.flexbox} align={"center"} gap={5}>
        {data?.userAvatar ? (
          <Image src={data?.userAvatar} alt="Avatar" />
        ) : (
          <div className={style.avtbox}>{abbreviation}</div>
        )}
        <Box className={style.chat}>
          <Text className={style.name}>{data.userName}</Text>
          <Text className={style.date}>
            {formatDateStringToDay(data.creationDate)}
          </Text>
          <Text className={style.comment}>{data.content}</Text>
          <Text onClick={handleAddReply} className={style.reply}>
            Trả lời
          </Text>
        </Box>
      </Flex>
    </div>
  );
};

export default UserComment;

type UserCommentProps = {
  data: TblUserComment;
  handleAddReply: () => void;
};
