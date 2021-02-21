import React from 'react';
import {Card, Result} from 'antd';
import { ResultProps } from 'antd/lib/result';
import {PageContainer} from "@ant-design/pro-layout";
import {useModel} from "@@/plugin-model/useModel";

const pageExceptionStyle = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

interface PageExceptionProps extends ResultProps {}

const PageException: React.FC<PageExceptionProps> = props => {
  const {pageCardMinHeight} = useModel('useGlobalSettingModel',model => ({
    pageCardMinHeight:model.pageCardMinHeight
  }))
  const state = { ...props };
  state.subTitle = state.subTitle ? (
    state.subTitle
  ) : (
    <span>系统错误，请稍后再试</span>
  );
  return (
    <PageContainer>
      <Card style={{...pageExceptionStyle,height:`${pageCardMinHeight}px`}}>
      <Result {...state} />
      </Card>
    </PageContainer>
  );
};

export default PageException;
