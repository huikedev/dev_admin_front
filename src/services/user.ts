import { request } from 'umi';
import Apis from "@/apis/Apis";
import {AppResponseType} from "@/common/AppTypes";

export async function queryCurrent() {
  return request<AppResponseType<API.CurrentUser>>(Apis.user.userInfo);
}

// 获取 开发者列表
export async function getDeveloperList(params:object):Promise<AppResponseType>{
  return request(Apis.developer.index,{
    params
  })
}

// 获取 开发者岗位列表
export async function getPositionList():Promise<AppResponseType>{
  return request(Apis.developer.positionList)
}

// 提交 新增开发者
export async function setDeveloperCreate(params:object):Promise<AppResponseType>{
  return request(Apis.developer.create,{
    method:'POST',
    data:params
  })
}

// 提交 修改开发者
export async function setDeveloperUpdate(params:object):Promise<AppResponseType>{
  return request(Apis.developer.update,{
    method:'POST',
    data:params
  })
}

// 提交 删除开发者
export async function setDeveloperDelete(params:object):Promise<AppResponseType>{
  return request(Apis.developer.delete,{
    method:'POST',
    data:params
  })
}




