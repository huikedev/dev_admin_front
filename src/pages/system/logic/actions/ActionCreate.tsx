import React, {useState} from "react";
import {Alert, Space, Spin, Typography} from "antd";
import {PageContainer} from "@ant-design/pro-layout";
import ProCard from '@ant-design/pro-card';
import {useRequest} from "@@/plugin-request/request";
import {getControllersSimpleList, getModuleSimpleList} from "@/services/logic";
import {PageAlert, PageException} from "@/huikedev";
import ActionForm from './components/ActionForm'
import ActionSpeedForm from "./components/ActionSpeedForm";

const {TabPane} = ProCard

const {Text} = Typography
const TabKeys =[
  {
    tab: '自定义创建',
    key: 'diy',
  },
  {
    tab: '一键创建',
    key: 'speed',
  },
]
const ActionCreate : React.FC = ()=>{
  const [currentKey,setCurrentKey] = useState<string>('diy')
  const {data:controllerSimpleList,loading:controllerSimpleLoading,error:controllerError}:{data:API.ControllerSimpleItem[]|[],loading:boolean;error:Error | undefined} = useRequest(()=>getControllersSimpleList({}))
  const {data:moduleSimpleList,loading:moduleSimpleLoading,error:moduleError}:{data:API.ModuleSimpleItem[],loading:boolean,error:Error | undefined} = useRequest(()=>getModuleSimpleList())

  if(controllerSimpleLoading || moduleSimpleLoading){
    return <Spin />
  }
  if(controllerError){
    return <PageException title={controllerError.message} status={500} />
  }
  if(moduleError){
    return <PageException title={moduleError.message} status={500} />
  }

  return (
    <PageContainer
      tabList={TabKeys}
      onTabChange={(tabKey)=>{
        setCurrentKey(tabKey)
      }}
    >
      <ProCard tabs={{activeKey:currentKey}}>
        {/* 自定义创建方法组件 */}
        <TabPane key="diy">
          <Space key="action_create" direction="vertical" size={20} style={{width: '100%'}}>
            <Alert type="error" message={<span>由于前端和PHP对于对象定义的不同，所以如果服务类返回的是<Text type="danger">指定键名的数组</Text>，服务返回请选择<Text type="danger">数组对象（array_object）</Text></span>} />
            <ActionForm id={0} controllerSimpleList={controllerSimpleList} moduleSimpleList={moduleSimpleList} />
          </Space>
        </TabPane>
        {/* 一键创建方法组件 */}
        <TabPane key="speed">
          <Space key="action_create" direction="vertical" size={20} style={{width: '100%'}}>
            <PageAlert closable type="error" message={<div>
              <p>由于前端和PHP对于对象定义的不同，所以如果服务类返回的是<Text type="danger">指定键名的数组</Text>，服务返回请选择<Text type="danger">数组对象（array_object）</Text></p>
              <p>一键创建会系统会自动创建逻辑层和服务层，且路由和请求方式不支持自定义。</p>
              <p><Text type="danger">系统生成代码虽然有备份机制，但生成前最好能Git提交一次以便恢复代码。</Text></p>
              <p>Service默认采用Facade代理模式，您也可以使用静态代理模式</p>
            </div>} />
            <ActionSpeedForm moduleSimpleList={moduleSimpleList} controllerSimpleList={controllerSimpleList} />
          </Space>
        </TabPane>
      </ProCard>
    </PageContainer>
  )
}

export default ActionCreate
