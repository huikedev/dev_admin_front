import React from "react";
import {PageContainer} from "@ant-design/pro-layout";
import {Form, Input, Button, Select, Space, Switch, Typography, Card} from "antd";
import {facadeOption} from "@/common/OptionConfig";
import { history } from 'umi'
import {useForm} from "antd/es/form/Form";
import {useRequest} from "ahooks";
import { PageAlert} from '@/huikedev'
import {setFacadeCreate} from "@/services/generate";
import PathName from "@/common/PathName";

const {Text} = Typography
const layout = {
  labelCol: { span: 2,offset: 2 },
  wrapperCol: { span: 15 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 6, },
};

const FacadeCreate : React.FC = ()=> {
  const {run:submit,loading:submitting} = useRequest((params)=>{
    return setFacadeCreate(params)
  },{
    manual:true
  })
  const [form] = useForm()
  const { validateFields } = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    await submit(values).then(()=>{
      history.push(PathName.generate.facade)
    })
  }
    return (
      <PageContainer>
        <Card>
        <Space key="facade_content" direction="vertical" size={20} style={{width:'100%'}}>
        <Form
          form={form}
          {...layout}
          layout="horizontal"
          size="large"
          onFinish={onValidateForm}
        >
          <Form.Item
            label="动态对象"
            name="origin_class"
            rules={[{ required: true, message: '请输入动态类对象' }]}
          >
            <Input placeholder="请输入动态类对象" />
          </Form.Item>
          <Form.Item
            label="门面名称"
            name="facade_title"
            tooltip="门面的中文名称，便于管理与展示"
          >
            <Input placeholder="请输入门面的中文名称，便于管理与展示" />
          </Form.Item>
          <Form.Item
            label="门面类名"
            name="facade_class"
            tooltip="若门面类需要存放在其他位置，可以输入完整门面类名"
          >
            <Input placeholder="请输入完整门面类名" />
          </Form.Item>
          <Form.Item
            label="门面路径"
            name="facade_path"
            tooltip="若命名空间与路径不对应，请输入门面类文件存放的路径"
          >
            <Input placeholder="请输入门面类文件存放的路径" />
          </Form.Item>
          <Form.Item
            label="门面类型"
            name="type_id"
            rules={[{ required: true, message: '请输入门面命名空间前缀' }]}
          >
            <Select style={{ width: 200 }} defaultValue="请选择门面类型">
              {facadeOption.map((facade)=>{
                return <Select.Option value={facade.id} key={facade.id}>{facade.title}</Select.Option>
              })}
            </Select>
          </Form.Item>
            <Form.Item
              label="强制覆盖"
              name="overwrite"
            >
              <Switch checkedChildren="开启" unCheckedChildren="关闭" />
            </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" loading={submitting} htmlType="submit" block>
              确认生成
            </Button>
          </Form.Item>
        </Form>
        <PageAlert
          message="使用帮助"
          description={<div>
            <p>动态对象：请输入附带完整命名空间的动态类对象，如<Text code>huikedev\dev_admin\service\dev\generate\FacadeService</Text></p>
            <p>门面类名：门面类默认会生成在动态对象同一目录的<Text code>facade</Text>目录，也可自行指定，如<Text code>huikedev\dev_admin\service\dev\generate\facade\FacadeService</Text></p>
            <p>门面路径：若门面类名或动态类名的命名空间和目录无法一一对应，请输入完整的门面路径，如<Text code>huikedev/dev_admin/src/service/dev/generate/facade</Text></p>
            <p><Text type="danger">门面路径在应用内遵守PSR-4规范的情况下无需填写，在通过命名空间无法找到指定文件的情况下需要手动指定</Text> </p>
          </div>}
          type="info"
        />
        </Space>
        </Card>
      </PageContainer>
    );
}

export default FacadeCreate
