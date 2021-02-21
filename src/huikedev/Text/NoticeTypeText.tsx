import React from "react";
import {NoticeTypeType} from "@/common/AppTypes";
import {Tag} from "antd";

interface NoticeTypeTextProps{
  type:NoticeTypeType
}
const NoticeTypeText : React.FC<NoticeTypeTextProps> = props => {
  const typeTextArray:string[] = String(props.type).split('.')
  const [typeText] = typeTextArray
  let color:string = ''
  // 按照侵入程度划分颜色
  switch (typeText){
    case 'Message':
      color = '#bae637'
      break;
    case 'Notification':
      color = '#73d13d'
      break;
    case 'Dialog':
      color = '#ff7a45'
      break;
    case 'Page':
      color = '#ff4d4f'
      break;
    default:
      color='default'
  }
  return <span><Tag color={color}>{typeText}</Tag></span>
}

export default NoticeTypeText
