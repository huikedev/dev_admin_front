import React from "react";
import {Badge, Descriptions, Popover} from "antd";

interface SpeedCreateResultProps {
  result:API.ActionCreateResult
}

const SpeedCreateResult: React.FC<SpeedCreateResultProps> = props => {
  console.log(props.result)
  const buildContent = () =>{
    return (
      <div style={{width:'360px'}}>
      <Descriptions column={1}>
        <Descriptions.Item label="生成类型">{props.result.actionType}</Descriptions.Item>
        <Descriptions.Item label="类名称">{props.result.class}</Descriptions.Item>
        <Descriptions.Item label="生成状态">{props.result.status}</Descriptions.Item>
        <Descriptions.Item label="生成说明">{props.result.msg}</Descriptions.Item>
      </Descriptions>
      </div>
    )
  }

  const buildBadge = ()=>{
    if(props.result.status === 'success'){
      return (<Badge color="green" text="成功" />)
    }
    if(props.result.status === 'none'){
      return (<Badge color="blue" text="未执行" />)
    }
    return (<Badge color="red" text="失败" />)
  }

  return (
    <Popover content={buildContent()}>
      {buildBadge()}
    </Popover>
  )
}

export default SpeedCreateResult
