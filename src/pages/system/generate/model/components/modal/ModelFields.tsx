import React from "react";
import {Button, Modal, Result, Space, Spin, Table, Typography} from "antd";
import {ColumnsType} from "antd/es/table";
import {EmptyText} from "@/huikedev";
import {useRequest} from "@@/plugin-request/request";
import {getModelFields} from "@/services/generate";

const {Title} = Typography

interface ModelFieldsModalProps{
  modelConfig:API.ModelListItem,
  visible:boolean;
  onClose: () => void;
}

const Columns : ColumnsType<API.ModelField>=[
  {
    title: '字段名',
    dataIndex: 'field_name',
    key: 'field_name',
  },
  {
    title: '类型',
    dataIndex: 'field_type',
    key: 'field_type',
  },
  {
    title: '长度',
    dataIndex: 'field_length',
    key: 'field_length',
    render:(res:any,record)=>{
      if(record.field_length===-1){
        return <EmptyText title="--" />
      }
      return record.field_length
    }
  },
  {
    title: '小数位',
    dataIndex: 'field_scale',
    key: 'field_scale',
    render:(res:any,record)=>{
      if(record.field_scale===-1){
        return <EmptyText title="--" />
      }
      return record.field_scale
    }
  },
  {
    title: '索引',
    dataIndex: 'field_index',
    key: 'field_index',
    render:(res:any,record)=>{
      if(record.field_index==='none'){
        return <EmptyText title="无" />
      }
      return record.field_index
    }
  },
  {
    title: '默认值',
    dataIndex: 'default_value',
    key: 'default_value',
    render:(res:any,record)=>{
      if(record.default_value.type==='undefined'){
        return <EmptyText title="无" />
      }
      return `(${record.default_value.type})${record.default_value.value}`
    }
  },
  {
    title: '其他属性',
    dataIndex: 'field_options',
    key: 'field_options',
    render:(res:any,record)=>{
      return <Space>
        {record.field_options.length > 0
          ?
          record.field_options.map((option:string)=>{
          return <span key={option}>{option}</span>
        })
        :
          <EmptyText title="无" />
        }
      </Space>
    }
  },
  {
    title: '字段注释',
    dataIndex: 'field_remark',
    key: 'field_remark',
    render:(res:any,record)=>{
      return String(record.field_remark)
    }
  }
]

const ModelFields : React.FC<ModelFieldsModalProps> = props => {
  const {loading,data,error} = useRequest(()=>{
    return getModelFields({id:props.modelConfig.id})
  })

  const buildContent = ()=>{
    if(loading){
      return <Spin />
    }
    if(error){
      return <Result title="获取字段信息失败" />
    }
    return <Space style={{width:'100%'}} direction="vertical">
      <Title level={5}>模型:{props.modelConfig.model_full_name}</Title>
      <Table
        size="small"
        columns={Columns}
        dataSource={data.model_fields}
        pagination={false}
      />
    </Space>
  }

  return (
    <Modal
      width="50%"
      visible={props.visible}
      title={null}
      onCancel={() => {
        props.onClose();
      }}
      footer={[
        <Button key="close" onClick={()=>props.onClose()}>关闭</Button>
      ]}
      maskClosable={false}
      destroyOnClose
    >
      {buildContent()}
    </Modal>
  )
}

export default ModelFields
