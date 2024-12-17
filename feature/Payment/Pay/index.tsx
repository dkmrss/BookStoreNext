import React, { useState } from "react";
import {
  Box,
  Text,
  Flex,
  Paper,
  Button,
  NumberFormatter,
  Loader,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { createSaleOrder } from "@/api/apiSaleOrder";
import { addCompleteOrder } from "@/redux/slices/completeOrder";
import { tblCommune, tblDistrict, tblProvince } from "@/model/TblAddress";
import { NotificationExtension } from "@/extension/NotificationExtension";
import { updateCart } from "@/redux/slices/cartSlice";
import { totalCartPrice } from "@/api/apiCart";
import Image from "next/image";
interface dataProp {
  fullName: string | null;
  phoneNumber: string | null;
  email?: string | null;
  deliveryMethod: string | null;
  province: number | null;
  district: number | null;
  commune?: number | null;
  address: string | null;
  note?: string | null;
  buyerId: number | null;
}

const Pay = ({
  data,
  paymentMethods,
  dataAllProvince,
  dataAllDistrict,
  dataAllCommune,
}: {
  data: dataProp;
  paymentMethods: any;
  dataAllProvince: tblProvince[];
  dataAllDistrict: tblDistrict[];
  dataAllCommune: tblCommune[];
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<number | null>(1);
  const [selectedMethodLabel, setSelectedMethodLabel] = useState<string | null>(
    "Thanh toán khi nhận hàng"
  );
  const saleOrder = useSelector((state: any) => state.saleOrder);
  const [loading, setLoading] = useState(false);
  const handleDoOrder = async () => {
    const dataOrder = {
      tblSaleOrderCommand: {
        assignToId: null,
        assignToName: null,
        orderNumber: "string",
        orderDate: null,
        orderType: null,
        customerId: null,
        customerSiteId: null,
        buyerId: data.buyerId || 0,
        buyerEmail: data.email || null,
        provinceId: data.province,
        districtId: data.district,
        communeId: data.commune || null,
        buyerName: data.fullName,
        buyerTelephone: data.phoneNumber,
        buyerInfo: null,
        taxCode: null,
        taxCompany: null,
        taxAddress: null,
        totalAmount: saleOrder.totalAmount,
        orderPromotion: null,
        shipMethod: null,
        shippingStatus: null,
        shippingInfo: null,
        shippingComment: null,
        shippingUpdateTime: null,
        shippingUpdateBy: null,
        shippingCompany: data.deliveryMethod,
        shippingFee: 0,
        codfee: null,
        shippingNote: data.note || null,
        shippingAddress: data.address,
        payMethodId: null,
        payStatus: selectedMethodLabel,
        receivePayStatus: null,
        successStatus: null,
        buyerInstruction: null,
        description: null,
        buyerFeedBackId: null,
        discountPrice: null,
        discountInfo: null,
        orderFees: null,
        orderDiscount: null,
        discount: null,
        discountNote: null,
        orderStatus: null,
        orderMessage: null,
        orderComment: null,
        orderStatusDate: null,
        orderStatusUpdateBy: null,
        caresoftTicketId: null,
        voucherId: null,
        creationDate: null,
        createdBy: null,
        lastUpdateDate: null,
        lastUpdatedBy: null,
        lastUpdateLogin: null,
      },
      tblSaleOrderDetailCommands: saleOrder.saleOrderDetail,
    };
    setLoading(true);
    try {
      const create = await createSaleOrder(dataOrder);
      if (create.success === true) {
        const dataApiOrder = {
          data: { ...create.data, paymentType: selectedMethodLabel },
        };
        dispatch(addCompleteOrder(dataApiOrder));

        const totalData = await totalCartPrice(
          dataOrder.tblSaleOrderCommand.buyerId
        );
        const newCartHeader = {
          totalItem: totalData?.data?.quantity,
          totalPrice: totalData?.data?.totalAmount,
        };

        dispatch(updateCart(newCartHeader));

        router.replace(`/completeOrder`);
        setLoading(false); // Đã lấy được dữ liệu, setLoading là false
      } else {
        setLoading(true); // Không lấy được dữ liệu, setLoading là true
        NotificationExtension.Fails("Có lỗi xảy ra vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(true); // Có lỗi khi lấy dữ liệu, setLoading là true
      NotificationExtension.Fails("Có lỗi xảy ra vui lòng thử lại!");
    }
  };

  const getProvinceName = (Id: number) => {
    const province = dataAllProvince.find((p) => p.provinceId === Id);
    return province ? province.provinceName : null;
  };

  const DistrictName = (Id: number) => {
    const province = dataAllDistrict.find((p) => p.districtId === Id);
    return province ? province.districtName : null;
  };

  const getCommuneName = (Id: number) => {
    const province = dataAllCommune.find((p) => p.communeId === Id);
    return province ? province.communeName : null;
  };

  return (
    <>
      <Box
        m={"10px 0px"}
        p={10}
        bg={"var(--clr-bg-gray-light)"}
        style={{ borderRadius: "10px" }}
      >
        <Text fw={500}>THÔNG TIN ĐẶT HÀNG:</Text>
        <Flex mt={5} gap={5}>
          <Text>Người đặt: </Text>
          <Text fw={500}> {data?.fullName}</Text>
        </Flex>
        <Flex mt={5} gap={5}>
          <Text>Số điện thoại: </Text>
          <Text fw={500}> {data?.phoneNumber}</Text>
        </Flex>
        <Flex mt={5} gap={5}>
          <Text>Email: </Text>
          <Text fw={500}> {data?.email}</Text>
        </Flex>
        <Flex mt={5} gap={5}>
          <Text>Địa chỉ: </Text>
          <Text fw={500}>
            {data?.address},{" "}
            {data?.commune && <>{getCommuneName(Number(data?.commune))}, </>}
            {DistrictName(Number(data?.district))},{" "}
            {getProvinceName(Number(data?.province))}
          </Text>
        </Flex>
        <Flex mt={5} gap={5}>
          <Text>Phương thức giao hàng:</Text>
          <Text fw={500}> {data?.deliveryMethod}</Text>
        </Flex>
        <Flex mt={5} gap={5}>
          <Text>Ghi chú: </Text>
          <Text fw={500}> {data?.note}</Text>
        </Flex>
        <Flex mt={5} gap={5}>
          <Text>Phí giao hàng: </Text>
          <Text fw={500}> 0 đ</Text>
        </Flex>
        <Flex mt={5} gap={5}>
          <Text>Tổng tiền: </Text>
          <Text fw={500}>
            <NumberFormatter
              thousandSeparator
              value={saleOrder.totalAmount}
              suffix="đ"
            />
          </Text>
        </Flex>
      </Box>
      <Box
        m={"10px 0px"}
        p={10}
        bg={"var(--clr-bg-gray-light)"}
        style={{ borderRadius: "10px" }}
      >
        <Text fw={500}>Chọn phương thức thanh toán:</Text>
        {paymentMethods.map((item: any) => (
          <Paper
            key={item.id}
            shadow="md"
            radius={10}
            mt={10}
            style={{
              border:
                selectedMethod === item.id
                  ? "2px solid var(--clr-primary)"
                  : "2px solid #fff",
            }}
            onClick={() => {
              setSelectedMethod(item.id);
              setSelectedMethodLabel(item.label);
            }}
          >
            <Flex
              align={"center"}
              gap={20}
              p={"5px 10px"}
              bg={"#fff"}
              style={{ borderRadius: "10px", cursor: "pointer" }}
            >
              <Image src={item.imgSrc} alt="pptt" width={50} height={50} />
              <Text fw={500}>{item.label}</Text>
            </Flex>
          </Paper>
        ))}
      </Box>
      <Paper shadow="xl" p={"10px"} pos={"relative"} h={"95px"}>
        <Box w={"96.5%"} pos={"absolute"}>
          <Flex justify="space-between" align="center" w={"100%"}>
            <Text fw={500}>Tổng tiền tạm tính:</Text>
            <Text c={"var(--clr-primary)"} fw={500}>
              <NumberFormatter
                thousandSeparator
                value={saleOrder.totalAmount}
                suffix="đ"
              />
            </Text>
          </Flex>
          {loading ? (
            <Button
              color="var(--clr-primary)"
              onClick={() => handleDoOrder()}
              fullWidth
              disabled
              mt={"10px"}
            >
              <Loader color="rgba(255, 255, 255, 1)" type="bars" />;
            </Button>
          ) : (
            <Button
              color="var(--clr-primary)"
              onClick={() => handleDoOrder()}
              fullWidth
              mt={"10px"}
            >
              <Text fw={500}>Đặt hàng</Text>
            </Button>
          )}
        </Box>
      </Paper>
    </>
  );
};

export default Pay;
