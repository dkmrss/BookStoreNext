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
import {
  CancelGuaranteeBooking,
  getListGuaranteeBooking,
} from "@/api/apiAppointment";
import { TblAppointment } from "@/model/TblAppointment";

const GuaranteeBookingList = () => {
  const iconStyle = { width: rem(12), height: rem(12) };
  const [DataGuaranteeList, setDataGuaranteeList] = useState<TblAppointment[]>(
    []
  );

  const [limit, setLimit] = useState(6);
  const dataUser = useSelector((state: any) => state.auth?.userInfo?.data);

  const handleMore = () => {
    if (limit + 6 > DataGuaranteeList.length) {
      setLimit(DataGuaranteeList.length);
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

    await CancelGuaranteeBooking(data);
    handleFetchDataGuaranteeBook();
  };

  const handleFetchDataGuaranteeBook = async () => {
    let filter = `?Skip=0&Take=100&CustomerId=${dataUser?.customerId}`;
    const callApi = await getListGuaranteeBooking(filter);
    if (!isNullOrUndefined(callApi) && !isNullOrUndefined(callApi?.data)) {
      const dataApi = callApi?.data;
      if (dataApi != null && !isNullOrUndefined(dataApi)) {
        const sortedData = dataApi.sort(
          (a: TblAppointment, b: TblAppointment) => b.id - a.id
        );
        setDataGuaranteeList(sortedData);
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
    handleFetchDataGuaranteeBook();
  }, []);

  return (
    <div>
      <Box className={style.textLeft}>
        <Space h="sm" />
      </Box>
      <div className={style.flexBox}>
        {DataGuaranteeList.slice(0, limit).map(
          (item: TblAppointment, index: any) => {
            return (
              <div key={index} className={style.itemRow}>
                <div className={style.contentBox}>
                  <div className={style.contentTopBox}>
                    <div className={style.contentTopLeftBox}>
                      <p className={style.item1Name}>Mã lịch hẹn: {item?.id}</p>
                      <p className={style.itemCode}>
                        Người đặt lịch:<strong> {item?.customerName}</strong>
                      </p>
                      <p className={style.itemCode}>
                        Số điện thoại: <strong>{item?.phoneNumber}</strong>
                      </p>
                      <p className={style.store1}>
                        Địa chỉ bảo hành: <strong>{item?.region}</strong>
                      </p>
                      <p className={style.store}>
                        Sản phẩm bảo hành: <strong>{item?.deviceType}</strong>
                      </p>
                      <p className={style.store}>
                        Mô tả lỗi: {item?.faultDescription}
                      </p>
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
          }
        )}
      </div>

      {DataGuaranteeList.length > 6 && (
        <div className={style.buttonGroup}>
          {limit !== DataGuaranteeList.length && (
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

export default GuaranteeBookingList;
