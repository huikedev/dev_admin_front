import React, {useState} from "react";
import {PageContainer} from "@ant-design/pro-layout";
import ProCard from "@ant-design/pro-card";
import TabPane from "@ant-design/pro-card/es/components/TabPane";
import AppModuleForm from "@/pages/system/logic/modules/components/AppModuleForm";
import ExtendModuleForm from "@/pages/system/logic/modules/components/ExtendModuleForm";


const TabKeys =[
  {
    tab: '应用内模块',
    key: 'app',
  },
  {
    tab: '第三方模块',
    key: 'extend',
  },
]

const ModuleCreate : React.FC = ()=> {
  const [currentKey,setCurrentKey] = useState<string>('app')


  return (
    <PageContainer
      tabList={TabKeys}
      onTabChange={(tabKey)=>{
        setCurrentKey(tabKey)
      }}
    >
      <ProCard tabs={{activeKey:currentKey}}>
        <TabPane key="app">
          <AppModuleForm />
        </TabPane>
        <TabPane key="extend">
          <ExtendModuleForm />
        </TabPane>
      </ProCard>
    </PageContainer>
  );

}

export default ModuleCreate
