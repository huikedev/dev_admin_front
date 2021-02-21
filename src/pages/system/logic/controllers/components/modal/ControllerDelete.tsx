import React from "react";
import {useForm} from "antd/es/form/Form";
import {Checkbox, Form, Input, Modal, Space} from "antd";
import {PageAlert} from "@/huikedev";

interface ControllerEditProps{
  controller:API.ControllerTableItem;
  visible:boolean;
  onSubmit:(values:object)=>void;
  onClose:()=>void;
  submitting:boolean;
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 15 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const ControllerDelete:React.FC<ControllerEditProps> = props => {
  const [form] = useForm()
  const { validateFields } = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    props.onSubmit({...values,id:props.controller.id})
  }
  if(!props.visible){
    return <></>
  }
  return (
    <Modal
      width="50%"
      visible={props.visible}
      mask
      confirmLoading={props.submitting}
      title={`删除控制器【${props.controller.controller_name}】`}
      onCancel={() => {
        props.onClose();
      }}
      onOk={onValidateForm}
      maskClosable={false}
      destroyOnClose
    >
      <Space direction="vertical" style={{width:'100%'}}>
        <PageAlert message={<div style={{color:'red'}}><p>删除操作为删除数据库记录，系统文件需要您手动删除！</p><p>删除控制器的同时会删除控制器下所有的方法记录。</p></div>} type="error"/>

      <Form
        form={form}
        {...layout}
        layout="horizontal"
        name="controllerDelete"
        initialValues={{...props.controller,module_title:`${props.controller.module.module_title}【app/controller/${props.controller.module.module_name}】`,delete_actions:true}}
      >
        <Form.Item
          label="关联模块"
          name="module_title"
        >
          <Input disabled/>
        </Form.Item>
        <Form.Item
          label="控制器类名"
          name="controller_name"
        >
          <Input  disabled/>
        </Form.Item>
        <Form.Item
          label="控制器名称"
          name="controller_title"
        >
          <Input disabled/>
        </Form.Item>
        <Form.Item
          label="路由别名"
          name="route_name"
        >
          <Input disabled/>
        </Form.Item>
        <Form.Item {...tailLayout} name="delete_actions" valuePropName="checked">
          <Checkbox disabled>同时删除控制器方法</Checkbox>
        </Form.Item>
      </Form>
      </Space>
    </Modal>
  )
}

export default ControllerDelete;
