import {request} from "@@/plugin-request/request";
import Apis from "@/apis/Apis";
import {AppResponseType} from "@/common/AppTypes";

export default class GenerateRequest{

  public static async getModelList(params:object):Promise<AppResponseType<API.ModelListItem[]>>{
    return request(Apis.generate.modelList, {
      params,
    });
  }

}
