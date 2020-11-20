import React from 'react';
import { Empty } from 'antd';
import { EmptyProps } from 'antd/lib/empty';

const pageEmptyStyle = {
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

interface PageEmptyProps extends EmptyProps {}

const PageEmpty: React.FC<PageEmptyProps> = props => {
  const state = { ...props };
  state.description = state.description ? (
    state.description
  ) : (
    <span>未找到指定的数据</span>
  );
  return (
    <div style={pageEmptyStyle}>
      <Empty {...state} />
    </div>
  );
};

export default PageEmpty;
