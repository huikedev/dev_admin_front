import React from "react";

import {Tag} from "antd";
import {RequestMethodType} from "@/common/AppTypes";

interface RequestTagTextProps{
  type:RequestMethodType
}

const Index : React.FC<RequestTagTextProps> = props => {
  let color:string = ''
  switch (props.type){
    case "GET":
      color = 'green'
      break
    case "POST":
      color = 'purple'
      break
    case "PUT":
      color = 'blue'
      break
    case "DELETE":
      color = 'red'
      break
    default:
      color = 'default'
  }

  return <span><Tag color={color}>{props.type}</Tag></span>
}

export default Index
