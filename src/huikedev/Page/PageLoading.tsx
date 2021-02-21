import React from 'react';
import {Card, Spin} from 'antd';
import {PageContainer} from "@ant-design/pro-layout";
import {useModel} from "umi";

const pageLoadingStyle = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const PageLoading: React.FC = () => {
  const {pageCardMinHeight} = useModel('useGlobalSettingModel',model => ({
    pageCardMinHeight:model.pageCardMinHeight
  }))
  return (
    <PageContainer style={{height:'100%'}}>
      <Card style={{...pageLoadingStyle,height:`${pageCardMinHeight}px`}}>
        <Spin delay={50}  size="large" wrapperClassName="huike-spin"/>
      </Card>

    </PageContainer>
  );
};

export default PageLoading;
