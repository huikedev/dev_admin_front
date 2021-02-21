import React, {useEffect, useState} from "react";
import {useForm} from "antd/es/form/Form";
import {AutoComplete, Button, Card, Checkbox, Col, Form, Input, Row, Select, Tooltip,Typography} from "antd";
import {useModel,useRequest} from 'umi'
import {ActionTitleList,  requestMethods, responseTypes} from "@/common/OptionConfig";
import {setSyncAction} from "@/services/logic";
import {toSnake} from "@/helpers";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {serviceReturnTypes,noticeTypes} from '../data/Options'

const {Text} = Typography

interface ActionSyncFormProps {
  actionData: API.UnSyncedActionItem,
  onSuccess: () => void
}



const ActionSyncForm: React.FC<ActionSyncFormProps> = props => {
  const [routePrefix,setRoutePrefix] = useState(``)
  const {submitting, setSubmitting} = useModel('useSubmitModel', model => ({
    submitting: model.submitting, setSubmitting: model.setSubmitting
  }))
  const [noticeTypeId,setNoticeTypeId] = useState<number>(0)
  const {run: submit, loading: syncSubmitting, fetches} = useRequest((params: object) => setSyncAction(params), {
    manual: true,
    fetchKey: () => String(props.actionData.index)
  })

  useEffect(() => {
    setSubmitting(syncSubmitting)
  }, [syncSubmitting])

  const [form] = useForm()
  const {validateFields, setFieldsValue} = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    // 合并表单与原始数据
    await submit({...props.actionData, ...values}).then(() => {
      props.onSuccess()
    })
  }

  const routeNameList:{label:string;value:string}[] = [{label:props.actionData.action_name,value:props.actionData.action_name}]
  if(/[A-Z]+/.test(props.actionData.action_name)){
    routeNameList.push({
      label:toSnake(props.actionData.action_name),
      value:toSnake(props.actionData.action_name)
    })
  }

  const handleIsPrivateChange = (e:CheckboxChangeEvent) => {
    if(!e.target.checked){
      setFieldsValue({
        is_need_permission:false
      })
    }
  }

  return (
    <Form
      colon={false}
      labelAlign="right"
      form={form}
      layout="horizontal"
      name="syncAction"
      initialValues={props.actionData}
      onFinish={onValidateForm}
    >
      <Card
        key={props.actionData.full_action_name}
        hoverable
        title={<span><Text mark><span
          style={{padding: '5px 8px'}}>{props.actionData.full_action_name}</span></Text></span>}
        extra={
          // 同时只允许一个请求进行
          <Button danger loading={syncSubmitting}
                  disabled={submitting && (!fetches.hasOwnProperty(String(props.actionData.index)) || !fetches[String(props.actionData.index)].loading)}
                  type="primary" htmlType="submit">同步</Button>
        }>
        <Row>
          {/* 控制器 */}
          <Col span={5}>
            <Form.Item
              labelCol={{span: 8}}
              wrapperCol={{span: 16}}
              label="控制器"
              name="controller_title"
            >
              <Input placeholder="控制器" disabled/>
            </Form.Item>
          </Col>
          {/* 方法名 */}
          <Col span={5}>
            <Form.Item
              labelCol={{span: 8}}
              wrapperCol={{span: 16}}
              label="方法名"
              name="action_name"
            >
              <Input placeholder="方法名" disabled/>
            </Form.Item>
          </Col>
          {/* 方法名称(中文) */}
          <Col span={5}>
            <Form.Item
              labelCol={{span: 8}}
              wrapperCol={{span: 16}}
              label="方法名称"
              name="action_title"
            >
              <AutoComplete
                allowClear
                options={ActionTitleList}
              >
              <Input placeholder="方法名称（中文）"/>
              </AutoComplete>
            </Form.Item>
          </Col>
          {/* 路由别名 */}
          <Col span={9}>
            <Form.Item
              labelCol={{span: 6}}
              label="路由别名"
              name="route_name"
            >
              <Tooltip color="#108ee9" trigger={['focus']} placement="topRight" overlayStyle={{minWidth:'280px'}}  title={<span>{props.actionData.controller_route_name}/{routePrefix}</span>}>
                  <AutoComplete
                    allowClear
                    options={routeNameList}
                    onSelect={(value)=>{
                      setRoutePrefix(value)
                    }}
                  >
                    <Input placeholder="路由别名" onChange={(e)=>{
                      setRoutePrefix(e.target.value)
                    }}
                    />
                  </AutoComplete>
              </Tooltip>
            </Form.Item>
          </Col>
          {/* 请求类型 */}
          <Col span={5}>
            <Form.Item
              labelCol={{span: 8}}
              wrapperCol={{span: 16}}
              label="请求类型"
              name="request_method"
              rules={[{required: true, message: '请选择请求类型'}]}
            >
              <Select placeholder="请求类型">
                {requestMethods.map((requestMethod) => {
                  return (
                    <Select.Option key={requestMethod.value} value={requestMethod.value}>{requestMethod.label}</Select.Option>
                  )
                })}
              </Select>
            </Form.Item>
          </Col>
          {/* 操作反馈 */}
          <Col span={5}>
            <Form.Item
              labelCol={{span: 8}}
              wrapperCol={{span: 16}}
              label="操作反馈"
              name="notice_type"
            >
              <Select placeholder="前端操作反馈" onSelect={(value ) => setNoticeTypeId(value as number)}>
                {noticeTypes.map((noticeType) => {
                  return (
                    <Select.Option key={noticeType.value} value={noticeType.value}>{noticeType.label}</Select.Option>
                  )
                })}
              </Select>
            </Form.Item>
          </Col>
          {/* 响应类型 */}
          <Col span={5}>
            <Form.Item

              labelCol={{span: 8}}
              wrapperCol={{span: 16}}
              label="响应类型"
              name="response_type"
            >
              <Select placeholder="请求响应类型">
                {responseTypes.map((responseType) => {
                  return (
                    <Select.Option key={responseType.value}
                                   value={responseType.value}>{responseType.label}</Select.Option>
                  )
                })}
              </Select>
            </Form.Item>
          </Col>
          {/* 服务返回 */}
          <Col span={9}>
            <Form.Item
              style={{marginBottom: 0}}
              labelCol={{span: 6}}
              wrapperCol={{span: 18}}
              label="服务返回"
              name="service_return_type"
            >
              <AutoComplete
                allowClear
                options={serviceReturnTypes}
                defaultValue={props.actionData.service_return_type}
              >
                <Input placeholder="服务类返回类型，可输入完整类名称"/>
              </AutoComplete>
            </Form.Item>
          </Col>
          {/* 权限设置 */}
          <Col span={5}>
            <Form.Item label="权限设置"  labelCol={{span: 8}}
                       wrapperCol={{span: 16}}>
              <Form.Item
                name="is_private"
                noStyle
                valuePropName="checked"
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              >
                <Checkbox onChange={(e)=>{
                  handleIsPrivateChange(e)
                }}>登录</Checkbox>
              </Form.Item>
              <Form.Item
                name="is_need_permission"
                noStyle
                valuePropName="checked"
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              >
                <Checkbox>鉴权</Checkbox>
              </Form.Item>
            </Form.Item>
          </Col>
          {/* 成功消息 */}
          <Col span={10}>
            <Form.Item
              labelCol={{span: 4}}
              wrapperCol={{span: 20}}
              label="成功消息"
              name="remind_msg"
              rules={[{required:noticeTypeId!==0,message:'请输入操作成功后的提示消息'}]}
            >
              <Input placeholder="请输入操作成功后的提示消息" disabled={noticeTypeId===0}/>
            </Form.Item>
          </Col>
          {/* 备注说明 */}
          <Col span={9}>
            <Form.Item
              labelCol={{span: 6}}
              wrapperCol={{span: 18}}
              label="备注说明"
              name="remark"
            >
              <Input placeholder="请输入备注说明"/>
            </Form.Item>

          </Col>
        </Row>
      </Card>
    </Form>
  )
}


export default ActionSyncForm
