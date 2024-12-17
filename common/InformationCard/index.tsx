import { Box, List, Text } from "@mantine/core";
import style from "./InformationCard.module.scss";

export default function InformationCard() {
  return (
    <div className={style.informationCard}>
      <div className={style.title}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          className="bi bi-check2-circle"
          viewBox="0 0 16 16"
        >
          <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
          <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
        </svg>
       
      </div>
      <Box className={style.content}>
        <Box>
          <Text pb={6} fw={"bold"} c="#494949" className={style.contentMore}>
            Miễn phí:
          </Text>
          <Box pl={20} mt={5} mb={5}>
            <Box mt={5} mb={5} className={style.list} pb={6}>
              Sấy máy rơi nước.
            </Box>
            <Box mt={5} mb={5} className={style.list} pb={6}>
              Kiểm tra máy, tư vấn tổng đài
            </Box>
          </Box>
        </Box>
        <Box>
          <Text pb={6} fw={"bold"} c="#494949" className={style.contentMore}>
            Nổi bật:
          </Text>
          <Box pl={20} mt={5} mb={5}>
            <Box mt={5} mb={5} className={style.list} pb={6}>
              <span className={style.span}>Tiết kiệm</span>, giá công khai,
              không thêm phí.
            </Box>
            <Box mt={5} mb={5} className={style.list} pb={6}>
              Được <span className={style.span}>trực tiếp quan sát</span> quá
              trình sửa chữa.
            </Box>
            <Box mt={5} mb={5} className={style.list} pb={6}>
              Luôn được hỗ trợ{" "}
              <span className={style.span}>xuất hóa đơn VAT</span> (eVAT) qua
              email cho mọi đơn hàng.
            </Box>
            <Box mt={5} mb={5} className={style.list} pb={6}>
              Trên 90% dịch vụ sửa chữa có thể{" "}
              <span className={style.span}>lấy ngay trong 30p - 1 giờ</span>.
            </Box>
            <Box mt={5} mb={5} className={style.list} pb={6}>
              Với dịch vụ sửa chữa nhiều giờ:{" "}
              <span className={style.span}>ký tên lên linh kiện</span>, chụp màn
              hình bảo an tâm
            </Box>
            <Box mt={5} mb={5} className={style.list} pb={6}>
              Linh kiện thay thế có nguồn gốc rõ ràng.
            </Box>
            <Box mt={5} mb={5} className={style.list} pb={6}>
              Bảo hành từ 6 - 24 tháng
            </Box>
            <Box mt={5} mb={5} className={style.list} pb={6}>
              <span className={style.span}>
                Hoàn tiền 100% nếu không hài lòng
              </span>
              .
            </Box>
            <Box mt={5} mb={5} className={style.list} pb={6}>
              <span className={style.span}>
                Giảm thêm 5% cho khách hàng Dịch Vụ Tốt
              </span>
              .
            </Box>
            <Box mt={5} mb={5} className={style.list} pb={6}>
              <span className={style.span}>Thu cũ</span> lên đời{" "}
              <span className={style.span}>Trợ giá đến 500k</span> cho điện
              thoại lỗi, hư hỏng.
            </Box>
            <Box mt={5} mb={5} className={style.list} pb={6}>
              <span className={style.span}>
                Tham khảo dịch vụ Bảo hành - Sửa chữa chính hãng CARES
              </span>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
