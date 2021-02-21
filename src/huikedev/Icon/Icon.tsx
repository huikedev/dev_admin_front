import React from 'react';
import '@/assets/styles/index.less';

type Props = {
  icon: string;
  fontSize?: number;
  color?: string;
  disabled?:boolean
};

const Index: React.FC<Props> = props => {
  const { icon, fontSize, color,disabled } = props;
  if(disabled){
    return (<i
      className={`huike ${icon}`}
      style={{ fontSize, color:'#d9d9d9', verticalAlign: 'middle' }}
    />)
  }
  return (
    <i
      className={`huike ${icon}`}
      style={{ fontSize,color, verticalAlign: 'middle' }}
    />
  );
};

export default Index;
