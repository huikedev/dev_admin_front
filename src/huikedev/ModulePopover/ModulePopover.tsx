import React from "react";
import {Popover, Descriptions,  Space, Tooltip} from "antd";
import {EmptyText} from "@/huikedev";
import publicStyle from "@/assets/styles/index.less";

type ModulePopoverProps={
  module:API.ModuleItem
}

const Index:React.FC<ModulePopoverProps> = props => {
  const buildContent = ()=>{
    return <Descriptions column={1}>
      <Descriptions.Item label="模块名称">{props.module.module_title}</Descriptions.Item>
      <Descriptions.Item label="模块标识">{props.module.module_name}</Descriptions.Item>
      <Descriptions.Item label="路由别名">{props.module.route_name}</Descriptions.Item>
      <Descriptions.Item label="域名绑定">
        {
          props.module.bind_domain.length===0
            ?
            <EmptyText title="未绑定"/>
            :
            (props.module.bind_domain as Array<string>).map((value)=>{
              return <p key={value}>{value}</p>
            })
        }
      </Descriptions.Item>
      <Descriptions.Item label="路由中间件">
        <Space direction="vertical" style={{width:'100%'}}>
          {props.module.route_middleware.length === 0 ? <EmptyText title="未指定"/> : props.module.route_middleware.map((middleware)=>{
            return <Tooltip key={middleware} title={middleware}>{middleware.split('huike\\common\\middlewares\\')}</Tooltip>
          })}
        </Space>
      </Descriptions.Item>
    </Descriptions>
  }
  return <Popover overlayStyle={{maxWidth:'300px'}} title={`模块【${props.module.module_title}】`} content={buildContent} >
    <span className={publicStyle.textLink}>{props.module.module_title}</span>
  </Popover>
}

export default Index
