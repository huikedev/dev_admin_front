import React, {useState} from "react";
import {useForm} from "antd/es/form/Form";
import {
  AutoComplete,
  Badge,
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  Result,
  Row,
  Select,
  Space,
  Tag,
  Typography
} from "antd";
import ProForm, {ProFormSelect} from '@ant-design/pro-form';
import {useRequest} from 'umi'
import publicStyles from "@/assets/styles/index.less";
import {FormListFieldData} from "antd/es/form/FormList";
import {setSpeedCreate} from "@/services/logic";
import {history} from "@@/core/history";
import PathName from "@/common/PathName";
import SpeedCreateResult from './SpeedCreateResult'
import {serviceReturnTypes,noticeTypes,SpeedActions} from "../data/Options";

const {Title} = Typography

interface ActionSpeedFormProps {
  controllerSimpleList:API.ControllerSimpleItem[] | [],
  moduleSimpleList:API.ModuleSimpleItem[] | []
}

const buildResult = (result:API.SpeedCreateResult[])=>{
  return (
    <Space direction="vertical" style={{width:'100%'}}>
      <Title level={5}>一键代码生成成功，请确认相关文件和备份文件！删除备份文件后，您可在控制器列表更新门面！</Title>
      <Space direction="vertical" style={{width:'100%'}}>
        <Row gutter={20} key="resultTitle" style={{textAlign:'center',marginBottom:20}}>
          <Col span={2}>
            方法名
          </Col>
          <Col span={2}>
            生成状态
          </Col>
          <Col span={4}>
            Exception
          </Col>
          <Col span={4}>
            Handler
          </Col>
          <Col span={4}>
            Service
          </Col>
          <Col span={4}>
            Logic
          </Col>
          <Col span={4}>
            Controller
          </Col>
        </Row>
        {result.map(value => {
          if(typeof value.result === 'string'){
            return  (
              <Row gutter={20} key={value.name} style={{textAlign:'center',marginBottom:20}}>
              <Col span={2}>
                {value.name}
              </Col>
              <Col span={2}>
                <Badge color="red" text="失败" />
              </Col>
              <Col span={20}>
                {String(value.result)}
              </Col>
            </Row>
            )
          }
          return (
            <Row gutter={20} key={value.name} style={{textAlign:'center',marginBottom:20}}>
              <Col span={2}>
                {value.name}
              </Col>
              <Col span={2}>
                <Badge color="green" text="成功" />
              </Col>
              <Col span={4}>
                <SpeedCreateResult key='exception' result={value.result.exception}/>
              </Col>
              <Col span={4}>
                <SpeedCreateResult key='handler' result={value.result.handler}/>
              </Col>
              <Col span={4}>
                <SpeedCreateResult key='service' result={value.result.service}/>
              </Col>
              <Col span={4}>
                <SpeedCreateResult key='logic' result={value.result.logic}/>
              </Col>
              <Col span={4}>
                <SpeedCreateResult key='controller' result={value.result.controller}/>
              </Col>
            </Row>
          )
        }
        )}
      </Space>
    </Space>

  )
}

const ActionSpeedForm : React.FC<ActionSpeedFormProps> = ({controllerSimpleList,moduleSimpleList}) => {
  const [currentControllers,setCurrentControllers] = useState<API.ControllerSimpleItem[] | []>([])
  // 操作成功后
  const [showResult,setShowResult] = useState<boolean>(false)
  const [submitResult,setSubmitResult] = useState<API.SpeedCreateResult[]|[]>([])
  const {run:submit,loading:submitting} = useRequest((params)=>setSpeedCreate(params),{
    manual:true,
    onSuccess:(res)=>{
      if(res){
        setSubmitResult(res)
        setShowResult(true)
      }
    }
  })
  const [form] = useForm()
  const { validateFields,setFieldsValue } = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    submit(values)
  }

  // 模块选择关联
  const handleModuleSelect = (moduleId:number)=>{
    setCurrentControllers([])
    setFieldsValue({controller_id:undefined})
    const subControllers = controllerSimpleList.filter((item)=>{
      return item.module_id === moduleId
    })
    if(subControllers.length > 0){
      setCurrentControllers(subControllers)
    }
  }

  // 表单列表

  const buildFormItem = (field:FormListFieldData)=>{
    const values = form.getFieldValue(['actions',field.fieldKey])
    return (
      <Row key={field.fieldKey} gutter={15}>
        {/* 是否创建 */}
        <Col span={2}>
          <Form.Item {...field} name={[field.fieldKey,'is_create']} valuePropName="checked">
            <Checkbox>创建</Checkbox>
          </Form.Item>
        </Col>
        {/* 方法名 */}
        <Col span={2}>
          <Form.Item name={[field.fieldKey,'action_name']}>
            <div style={{textAlign:"center"}}><Tag color={values.color}>{values.action_name}</Tag></div>
          </Form.Item>

        </Col>
        {/* 方法名称 */}
        <Col span={2}>
          <Form.Item name={[field.fieldKey,'action_title']}>
            <div style={{textAlign:"center"}}>{values.action_title}</div>
          </Form.Item>
        </Col>
        {/* 操作反馈 */}
        <Col span={3}>
          <ProFormSelect name={[field.fieldKey,'notice_type']} options={noticeTypes} />
        </Col>

        {/* 服务返回 */}
        <Col span={4}>
          <Form.Item
            name={[field.fieldKey,'service_return_type']}
          >
            <AutoComplete
              allowClear
              options={serviceReturnTypes}
              defaultValue={values.service_return_type}
            >
              <Input placeholder="服务类返回类型，可输入完整类名称"/>
            </AutoComplete>
          </Form.Item>
        </Col>
        {/* 提示消息 */}
        <Col span={5}>
          <Form.Item
            name={[field.fieldKey,'remind_msg']}
          >
          <Input placeholder="成功操作后的提示消息"/>
          </Form.Item>
        </Col>
        {/* 访问权限 */}
        <Col span={4}>
            <Row>
              <Col span={12}>
                <Form.Item name={[field.fieldKey,'is_private']} valuePropName="checked">
                <Checkbox style={{ lineHeight: '32px' }}>
                  登录
                </Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={[field.fieldKey,'is_need_permission']} valuePropName="checked">
                  <Checkbox style={{ lineHeight: '32px' }}>
                    鉴权
                  </Checkbox>
                </Form.Item>
              </Col>
            </Row>
        </Col>

      </Row>
    )
  }

  const buildModuleSelectOption = (module:API.ModuleSimpleItem)=>{
    return <Select.Option value={module.id} key={module.id}>
      <div className={publicStyles.flexAlignBetween}>
        <span>{module.title}</span>
        <span>{module.name}</span>
      </div>
    </Select.Option>
  }

  const resultModel = ()=>{
    if(!showResult){
      return null;
    }
    if(submitResult.length === 0){
      return <Result
        status="warning"
        title="未获取到创建结果，请确认后端代码"
      />
    }
    return (
      <Modal
        visible={showResult}
        title="系统提示"
        width="70%"
        footer={[
          <Button type="primary" onClick={()=>history.push(PathName.actions.list)}>确定</Button>
        ]}
        destroyOnClose
        closable={false}
      >
        {buildResult(submitResult)}
      </Modal>
    );
  }

  return (
    <div>
    <ProForm
      form={form}
      layout="horizontal"
      size="large"
      name="actionSpeedCreate"
      initialValues={{actions:SpeedActions}}
      onFinish={onValidateForm}
      submitter={{
        // 配置按钮文本
        searchConfig: {
          submitText: '确认一键生成',
        },
        // 配置按钮的属性
        resetButtonProps: {
          style: {
            // 隐藏重置按钮
            display: 'none',
          },
        },
        submitButtonProps: {
          loading:submitting,
          size:"middle"
        },
      }}
    >
      {/* 关联控制器 */}
      <Form.Item wrapperCol={{span:12}} label="关联控制器" style={{marginBottom:0}}>
        <Form.Item
          name="module_id"
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
          rules={[{required: true, message: '请选择关联模块'}]}
        >
          <Select placeholder="请选择关联模块" onChange={(value:number)=>handleModuleSelect(value)}>
            {(moduleSimpleList as API.ModuleSimpleItem[]).map((module)=> buildModuleSelectOption(module))}
          </Select>
        </Form.Item>

        <Form.Item
          name="controller_id"
          style={{ display: 'inline-block', width: 'calc(50% - 12px)', marginLeft:'24px' }}
          rules={[{required: true, message: '请选择关联控制器'}]}
        >
          <Select placeholder="请选择关联控制器">
            {(currentControllers as API.ControllerSimpleItem[]).map((controller:API.ControllerSimpleItem)=> (
              <Select.Option value={controller.id} key={controller.id}>
                <div className={publicStyles.flexAlignBetween}>
                  <span>{controller.title}</span>
                  <span>{controller.name}</span>
                </div>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form.Item>
      <Row style={{marginBottom:20}}>
        <Col span={2}>
          是否创建
        </Col>
        <Col span={2} style={{textAlign:'center'}}>
          方法名
        </Col>
        <Col span={2} style={{textAlign:'center'}}>
          名称
        </Col>
        <Col span={3} style={{textAlign:'center'}}>
          反馈类型
        </Col>
        <Col span={4} style={{textAlign:'center'}}>
          服务返回
        </Col>
        <Col span={5} style={{textAlign:'center'}}>
          提示消息
        </Col>
        <Col span={4}>
          权限设置
        </Col>
      </Row>
      <Form.List name="actions">
        {fields => fields.map(field => buildFormItem(field))}
      </Form.List>
    </ProForm>
  {resultModel()}
  </div>
  )
}

export default ActionSpeedForm
