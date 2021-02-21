import {useCallback, useState} from "react";
import {PaginatedParams} from "ahooks/es/useAntdTable";
import {AppPaginator} from "@/common/AppTypes";
import {getModuleList, setGenerateRouteRule} from "@/services/logic";
import {AppPaginatorInit} from "@/common/AppInitState";

export interface ModuleListData extends API.ModuleWithExtend{
  controller_count:number;
}

export default function useModuleModel(){
  const [btnLock,setBtnLock] = useState(false)
  const [result,setResult] = useState(false)
  const fetchModuleList = useCallback(({ current, pageSize}:PaginatedParams[0]):Promise<AppPaginator<ModuleListData>> =>{
    return getModuleList({ current, pageSize}).then((res)=>{
      if(res.success){
        return res.data
      }
      return AppPaginatorInit
    })
  },[])

  // 生成路由规则
  const generateRouteRule = useCallback(async (id:number)=>{
    setBtnLock(true)
    setResult(false)
    setGenerateRouteRule({id}).then((res)=>{
      setBtnLock(false)
      if(res.success){
        setResult(true)
      }
    }).catch(()=>{
      setBtnLock(false)
    })
  },[])


  return {
    btnLock,
    result,
    fetchModuleList,
    generateRouteRule
  }
}
