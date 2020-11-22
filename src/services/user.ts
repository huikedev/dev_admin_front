import { request } from 'umi';
import Apis from "@/apis/Apis";
import {AppResponseType} from "@/common/AppTypes";

export async function query() {
  return request<API.CurrentUser[]>('/api/users');
}

export async function queryCurrent() {
  return request<AppResponseType<API.CurrentUser>>(Apis.user.userInfo);
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/notices');
}
