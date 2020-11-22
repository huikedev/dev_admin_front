import React from "react";
import {PageContainer} from "@ant-design/pro-layout";
import {Form, Input, Button, Select, Space, Switch, Alert, Typography, message, Modal} from "antd";
import {facadeOption} from "@/common/OptionConfig";
import {GenerateRequest} from "@/services";
import { history } from 'umi'

const {Text} = Typography
const layout = {
  labelCol: { span: 2,offset: 2 },
  wrapperCol: { span: 15 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 6, },
};

export default class FacadeCreate extends React.Component<any, any>{
  state = {

  }


  async onFinish(values:any){
    const res = await GenerateRequest.facadeCreate({...values})
    if(res.success){
      message.success('门面生成成功')
      history.goBack();
    }else{
      Modal.error({
        content:res.errorMessage
      })
    }
  }

  render() {
    return (
      <PageContainer>
        <Space key="facade_content" direction="vertical" size={20} style={{width:'100%'}}>
        <Form
          {...layout}
          layout="horizontal"
          size="large"
          onFinish={async (res: any) => {
            await this.onFinish(res);
          }}
        >
          <Form.Item
            label="动态对象"
            name="origin_class"
            rules={[{ required: true, message: '请输入动态类对象' }]}
          >
            <Input placeholder="请输入动态类对象" />
          </Form.Item>
          <Form.Item
            label="门面前缀"
            name="prefix"
            rules={[{ required: true, message: '请输入门面命名空间前缀' }]}
          >
            <Input placeholder="请输入门面命名空间前缀" />
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
            <Button type="primary" htmlType="submit" block>
              确认生成
            </Button>
          </Form.Item>
        </Form>
        <Alert
          message="使用帮助"
          description={<div>
            <p>动态对象：请输入附带完整命名空间的动态类对象，如<Text code>huike\common\service\admin\generate\FacadeService</Text></p>
            <p>门面前缀：门面类的命名空间，生成时会自动追加<Text code>facade\动态类名</Text>，如<Text code>huike\common\service\admin\generate</Text></p>
            <p>如以上的输入会生成<Text code>huike\common\service\admin\generate\facade\FacadeService</Text></p>
          </div>}
          type="info"
        />
        </Space>
      </PageContainer>
    );
  }
}
