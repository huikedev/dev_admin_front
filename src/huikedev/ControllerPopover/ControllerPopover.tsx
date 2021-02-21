import React from "react";
import {Popover, Descriptions} from "antd";
import publicStyle from "@/assets/styles/index.less";


type ControllerPopoverProps={
  controller:API.ControllerWithModule
}

const Index:React.FC<ControllerPopoverProps> = props => {
  const buildContent = ()=>{
    return <Descriptions column={1}>
      <Descriptions.Item label="控制器名称">{props.controller.controller_title}</Descriptions.Item>
      <Descriptions.Item label="控制器类名">{props.controller.controller_name}</Descriptions.Item>
      <Descriptions.Item label="路由别名">{props.controller.route_name}</Descriptions.Item>
      <Descriptions.Item label="关联模块">{props.controller.module.module_title}</Descriptions.Item>
      <Descriptions.Item label="创建方式">
        {props.controller.created_by_huike ? <span className={publicStyle.textOrange}>系统生成</span> : <span>手动同步</span>}
      </Descriptions.Item>
    </Descriptions>
  }
  return <Popover overlayStyle={{maxWidth:'300px'}} title={`控制器【${props.controller.module.module_title} - ${props.controller.controller_title}】`} content={buildContent} >
    <span className={publicStyle.textLink}>{props.controller.controller_title}</span>
  </Popover>
}

export default Index
