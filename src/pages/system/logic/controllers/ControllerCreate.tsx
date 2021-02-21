import React, { useState} from "react";
import { useRequest,history} from "umi";
import {getControllerPathSimpleList, getModuleSimpleList} from "@/services/logic";
import {PageException, PageLoading} from "@/huikedev";
import {PageContainer} from "@ant-design/pro-layout";
import ProCard from "@ant-design/pro-card";
import TabPane from "@ant-design/pro-card/es/components/TabPane";
import CreatePath from "./components/CreatePath"
import CreateForm from "./components/CreateForm";

const ControllerCreate : React.FC = ()=>{
  const [currentKey,setCurrentKey] = useState<string>(history.location.query.type ? history.location.query.type : 'controller')

  // 模块列表
  const {loading,data:moduleSimpleList,error}:{loading:boolean;data:API.ModuleSimpleItem[],error:Error | undefined} = useRequest(()=>getModuleSimpleList())
// 路径列表
  const {loading:pathListLoading,data:pathList,error:pathListError}:{loading:boolean;data:API.ControllerPathSimpleItem[]|[],error:Error | undefined} = useRequest(()=>getControllerPathSimpleList())
  if(loading||pathListLoading){
    return <PageLoading />
  }

  if(error){
    return <PageException title={error.message} status={500} />
  }

  if(pathListError){
    return <PageException title={pathListError.message} status={500} />
  }


  return (
    <PageContainer

    >
      <ProCard
        tabs={{
          tabPosition:'top',
          activeKey:currentKey,
          onChange: (key) => {
            setCurrentKey(key);
          },
      }}
      >
        <TabPane key="controller" tab="添加控制器">
        <CreateForm moduleList={moduleSimpleList} pathList={pathList}/>
        </TabPane>

      <TabPane key="path" tab="添加目录">
        <CreatePath moduleList={moduleSimpleList} />
      </TabPane>
      </ProCard>
    </PageContainer>
  )
}

export default ControllerCreate
