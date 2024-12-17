import {
  Login,
  Register,
  UpdatePassword,
  Refresh,
  dataRecover,
  PasswordRecovery,
} from "@/model/AuthService";
import api from "./api";
import TokenService from "./token.service";
import { HandleResponseError } from "../handleError";
import { NotificationExtension } from "@/extension/NotificationExtension";
import { isNullOrUndefined } from "@/extension/StringExtension";
import { AxiosRequestConfig } from "axios";
import { modals } from "@mantine/modals";

const registerEmail = (dataRegister: Register): Promise<any> => {
  return api
    .post("/Auth/register", dataRegister)
    .then((response) => {
      if (!isNullOrUndefined(response) && response?.data?.success) {
        NotificationExtension.Success(
          "Đăng ký thành công , chúng tôi đã gửi link xác thực qua email"
        );
        modals.closeAll();
      } else if (response != null)
        NotificationExtension.Fails(response?.data?.message);
      return response.data;
    })
    .catch((error) => {
      // Xử lý lỗi ở đây
      HandleResponseError(error);
    });
};

const registerPhone = (
  dataRegister: Register,
  openFormActive: () => void
): Promise<any> => {
  return api
    .post("/Auth/register-phone", dataRegister)
    .then((response) => {
      if (!isNullOrUndefined(response) && response?.data?.success) {
        NotificationExtension.Success(
          "Đăng ký thành công , chúng tôi đã gửi mã xác thực qua số điện thoại bạn dùng đăng ký"
        );
        openFormActive();
      } else if (response != null)
        NotificationExtension.Fails(response?.data?.message);
      return response.data;
    })
    .catch((error) => {
      // Xử lý lỗi ở đây
      HandleResponseError(error);
    });
};

const login = (dataLogin: Login): Promise<any> => {
  return api
    .post("/Auth/login", dataLogin)
    .then((response) => {
      if (!isNullOrUndefined(response) && response?.data?.success) {
        if (response.data?.data?.jwt) {
          TokenService.setUser(response?.data?.data);
        }
        NotificationExtension.Success("Đăng nhập thành công");
        modals.closeAll();
        return response.data;
      } else {
        NotificationExtension.Fails(`${response?.data?.message}`);

        return response?.data?.message;
      }
    })
    .catch((error) => {
      // Xử lý lỗi ở đây
      HandleResponseError(error);
    });
};

const refreshToken = (dataRefresh: Refresh): Promise<any> => {
  return api
    .post("/Auth/refresh", dataRefresh)
    .then((response) => {
      if (!isNullOrUndefined(response) && response?.data?.success) {
        if (response.data?.data?.jwt) {
          TokenService.setUser(response?.data?.data);
        }
        NotificationExtension.Success("Đăng nhập thành công");
        return response.data;
      } else {
        NotificationExtension.Fails(
          "Phiên đăng nhập đã hết hạn vui lòng đăng nhập lại"
        );
        localStorage.setItem("id", "");
        localStorage.setItem("jwt", "");
        localStorage.setItem("refreshToken", "");
        localStorage.setItem("userName", "");
        localStorage.setItem("userInfo", "");
        localStorage.setItem("loginType", "");
        return null;
      }
    })
    .catch((error) => {
      // Xử lý lỗi ở đây
      HandleResponseError(error);
    });
};

const reActivePass = (userName: string) => {
  return api
    .get(`/Auth/re-activate?userName=${userName}`)
    .then((response) => {
      // if (response.data?.data?.jwt) {
      //   TokenService.setUser(response?.data?.data);
      // }
      if (response.data.success)
        NotificationExtension.Success("Gửi mã khôi phục thành công");
      else NotificationExtension.Fails("Gửi mã khôi phục thất bại");
      return response.data;
    })
    .catch((error) => {
      NotificationExtension.Fails(`${error.response.data}`);
      HandleResponseError(error);
    });
};

const activeUser = (userName: string, code: string) => {
  return api
    .get(`/Auth/user-activate-fe?UserName=${userName}&Code=${code}`)
    .then((response) => {
      if (response.data.success) {
        NotificationExtension.Success("Kích hoạt tài khoản thành công");
        modals.closeAll();
        return response.data;
      } else {
        NotificationExtension.Fails("Kích hoạt tài khoản thất bại");
        return response.data;
      }
    })
    .catch((error) => {
      HandleResponseError(error);
    });
};

const recoveryPass = (dataRecover: dataRecover): Promise<any> => {
  return api
    .post("/Auth/recover-pass", dataRecover)
    .then((response) => {
      // if (response.data?.data?.jwt) {
      //   TokenService.setUser(response?.data?.data);
      // }
      if (response.data.success)
        NotificationExtension.Success("Xác nhận thành công");
      else NotificationExtension.Fails("Xác nhận thất bại");
      return response.data;
    })
    .catch((error) => {
      HandleResponseError(error);
    });
};

const callApiUpdatePassword = (
  dataLogin: UpdatePassword,
  clearForm: () => void
): Promise<any> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Thêm token JWT vào tiêu đề Authorization
    },
  };
  return api
    .post("/Auth/change-pass", dataLogin, config)
    .then((response) => {
      // if (response.data?.data?.jwt) {
      //   TokenService.setUser(response?.data?.data);
      // }
      if (response.data.success) {
        NotificationExtension.Success("Đổi mật khẩu thành công!");
        clearForm();
      } else NotificationExtension.Fails("Đổi mật khẩu thất bại");
      return response.data;
    })
    .catch((error) => {
      HandleResponseError(error);
    });
};
const passwordRecovery = (dataLogin: PasswordRecovery): Promise<any> => {
  return api
    .get(`/Auth/code-recover-pass?UserName=${dataLogin.username}`)
    .then((response) => {
      // if (response.data?.data?.jwt) {
      //   TokenService.setUser(response?.data?.data);
      // }
      if (response.data.success)
        NotificationExtension.Success("Gửi mã khôi phục thành công");
      else NotificationExtension.Fails("Gửi mã khôi phục thất bại");
      return response.data;
    })
    .catch((error) => {
      HandleResponseError(error);
      return error.response.data.message;
    });
};
const logout = (): void => {
  TokenService.removeUser();
};

const AuthService = {
  registerEmail,
  registerPhone,
  login,
  reActivePass,
  passwordRecovery,
  callApiUpdatePassword,
  logout,
  refreshToken,
  recoveryPass,
  activeUser,
};

export default AuthService;
