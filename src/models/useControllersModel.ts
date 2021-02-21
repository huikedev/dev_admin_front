import {useCallback} from "react";
import {PaginatedParams} from "ahooks/es/useAntdTable";
import { useRequest } from 'umi'
import {AppPaginator} from "@/common/AppTypes";
import {getControllersList, setControllerDelete, setControllerEdit} from "@/services/logic";
import {AppPaginatorInit} from "@/common/AppInitState";
import {updateServiceFacade} from "@/services/generate";


export default function useControllersModel(){

  const fetchControllersList = useCallback(({ current, pageSize}:PaginatedParams[0]):Promise<AppPaginator<API.ControllerTableItem>> =>{
    return getControllersList({ current, pageSize}).then((res)=>{
      if(res.success){
        return res.data
      }
      return AppPaginatorInit
    })
  },[])
  // 编辑
  const {run:controllerEditSubmit,loading:controllerEditSubmitting} = useRequest((values:object)=>{
    return setControllerEdit(values)
  },{manual:true})
  // 删除
  const {run:controllerDeleteSubmit,loading:controllerDeleteSubmitting} = useRequest((values:object)=>{
    return setControllerDelete(values)
  },{manual:true})

  // 删除
  const {run:updateFacadeSubmit,loading:updateFacadeSubmitting} = useRequest((values:object)=>{
    return updateServiceFacade(values)
  },{manual:true})



  return {
    fetchControllersList,
    controllerEditSubmit,
    controllerDeleteSubmit,
    controllerDeleteSubmitting,
    controllerEditSubmitting,
    updateFacadeSubmit,
    updateFacadeSubmitting
  }
}
