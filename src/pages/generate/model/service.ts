import { request } from 'umi';
import Apis from "@/apis/Apis";

export async function getModelList(params:object){
  return request(Apis.generate.modelList, {
    params,
  });
}
