import React from "react";
import {history,useRequest} from 'umi'
import {setModelCreate} from "@/services/generate";
import {PageContainer} from "@ant-design/pro-layout";
import {Space, Card} from "antd";
import PathName from "@/common/PathName";
import ModelBaseForm,{ModelBaseFormState} from "./components/ModelBaseForm";



const ModelFormData:ModelBaseFormState = {
  id:0,
  model_full_name:'',
  model_name:'',
  table_name:'',
  pk_name:'',
  collection_name:'',
  remark:'',
  base_model_id:1,
  is_json_assoc:false,
  addon_fields:['create_time','update_time'],
  is_create_model:true
};
const ModelCreate : React.FC = ()=>{
  const {run:submit,loading:submitting} = useRequest((values)=>setModelCreate(values),{
    manual:true
  })

  const buildContent = ()=>{
    return (
      <ModelBaseForm  data={ModelFormData} onSubmit={async (values)=>{
        submit(values).then(()=>{
          history.push(PathName.generate.model)
        })
      }}
      submitting={submitting}
      />
    );
  }

    return (
      <PageContainer>
        <Card>
          <Space direction="vertical" size={20} style={{width:'100%'}}>
          {buildContent()}
        </Space>
        </Card>
      </PageContainer>
    )

}

export default ModelCreate;

