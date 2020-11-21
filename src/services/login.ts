import { request } from 'umi';
import Apis from "@/apis/Apis";
import {AppResponseType} from "@/common/AppTypes";

export interface LoginParamsType {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
  type: string;
}
export interface LoginSuccess {
  token:string
}
export async function fakeAccountLogin(params: LoginParamsType) {
  return request<AppResponseType<LoginSuccess>>(Apis.login.login, {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function outLogin() {
  return request('/api/login/outLogin');
}
