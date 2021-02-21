import React from "react";
import {useForm} from "antd/es/form/Form";
import { Form, Input, Modal, Space} from "antd";
import {PageAlert} from "@/huikedev";
import { AppDeleteModalType} from "@/common/AppTypes";
import {useRequest} from "umi";
import {setControllerPathDelete} from "@/services/logic";

interface PathDeleteProps extends AppDeleteModalType<API.ControllerPathItem>{

}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 15 },
};

const PathDelete:React.FC<PathDeleteProps> = props => {
  const {run,loading} = useRequest((params)=>setControllerPathDelete(params),{
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
      title={`删除目录【${props.dataItem.controller_name}】`}
      closable={!loading}
      onCancel={() => {
        props.onClose();
      }}
      onOk={onValidateForm}
      maskClosable={false}
      destroyOnClose
    >
      <Space direction="vertical" style={{width:'100%'}}>
        <PageAlert message={<div style={{color:'red'}}><p>删除操作为删除数据库记录，系统文件需要您手动删除！</p></div>} type="error"/>
      <Form
        form={form}
        {...layout}
        layout="horizontal"
        name="controllerDelete"
        initialValues={{...props.dataItem,module_title:`${props.dataItem.module.module_title}【app/controller/${props.dataItem.module.module_name}】`,delete_actions:true}}
      >
        <Form.Item
          label="关联模块"
          name="module_title"
        >
          <Input disabled/>
        </Form.Item>
        <Form.Item
          label="目录路径"
          name="controller_name"
        >
          <Input  disabled/>
        </Form.Item>
        <Form.Item
          label="目录名称"
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
      </Form>
      </Space>
    </Modal>
  )
}

export default PathDelete;
