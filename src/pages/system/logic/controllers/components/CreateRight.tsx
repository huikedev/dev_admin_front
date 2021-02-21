import React from "react";
import {Descriptions} from "antd";

interface CreateRightProps {
  module?:string;
  prefix?:string;
  controller?:string;
  service?:string;
  route?:string;
  module_route?:string;
}

const CreateRight: React.FC<CreateRightProps> = props => {

  return (
    <Descriptions column={1} layout="vertical">
      <Descriptions.Item label="控制器类名">app/controller/{props.prefix}</Descriptions.Item>
    </Descriptions>
  )
}

export default CreateRight
