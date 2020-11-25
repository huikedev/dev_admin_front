import {request} from "umi";
import Apis from "@/apis/Apis";
import {AppResponseType} from "@/common/AppTypes";

export default class GenerateRequest{

  public static async modelList(params:object):Promise<AppResponseType<API.ModelListItem[]>>{
    return request(Apis.generate.modelList, {
      params,
    });
  }

  public static async modelSimpleList():Promise<AppResponseType<API.ModelSimpleListItem[]>>{
    return request(Apis.generate.modelSimpleList);
  }

  public static async modelCreate(params:object):Promise<AppResponseType>{
    return request(Apis.generate.modelCreate, {
      method:'post',
      data:params
    });
  }

  public static async facadeCreate(params:object):Promise<AppResponseType>{
    return request(Apis.generate.facadeCreate, {
      method:'post',
      params,
    });
  }

  public static async facadeList(params:object):Promise<AppResponseType>{
    return request(Apis.generate.facadeList, {
      params,
    });
  }
}
