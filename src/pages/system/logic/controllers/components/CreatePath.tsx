import React from "react";
import {useForm} from "antd/es/form/Form";
import {Button, Form, Input, Select, Space, Typography} from "antd";
import {PageAlert} from "@/huikedev";
import {useRequest} from "@@/plugin-request/request";
import {setControllerCreate} from "@/services/logic";
import {history} from "@@/core/history";
import PathName from "@/common/PathName";
import {toSnake} from "@/helpers";

const {Text} = Typography
interface CreatePathProps {
  moduleList:API.ModuleSimpleItem[]
}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 6, },
};
const CreatePath: React.FC<CreatePathProps> = props => {
  // 提交表单
  const{run:submit,loading:submitting} = useRequest((params:object)=>setControllerCreate(params),{
    manual:true
  })
  const [form] = useForm()
  const { validateFields,setFieldsValue } = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    await submit({...values,is_path:true}).then(()=>{
      history.push(PathName.controllers.list)
    })
  }
  const onControllerNameChange = (value:string)=>{
    setFieldsValue({route_name:toSnake(value)})
  }

  return (<Space key="controller_path" direction="vertical" size={20} style={{width:'100%'}}>
      <PageAlert closable message={<div>
        <p>目录名称不支持多级自动关联，如您创建<Text code>path/sub_path</Text>，系统会认为这是一个目录，您无法将控制器生成在<Text code>path</Text>目录下，如需生成则需要添加<Text code>path</Text>目录</p>
        <p><Text type="danger">目录名称会自动转换为Snake命名风格</Text>，目录名称也将作为Service的路径，所以目录的意义是对业务逻辑进行分类管理，方便后续的开发及维护</p>
      </div>} />
    <Form
      form={form}
      {...layout}
      layout="horizontal"
      size="large"
      name="controllerCreatePath"
      onFinish={onValidateForm}
      initialValues={{exception_msg:'系统错误，请稍候再试'}}
    >
      <Form.Item
        label="关联模块"
        name="module_id"
        rules={[{ required: true, message: '请选择关联模块' }]}
      >
        <Select placeholder="选择模块">
          {
            props.moduleList.map((module)=>{
              return <Select.Option value={module.id} key={module.name}>{module.title}</Select.Option>
            })
          }
        </Select>
      </Form.Item>
    <Form.Item
      label="目录名称（英文）"
      name="controller_name"
      rules={[{ required: true, message: '请输入目录名称（英文）' }]}
    >
      <Input placeholder="请输入目录名称（英文）" onChange={(e)=>{onControllerNameChange(e.target.value as string)}}/>
    </Form.Item>
    <Form.Item
      label="目录名称（中文）"
      name="controller_title"
      rules={[{ required: true, message: '请输入目录名称（中文）' }]}
    >
      <Input placeholder="请输入目录名称（中文）"/>
    </Form.Item>
      <Form.Item
        label="路由别名"
        name="route_name"
      >
        <Input placeholder="请输入目录路由别名，不设请留空"/>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" loading={submitting} htmlType="submit" block>
          确认添加
        </Button>
      </Form.Item>
  </Form>
    </Space>
  )
}

export default CreatePath
