import {useRequest} from "umi";
import {setMigrateCreate} from "@/services/generate";

export default function useModalFieldsAddModel(){
  const {run:fieldAddSubmit,loading:fieldAddSubmitting,error:fieldAddSubmitError}:{run:any;loading:boolean;error:Error | undefined} = useRequest( (params)=>setMigrateCreate(params),{manual:true})

  return {
    fieldAddSubmit,
    fieldAddSubmitting,
    fieldAddSubmitError
  }
}
