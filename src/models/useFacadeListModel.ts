import {useCallback, useState} from "react";
import {PaginatedParams} from "ahooks/es/useAntdTable";
import {getFacadeList, setFacadeDelete, setFacadeRefresh} from "@/services/generate";
import {AppPaginator} from "@/common/AppTypes";
import {AppPaginatorInit} from "@/common/AppInitState";
import {message} from "antd";



export default function useFacadeListModel(){
  const [btnLock,setBtnLock] = useState(false)
  const [result,setResult] = useState(false)
  const fetchFacadeList = useCallback(({ current, pageSize}: PaginatedParams[0]):Promise<AppPaginator<API.FacadeListItem>> => {
    return getFacadeList({current,pageSize}).then((res)=>{
      if(res.success){
        return res.data
      }
      return AppPaginatorInit
    })
  }, [])

  // 刷新门面
  const facadeRefresh = useCallback(async (id:number)=>{
    setBtnLock(true)
    setResult(false)
    setFacadeRefresh({id}).then((res)=>{
      setBtnLock(false)
      if(res.success){
        setResult(true)
        message.success(res.errorMessage)
      }
    }).catch(()=>{
      setBtnLock(false)
    })
  },[])

  // 删除门面
  const facadeDelete = useCallback(async (id:number)=>{
    setBtnLock(true)
    setResult(false)
    setFacadeDelete({id}).then((res)=>{
      setBtnLock(false)
      if(res.success){
        setResult(true)
        message.success(res.errorMessage)
      }
    }).catch(()=>{
      setBtnLock(false)
    })
  },[])


  return {
    btnLock,
    fetchFacadeList,
    facadeRefresh,
    facadeDelete,
    result
  }
}
