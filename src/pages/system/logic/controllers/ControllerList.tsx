import React, { useState} from "react";
import {PageContainer} from "@ant-design/pro-layout";
import ProCard from "@ant-design/pro-card";
import ControllerListTable from "@/pages/system/logic/controllers/components/ControllerListTable";
import ControllerPathTable from "@/pages/system/logic/controllers/components/ControllerPathTable";

const {TabPane} = ProCard

const TabKeys =[
  {
    tab: '控制器列表',
    key: 'controllers',
  },
  {
    tab: '目录列表',
    key: 'path',
  },
]

const ControllerList: React.FC = () => {
  const [currentKey,setCurrentKey] = useState<string>('controllers')


  return (
    <PageContainer
      tabList={TabKeys}
      onTabChange={(tabKey)=>{
        setCurrentKey(tabKey)
      }}
    >
      <ProCard tabs={{activeKey:currentKey}}>
        {/* 控制器列表 */}
        <TabPane key="controllers">
          <ControllerListTable />
        </TabPane>
        {/* 目录列表 */}
        <TabPane key="path">
          <ControllerPathTable />
        </TabPane>
      </ProCard>
    </PageContainer>
  )
}

export default ControllerList
