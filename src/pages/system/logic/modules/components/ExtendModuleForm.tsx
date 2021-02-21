import React from "react";
import {Button, Form, Input, Space, Typography} from "antd";
import {useRequest} from "@@/plugin-request/request";
import {setModuleCreate} from "@/services/logic";
import {useForm} from "antd/es/form/Form";
import {history} from "@@/core/history";
import PathName from "@/common/PathName";
import {PageAlert} from "@/huikedev";
import publicStyles from "@/assets/styles/index.less";
import {PlusOutlined} from "@ant-design/icons";

interface ExtendModuleFormProps {

}
const {Text} = Typography
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 15 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 6, },
};
const ExtendModuleForm: React.FC<ExtendModuleFormProps> = props => {
  const {run:moduleCreateSubmit,loading:moduleCreateSubmitting} = useRequest((params:object)=>{
    return setModuleCreate(params)
  },{manual:true})
  const [form] = useForm()

  const { validateFields } = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    await moduleCreateSubmit({...values,is_extend:true}).then(()=>{
      history.push(PathName.modules.list)
    })
  }
  return (
    <Space key="module_content" direction="vertical" size={20} style={{width: '100%'}}>
      <PageAlert type="error" closable message={<div>
        <p>第三方模块是指非应用内的模块，您可以将第三方模块设置为composer包，以便多个项目复用，如<Text code>huikedev/dev_admin</Text>即为一个第三方模块</p>
        <p>具体的composer包开发教程请参考</p>

      </div>}/>
      <Form
        form={form}
        {...layout}
        layout="horizontal"
        size="large"
        name="moduleCreate"
        onFinish={onValidateForm}
      >
        <Form.Item
          label="模块标识"
          name="module_name"
          rules={[{required: true, message: '请输入模块名称(英文snake命名)'}]}
        >
          <Input placeholder="请输入模块标识(英文snake命名)"/>
        </Form.Item>
        <Form.Item
          label="模块别名"
          name="module_title"
          rules={[{required: true, message: '请输入模块别名'}]}
        >
          <Input placeholder="请输入模块别名"/>
        </Form.Item>
        <Form.Item
          label="路由别名"
          name="route_name"
        >
          <Input placeholder="请输入路由名称（以英文字母开头的字母或数字，留空使用英文模块名称）"/>
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
        <Form.Item
          label="根命名空间"
          name="root_namespace"
          rules={[{required: true, message: '请输入模块根命名空间'}]}
        >
          <Input placeholder="请输入模块根命名空间" />
        </Form.Item>
        <Form.Item
          label="模块根目录"
          name="root_path"
          rules={[{required: true, message: '请输入模块模块根目录'}]}
        >
          <Input placeholder="请输入模块根目录" />
        </Form.Item>
        <Form.Item
          label="异常基类"
          name="root_base_exception"
        >
          <Input placeholder="请输入完整命名空间的异常基类" />
        </Form.Item>
        <Form.Item
          label="模型基类"
          name="root_base_model"
        >
          <Input placeholder="请输入完整命名空间的模型基类" />
        </Form.Item>
        <Form.Item
          label="控制器基类"
          name="root_base_controller"
        >
          <Input placeholder="请输入完整命名空间的控制器基类" />
        </Form.Item>
        <Form.Item
          label="逻辑层基类"
          name="root_base_logic"
        >
          <Input placeholder="请输入完整命名空间的逻辑层基类" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" loading={moduleCreateSubmitting} htmlType="submit" block>
            确认生成
          </Button>
        </Form.Item>
      </Form>
      <PageAlert
        message="使用帮助"
        description={<div>
          <p>tp6中没有模块的概念，这里的模块是利用分级控制器实现，即每个模块都是<Text code>app/controller</Text>目录下的一个目录</p>
          <p>模块别名在代码逻辑中不起任何作用，可能会出现在代码注释中</p>
          <p>模块可以实现版本控制，可以在<Text type="danger">模块标识</Text>中输入<Text code>v1/admin</Text>，这样会创建一个<Text
            code>app/controller/v1/admin</Text>的目录</p>
          <p>本系统采用强制路由设定，可以通过路由别名来指定模块的路由前缀，如<Text code>v1/admin</Text>可设置路由别名<Text code>admin</Text></p>
        </div>}
        type="info"
      />
    </Space>
  )
}

export default ExtendModuleForm
