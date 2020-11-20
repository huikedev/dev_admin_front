import React from 'react';
import { Result } from 'antd';
import { ResultProps } from 'antd/lib/result';

const pageExceptionStyle = {
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

interface PageExceptionProps extends ResultProps {}

const PageException: React.FC<PageExceptionProps> = props => {
  const state = { ...props };
  state.subTitle = state.subTitle ? (
    state.subTitle
  ) : (
    <span>系统错误，请稍后再试或联系平台客服</span>
  );
  return (
    <div style={pageExceptionStyle}>
      <Result {...state} />
    </div>
  );
};

export default PageException;
