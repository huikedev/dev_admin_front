import {AppPaginator, AppResponseType} from "@/common/AppTypes";
import {request} from "umi";
import Apis from "@/apis/Apis";

// 获取 模块列表
export async function getModuleList(params:object):Promise<AppResponseType<AppPaginator<API.ModuleItem>>>{
  return request(Apis.module.index,{
    params
  })
}

// 提交 创建模块
export async function setModuleCreate(params:object):Promise<AppResponseType>{
  return request(Apis.module.create,{
    method:'POST',
    data:params
  })
}

// 获取 模块简单列表
export async function getModuleSimpleList():Promise<AppResponseType<API.ModuleSimpleItem>>{
  return request(Apis.module.simpleList)
}


// 获取 路由中间件列表
export async function getRouteMiddlewares():Promise<AppResponseType>{
  return request(Apis.module.routeMiddlewares)
}

// 获取 第三方模块列表
export async function getExtendModules():Promise<AppResponseType<API.ModuleWithExtend[]>>{
  return request(Apis.module.extendModules)
}

// 提交 生成路由规则
export async function setGenerateRouteRule(params:object):Promise<AppResponseType>{
  return request(Apis.module.generateRouteRule,{
    method:'POST',
    data:params
  })
}

// 提交 生成路由规则
export async function setModuleEdit(params:object):Promise<AppResponseType>{
  return request(Apis.module.edit,{
    method:'POST',
    data:params
  })
}

// ================================= 控制器 ===========================================

// 获取 控制器列表
export async function getControllersList(params:object):Promise<AppResponseType<AppPaginator<API.ControllerTableItem>>>{
  return request(Apis.controllers.index,{
    params
  })
}

// 提交 创建控制器
export async function setControllerCreate(params:object):Promise<AppResponseType>{
  return request(Apis.controllers.create,{
    method:'POST',
    data:params
  })
}

// 提交 编辑控制器
export async function setControllerEdit(params:object):Promise<AppResponseType>{
  return request(Apis.controllers.edit,{
    method:'POST',
    data:params
  })
}

// 提交 删除控制器
export async function setControllerDelete(params:object):Promise<AppResponseType>{
  return request(Apis.controllers.delete,{
    method:'POST',
    data:params
  })
}

// 获取 未同步的控制器列表
export async function getUnSyncedControllers():Promise<AppResponseType<API.UnSyncedControllerItem>>{
  return request(Apis.controllers.unSynced)
}

// 提交 同步控制器
export async function setSyncControllers(params:object):Promise<AppResponseType>{
  return request(Apis.controllers.sync,{
    method:'POST',
    data:params
  })
}

// 提交 同步控制器
export async function getControllersSimpleList(params:object):Promise<AppResponseType<API.ControllerSimpleItem[]>>{
  return request(Apis.controllers.simpleList,{
    params
  })
}

// 查询 异常码是否重复
export async function queryCheckException(params:{type:'code'|'key';value:string|number}):Promise<AppResponseType<{result:boolean;type:'code'|'key'}>>{
  return request(Apis.controllers.checkException,{
    params
  })
}

// ================================= 控制器目录 ===========================================

// 获取 控制器目录简单列表
export async function getControllerPathSimpleList():Promise<AppResponseType<API.ControllerPathSimpleItem[]>>{
  return request(Apis.controllerPath.simpleList)
}

// 获取 控制器目录列表
export async function getControllerPathList(params:object):Promise<AppResponseType<AppPaginator<API.ControllerTableItem>>>{
  return request(Apis.controllerPath.index,{
    params
  })
}

// 提交 创建控制器目录
export async function setControllerPathCreate(params:object):Promise<AppResponseType>{
  return request(Apis.controllerPath.create,{
    method:'POST',
    data:params
  })
}

// 提交 修改控制器目录
export async function setControllerPathEdit(params:object):Promise<AppResponseType>{
  return request(Apis.controllerPath.edit,{
    method:'POST',
    data:params
  })
}

// 提交 删除控制器目录
export async function setControllerPathDelete(params:object):Promise<AppResponseType>{
  return request(Apis.controllerPath.delete,{
    method:'POST',
    data:params
  })
}

// ================================= 逻辑方法 ===========================================

// 获取 控制器方法列表
export async function getActionList(params:object):Promise<AppResponseType<AppPaginator<API.ControllerTableItem>>>{
  return request(Apis.actions.index,{
    params
  })
}

// 提交 创建控制器方法
export async function setActionCreate(params:object):Promise<AppResponseType<API.ActionCreateResult[]|[]>>{
  return request(Apis.actions.create,{
    method:'POST',
    data:params
  })
}

// 提交 编辑控制器方法
export async function setActionEdit(params:object):Promise<AppResponseType>{
  return request(Apis.actions.edit,{
    method:'POST',
    data:params
  })
}

// 提交 删除控制器方法
export async function setActionDelete(params:object):Promise<AppResponseType>{
  return request(Apis.actions.delete,{
    method:'POST',
    data:params
  })
}

// 提交 删除控制器方法
export async function setSpeedCreate(params:object):Promise<AppResponseType>{
  return request(Apis.actions.speedCreate,{
    method:'POST',
    data:params
  })
}

// 获取 未同步的控制器方法列表
export async function getUnSyncedAction(params:object):Promise<AppResponseType<AppPaginator<API.UnSyncedActionItem>>>{
  return request(Apis.actions.unSynced,{
    params
  })
}

// 提交 同步控制器方法
export async function setSyncAction(params:object):Promise<AppResponseType>{
  return request(Apis.actions.sync,{
    method:'POST',
    data:params
  })
}



