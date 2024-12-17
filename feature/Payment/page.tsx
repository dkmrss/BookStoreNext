"use client";
import style from "./Payment.module.scss";
import { useEffect, useState } from "react";
import Information from "./Information";
import Pay from "./Pay";
import { Box, Center, Flex, Text, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import MBlogo from "@/assets/mbbank.png";
import Cod from "@/assets/logoCod.png";
import {
  getDataCommune,
  getDataDistrict,
  getDataProvice,
} from "@/api/ApiAddress";
import { tblCommune, tblDistrict, tblProvince } from "@/model/TblAddress";

const Payment = () => {
  const [data, setData] = useState({
    fullName: null,
    phoneNumber: null,
    email: null,
    deliveryMethod: "Giao hàng tận nơi",
    province: null,
    district: null,
    commune: null,
    address: null,
    note: null,
    buyerId: null,
  });

  const paymentMethods = [
    {
      id: 1,
      imgSrc: Cod,
      label: "Thanh toán khi nhận hàng",
    },
    {
      id: 2,
      imgSrc: MBlogo,
      label: "Thanh toán chuyển khoản MB",
    },
  ];

  const [dataAllProvince, setDataAllProvince] = useState<tblProvince[]>([]);
  const [dataAllDistrict, setDataAllDistrict] = useState<tblDistrict[]>([]);
  const [dataAllCommune, setDataAllCommune] = useState<tblCommune[]>([]);
  const isMobile = useMediaQuery(`(max-width: ${em(800)})`);
  const [changeForm, setChangeForm] = useState(false);
  const router = useRouter();
  const saleOrder = useSelector((state: any) => state.saleOrder);

  const handleChangeForm = () => {
    setChangeForm(!changeForm);
    window.scroll(0, 0);
  };

  const handleBack = () => {
    router.back();
  };

  const fetchDataProvince = async () => {
    const data = await getDataProvice("Active=true&Skip=0&Take=1000");
    setDataAllProvince(data?.data);
  };

  const fetchDataDistrict = async () => {
    const data = await getDataDistrict("Active=true&Skip=0&Take=1000");
    setDataAllDistrict(data?.data);
  };

  const fetchDataCommune = async () => {
    const data = await getDataCommune("Active=true&Skip=0&Take=11000");
    setDataAllCommune(data?.data);
  };

  useEffect(() => {
    fetchDataProvince();
    fetchDataDistrict();
    fetchDataCommune();
  }, []);

  useEffect(() => {
    if (saleOrder.totalAmount === 0 || saleOrder.saleOrderDetail.length < 1) {
      router.replace(`/cart`);
    }
  }, []);
  return (
    <div className={style.headerPayment}>
      <Box w={isMobile ? "100%" : "50%"} mt={20}>
        <Flex
          p={"5px 0px"}
          style={{ borderBottom: "1px solid #eeeeee" }}
          w={"100%"}
        >
          {!changeForm ? (
            <>
              <Box style={{ paddingTop: "5px" }}>
                <IconArrowLeft
                  width={"20px"}
                  height={"20px"}
                  stroke={1.5}
                  cursor={"pointer"}
                  onClick={() => handleBack()}
                />
              </Box>
              <Box ta={"center"} w={"100%"}>
                <Text fw={500} size="18px">
                  Thông tin
                </Text>
              </Box>
            </>
          ) : (
            <>
              <IconArrowLeft
                width={"20px"}
                height={"20px"}
                stroke={1.5}
                cursor={"pointer"}
                onClick={handleChangeForm}
              />
              <Box ta={"center"} w={"100%"}>
                <Text fw={500} size="18px">
                  Thanh toán
                </Text>
              </Box>
            </>
          )}
        </Flex>
        <Flex mt={10} gap={10}>
          <Box w={"100%"}>
            <Center className={!changeForm ? style.setColor : style.none}>
              <Text fw={500}>THÔNG TIN ĐƠN HÀNG</Text>
            </Center>
          </Box>
          <Box w={"100%"}>
            <Center className={changeForm ? style.setColor : style.none}>
              <Text fw={500} c={"black"}>
                THANH TOÁN
              </Text>
            </Center>
          </Box>
        </Flex>
      </Box>
      <Box w={isMobile ? "100%" : "50%"}>
        {!changeForm ? (
          <Information
            data={data}
            setData={setData}
            handleChangeForm={handleChangeForm}
            dataAllCommune={dataAllCommune}
            dataAllDistrict={dataAllDistrict}
            dataAllProvince={dataAllProvince}
          />
        ) : (
          <Pay
            data={data}
            paymentMethods={paymentMethods}
            dataAllCommune={dataAllCommune}
            dataAllDistrict={dataAllDistrict}
            dataAllProvince={dataAllProvince}
          ></Pay>
        )}
      </Box>
    </div>
  );
};

export default Payment;
