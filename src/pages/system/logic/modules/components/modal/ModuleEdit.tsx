import React from "react";
import {AppEditModalType} from "@/common/AppTypes";
import {useForm} from "antd/es/form/Form";
import {Button,  Form, Input, Modal} from "antd";
import publicStyles from "@/assets/styles/index.less";
import {PlusOutlined} from "@ant-design/icons";
import {useRequest} from "@@/plugin-request/request";
import {setModuleEdit} from "@/services/logic";

interface ModuleEditProps extends AppEditModalType<API.ModuleItem>{

}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 15 },
};

const ModuleEdit: React.FC<ModuleEditProps> = props => {
  const {run,loading} = useRequest((params)=>setModuleEdit(params),{
    manual:true,
    debounceInterval:500,
    onSuccess:()=>props.onSuccess()
  })
  const [form] = useForm()
  const { validateFields } = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    await run({...values,id:props.dataItem.id})
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
      title={`编辑模块【${props.dataItem.module_title}】`}
      onCancel={() => {
        props.onClose();
      }}
      onOk={onValidateForm}
      maskClosable={false}
      destroyOnClose
    >
      <Form
        form={form}
        {...layout}
        layout="horizontal"
        name="controllerEdit"
        initialValues={props.dataItem}
      >
      <Form.Item
        label="模块名称"
        name="module_name"
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        label="中文名称"
        name="module_title"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="路由别名"
        name="route_name"
      >
        <Input />
      </Form.Item>
      <Form.Item label="绑定域名" style={{marginBottom:0}}>
        <Form.List name="bind_domain">
          {(fields,{ add, remove }) => (
            <>
              {fields.map((field)=>{
                return (
                  <div className={publicStyles.flexAlignBetween}>
                    <Form.Item
                      {...field}
                      style={{width: 'calc(100% - 80px)'}}
                      name={[field.fieldKey]}
                    >
                      <Input addonBefore="http(s)://" placeholder="请输入当前模块绑定的域名，不设置则留空"/>
                    </Form.Item>
                    <Form.Item>
                      <Button danger onClick={() => remove(field.name)} >删除</Button>
                    </Form.Item>
                  </div>
                )
              })}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  添加域名绑定
                </Button>
              </Form.Item></>

          )}
        </Form.List>
      </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModuleEdit
