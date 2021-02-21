import React, {useEffect} from "react";
import {useForm} from "antd/es/form/Form";
import {AutoComplete, Button, Card, Col, Form, Input, Row, Typography} from "antd";
import {useModel} from "@@/plugin-model/useModel";
import {useRequest} from "@@/plugin-request/request";
import { setSyncControllers} from "@/services/logic";
import {toSeparate, toSnake} from "@/helpers";

const {Text} = Typography
interface ControllerSyncFormProps {
  controller:API.UnSyncedControllerItem,
  onSuccess: () => void;
}

const ControllerSyncForm: React.FC<ControllerSyncFormProps> = props => {
  const {submitting, setSubmitting} = useModel('useSubmitModel', model => ({
    submitting: model.submitting, setSubmitting: model.setSubmitting
  }))
  const {run: submit, loading: syncSubmitting, fetches} = useRequest((params: object) => setSyncControllers(params), {
    manual: true,
    fetchKey: () => String(props.controller.index)
  })

  useEffect(() => {
    setSubmitting(syncSubmitting)
  }, [syncSubmitting])

  const [form] = useForm()
  const {validateFields, setFieldsValue} = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    // 合并表单与原始数据
    await submit({...props.controller, ...values}).then(() => {
      props.onSuccess()
    })
  }
  const routeList = [{
    label:props.controller.name,
    value:props.controller.name,
  }]
  routeList.push({
    label:toSnake(props.controller.name),
    value:toSnake(props.controller.name)
  })
  const exceptionKey = `${props.controller.module_name } ${toSeparate(props.controller.name)  } exception`
  return (
    <Form
      colon={false}
      labelAlign="right"
      form={form}
      layout="horizontal"
      name="syncController"
      initialValues={{...props.controller,exception_msg:'系统错误，请稍后再试',exception_key:exceptionKey}}
      onFinish={onValidateForm}
    >
      <Card
        key={props.controller.full_name}
        hoverable
        title={<span><Text mark><span
          style={{padding: '5px 8px'}}>{props.controller.full_name}</span></Text></span>}
        extra={
          // 同时只允许一个请求进行
          <Button danger loading={syncSubmitting}
                  disabled={submitting && (!fetches.hasOwnProperty(String(props.controller.index)) || !fetches[String(props.controller.index)].loading)}
                  type="primary" htmlType="submit">同步</Button>
        }>
        <Row>
          {/* 模块 */}
          <Col span={6}>
            <Form.Item
              labelCol={{span: 8}}
              wrapperCol={{span: 16}}
              label="关联模块"
              name="module_title"
            >
              <Input disabled/>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              labelCol={{span: 8}}
              wrapperCol={{span: 16}}
              label="控制器目录"
              name="path"
            >
              <Input disabled/>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              labelCol={{span: 8}}
              wrapperCol={{span: 16}}
              label="控制器类名"
              name="name"
            >
              <Input disabled/>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              labelCol={{span: 8}}
              wrapperCol={{span: 16}}
              label="控制器名称"
              name="controller_title"
              required
            >
              <Input placeholder="请输入控制器名称"/>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              labelCol={{span: 8}}
              wrapperCol={{span: 16}}
              label="路由别名"
              name="route_name"
              required
            >
              <AutoComplete
                allowClear
                options={routeList}
                onSelect={(value)=>{
                  setFieldsValue({route_name:value})
                }}
              >
                <Input placeholder="路由别名" />
              </AutoComplete>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              labelCol={{span: 8}}
              wrapperCol={{span: 16}}
              label="异常Key"
              name="exception_key"
              required
            >
              <Input allowClear placeholder="请输入基础异常Key"/>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              labelCol={{span: 8}}
              wrapperCol={{span: 16}}
              label="异常Code"
              name="exception_code"
              required
            >
              <Input placeholder="基础异常Code，可输入++或--"/>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              labelCol={{span: 8}}
              wrapperCol={{span: 16}}
              label="错误提示"
              name="exception_msg"
              required
            >
              <Input placeholder="请输入错误提示"/>
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  )
}

export default ControllerSyncForm
