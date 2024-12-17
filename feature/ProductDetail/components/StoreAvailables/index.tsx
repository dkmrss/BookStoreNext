"use client";
import iconExtra from "@/assets/iconExtra.svg";
import iconGift from "@/assets/iconGift.svg";
import { TblItem, TblstoreAvailables } from "@/model/ProductList";
import { Box, Flex, NumberFormatter, Text } from "@mantine/core";
import Image from "next/image";
import { useEffect, useState } from "react";
import style from "./Specifications.module.scss";
import {
  IconBuildingStore,
  IconCaretDownFilled,
  IconCaretUpFilled,
  IconGift,
} from "@tabler/icons-react";

const StoreAvailables = ({ data }: { data: TblItem | null }) => {
  const [dataStoreStock, setDataStoreStock] = useState<TblstoreAvailables[]>(
    []
  );
  const [storeStockCount, setStoreStockCount] = useState(2);

  const handleExpandStoreStock = () => {
    if (dataStoreStock.length > 2 && storeStockCount <= 2)
      setStoreStockCount(dataStoreStock.length);
    else setStoreStockCount(2);
  };

  useEffect(() => {
    if (data && data.storeAvailables) {
      setDataStoreStock(data.storeAvailables);
    }
  }, [data]);

  return (
    <Box className={style.storeStock}>
      <Box className={style.giftsIncentivesHeader}>
        <IconBuildingStore color="var(--clr-light-primary)" size={22} />
        {dataStoreStock.length === 0 ? (
          <Text>Số lượng sản phẩm tại cửa hàng hiện đang cập nhật</Text>
        ) : (
          <Text>{dataStoreStock.length} cửa hàng có sẵn sản phẩm</Text>
        )}
      </Box>
      <Box className={style.addressStoreStockWrapper}>
        {dataStoreStock.length === 0 ? (
          <Text fz={18}>
            Để biết thêm thông tin chi tiết vui lòng liên hệ:
            <span
              style={{
                color: "rgb(244, 52, 83)",
                fontWeight: 700,
                paddingLeft: 2,
              }}
            >
              1800 8091
            </span>
          </Text>
        ) : (
          <>
            {dataStoreStock?.slice(0, storeStockCount)?.map((item, index) => (
              <Box className={style.addressStoreStock} key={index}>
                <Text fz={15}>
                  {item.tentrungtam}
                  {" - "}
                  <span>
                    Số lượng còn lại:{" "}
                    <span
                      style={{ color: "rgb(244, 52, 83)", fontWeight: 700 }}
                    >
                      {item.sumOnhandQuantity}
                    </span>
                  </span>
                </Text>
              </Box>
            ))}
            {storeStockCount < dataStoreStock.length ? (
              <Text className={style.extra} onClick={handleExpandStoreStock}>
                Xem thêm {dataStoreStock.length - storeStockCount} cửa hàng
                <IconCaretDownFilled color="var(--clr-light-primary)" />
              </Text>
            ) : (
              <Text className={style.extra} onClick={handleExpandStoreStock}>
                Ẩn bớt
                <IconCaretUpFilled color="var(--clr-light-primary)" />
              </Text>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default StoreAvailables;
