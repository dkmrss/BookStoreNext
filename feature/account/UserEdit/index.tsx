"use client";
import { getDataDistrict, getDataProvice } from "@/api/ApiAddress";
import logo from "@/assets/dichvutot-01-01.png";
import { tblDistrict, tblProvince } from "@/model/TblAddress";
import { tblCustomer, tblCustomerEdit } from "@/model/TblCustomer";
import {
  Box,
  Button,
  Group,
  Select,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import style from "./UserInfo.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { modifyCustomer } from "@/api/apiCustomer";

const UserEdit = () => {
  const data = useSelector((state: any) => state.auth?.userInfo?.data);
  const dispatch = useDispatch();

  const formData = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      telephoneNumber: "",
      customerName: "",
      sex: "",
      address: "",
      shipToProvince: "0",
      shipToDistrict: "0",
      customerId: 0,
      userName: "",
    },
  });

  const [dataAllProvince, setDataAllProvince] = useState<tblProvince[]>([]);
  const [dataAllDistrict, setDataAllDistrict] = useState<tblDistrict[]>([]);
  const [dataOptionProvince, setDataOptionProvince] = useState<any[]>([]);
  const [dataOptionDistrict, setDataOptionDistrict] = useState<any[]>([]);
  const [focused, setFocused] = useState(false);
  const [enable, setEnable] = useState(false);
  const floating =
    focused || formData.values.customerName.length > 0 || undefined;

  const [focused2, setFocused2] = useState(false);
  const floating2 = focused2 || formData.values.address.length > 0 || undefined;

  const handleSubmit = async (dataSubmit: tblCustomerEdit) => {
    if (
      dataSubmit &&
      dataSubmit.address &&
      dataSubmit.customerName &&
      dataSubmit.telephoneNumber &&
      dataSubmit.email &&
      dataSubmit.shipToProvince &&
      dataSubmit.shipToDistrict
    ) {
      const dataCustomerSite = {
        ...dataSubmit,
        tblCustomerSiteCommands: [
          {
            customerId: data?.customerId || 0,
            customerSiteId: 0,
            customerSiteType: null,
            address: dataSubmit.address || null,
            customerSiteNumber: null,
            customerSiteName: dataSubmit.customerName || null,
            telephoneNumber: dataSubmit.telephoneNumber || null,
            attribute1: null,
            attribute2: null,
            attribute3: null,
            createdBy: null,
            lastUpdateDate: null,
            lastUpdatedBy: null,
            lastUpdateLogin: null,
            creationDate: null,
            wardId: data?.shipToWard || null,
            districtId: dataSubmit.shipToDistrict || null,
            provinceId: dataSubmit.shipToProvince || null,
            telephone: dataSubmit.telephoneNumber || null,
            isMain:
              data?.tblCustomerSiteModels &&
              data?.tblCustomerSiteModels.length > 0
                ? "N"
                : "Y",
            email: dataSubmit.email || null,
          },
        ],
      };

      await modifyCustomer(dataCustomerSite);
      window.location.reload();
    } else {
      await modifyCustomer(dataSubmit);
      window.location.reload();
    }
  };
  const handleChangeSelectedProvince = (id: string | null) => {
    if (id) {
      formData.getInputProps("shipToProvince").onChange(Number(id));
      formData.getInputProps("shipToDistrict").onChange(null);
    }
  };

  const handleChangeSelectedDistrict = (id: string | null) => {
    if (id) {
      formData.getInputProps("shipToDistrict").onChange(Number(id));
    }
  };

  const handleChangePassword = () => {
    modals.openConfirmModal({
      zIndex: 1000,
      size: "auto",
      title: (
        <>
          <Title order={5}>Đổi mật khẩu</Title>
        </>
      ),
      children: <ChangePasswordModal />,
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
      classNames: {
        header: style.header,
        content: style.content,
      },
    });
  };

  const fetchDataProvince = async () => {
    const data = await getDataProvice("Active=true&Skip=0&Take=1000");
    setDataAllProvince(data?.data);
  };

  const fetchDataDistrict = async () => {
    const data = await getDataDistrict("Active=true&Skip=0&Take=1000");
    setDataAllDistrict(data?.data);
  };

  useEffect(() => {
    Promise.all([fetchDataProvince(), fetchDataDistrict()]);
  }, []);

  useEffect(() => {
    setDataOptionProvince(
      dataAllProvince?.map((item: tblProvince) => {
        return {
          value: item.provinceId.toString(),
          label: item.provinceName,
        };
      })
    );
  }, [dataAllProvince]);

  useEffect(() => {
    setDataOptionDistrict(
      dataAllDistrict
        ?.filter((item: tblDistrict) => {
          return item?.provinceId === Number(formData.values.shipToProvince);
        })
        .map((item: any) => {
          return {
            value: item.districtId.toString(),
            label: item.districtName,
          };
        })
    );
  }, [formData.values.shipToProvince, dataAllDistrict, dataAllProvince]);

  useEffect(() => {
    if (data) {
      formData.setValues({
        email: data?.email || "",
        telephoneNumber: data?.telephoneNumber || "",
        customerName: data?.customerName || "",
        sex: data?.sex || "",
        address: data?.address || "",
        shipToProvince: data?.shipToProvince || "0",
        shipToDistrict: data?.shipToDistrict || "0",
        customerId: data?.customerId || 0,
        userName: data?.userName || "",
      });
    }
    formData.resetDirty();
  }, [data]);

  useEffect(() => {
    if (formData.isDirty()) {
      setEnable(true);
    } else {
      setEnable(false);
    }
  }, [formData]);

  return (
    <form
      onSubmit={formData.onSubmit((e: tblCustomerEdit) => {
        handleSubmit(e);
      })}
    >
      <Box className={style.userInfoPage}>
        <Box className={style.userAvatar}>
          <Text className={style.name}>{data?.customerName}</Text>
        </Box>
        <Box className={style.mainInfo}>
          <div className={style.inputBox}>
            <TextInput
              label={`Họ và tên: ${floating ? "" : data?.customerName}`}
              labelProps={{ "data-floating": floating }}
              mt="md"
              classNames={{
                root: style.root,
                input:
                  formData.values.customerName !== ""
                    ? style.input2
                    : style.input,
                label: style.label,
              }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              {...formData.getInputProps("customerName")}
            />
          </div>
          <div className={style.infoBox}>
            <TextInput
              placeholder={`Số điện thoại: ${data?.telephoneNumber}`}
              disabled
              classNames={{
                root: style.root,
                input: style.input2,

                label: style.label,
              }}
            />
          </div>
          <div className={style.inputBox}>
            <Select
              label="Giới tính"
              name="sex"
              id="sex"
              w={"100%"}
              placeholder="Giới tính"
              data={["Nam", "Nữ"]}
              checkIconPosition="left"
              searchable
              nothingFoundMessage="Không có dữ liệu"
              {...formData.getInputProps("sex")}
            />
          </div>
          <div className={style.inputBox}>
            <Select
              label="Tỉnh/Thành phố"
              placeholder="Tỉnh/Thành phố"
              checkIconPosition="left"
              searchable
              nothingFoundMessage="Không có dữ liệu"
              {...formData.getInputProps("shipToProvince")}
              data={dataOptionProvince}
              value={
                formData.values.shipToProvince
                  ? formData.values.shipToProvince.toString()
                  : null
              }
              onChange={handleChangeSelectedProvince}
              w={"100%"}
            />
          </div>
          <div className={style.inputBox}>
            <Select
              label="Quận/Huyện"
              placeholder="Quận/Huyện"
              data={dataOptionDistrict}
              checkIconPosition="left"
              searchable
              nothingFoundMessage="Không có dữ liệu"
              {...formData.getInputProps("shipToDistrict")}
              value={
                formData.values.shipToDistrict
                  ? formData.values.shipToDistrict.toString()
                  : null
              }
              onChange={handleChangeSelectedDistrict}
              w={"100%"}
            />
          </div>
          <div className={style.inputBox}>
            <TextInput
              label={`Địa chỉ: ${floating2 ? "" : data?.address ?? ""}`}
              labelProps={{ "data-floating": floating2 }}
              mt="md"
              classNames={{
                root: style.root,
                input:
                  formData.values.address !== "" ? style.input2 : style.input,
                label: style.label,
              }}
              onFocus={() => setFocused2(true)}
              onBlur={() => setFocused2(false)}
              {...formData.getInputProps("address")}
            />
          </div>
          <Button
            className={style.btnChangePass}
            onClick={() => handleChangePassword()}
          >
            Đổi mật khẩu
          </Button>
        </Box>
        <Group>
          <Button disabled={!enable} className={style.btnSubmit} type="submit">
            Cập nhật thông tin
          </Button>
        </Group>
      </Box>
    </form>
  );
};

export default UserEdit;
