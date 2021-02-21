import {request} from "umi";
import Apis from "@/apis/Apis";
import {AppResponseType} from "@/common/AppTypes";

export async function getModelList(params:object):Promise<AppResponseType<API.ModelListItem[]>>{
  return request(Apis.generate.modelList, {
    params,
  });
}

export async function getModelSimpleList():Promise<AppResponseType<API.ModelSimpleListItem[]>>{
  return request(Apis.generate.modelSimpleList);
}

export async function setModelCreate(params:object):Promise<AppResponseType>{
  return request(Apis.generate.modelCreate, {
    method:'post',
    data:params
  });
}

export async function getModelFields(params:object):Promise<AppResponseType>{
  return request(Apis.generate.getModelFields, {
    params
  });
}

export async function setModelSyncProperty(params:object):Promise<AppResponseType>{
  return request(Apis.generate.modelSyncProperty, {
    method:'post',
    data:params
  });
}

export async function setModelSyncFields(params:object):Promise<AppResponseType>{
  return request(Apis.generate.modelSyncFields, {
    method:'post',
    data:params
  });
}

export async function setModelUpdateAnnotation(params:object):Promise<AppResponseType>{
  return request(Apis.generate.modelUpdateAnnotation, {
    method:'post',
    data:params
  });
}

export async function setModelDelete(params:object):Promise<AppResponseType>{
  return request(Apis.generate.modelDelete, {
    method:'post',
    data:params
  });
}

export async function getModelRead(params:object):Promise<AppResponseType<API.ModelListItem>>{
  return request(Apis.generate.modelRead, {
    params
  });
}

export async function setFacadeCreate(params:object):Promise<AppResponseType>{
  return request(Apis.generate.facadeCreate, {
    method:'post',
    params,
  });
}

export async function getFacadeList(params:object):Promise<AppResponseType>{
  return request(Apis.generate.facadeList, {
    params,
  });
}

export async function setFacadeRefresh(params:object):Promise<AppResponseType>{
  return request(Apis.generate.facadeRefresh, {
    method:'post',
    data:params,
  });
}

export async function setFacadeDelete(params:object):Promise<AppResponseType>{
  return request(Apis.generate.facadeDelete, {
    method:'post',
    data:params,
  });
}

export async function updateServiceFacade(params:object):Promise<AppResponseType>{
  return request(Apis.facade.updateServiceFacade, {
    method:'post',
    data:params,
  });
}

export async function setMigrateCreate(params:object):Promise<AppResponseType>{
  return request(Apis.migrate.create, {
    method:'post',
    data:params,
  });
}

export async function setMigrateRun(params:object):Promise<AppResponseType>{
  return request(Apis.migrate.run, {
    method:'post',
    data:params,
  });
}

export async function setTableToMigration(params:object):Promise<AppResponseType>{
  return request(Apis.migrate.tableToMigration, {
    method:'post',
    data:params,
  });
}

export async function setTableToSeeds(params:object):Promise<AppResponseType>{
  return request(Apis.migrate.tableToSeeds, {
    method:'post',
    data:params,
  });
}

