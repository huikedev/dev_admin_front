import {useCallback} from "react";
import {PaginatedParams} from "ahooks/es/useAntdTable";
import {AppPaginator} from "@/common/AppTypes";
import {AppPaginatorInit} from "@/common/AppInitState";
import {getDeveloperList} from "@/services/user";

export default function useDeveloperModel(){
  const fetchDeveloperList = useCallback(({ current, pageSize}:PaginatedParams[0]):Promise<AppPaginator<API.DeveloperItemWithCreator>> =>{
    return getDeveloperList({ current, pageSize}).then((res)=>{
      if(res.success){
        return res.data
      }
      return AppPaginatorInit
    })
  },[])

  return {
    fetchDeveloperList
  }
}
