import React from "react";
import {AlertProps} from "antd/es/alert";
import publicStyles from '@/assets/styles/index.less'
import {Alert} from "antd";

interface PageAlertProps extends AlertProps{

}

const Index : React.FC<PageAlertProps> = props => {
  return <Alert className={publicStyles.huikePageAlert} {...props} />
}

export default Index
