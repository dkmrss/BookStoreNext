"use client";
import {
  Flex,
  Box,
  Text,
  Progress,
  Center,
  Title,
  em,
  Stack,
  Avatar,
  NumberFormatter,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import style from "./RankMember.module.scss";
import Image from "next/image";
import avt from "@/assets/dichvutot-01-01.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import {
  IconDiamondFilled,
  IconDiamondsFilled,
  IconMilitaryAward,
  IconBadgesFilled,
} from "@tabler/icons-react";
import { MembershipCard, tblRank } from "@/model/TblMembershipCard";
import {
  getMembershipCard,
  getRankList,
  remainingMoney,
} from "@/api/apiMembershipCard";
import { IconBrandJuejin } from "@tabler/icons-react";
const RankMember = () => {
  const rank = [
    {
      id: 1,
      icon: <IconBadgesFilled width={60} height={60} />,
      rank: "Silver",
      condition:
        "Tổng số tiền mua hàng tích luỹ trong năm nay và năm liền trước đạt từ 0 đến 3 triệu đồng",
      endow: "Hiện chưa có ưu đãi mua hàng đặc biệt cho hạng thành viên Silver",
      policy:
        "Hiện chưa có chính sách ưu đãi phục vụ đặc biệt cho hạng thành viên Silver",
    },
    {
      id: 2,
      rank: "Gold",
      icon: <IconMilitaryAward width={60} height={60} />,
      condition:
        "Tổng số tiền mua hàng tích luỹ trong năm nay và năm liền trước đạt từ 3 đến 15 triệu đồng",
      endow: "Ưu đãi cho Gold",
      policy:
        "Hiện chưa có chính sách ưu đãi phục vụ đặc biệt cho hạng thành viên Gold",
    },
    {
      id: 3,
      rank: "Platinum",
      icon: <IconDiamondsFilled width={60} height={60} />,
      condition:
        "Tổng số tiền mua hàng tích luỹ trong năm nay và năm liền trước đạt từ 15 đến 50 triệu đồng",
      endow: "Ưu đãi cho Platinum",
      policy:
        "Hiện chưa có chính sách ưu đãi phục vụ đặc biệt cho hạng thành viên Platinum",
    },
    {
      id: 4,
      rank: "Diamond",
      icon: <IconDiamondFilled width={60} height={60} />,
      condition:
        "Tổng số tiền mua hàng tích luỹ trong năm nay và năm liền trước đạt từ 50 triệu đồng trở lên",
      endow: "Ưu đãi cho Diamond",
      policy: "Tham gia chương trình đặt trước sản phẩm không cần đặt cọc tiền",
    },
  ];

  const userInfo = useSelector((state: any) => state.auth?.userInfo);
  const [selectedRankId, setSelectedRankId] = useState<number | null>(1);
  const [dataMemberCard, setDataMemberCard] = useState<MembershipCard>();
  const [dataMoneyRemaining, setDataMoneyRemaining] = useState<any>();
  const [dataRank, setDataRank] = useState<tblRank[]>([]);

  const getNextLevel = (remainMoney: number) => {
    return dataRank?.find(
      (level) => level.minPoint !== null && remainMoney < level.minPoint!
    );
  };

  const nextLevel =
    dataMemberCard?.exchangepoint !== null
      ? getNextLevel(dataMemberCard?.exchangepoint || 0)
      : null;
  const percentage = nextLevel
    ? ((dataMemberCard?.exchangepoint || 0) / nextLevel.minPoint!) * 100
    : 100;

  const getRankDisplayName = (rank: number) => {
    switch (rank) {
      case 2:
        return "Silver";
      case 3:
        return "Gold";
      case 4:
        return "Platinum";
      case 5:
        return "Diamond";
      default:
        return "Chưa có";
    }
  };

  const getRankBadgeName = (rank: number) => {
    switch (rank) {
      case 2:
        return <IconBadgesFilled width={20} height={20} />;
      case 3:
        return <IconMilitaryAward width={20} height={20} />;
      case 4:
        return <IconDiamondsFilled width={20} height={20} />;
      case 5:
        return <IconDiamondFilled width={20} height={20} />;
      default:
        return <IconBrandJuejin width={20} height={20} />;
    }
  };
  const handleFetchDataMembershipCard = async () => {
    const userData = localStorage.getItem("userInfo");
    const id = userData ? JSON.parse(userData).data.customerId : 0;
    const callApi = await getMembershipCard(`customerId=${id}`);
    setDataMemberCard(callApi);
    setSelectedRankId(callApi.rankid || 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRankList(`Skip=0&Take=5`);
        setDataRank(data.lists);
      } catch (error) {
        setDataRank([]);
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    handleFetchDataMembershipCard();
  }, []);

  useEffect(() => {
    if (dataMemberCard && dataMemberCard.id) {
      const fetchData = async () => {
        try {
          const data = await remainingMoney(
            `membershipCardId=${dataMemberCard.id}`
          );
          setDataMoneyRemaining(data.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [dataMemberCard]);

  return (
    <Box className={style.rankMember}>
      <Box maw={700}>
        <Box
          bg={"var(--clr-text-primary)"}
          p={"10px 10px 100px 10px"}
          pos={"relative"}
          w={"100%"}
          style={{ borderRadius: "0px 0px 20px 20px" }}
        >
          <Flex gap={10} align={"center"}>
            <Box>
              <Text c={"#fff"} size="18px">
                Xin chào!
              </Text>
              {/* <Text fw={600} size="18px" c={"#fff"} mt={10}>
                {userInfo?.data?.customerName ||
                  userInfo?.data?.userName ||
                  userInfo?.data?.email}
              </Text> */}
            </Box>
          </Flex>
          <Center>
            <Box className={style.rankInfor}>
              <Flex justify={"space-between"}>
                <Box>
                  <Text fw={600} size="18px" mb={5}>
                    {userInfo?.data?.customerName ||
                      userInfo?.data?.userName ||
                      userInfo?.data?.email}
                  </Text>

                  <Text fw={500} c={"var(--clr-primary)"}>
                    {dataMemberCard?.exchangepoint || 0} (Điểm tích lũy từ{" "}
                    {userInfo?.data?.creationDate
                      ? moment(userInfo?.data?.creationDate).format(
                          "DD/MM/YYYY"
                        )
                      : "21/3/2024"}
                    )
                  </Text>
                </Box>
                <Box ta={"center"}>
                  {getRankBadgeName(dataMemberCard?.rankid || 0)}
                  <Text fw={600} c={"var(--clr-primary)"} size="18px">
                    {getRankDisplayName(dataMemberCard?.rankid || 0)}
                  </Text>
                </Box>
              </Flex>
              <Box pos={"relative"} mt={35}>
                <Progress
                  value={percentage}
                  color="var(--clr-primary)"
                ></Progress>
              </Box>
              <Center mt={5}>
                <Text>
                  Bạn cần mua thêm{" "}
                  <span>
                    <NumberFormatter
                      thousandSeparator="."
                      decimalSeparator=","
                      value={dataMoneyRemaining}
                      suffix="₫"
                    />
                  </span>{" "}
                  để lên hạng <span>{"Tiếp theo"}</span>
                </Text>
              </Center>
            </Box>
          </Center>
        </Box>
        <Box
          bg={"var(--clr-primary)"}
          mt={90}
          w={"100%"}
          p={10}
          style={{ borderRadius: "10px" }}
        >
          <Center>
            <Title order={5} fw={650} c={"#fff"}>
              ĐIỀU KIỆN VÀ ƯU ĐÃI CHO CÁC CẤP ĐỘ
            </Title>
          </Center>
        </Box>
        <Flex justify={"space-around"}>
          {rank?.map((item: any, index: number) => (
            <Stack
              key={index}
              align="center"
              mt={15}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedRankId(item.id)}
            >
              <Avatar
                w={80}
                h={80}
                className={style[item.rank.toLowerCase()]}
                bd={
                  selectedRankId === item.id
                    ? "1px solid var(--clr-primary)"
                    : "1px solid #F3F3F4"
                }
              >
                {item.icon}
              </Avatar>
              <Text
                key={item.id}
                fw={600}
                c={selectedRankId === item.id ? "var(--clr-primary)" : ""}
                size="16px"
              >
                {item.rank}
              </Text>
            </Stack>
          ))}
        </Flex>
        <Box className={style.inforRank} mt={10} p={10}>
          {selectedRankId && (
            <Box pl={20}>
              {rank?.map(
                (item: any) =>
                  item.id === selectedRankId && (
                    <Stack key={item.id}>
                      <Box className={style.title}>
                        <Text c={"#fff"}>Điều kiện xếp hạng</Text>
                      </Box>
                      <Box m={"0% 10%"}>
                        <Text className={style.textInfor}>
                          {item.condition}
                        </Text>
                      </Box>
                      <Box className={style.title}>
                        <Text c={"#fff"}>Ưu đãi mua hàng</Text>
                      </Box>
                      <Box m={"0% 10%"}>
                        <Text className={style.textInfor}>{item.endow}</Text>
                      </Box>
                      <Box className={style.title}>
                        <Text c={"#fff"}>Chính sách phục vụ</Text>
                      </Box>
                      <Box m={"0% 10%"}>
                        <Text className={style.textInfor}>{item.policy}</Text>
                      </Box>
                    </Stack>
                  )
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default RankMember;
