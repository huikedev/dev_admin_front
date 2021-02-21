import React from "react";
import {Descriptions} from "antd";
import {PageAlert} from "@/huikedev";

interface ActionAlertTipsProps {
  type?: 'success' | 'info' | 'warning' | 'error';
  hide?: boolean;
}

const Index :React.FC<ActionAlertTipsProps> = props => {
  if(props.hide){
    return null;
  }
  return (<PageAlert {...props} closable message={
    <Descriptions column={2}>
      <Descriptions.Item label="方法名称">用于代码注释和前端展示</Descriptions.Item>
      <Descriptions.Item label="路由别名">用于生成逻辑方法的访问路由，对大小写敏感</Descriptions.Item>
      <Descriptions.Item label="请求方式">用于对请求进行限制，支持TP路由的6中类型</Descriptions.Item>
      <Descriptions.Item label="响应类型">用于对响应进行限制，默认仅支持JSON、HTML、图片、数据流、下载</Descriptions.Item>
      <Descriptions.Item label="操作反馈">指请求成功后的反馈，分为无反馈、Message、Notification、Dialog、Page</Descriptions.Item>
      <Descriptions.Item label="返回类型">指Service类的返回类型，会在生成代码时使用，通常也是请求的响应类型</Descriptions.Item>
      <Descriptions.Item label="鉴权设置">指当前方法的访问权限，登录是登录后访问，鉴权指需要特定角色权限访问</Descriptions.Item>
      <Descriptions.Item label="逻辑分层生成">智能生成Logic层、Service层、Service异常等逻辑骨架</Descriptions.Item>
    </Descriptions>
  }
  />)
}

export default Index
