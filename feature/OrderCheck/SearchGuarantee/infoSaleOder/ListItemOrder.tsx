import {
  Box,
  Flex,
  Image,
  Space,
  Table,
  Text,
  NumberFormatter,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { tblCommune, tblDistrict, tblProvince } from "@/model/TblAddress";
import style from "./infoSaleOder.module.scss";
import { modals } from "@mantine/modals";
import OrderList from "./ListItemOrder";
import React from "react";
import {
  getDataCommuneId,
  getDataProviceId,
  getDataDistrictId,
} from "@/api/ApiAddress";
import { tblSaleOrderDetailCommands } from "@/model/TblSaleOrder";
import Link from "next/link";
import { useViewportSize } from "@mantine/hooks";
type InfoSaleOderProps = {
  data: any;
};

const InfoSaleOder = ({ data }: InfoSaleOderProps) => {
  const [dataAllProvince, setDataAllProvince] = useState<tblProvince>();
  const [dataAllDistrict, setDataAllDistrict] = useState<tblDistrict>();
  const [dataAllCommune, setDataAllCommune] = useState<tblCommune>();
  const { height } = useViewportSize();
  const fetchDataProvince = async () => {
    if (data?.provinceId) {
      const data2 = await getDataProviceId(`id=${data.provinceId}`);
      setDataAllProvince(data2?.data);
    }
  };

  const fetchDataDistrict = async () => {
    if (data?.districtId) {
      const data2 = await getDataDistrictId(`id=${data.districtId}`);
      setDataAllDistrict(data2?.data);
    }
  };

  const fetchDataCommune = async () => {
    if (data?.communeId) {
      const data2 = await getDataCommuneId(`id=${data.communeId}`);
      setDataAllCommune(data2?.data);
    }
  };

  useEffect(() => {
    fetchDataProvince();
    fetchDataDistrict();
    fetchDataCommune();
  }, [data]);

  return (
    <div className={style.modalsBox}>
      <Box
        className={style.textLeft}
        style={{ height: `${(height / 100) * 75}px` }}
      >
        <div className={style.flexBox}>
          <div>
            <h2 className={style.titleInfo}>Thông tin đơn hàng</h2>

            <Table mt={20} mb={20} striped withTableBorder withColumnBorders>
              <Table.Tr key={1}>
                <Table.Td>
                  <Text
                    className={style.tableOrderText}
                    c={"var(--clr-primary)"}
                    ta="left"
                    fw={700}
                  >
                    Họ tên:
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text className={style.tableOrderText}>
                    {data?.buyerName}
                  </Text>
                </Table.Td>
              </Table.Tr>

              <Table.Tr key={3}>
                <Table.Td>
                  <Text
                    className={style.tableOrderText}
                    c={"var(--clr-primary)"}
                    ta="left"
                    fw={700}
                  >
                    Địa chỉ:
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text className={style.tableOrderText}>
                    {data?.shippingAddress} , {dataAllCommune?.communeName},{" "}
                    {dataAllDistrict?.districtName},{" "}
                    {dataAllProvince?.provinceName}
                  </Text>
                </Table.Td>
              </Table.Tr>

              <Table.Tr key={4}>
                <Table.Td>
                  <Text
                    className={style.tableOrderText}
                    c={"var(--clr-primary)"}
                    ta="left"
                    fw={700}
                  >
                    Điện thoại:
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text className={style.tableOrderText}>
                    {data?.buyerTelephone}
                  </Text>
                </Table.Td>
              </Table.Tr>

              <Table.Tr key={4}>
                <Table.Td>
                  <Text
                    className={style.tableOrderText}
                    c={"var(--clr-primary)"}
                    ta="left"
                    fw={700}
                  >
                    Hình thức giao hàng:
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text className={style.tableOrderText}>
                    {data?.shippingCompany}
                  </Text>
                </Table.Td>
              </Table.Tr>
            </Table>
          </div>
          <div>
            <h2 className={style.titleInfo}>Tổng giá</h2>

            <Table mt={20} mb={20} striped withTableBorder withColumnBorders>
              <Table.Tr key={1}>
                <Table.Td>
                  <Text
                    className={style.tableOrderText}
                    c={"var(--clr-primary)"}
                    ta="left"
                    fw={700}
                  >
                    Đã giảm giá khuyến mại
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text className={style.tableOrderText}>
                    <Text className={style.tableOrderText} span fw={600}>
                      <NumberFormatter
                        value={data?.voucherValue || 0}
                        thousandSeparator
                        suffix=" Đ"
                      />
                    </Text>
                    (Phiếu KM: - Mã: )
                  </Text>
                </Table.Td>
              </Table.Tr>

              <Table.Tr key={2}>
                <Table.Td>
                  <Text
                    className={style.tableOrderText}
                    c={"var(--clr-primary)"}
                    ta="left"
                    fw={700}
                  >
                    Khuyến mại khác
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text className={style.tableOrderText}></Text>
                </Table.Td>
              </Table.Tr>

              <Table.Tr key={3}>
                <Table.Td>
                  <Text
                    className={style.tableOrderText}
                    c={"var(--clr-primary)"}
                    ta="left"
                    fw={700}
                  >
                    Tổng giá trị
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text className={style.tableOrderText} fw={600}>
                    <NumberFormatter
                      value={data.totalAmount}
                      thousandSeparator
                    />
                    <Text className={style.tableOrderText} span>
                      {" "}
                      VND
                    </Text>
                  </Text>
                  <Text className={style.tableOrderText}>
                    (Chưa gồm phí vận chuyển)
                  </Text>
                </Table.Td>
              </Table.Tr>

              <Table.Tr key={4}>
                <Table.Td>
                  <Text
                    className={style.tableOrderText}
                    c={"var(--clr-primary)"}
                    ta="left"
                    fw={700}
                  >
                    Phí vận chuyển & giao hàng
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text className={style.tableOrderText} fw={600}>
                    <NumberFormatter
                      value={data?.shippingFee || 0}
                      thousandSeparator
                    />
                    <Text className={style.tableOrderText} span>
                      {" "}
                      VND
                    </Text>
                  </Text>
                </Table.Td>
              </Table.Tr>

              <Table.Tr key={5}>
                <Table.Td>
                  <Text
                    className={style.tableOrderText}
                    c={"var(--clr-primary)"}
                    ta="left"
                    fw={700}
                  >
                    Phí thu hộ
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text className={style.tableOrderText} fw={600}>
                    <NumberFormatter value={0} thousandSeparator />
                    <Text className={style.tableOrderText} span>
                      {" "}
                      VND
                    </Text>
                  </Text>
                </Table.Td>
              </Table.Tr>

              <Table.Tr key={6}>
                <Table.Td>
                  <Text
                    className={style.tableOrderText}
                    c={"var(--clr-primary)"}
                    ta="left"
                    fw={700}
                  >
                    Tổng thu
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text className={style.tableOrderText} fw={600}>
                    <NumberFormatter
                      value={data?.totalRemainingAmount || 0}
                      thousandSeparator
                    />
                    <Text className={style.tableOrderText} span>
                      {" "}
                      VND
                    </Text>
                  </Text>
                </Table.Td>
              </Table.Tr>
            </Table>
          </div>
        </div>

        <h2 className={style.titleInfo}>Chi tiết đơn hàng</h2>

        <div className={style.itemBox}>
          {data?.tblSaleOrderDetailModels?.map(
            (saleOder: tblSaleOrderDetailCommands, index: number) => {
              return (
                <div key={index} className={style.item}>
                  <div className={style.imageBox}>
                    <img
                      src={saleOder?.itemImage || ""}
                      alt={"product image"}
                    />
                  </div>
                  <div className={style.contentBox}>
                    <p className={style.productName}>
                      <Link
                        className={style.link}
                        href={`/product-detail/${saleOder?.itemUrl || "#"}`}
                        onClick={() => modals.closeAll()}
                      >
                        {saleOder?.itemName}
                      </Link>
                    </p>
                    <p className={style.quantity}>
                      Số lượng: x{saleOder?.quantity}
                    </p>
                    <Text className={style.tableOrderText} mt={5} mb={5}>
                      Đơn giá:{" "}
                      <NumberFormatter
                        thousandSeparator="."
                        decimalSeparator=","
                        value={
                          (saleOder?.totalAmount || 0) /
                          (saleOder?.quantity || 1)
                        }
                        suffix="₫"
                      />
                    </Text>
                    <Text className={style.tableOrderText} mt={5} mb={5}>
                      Tổng tiền:{" "}
                      <span
                        style={{
                          color: "var(--clr-primary)",
                          fontWeight: "700",
                        }}
                      >
                        <NumberFormatter
                          thousandSeparator="."
                          decimalSeparator=","
                          value={saleOder?.totalAmount || 0}
                          suffix="₫"
                        />
                      </span>
                    </Text>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </Box>
    </div>
  );
};

export default InfoSaleOder;
