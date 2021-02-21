import {useCallback} from "react";
import {PaginatedParams} from "ahooks/es/useAntdTable";
import {AppPaginator} from "@/common/AppTypes";
import {
  getControllerPathList,
} from "@/services/logic";
import {AppPaginatorInit} from "@/common/AppInitState";


export default function useControllerPathModel(){

  const fetchPathList = useCallback(({ current, pageSize}:PaginatedParams[0]):Promise<AppPaginator<API.ControllerPathItem>> =>{
    return getControllerPathList({ current, pageSize}).then((res)=>{
      if(res.success){
        return res.data
      }
      return AppPaginatorInit
    })
  },[])




  return {
    fetchPathList
  }
}
