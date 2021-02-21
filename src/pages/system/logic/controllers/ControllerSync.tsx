import React from "react";
import {useRequest} from 'umi'
import { getUnSyncedControllers} from "@/services/logic";

import { Card, Space} from "antd";
import {PageContainer} from "@ant-design/pro-layout";

import {PageException, PageLoading,PageEmpty,PageAlert} from "@/huikedev";
import {isEmptyArray} from "@/helpers";
import ControllerSyncForm from "@/pages/system/logic/controllers/components/ControllerSyncForm";
import Text from "antd/es/typography/Text";

const ControllerSync : React.FC = ()=>{

  const {loading,data,error,refresh} = useRequest(()=>getUnSyncedControllers())


  if(loading){
    return <PageLoading />
  }

  if(error){
    return <PageException title={error.message} status={500} />
  }

  if(isEmptyArray(data)){
    return (
      <PageContainer>
        <Card>
          <PageEmpty description="所有应用下的控制器均已同步至数据库"/>
        </Card>
      </PageContainer>
    )
  }

  const buildFormItem = (controller:API.UnSyncedControllerItem)=>{
    return (
      <ControllerSyncForm controller={controller} onSuccess={()=>refresh()}/>
    )
  }

  return (
    <PageContainer>
      <Card>
        <Space direction="vertical" size={20} style={{width:'100%'}}>
          <PageAlert closable type="error" message={
            <div>
              <p>此数据来自动态读取，读取逻辑为数据库中已保存模块下所有未添加到数据库的控制器。若控制器目录未添加到数据库，系统会自动新增一条控制器目录的记录。</p>
              <p>基础异常码输入<Text type="danger">++</Text>或<Text type="danger">--</Text>系统会自动计算出基础异常码</p>
            </div>
            }
          />
          <Space key="formList" size={30} direction="vertical" style={{width: '100%'}}>
            {data.length > 0 && (data as Array<API.UnSyncedControllerItem>).map((controller:API.UnSyncedControllerItem)=>buildFormItem(controller))}
          </Space>
        </Space>
      </Card>
    </PageContainer>
  );
}

export default ControllerSync
