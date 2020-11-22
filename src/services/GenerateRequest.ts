import {request} from "umi";
import Apis from "@/apis/Apis";
import {AppResponseType} from "@/common/AppTypes";

export default class GenerateRequest{

  public static async getModelList(params:object):Promise<AppResponseType<API.ModelListItem[]>>{
    return request(Apis.generate.modelList, {
      params,
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
