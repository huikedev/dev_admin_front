import React, {useEffect, useState} from "react";
import {PageContainer} from "@ant-design/pro-layout";
import {Steps, Card, Space} from 'antd';
import styles from '@/assets/styles/pages/ModelCreate.less'
import {PageException, PageLoading} from "@/huikedev";
import {ModelCreateStateType} from "@/pages/generate/model/model";
import { connect, Dispatch } from 'umi';
import {useRequest} from "@@/plugin-request/request";
import {GenerateRequest} from "@/services";
import ModelBaseForm from "./components/ModelBaseForm";
import ModelFieldsForm from "./components/ModelFieldsForm";
import ModelRelationsForm from "./components/ModelRelationsForm";

const {Step} = Steps;

interface ModelCreateProps {
  dispatch:Dispatch,
  current: ModelCreateStateType['current'];
}

const getCurrentStepAndComponent = (current?: string) => {
  switch (current) {
    case 'fields':
      return { step: 1, component: <ModelFieldsForm /> };
    case 'relations':
      return { step: 2, component: <ModelRelationsForm /> };
    default:
      return { step: 0, component: <ModelBaseForm /> };
  }
};

const ModelCreate :React.FC<ModelCreateProps> = props =>  {

  const {data,error,loading}:{data:API.ModelSimpleListItem[];error:any;loading:any}=useRequest(async ()=>{
    // eslint-disable-next-line no-return-await
    return await GenerateRequest.modelSimpleList()
  })

  const [stepComponent, setStepComponent] = useState<React.ReactNode>(<ModelBaseForm />);
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    const { step, component } = getCurrentStepAndComponent(props.current);
    setCurrentStep(step);
    setStepComponent(component);
  }, [props.current]);


  if(loading){
    return <PageLoading />
  }

  if(error){
    return <PageException />
  }

  props.dispatch({
    type:'modelCreate/saveSimpleList',
    payload:data
  })


  return (
    <PageContainer>
      <Card bordered={false}>
        <Space direction="vertical" size={20} style={{width:'100%'}}>
          <Steps current={currentStep} className={styles.steps}>
            <Step title="基础信息"/>
            <Step title="模型字段"/>
            <Step title="模型关联"/>
          </Steps>
          <div className={styles.stepContent}>
            {stepComponent}
          </div>
        </Space>
      </Card>
    </PageContainer>
  );
}

export default connect(({ modelCreate }: { modelCreate: ModelCreateStateType }) => ({
  current: modelCreate.current,
}))(ModelCreate);
