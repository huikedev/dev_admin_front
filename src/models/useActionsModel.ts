import {useCallback} from "react";
import {PaginatedParams} from "ahooks/es/useAntdTable";
import {AppPaginator} from "@/common/AppTypes";
import {getActionList} from "@/services/logic";
import {AppPaginatorInit} from "@/common/AppInitState";


export default function useControllersModel(){
  const fetchActionList = useCallback(({ current, pageSize,sorter, filters}:PaginatedParams[0]):Promise<AppPaginator<API.ActionTableItem>> =>{
    const params:PaginatedParams[0] = {
      current, pageSize,...filters
    }
    return getActionList(params).then((res)=>{
      if(res.success){
        return res.data
      }
      return AppPaginatorInit
    })
  },[])

  return {
    fetchActionList
  }
}
