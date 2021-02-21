import React from "react";
import {PageAlert} from "@/huikedev";
import {Button, Checkbox, Form, Input, Space, Typography} from "antd";
import publicStyles from "@/assets/styles/index.less";
import {PlusOutlined} from "@ant-design/icons";
import {useRequest} from "@@/plugin-request/request";
import {setModuleCreate} from "@/services/logic";
import {useForm} from "antd/es/form/Form";
import {history} from "@@/core/history";
import PathName from "@/common/PathName";

interface AppModuleFormProps {

}
const {Text} = Typography
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 15 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 6, },
};
const AppModuleForm: React.FC<AppModuleFormProps> = props => {
  const {run:moduleCreateSubmit,loading:moduleCreateSubmitting} = useRequest((params:object)=>{
    return setModuleCreate(params)
  },{manual:true})

  const [form] = useForm()

  const { validateFields } = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    await moduleCreateSubmit({...values,is_extend:false}).then(()=>{
      history.push(PathName.modules.list)
    })
  }
  return (
    <Space key="module_content" direction="vertical" size={20} style={{width: '100%'}}>
      <PageAlert type="error" closable message={<div>
        <p>为了提高安全性，建议绑定域名到模块。如有两个模块<Text code>index</Text>和<Text code>admin</Text>，网站根目录域名为<Text code>a.com</Text>
        </p>
        <p>模块都未绑定域名的情况下，<Text code>a.com/index/xxx</Text>和<Text code>a.com/admin/xxx</Text>均可访问。</p>
        <p>模块<Text code>admin</Text>绑定域名<Text code>b.com</Text>：<Text code>a.com/admin/xxx</Text>无法访问；<Text
          code>b.com/index/xxx</Text>无法访问；<Text code>a.com/index/xxx</Text>可以访问</p>
        <p>模块创建会默认生成路由中间件，请勿删除，可通过路由中间件实现权限校验等逻辑</p>
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
          label="生成中间件"
          name="is_create_middleware"
          valuePropName="checked"
          initialValue
        >
          <Checkbox indeterminate>生成路由中间件并使用</Checkbox>
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

export default AppModuleForm
