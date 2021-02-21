import React from 'react';
import {Card, Empty} from 'antd';
import { EmptyProps } from 'antd/lib/empty';
import {useModel} from "umi";

const pageEmptyStyle = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

interface PageEmptyProps extends EmptyProps {}

const PageEmpty: React.FC<PageEmptyProps> = props => {
  const {pageCardMinHeight} = useModel('useGlobalSettingModel',model => ({
    pageCardMinHeight:model.pageCardMinHeight
  }))
  const state = { ...props };
  state.description = state.description ? (
    state.description
  ) : (
    <span>未找到指定的数据</span>
  );
  return (
      <Card style={{...pageEmptyStyle,height:`${pageCardMinHeight}px`}}>
        <Empty {...state} />
      </Card>
  );
};

export default PageEmpty;
