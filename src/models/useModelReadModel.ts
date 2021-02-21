import {getModelRead} from "@/services/generate";
import {useCallback, useState} from "react";

export default function useModelReadModel(){
  const [modelData,setModelData] = useState({})
  const [fetchModelState,setFetchModelState] = useState({isLoading:false,isError:false,errorMsg:''})
  const fetchModel = useCallback(async (id:number)=>{
    setFetchModelState({...fetchModelState,isLoading: true})
    getModelRead({id}).then((res)=>{
      if(!res.success){
        setFetchModelState({isLoading:false,isError: true,errorMsg: String(res.errorMessage)})
      }else{
        setModelData(res.data)
      }
      setFetchModelState({...fetchModelState,isLoading:false})
    }).catch(error=>{
      setFetchModelState({isLoading:false,isError: true,errorMsg:String(error.message)})
    })
  },[])
  return {
    fetchModel,
    fetchModelState,
    modelData
  }
}
