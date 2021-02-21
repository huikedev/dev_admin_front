import React from "react";
import {LinkProps} from "antd/es/typography/Link";
import { Typography,Space } from 'antd'
import {Icon} from '@/huikedev'

const {Link} = Typography

interface AppLinkProps extends LinkProps{

}

const AppLink: React.FC<AppLinkProps> = props => {
  let icon = null
  if(props.target && props.target==='_blank'){
    icon = <Icon icon="huike-icon-link" color="#4569d4" />
  }
  return <Space>
    <Link {...props} />
    {icon}
  </Space>
}

export default AppLink
