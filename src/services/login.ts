import { request } from 'umi';
import Apis from "@/apis/Apis";
import {AppResponseType} from "@/common/AppTypes";

export interface LoginParamsType {
  username: string;
  password: string;
}
export interface LoginSuccess {
  token:string
}
export async function login(params: LoginParamsType) {
  return request<AppResponseType<LoginSuccess>>(Apis.user.login, {
    method: 'POST',
    data: params,
  });
}


export async function outLogin() {
  return request(Apis.user.logout);
}
