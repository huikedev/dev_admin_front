import publicCss from '@/assets/styles/public/index.less';
import React from 'react';

type EmptyTextProps = {
  title?: string;
};

const EmptyText: React.FC<EmptyTextProps> = props => {
  return (
    <span className={publicCss.textGray}>
      {props.title ? props.title : '暂无'}
    </span>
  );
};
export default EmptyText;
