import React from 'react';
import { Spin } from 'antd';

const pageLoadingStyle = {
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const PageLoading: React.FC<{}> = () => {
  return (
    <div style={pageLoadingStyle}>
      <Spin size="large" />
    </div>
  );
};

export default PageLoading;
