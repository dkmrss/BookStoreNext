"use client";
import { Box, Flex, em } from "@mantine/core";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { createCustomerAppointment } from "@/api/apiCustomerAppointment";
import { getDetailProduct } from "@/api/apiProduct";
import { notifications } from "@mantine/notifications";
import BookingRepair from "@/feature/BookingRepair/Form";
import Confirm from "@/feature/BookingRepair/Confirm";
import { tblCustomerAppointment } from "@/model/TblCustomerAppointment";
import { TblItem } from "@/model/ProductList";
import style from "./BookingRepair.module.scss";

const PageBookingRepair = ({
  dataProduct,
}: {
  dataProduct: TblItem | null;
}) => {
  const [data, setData] = useState<tblCustomerAppointment>({
    id: 0,
    fullName: null,
    email: null,
    mobile: null,
    productName: null,
    productId: null,
    isStudent: null,
    storeAddress: null,
    note: null,
    appointmentTime: null,
    customerId: null,
  });
  const [appointmentSuccess, setAppointmentSuccess] = useState(false);

  const handleCreateCustomerAppointment = async (time: string) => {
    const result = await createCustomerAppointment({
      ...data,
      appointmentTime: time,
    });
    setData(result?.data?.data);

    setAppointmentSuccess(result.success);
  };

  return (
    <Box mb={10} maw={800} m={"auto"} className={style.box}>
      {appointmentSuccess ? (
        <Confirm data={data} dataProduct={dataProduct || null} />
      ) : (
        <BookingRepair
          data={data}
          setData={setData}
          dataProduct={dataProduct || null}
          handleCreateCustomerAppointment={handleCreateCustomerAppointment}
        />
      )}
    </Box>
  );
};

export default PageBookingRepair;
