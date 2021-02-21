import React from "react";
import {Modal, Descriptions, Switch, Button} from "antd";
import {EmptyText} from '@/huikedev'
import AppUtils from "@/utils/AppUtils";

interface ModelProperty{
  data:API.ModelListItem,
  visible:boolean;
  onRefresh:()=>void;
  onClose: () => void;
}

const ModelProperty:React.FC<ModelProperty> = props => {

  const buildContent = ()=>{
    return (
      <Descriptions column={1}>
        <Descriptions.Item label="模型名称">{props.data.model_name}</Descriptions.Item>
        <Descriptions.Item label="完整名称">{props.data.model_full_name}</Descriptions.Item>
        <Descriptions.Item label="模型基类">
          {props.data.model_extend_text}
        </Descriptions.Item>
        <Descriptions.Item label="数据表名">
          {
            AppUtils.isEmpty(props.data.table_name)
              ?
              <EmptyText title="默认表名"/>
              :
              props.data.table_name
          }
        </Descriptions.Item>
        <Descriptions.Item label="主键名称">
          {
            AppUtils.isEmpty(props.data.pk_name)
            ?
              <EmptyText title="id"/>
              :
              props.data.pk_name
          }
        </Descriptions.Item>
        <Descriptions.Item label="数据库连接">
          {
            AppUtils.isEmpty(props.data.connection_name)
              ?
              <EmptyText title="默认设置"/>
              :
              props.data.connection_name
          }
        </Descriptions.Item>
        <Descriptions.Item label="JsonAssoc">
            <Switch checkedChildren="是" unCheckedChildren="否" disabled checked={Boolean(props.data.is_json_assoc)} />
        </Descriptions.Item>

        <Descriptions.Item label="更新时间">
          <Switch checkedChildren="是" unCheckedChildren="否" disabled checked={Boolean(props.data.is_update_time)} />
        </Descriptions.Item>
        <Descriptions.Item label="创建时间">
          <Switch checkedChildren="是" unCheckedChildren="否" disabled checked={Boolean(props.data.is_create_time)} />
        </Descriptions.Item>
        <Descriptions.Item label="软删除">
          <Switch checkedChildren="是" unCheckedChildren="否" disabled checked={Boolean(props.data.is_delete_time)} />
        </Descriptions.Item>
        <Descriptions.Item label="创建人">
          <Switch checkedChildren="是" unCheckedChildren="否" disabled checked={Boolean(props.data.is_creator_id)} />
        </Descriptions.Item>
      </Descriptions>
    )
  }
  return (
    <Modal
      width="30%"
      visible={props.visible}
      title="模型属性"
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
  );
}
export default ModelProperty
