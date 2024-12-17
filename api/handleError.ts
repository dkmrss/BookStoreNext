import { NotificationExtension } from "@/extension/NotificationExtension";

export const HandleResponseError = async (res: any) => {
  // const currentURL = window.location.pathname;
  if (res.code === "ERR_NETWORK")
    NotificationExtension.Fails("Máy chủ không thể kết nối !");
  switch (res.response?.status) {
    case 401:
      NotificationExtension.Fails("Xin vui lòng đăng nhập lại !");
      // window.location.href = "/auth/login?callback=" + currentURL;
      break;
    case 404:
      NotificationExtension.Fails("Trang web không tồn tại");
      break;
    case 403:
      NotificationExtension.Fails(
        "Bạn không có quyền thực hiện chức năng này !"
      );
      break;
    case 500:
      NotificationExtension.Fails(
        res?.response?.data?.message ??
          "Có lỗi xảy ra ở máy chủ, xin vui lòng thử lại !"
      );
      break;
    default:
      break;
  }
};
