import React from "react";
import {AppDeleteModalType} from "@/common/AppTypes";
import {useForm} from "antd/es/form/Form";
import {Checkbox, Form, Input, Modal, Space} from "antd";
import {PageAlert} from "@/huikedev";
import {useRequest} from "umi";
import {setActionDelete} from "@/services/logic";

interface ActionDeleteProps extends AppDeleteModalType<API.ActionTableItem>{

}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 15 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};
const Index:React.FC<ActionDeleteProps> = props => {
  const {loading,run} = useRequest((params:object)=>setActionDelete(params),{
    manual:true,
    debounceInterval:500,
    onSuccess:()=>props.onSuccess()
  })
  const [form] = useForm()
  const { validateFields } = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    await run({...values,id:props.dataItem.id})
    props.onSuccess()
  }
  if(!props.visible || typeof props.dataItem ==='undefined'){
    return <></>
  }
  return (
    <Modal
      width="50%"
      visible={props.visible}
      mask
      confirmLoading={loading}
      title={`删除逻辑方法【${props.dataItem.action_title}】`}
      onCancel={() => {
        props.onClose();
      }}
      onOk={onValidateForm}
      maskClosable={false}
      destroyOnClose
    >
      <Space direction="vertical" style={{width:'100%'}}>
        <PageAlert message={<div style={{color:'red'}}><p>Service异常和Logic控制器需要您手动删除</p><p>删除方法并不会更新路由，需要您手动更新路由。</p></div>} type="error"/>

        <Form
          form={form}
          {...layout}
          layout="horizontal"
          name="controllerDelete"
          initialValues={{...props.dataItem,module_title:`${props.dataItem.controller.module.module_title}【app/controller/${props.dataItem.controller.module.module_name}】`,delete_service:false}}
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
            initialValue={props.dataItem.controller.controller_name}
          >
            <Input  disabled/>
          </Form.Item>
          <Form.Item
            label="方法名称"
            name="action_title"
          >
            <Input disabled/>
          </Form.Item>
          <Form.Item
            label="方法名"
            name="action_name"
          >
            <Input disabled/>
          </Form.Item>
          <Form.Item
            label="路由别名"
            name="route_name"
          >
            <Input disabled/>
          </Form.Item>
          <Form.Item {...tailLayout} name="delete_service" valuePropName="checked">
            <Checkbox>同时删除对应Service</Checkbox>
          </Form.Item>
        </Form>
      </Space>
    </Modal>
  )
}

export default Index
