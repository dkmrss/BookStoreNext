import { tblCommune, tblDistrict, tblProvince } from "@/model/TblAddress";
import { tblStore } from "@/model/TblStore";
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  NumberFormatter,
  Paper,
  Radio,
  Select,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector } from "react-redux";

const Information = ({
  data,
  setData,
  handleChangeForm,
  dataAllProvince,
  dataAllDistrict,
  dataAllCommune,
}: {
  data: any;
  setData: any;
  handleChangeForm: () => void;
  dataAllProvince: tblProvince[];
  dataAllDistrict: tblDistrict[];
  dataAllCommune: tblCommune[];
}) => {
  const [dataOptionProvince, setDataOptionProvince] = useState<any[]>([]);
  const [dataOptionDistrict, setDataOptionDistrict] = useState<any[]>([]);
  const [dataOptionCommune, setDataOptionCommune] = useState<any[]>([]);
  const [dataStore, setDataStore] = useState<tblStore[]>([]);
  const [captcha, setCaptcha] = useState(false);
  const saleOrder = useSelector((state: any) => state.saleOrder);
  const dataUser = useSelector((state: any) => state.auth?.userInfo?.data);

  const onChangeCaptcha = (value: any) => {
    setCaptcha(true);
  };

  const form = useForm({
    initialValues: {
      email: "",
      fullName: "",
      phoneNumber: "",
      deliveryMethod: "Giao hàng tận nơi",
      province: 0,
      district: 0,
      commune: 0,
      address: "",
      note: "",
      buyerId: 0,
    },

    validate: {
      fullName: isNotEmpty("Tên không được để trống"),
      phoneNumber: (value: string | null) => {
        return !value || /^\s*$/.test(value)
          ? "SĐT chưa nhập"
          : value.length < 10
          ? "SĐT đã nhập không được Ít Hơn 10 số "
          : value.length > 11
          ? "SĐT đã nhập không được Nhiều Hơn 11 số "
          : undefined;
      },
      province: (value: number | null) => {
        return value ? undefined : "Chưa chọn Tỉnh/Thành phố";
      },
      district: isNotEmpty("Chưa Chọn quận/huyện"),
      commune: isNotEmpty("Chưa Chọn phường/xã"),
      address: isNotEmpty("Địa chỉ chưa nhập"),
    },
  });

  const handlePhoneNumberChange = (event: any) => {
    const { value } = event.currentTarget;
    // Kiểm tra nếu giá trị chỉ chứa các ký tự số
    if (/^\d*$/.test(value)) {
      form.setFieldValue("phoneNumber", value);
    }
  };

  const onSubmitData = (values: any) => {
    setData(values);
    handleChangeForm();
  };
  const handleChangeSelectedProvince = (id: string | null) => {
    if (id) {
      form.getInputProps("province").onChange(Number(id));
      form.getInputProps("district").onChange(null);
    }
  };

  const handleChangeSelectedDistrict = (id: string | null) => {
    if (id) {
      form.getInputProps("district").onChange(Number(id));
      form.getInputProps("commune").onChange(null);
    }
  };

  const handleChangeSelectedCommune = (id: string | null) => {
    if (id) {
      form.getInputProps("commune").onChange(Number(id));
    }
  };

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
          return item?.provinceId === form.values.province;
        })
        .map((item: any) => {
          return {
            value: item.districtId.toString(),
            label: item.districtName,
          };
        })
    );
  }, [form.values.province, dataAllDistrict, dataAllProvince]);

  useEffect(() => {
    setDataOptionCommune(
      dataAllCommune
        ?.filter((item: tblCommune) => {
          return item?.districtId === form.values.district;
        })
        .map((item: any) => {
          return {
            value: item.communeId.toString(),
            label: item.communeName,
          };
        })
    );
  }, [form.values.district, dataAllCommune, dataAllDistrict]);

  useEffect(() => {
    form.setFieldValue("deliveryMethod", "Giao hàng tận nơi");
    form.setValues(data);
  }, [data]);

  useEffect(() => {
    if (dataUser) {
      form.setValues({
        email: "",
        fullName: dataUser?.customerName || "",
        phoneNumber: dataUser?.telephoneNumber || "",
        deliveryMethod: "Giao hàng tận nơi",
        province: Number(dataUser?.shipToProvince) || 0,
        district: Number(dataUser?.shipToDistrict) || 0,
        commune: Number(dataUser?.shipToWard) || 0,
        address: dataUser?.address || "",
        note: "",
        buyerId: dataUser?.customerId || 0,
      });
    }
  }, [dataUser]);

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit((values) => onSubmitData(values))}
    >
      <Box
        m={"10px 0px"}
        p={10}
        bg={"var(--clr-bg-gray-light)"}
        style={{ borderRadius: "10px" }}
      >
        <Text fw={500}>THÔNG TIN KHÁCH HÀNG:</Text>
        <TextInput
          placeholder="Họ và tên (bắt buộc)"
          mt={10}
          {...form.getInputProps("fullName")}
        />
        <TextInput
          placeholder="Số điện thoại (bắt buộc)"
          type="number"
          value={form.values.phoneNumber}
          onChange={handlePhoneNumberChange}
          mt={10}
        />
        <TextInput
          placeholder="Email nhận hóa đơn (Không bắt buộc)"
          {...form.getInputProps("email")}
          mt={10}
        />
      </Box>
      <Box
        m={"10px 0px"}
        p={10}
        bg={"var(--clr-bg-gray-light)"}
        style={{ borderRadius: "10px" }}
      >
        <Text fw={500}>LỰA CHỌN CÁCH THỨC GIAO HÀNG</Text>
        <Radio.Group defaultValue={"Giao hàng tận nơi"} mt={10}>
          <Flex gap={10}>
            {/* <Radio
              value="Nhận tại cửa hàng"
              label="Nhận tại cửa hàng"
              color={"var(--clr-primary)"}
            /> */}
            <Radio
              value="Giao hàng tận nơi"
              label="Giao hàng tận nơi"
              color={"var(--clr-primary)"}
            />
          </Flex>
        </Radio.Group>
        {/* {data?.deliveryMethod === "Nhận tại cửa hàng" ? (
            <Select
              placeholder="Chọn địa chỉ nhận hàng (bắt buộc)"
              data={dataStore.map((store) => store.address || "")}
              mt={10}
            />
          ) : ( */}
        <>
          <Grid mt={10}>
            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <Select
                id="bbbb"
                label="Chọn Tỉnh/Thành phố"
                placeholder="Tỉnh/Thành phố"
                nothingFoundMessage="Không có dữ liệu"
                data={dataOptionProvince}
                searchable
                withAsterisk
                {...form.getInputProps("province")}
                value={
                  form.values.province ? form.values.province?.toString() : null
                }
                onChange={(e) => handleChangeSelectedProvince(e)}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <Select
                disabled={
                  form.values.province && form.values.province > 0
                    ? false
                    : true
                }
                id="aaaaaa"
                label="Chọn Quận/Huyện"
                placeholder="Quận/Huyện"
                data={dataOptionDistrict}
                nothingFoundMessage="Không có dữ liệu"
                {...form.getInputProps("district")}
                value={
                  form.values.district ? form.values.district?.toString() : null
                }
                onChange={(e) => handleChangeSelectedDistrict(e)}
                searchable
                withAsterisk
              />
            </Grid.Col>
          </Grid>
          <Grid mt={5}>
            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <Select
                disabled={
                  form.values.district && form.values.district > 0
                    ? false
                    : true
                }
                id="ccccc"
                label="Chọn Phường/Xã"
                placeholder="Phường/Xã"
                data={dataOptionCommune}
                nothingFoundMessage="Không có dữ liệu"
                {...form.getInputProps("commune")}
                value={
                  form.values.commune ? form.values.commune?.toString() : null
                }
                onChange={(e) => handleChangeSelectedCommune(e)}
                searchable
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <TextInput
                withAsterisk
                label="Địa chỉ"
                placeholder="Số nhà, tên đường"
                {...form.getInputProps("address")}
              />
            </Grid.Col>
          </Grid>
        </>
        {/* )} */}
      </Box>
      <Box
        m={"10px 0px"}
        p={10}
        bg={"var(--clr-bg-gray-light)"}
        style={{ borderRadius: "10px" }}
      >
        <Text fw={500}>THÔNG TIN BỔ SUNG</Text>
        <Textarea
          placeholder="Ghi chú đơn hàng"
          mt={10}
          {...form.getInputProps("note")}
        ></Textarea>
      </Box>
      <Center m={"10px 0px"}>
        <ReCAPTCHA
          sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          onChange={onChangeCaptcha}
        />
      </Center>
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
          <Button
            color="var(--clr-primary)"
            fullWidth
            mt={"10px"}
            type="submit"
            disabled={!captcha || saleOrder.totalAmount === 0}
          >
            <Text fw={500}>Đặt hàng</Text>
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Information;
