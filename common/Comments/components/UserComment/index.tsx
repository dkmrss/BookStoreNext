import { Box, Flex, Text } from "@mantine/core";
import style from "./UserComment.module.scss";
import { comment } from "@/model/TblUserComment";
import { Image } from "@mantine/core";
import { useEffect, useState } from "react";
import { getDataUser } from "@/api/ApiUser";
import { User } from "@/model/User";

const UserComment = ({ data }: UserCommentProps) => {
  const [dataUser, setDataUser] = useState<User>();

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
  useEffect(() => {
    const fetchDataCategory = async () => {
      try {
        const response = await getDataUser(`/${data.user_id}`); // Call proxy endpoint
        setDataUser(response.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchDataCategory();
  }, [data]);

  return (
    <div>
      <Flex className={style.flexbox} align={"center"} gap={5}>
        <Box className={style.avtbox}>
          <Image
            src={`http://localhost:3001/${dataUser?.avatar}`}
            alt="Avatar"
          />
        </Box>
        <Box className={style.chat}>
          <Text className={style.name}>{dataUser?.name}</Text>
          <Text className={style.date}>{formatDateStringToDay(data.date)}</Text>

          <Box
            className={style.comment}
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </Box>
      </Flex>
    </div>
  );
};

export default UserComment;

type UserCommentProps = {
  data: comment;
};
