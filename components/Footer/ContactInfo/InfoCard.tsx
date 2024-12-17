import { Box, Flex, Grid, Text } from "@mantine/core";
import Image from "next/image";
import style from "./ContactInfo.module.scss";

const InfoCard = ({ title, info, images }: InfoCardProps) => {
  return (
    <>
      <Box>
        <Flex direction={"column"} gap={"4"}>
          <Text tt={"uppercase"} fw={"bold"} mb={"5px"}>
            {title}
          </Text>
          {!images ? (
            info.map((item) => (
              <>
                <Text key={item} size="xs">
                  <a href="#" className={style.linkInfo}>
                    {item}
                  </a>
                </Text>
              </>
            ))
          ) : (
            <Box w={{ base: "300px", lg: "100%" }}>
              <Grid gutter={5}>
                {images.map((img, index) => (
                  <Grid.Col span={index < 4 ? 3 : 4} key={index}>
                    <Box className={style.imageBox}>
                      <Image className={style.image} src={img} alt="" />
                    </Box>
                  </Grid.Col>
                ))}
              </Grid>
            </Box>
          )}
        </Flex>
      </Box>
    </>
  );
};

type InfoCardProps = {
  title: string;
  info: string[];
  images?: any[] | null;
};

export default InfoCard;
