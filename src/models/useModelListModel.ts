import {useCallback,  useState} from "react";
import {
  getModelList,
  setMigrateRun,
  setModelSyncProperty,
  setModelUpdateAnnotation,
  setTableToMigration, setTableToSeeds
} from "@/services/generate";
import {PaginatedParams} from "ahooks/es/useAntdTable";
import {message} from "antd";
import {AppPaginator} from "@/common/AppTypes";

export interface ModelListDataType extends API.ModelListItem{
  is_table_created:boolean;
  module:API.ModuleItem | null
}

export default function useModelListModel(){
  const [btnLock,setBtnLock] = useState(false)
  const [result,setResult] = useState(false)

  const fetchModelList = useCallback(({ current, pageSize}: PaginatedParams[0]):Promise<AppPaginator<ModelListDataType>> => {
    return getModelList({current,pageSize}).then((res)=>{
      if(res.success){
        return res.data
      }
      return {
        total:0,
        list:[]
      }
    })
  }, [])

  // 更新注解
  const updateAnnotation = useCallback(async (id:number)=>{
    setBtnLock(true)
    setResult(false)
    setModelUpdateAnnotation({id}).then((res)=>{
      setBtnLock(false)
      if(res.success){
        setResult(true)
      }
    }).catch(()=>{
      setBtnLock(false)
    })
  },[])

  // 执行数据库迁移
  const migrateRun = useCallback(async (params:{id:number})=>{
    setBtnLock(true)
    setResult(false)
    setMigrateRun(params).then((res)=>{
      setBtnLock(false)
      if(res.success){
        setResult(true)
      }
    }).catch(()=>{
      setBtnLock(false)
    })
  },[])

  // 表字段生成迁移文件
  const tableToMigration = useCallback(async (params:{id:number})=>{
    setBtnLock(true)
    setResult(false)
    setTableToMigration(params).then((res)=>{
      setBtnLock(false)
      if(res.success){
        setResult(true)
      }
    }).catch(()=>{
      setBtnLock(false)
    })
  },[])

  // 表数据生成种子文件
  const tableToSeeds = useCallback(async (params:{id:number})=>{
    setBtnLock(true)
    setResult(false)
    setTableToSeeds(params).then((res)=>{
      setBtnLock(false)
      if(res.success){
        setResult(true)
      }
    }).catch(()=>{
      setBtnLock(false)
    })
  },[])


  // 同步模型属性
  const syncProperty = useCallback(async (id:number)=>{
    setBtnLock(true)
    setResult(false)
    setModelSyncProperty({id}).then((res)=>{
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
    fetchModelList,
    btnLock,
    updateAnnotation,
    migrateRun,
    tableToMigration,
    tableToSeeds,
    syncProperty,
    result
  }
}
