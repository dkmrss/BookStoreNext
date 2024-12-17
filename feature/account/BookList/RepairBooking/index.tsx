"use client";
import {
  CancelRepairBooking,
  getListRepairBooking,
} from "@/api/apiCustomerAppointment";
import { isNullOrUndefined } from "@/extension/StringExtension";
import { tblCustomerAppointment } from "@/model/TblCustomerAppointment";
import {
  Box,
  Flex,
  NumberFormatter,
  Space,
  Tabs,
  Text,
  rem,
} from "@mantine/core";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import style from "./infoSaleOder.module.scss";
import {
  getDataDetailProductByPathName,
  getDetailProduct,
} from "@/api/apiProduct";
import Link from "next/link";
import { useSelector } from "react-redux";
import { modals } from "@mantine/modals";

const RepairList = () => {
  const iconStyle = { width: rem(12), height: rem(12) };
  const [dataRepairList, setDataRepairList] = useState<
    tblCustomerAppointment[]
  >([]);

  const [limit, setLimit] = useState(6);
  const dataUser = useSelector((state: any) => state.auth?.userInfo?.data);

  const handleMore = () => {
    if (limit + 6 > dataRepairList.length) {
      setLimit(dataRepairList.length);
    } else {
      setLimit(limit + 6);
    }
  };

  const handleHidden = () => {
    if (limit > 6 && limit <= 12) {
      setLimit(6);
    } else if (limit > 12) {
      setLimit(limit - 6);
    }
  };

  const handleCancel = async (id: any) => {
    const data = [id];

    await CancelRepairBooking(data);
    handleFetchDataRepairBook();
  };

  const handleFetchDataRepairBook = async () => {
    let filter = `?Skip=0&Take=100&CustomerId=${dataUser?.customerId}`;
    const callApi = await getListRepairBooking(filter);
    if (!isNullOrUndefined(callApi) && !isNullOrUndefined(callApi?.data)) {
      const dataApi = callApi?.data;
      if (dataApi != null && !isNullOrUndefined(dataApi)) {
        const sortedData = dataApi.sort(
          (a: tblCustomerAppointment, b: tblCustomerAppointment) => b.id - a.id
        );
        setDataRepairList(sortedData);
      } else {
        console.log("Dữ liệu không tồn tại");
      }
    } else {
      console.log("Dữ liệu không tồn tại");
    }
  };

  function formatDateTime(input: any) {
    const date = new Date(input);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  const openModalCancel = (id: any) =>
    modals.openConfirmModal({
      title: "Bạn có muốn huỷ lịch hẹn này?",
      zIndex: 1000,
      labels: { confirm: "Xác nhận", cancel: "Hủy" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleCancel(id),
      classNames: {
        body: style.body,
      },
    });

  useEffect(() => {
    handleFetchDataRepairBook();
  }, []);

  return (
    <div>
      <Box className={style.textLeft}>
        <Space h="sm" />
      </Box>
      <div className={style.flexBox}>
        {dataRepairList
          .slice(0, limit)
          .map((item: tblCustomerAppointment, index: any) => {
            return (
              <div key={index} className={style.itemRow}>
                <div className={style.contentBox}>
                  <div className={style.contentTopBox}>
                    <div className={style.contentTopLeftBox}>
                      <p className={style.item1Name}>Mã lịch hẹn: {item?.id}</p>
                      <p className={style.itemCode}>
                        Người đặt lịch: <strong>{item?.fullName}</strong>
                      </p>
                      <p className={style.itemCode}>
                        Số điện thoại: <strong>{item?.mobile}</strong>
                      </p>
                      <p className={style.itemCode}>
                        Ngày hẹn:{" "}
                        <strong>{formatDateTime(item?.appointmentTime)}</strong>
                      </p>

                      <p className={style.store1}>
                        Địa điểm sửa chữa: <strong>{item?.storeAddress}</strong>
                      </p>
                      <div className={style.itemBox}>
                        Sản phẩm sửa chữa:{" "}
                        <Link href={`#`} className={style.link}>
                          {item?.productName}
                        </Link>
                      </div>
                      <div className={style.buttonGroup2}>
                        <button
                          onClick={() => openModalCancel(item?.id)}
                          className={style.button}
                        >
                          Huỷ lịch hẹn
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={style.contentBotttomBox}></div>
                </div>
              </div>
            );
          })}
      </div>
      {dataRepairList.length > 6 && (
        <div className={style.buttonGroup}>
          {limit !== dataRepairList.length && (
            <button className={style.button} onClick={handleMore}>
              Xem thêm
            </button>
          )}
          {limit !== 6 && (
            <button className={style.button} onClick={handleHidden}>
              Thu gọn
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default RepairList;
