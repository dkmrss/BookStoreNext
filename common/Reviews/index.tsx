import { TblProduct } from "@/model/TblBook";
import { TblUserReview } from "@/model/TblUserReview";
import { Box, Button, Divider, Flex, Rating, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import {
  IconChevronDown,
  IconChevronUp,
  IconStarFilled,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import FormInput from "./FormInput";
import style from "./Reviews.module.scss";

interface CountSynthetic {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

const Reviews = ({ dataItem, dataReview }: ReviewProps) => {
  const { width } = useViewportSize();
  const [pageSize, setPageSize] = useState(4);
  const [averageStar, setAverageStar] = useState(0);
  const [dataSynthetic, setDataSynthetic] = useState<CountSynthetic>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const ratingOrder = [5, 4, 3, 2, 1];
  const [loading, setLoading] = useState(true);
  const [totalRandom, setTotalRandom] = useState(0);
  const [selectFilter, setSelectFilter] = useState(0);
  const openModal = () => {
    modals.openConfirmModal({
      modalId: "formInput",
      title: (
        <Flex gap={20} align={"center"}>
          <Text fw={700} lineClamp={2}>
            Đánh giá {dataItem?.product_name}
          </Text>
        </Flex>
      ),
      centered: true,
      zIndex: 1000,
      children: <FormInput dataItem={dataItem} />,
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
      size: "24rem",
      classNames: {
        header: style.header,
        content: style.content,
      },
    });
  };

  const handleControlBgColor = (ratingStar: number) =>
    ratingStar === 4 || ratingStar === 5
      ? "#1F67D2"
      : ratingStar === 3
      ? "#6782AA"
      : "#EF1010";

  const handleClickSeeMore = () => {
    setPageSize(pageSize + 4);
  };

  const handleSelectFilter = (index: number) => {
    setSelectFilter(index);
  };

  useEffect(() => {
    if (dataReview && dataReview.length > 0) {
      let count: CountSynthetic = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      let average = 0;

      dataReview.forEach((item) => {
        if (item.rate !== null && item.rate !== undefined) {
          count[item.rate as keyof CountSynthetic]++;
          average += item.rate;
        }
      });

      setDataSynthetic(count);
      setAverageStar(Number((average / dataReview.length).toFixed(2)));
    } else {
      // Handle the case when dataReview is null or empty
      const random1 = 0;
      const random2 = 0;
      const random3 = Math.floor(Math.random() * 10);
      const random4 = Math.floor(Math.random() * 10);
      const random5 = Math.floor(Math.random() * 10);

      const totalRandom = random1 + random2 + random3 + random4 + random5;
      setTotalRandom(totalRandom);
      const averageStar =
        random1 * 1 + random2 * 2 + random3 * 3 + random4 * 4 + random5 * 5;
      const randomSynthetic: CountSynthetic = {
        1: random1,
        2: random2,
        3: random3,
        4: random4,
        5: random5,
      };

      setDataSynthetic(randomSynthetic);
      setAverageStar(Number((averageStar / totalRandom).toFixed(1))); // or set to another default value
    }
  }, [dataReview]);

  return (
    <div className={style.main}>
      <Box className={style.title}>
        <Text>Khách hàng chấm điểm, đánh giá, nhận xét</Text>
      </Box>
      <Divider size="sm" my="sm" variant="solid"></Divider>
      <Flex direction={"row"} align={"center"}>
        <Flex
          w={"30%"}
          direction={"column"}
          align={"center"}
          justify={"center"}
          gap={5}
        >
          <Text c={"yellow"} fw={"bold"} size="lg">
            {averageStar || 0}/5
          </Text>
          <Rating size="md" mt={3} value={averageStar} />
        </Flex>
        <Flex w={"100%"} align={"center"} wrap="wrap">
          <Flex
            className={selectFilter === 0 ? style.selected : style.btnFilter}
            align={"center"}
            gap={5}
            onClick={() => handleSelectFilter(0)}
          >
            Tất cả
          </Flex>
          {ratingOrder.map((review) => (
            <Flex
              className={
                selectFilter === review ? style.selected : style.btnFilter
              }
              align={"center"}
              gap={5}
              onClick={() => handleSelectFilter(review)}
            >
              {review}{" "}
              <IconStarFilled
                size={"16px"}
                style={{ color: "#FFCA3F" }}
              ></IconStarFilled>
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Divider size="sm" my="sm" variant="solid"></Divider>
      <Box>
        <Box>
          <div className={style.form}>
            <Box w={width > 600 ? "40%" : "30%"}>
              <Flex
                align={"center"}
                direction={"column"}
                justify={"center"}
                className={style.rightForm}
                gap={"xs"}
              >
                <Flex align={"center"} justify={"center"} gap={5}>
                  <Text>{averageStar || 0}/5</Text>
                  <IconStarFilled size={32} style={{ color: "#FFCA3F" }} />
                </Flex>
                {/* <Text span>
                  ({dataReview ? dataReview.length : totalRandom} lượt đánh giá
                  và nhận xét)
                </Text> */}
              </Flex>
            </Box>
            <Divider orientation="vertical" size="sm" variant="solid"></Divider>
            <Box p={10} w={width > 600 ? "60%" : "100%"}>
              {ratingOrder.map((rating) => (
                <Flex align={"center"} key={rating} gap={"sm"} w={"100%"}>
                  <Flex justify={"center"} align={"center"} gap={3}>
                    {rating}
                    <IconStarFilled size={16} style={{ color: "#FFCA3F" }} />
                  </Flex>
                  <div className={style.bgRate}>
                    <div
                      style={{
                        borderRadius: 12,
                        height: 5,
                        width: `${
                          dataReview && dataReview.length
                            ? (dataSynthetic[rating as keyof CountSynthetic] /
                                (dataReview.length || 1)) *
                              100
                            : (dataSynthetic[rating as keyof CountSynthetic] /
                                (totalRandom || 1)) *
                              100
                        }%`,
                        backgroundColor: handleControlBgColor(rating),
                      }}
                    ></div>
                  </div>
                  <Text className={style.text}>
                    {dataSynthetic[rating as keyof CountSynthetic]} đánh giá
                  </Text>
                </Flex>
              ))}
            </Box>
            <Divider orientation="vertical" size="sm" variant="solid"></Divider>
            <Flex
              w={{ base: "30%", lg: "40%" }}
              direction={"column"}
              align={"center"}
              justify={"center"}
            >
              <Text
                style={{ fontSize: 12, fontWeight: 500, textAlign: "center" }}
              >
                Chia sẻ nhận xét về sản phẩm
              </Text>

              <Flex justify={"center"} mt={5}>
                <Button className={style.btn} onClick={openModal}>
                  Viết nhận xét của bạn
                </Button>
              </Flex>
            </Flex>
          </div>
        </Box>

        <Box mt={10}>
          {dataReview?.slice(0, pageSize).map((item, index) => (
            <Box className={style.review} key={index}>
              <Flex gap={5} wrap="wrap" justify={"space-between"} mb={10}>
                <Text lineClamp={1} className={style.name}>
                  {item.userName}
                </Text>
                <Text className={style.date}>{item.creationDate}</Text>
              </Flex>

              <Flex wrap="wrap" gap={10}>
                <Text className={style.name} fw={600}>
                  Đánh giá:
                </Text>
                <Rating defaultValue={item.rate || 0} size={"md"} readOnly />
              </Flex>
              <Flex className={style.commentbox} gap={20}>
                <Text className={style.name} fw={600}>
                  Nhận xét:
                </Text>
                <Text className={style.comment} lineClamp={4}>
                  {item.content}
                </Text>
              </Flex>
            </Box>
          ))}
        </Box>
        {!dataReview ? (
          <div></div>
        ) : pageSize === 4 && pageSize >= dataReview.length ? (
          <div></div>
        ) : pageSize >= dataReview.length ? (
          <Flex className={style.seeMore} onClick={() => setPageSize(4)}>
            <Text>Ẩn bớt</Text>
            <IconChevronUp size={18} color="#0052CC" />
          </Flex>
        ) : (
          <Flex
            gap={5}
            className={style.seeMore}
            onClick={() => handleClickSeeMore()}
          >
            <Text>Xem thêm đánh giá</Text>
            <IconChevronDown size={18} color="#0052CC" />
          </Flex>
        )}
      </Box>
    </div>
  );
};

export default Reviews;

type ReviewProps = {
  dataItem: TblProduct | null;
  dataReview: TblUserReview[] | null;
};
