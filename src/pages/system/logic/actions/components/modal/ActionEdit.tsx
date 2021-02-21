import React from "react";
import {AppEditModalType} from "@/common/AppTypes";
import {useRequest} from "@@/plugin-request/request";
import {setActionEdit} from "@/services/logic";
import {useForm} from "antd/es/form/Form";
import {Form, Input, Modal, Space} from "antd";
import {PageAlert} from "@/huikedev";

interface ActionEditProps extends AppEditModalType<API.ActionTableItem>{

}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 15 },
};

const ActionEdit: React.FC<ActionEditProps> = props => {
  const {run,loading} = useRequest((params)=>setActionEdit(params),{
    manual:true,
    debounceInterval:500,
    onSuccess:()=>props.onSuccess()
  })
  const [form] = useForm()
  const { validateFields } = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    run({...values,id:props.dataItem.id})
  }
  if(!props.visible){
    return <></>
  }
  return (
    <Modal
      width="50%"
      visible={props.visible}
      mask
      confirmLoading={loading}
      title={`编辑方法【${props.dataItem.action_name}】`}
      closable={!loading}
      onCancel={() => {
        props.onClose();
      }}
      onOk={onValidateForm}
      maskClosable={false}
      destroyOnClose
    >
      <Space direction="vertical" style={{width:'100%'}}>
        <PageAlert message={<div style={{color:'red'}}><p>目前版本仅支持修改中文名称和路由，后续版本会增加代码逻辑修改功能</p></div>} type="error"/>
        <Form
          form={form}
          {...layout}
          layout="horizontal"
          name="controllerDelete"
          initialValues={{
            ...props.dataItem,
            module_title:`${props.dataItem.controller.module.module_title}【${props.dataItem.controller.module.module_name}】`,
            controller:`${props.dataItem.controller.controller_title}【${props.dataItem.controller.controller_name}】`
          }}
        >
          <Form.Item
            label="关联模块"
            name="module_title"
          >
            <Input disabled/>
          </Form.Item>
          <Form.Item
            label="关联控制器"
            name="controller"
          >
            <Input disabled/>
          </Form.Item>
          <Form.Item
            label="方法名"
            name="action_name"
          >
            <Input  disabled/>
          </Form.Item>
          <Form.Item
            label="方法中文名"
            name="action_title"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="路由别名"
            name="route_name"
          >
            <Input />
          </Form.Item>
        </Form>
      </Space>
    </Modal>
  )
}

export default ActionEdit
