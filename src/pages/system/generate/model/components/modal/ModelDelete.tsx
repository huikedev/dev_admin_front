import React, {useState} from "react";
import {useRequest} from "@@/plugin-request/request";
import {getModelRead,setModelDelete} from "@/services/generate";
import {PageException, PageLoading,PageAlert} from '@/huikedev'
import {Form, Input, Modal, Checkbox, Space, Button,  message} from "antd";

type ModelDeleteProps = {
  model_id:number;
  visible:boolean;
  onSuccess:()=>void;
  onClose: () => void;
}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};
const ModelDelete : React.FC<ModelDeleteProps> = props => {
  const {loading,data,error}:{loading:any,data:API.ModelListItem,error:any} = useRequest(async ()=>{
    return getModelRead({id:props.model_id})
  })
  const [submitting,setSubmitting] = useState(false)
  const [form] = Form.useForm();
  const {getFieldsValue} = form
  if (error) {
    return <PageException status={500} />;
  }
  if (loading) {
    return <PageLoading />;
  }

  const onFinish = async ()=>{
    setSubmitting(true)
    const res = await setModelDelete({
      id:props.model_id,
      ...getFieldsValue()
    })
    if(!res.success){
      Modal.error({
        content:res.errorMessage
      })
      return;
    }
    message.success('操作成功！')
    setSubmitting(false)
    props.onSuccess()
  }
  return (
    <Modal
      width="50%"
      visible={props.visible}
      title="删除模型"
      onCancel={() => {
        props.onClose();
      }}
      footer={null}
      maskClosable={false}
      destroyOnClose
    >
      <Space direction="vertical" style={{width: '100%'}}>
        <PageAlert message="删除数据表操作不可恢复，请谨慎操作" type="error"/>
        <Form {...layout} form={form} name="model-delete" onFinish={onFinish}
              initialValues={{...data, delete_model: true, delete_table: false, delete_migrate_file: false}}>
          <Form.Item name="model_full_name" label="模型名称">
            <Input readOnly/>
          </Form.Item>
          <Form.Item {...tailLayout} name="delete_model" valuePropName="checked">
            <Checkbox disabled>删除模型</Checkbox>
          </Form.Item>
          <Form.Item {...tailLayout} name="delete_table" valuePropName="checked">
            <Checkbox>删除数据表</Checkbox>
          </Form.Item>
          <Form.Item {...tailLayout} name="delete_migrate_file" valuePropName="checked">
            <Checkbox>删除数据库迁移文件</Checkbox>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button loading={submitting} danger type="primary" htmlType="submit">
                确认删除
              </Button>
              <Button onClick={() => {
                props.onClose()
              }}>
                取消
              </Button>
            </Space>

          </Form.Item>
        </Form>
      </Space>
    </Modal>
  );
}

export default ModelDelete
