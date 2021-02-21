import React, {ChangeEvent,  useState} from "react";
import {
  AutoComplete,
  Col,
  Form,
  Input,
  Row,
  Select,
  Checkbox,
  Button,
  Typography,
  Modal,
  Result,
  Badge,
  Table,
  Space
} from 'antd'
import { useRequest,history } from 'umi'
import {useForm} from "antd/es/form/Form";
import lodash from 'lodash'
import {ActionTitleList, requestMethods, responseTypes} from "@/common/OptionConfig";
import publicStyles  from '@/assets/styles/index.less'
import { toSnake} from "@/helpers";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {AppValidateType} from "@/common/AppTypes";
import {setActionCreate} from "@/services/logic";
import PathName from "@/common/PathName";
import {ColumnsType} from "antd/es/table";
import {serviceReturnTypes,noticeTypes} from '../data/Options'


const {Text,Title } = Typography

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 15 },
};
const tailLayout = {
  wrapperCol: { offset: 3, span: 6, },
};

interface ActionFormProps {
  id:number;
  actionData?:API.ActionTableItem,
  controllerSimpleList:API.ControllerSimpleItem[] | [],
  moduleSimpleList:API.ModuleSimpleItem[] | []
}

const ResultColumns:ColumnsType<API.ActionCreateResult> = [
  {
    title: '逻辑分层',
    dataIndex: 'location',
    align:'center',
    key: 'location',
  },
  {
    title: '生成操作',
    dataIndex: 'actionType',
    align:'center',
    key: 'actionType',
  },
  {
    title: '关联对象',
    dataIndex: 'class',
    key: 'class',
  },
  {
    title: '生成状态',
    dataIndex: 'status',
    align:'center',
    key: 'status',
    render:(res,record)=>{
      if(record.status === 'success'){
        return (<Badge color="green" text="生成成功" />)
      }
      if(record.status === 'none'){
        return (<Badge color="blue" text="未执行" />)
      }
      return (<Badge color="red" text="执行失败" />)
    }
  },
  {
    title: '系统消息',
    dataIndex: 'msg',
    key: 'msg',
  },
]
const buildResult = (result:API.ActionCreateResult[] | [])=>{
  if(result.length === 0){
    return <Result
      status="success"
      title="操作成功"
      subTitle="方法添加成功，但您未指定生成，您还可在方法列表页生成！"
    />
  }
  return (
    <Space direction="vertical" style={{width:'100%'}}>
      <Title level={5}>代码生成成功，请确认相关文件和备份文件！</Title>
      <Table dataSource={result} rowKey="location" columns={ResultColumns} pagination={false} bordered/>
    </Space>

  )
}

const Index:React.FC<ActionFormProps> = props => {
  // 模块和控制器列表
  const {moduleSimpleList,controllerSimpleList} = props
  // 当前选中模块下的所有控制器
  const [currentControllers,setCurrentControllers] = useState<API.ControllerSimpleItem[] | []>([])
  // 方法名称校验结果 用于检测方法名是否符合规范
  const [checkActionName,setCheckActionName] = useState<AppValidateType>({msg:null})
  // 根据方法名自动生成的路由列表
  const [routeSuggestion,setRouteSuggestion] =  useState<{label:string;value:string}[] | []>([])
  // 用于确认提示消息是否必填
  const [noticeTypeId,setNoticeTypeId] = useState<number>(0)
  // 操作成功后
  const [showResult,setShowResult] = useState<boolean>(false)
  const [submitResult,setSubmitResult] = useState<API.ActionCreateResult[]|[]>([])
  const {run:actionCreateSubmit,loading:actionCreateSubmitting} = useRequest((params:object)=>setActionCreate(params),{
    manual:true,
    debounceInterval:200,
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
    actionCreateSubmit({...values,id:props.id}).catch((e)=>{
      Modal.error({
        content:e.message
      })
    })
  }

  // 模块选择关联
  const handleModuleSelect = (moduleId:number)=>{
    setCurrentControllers([])
    setFieldsValue({controller_id:undefined})
    const subControllers = controllerSimpleList.filter((item)=>{
      return item.module_id === moduleId
    })
    const key = lodash.findIndex(moduleSimpleList,(v)=>{return v.id === moduleId})
    if(key > -1){
      setCurrentControllers(subControllers)
    }
  }
  // 路由命名建议
  const handleActionNameInput = (e:ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    const isCorrectActionName = /^[a-zA-Z]/.test(value)
    if(!isCorrectActionName){
      setCheckActionName({status:"error",msg:'请输入以字母开头的方法名，推荐小驼峰命名法：如littleCamelCase'})
    }else{
      setCheckActionName({status:"success",msg:(<Text type="success">方法命名正确！</Text>)})
      const routeList = [{
        label:value,
        value
      }]
      if(/[A-Z]/.test(value)){
        routeList.push({
          label:toSnake(value),
          value:toSnake(value)
        })
      }
      setRouteSuggestion(routeList)
    }
  }
  // 鉴权设置 跟随取消选中
  const handleIsPrivateChange = (e:CheckboxChangeEvent) => {
    if(!e.target.checked){
      setFieldsValue({
        is_need_permission:false
      })
    }
  }
  // 生成设置 跟随取消选中
  const handleGenerateChange = (e:CheckboxChangeEvent) =>{
    if(!e.target.checked){
      setFieldsValue({
        is_create_service:false
      })
    }
  }

  const resultModel = ()=>{
    if(!showResult){
      return null;
    }
    return (
      <Modal
        visible={showResult}
        title="系统提示"
        width={submitResult.length > 0 ? '75%' : '40%'}
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
    <Form
      form={form}
      {...layout}
      layout="horizontal"
      size="large"
      name="actionDiyCreate"
      onFinish={onValidateForm}
      initialValues={{response_type:props.id===0?1:props.actionData?.service_return_type}}
    >
      {/* 关联控制器 */}
      <Form.Item label="关联控制器" style={{marginBottom:0}}>
          <Form.Item
            name="module_id"
            style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
            rules={[{required: true, message: '请选择关联模块'}]}
          >
            <Select placeholder="请选择关联模块" onChange={(value:number)=>handleModuleSelect(value)}>
              {(moduleSimpleList as API.ModuleSimpleItem[]).map( (module:API.ModuleSimpleItem)=> (
                <Select.Option value={module.id} key={module.id}>
                  <div className={publicStyles.flexAlignBetween}>
                    <span>{module.title}</span>
                    <span>{module.name}</span>
                  </div>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="controller_id"
            style={{ display: 'inline-block', width: 'calc(50% - 12px)', marginLeft:'24px' }}
            rules={[{required: true, message: '请选择关联控制器'}]}
          >
            <Select placeholder="请选择关联控制器" >
              {(currentControllers as API.ControllerSimpleItem[]).map( (controller:API.ControllerSimpleItem)=> (
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
      {/* 方法名 */}
        <Form.Item label="方法名" name="action_name"
                   validateStatus={checkActionName.status} help={checkActionName.msg}
                   hasFeedback
                   rules={[{required: true, message: '请输入方法名'}]}
        >
          <Input placeholder="方法名(即function名)" onChange={(e)=>handleActionNameInput(e)}/>
        </Form.Item>
      {/* 方法名称(中文) */}
        <Form.Item label="方法名称" name="action_title" tooltip="用于代码注释和前端展示" rules={[{required: true, message: '请输入方法名称'}]}>
          <AutoComplete
            allowClear
            options={ActionTitleList}
          >
            <Input placeholder="方法名称（中文）"/>
          </AutoComplete>
        </Form.Item>
      {/* 请求类型 */}
      <Form.Item label="请求方式" name="request_method" rules={[{required: true, message: '请选择请求类型'}]} tooltip="用于对请求进行限制，支持TP路由的6中类型" >
        <Select placeholder="请选择请求方式">
          {requestMethods.map((requestMethod) => {
            return (
              <Select.Option key={requestMethod.value} value={requestMethod.value}>{requestMethod.label}</Select.Option>
            )
          })}
        </Select>
      </Form.Item>
      {/* 路由别名 */}
      <Form.Item label="路由别名" name="route_name" tooltip="用于生成逻辑方法的访问路由，对大小写敏感">
          <AutoComplete
            allowClear
            options={routeSuggestion}
            onSelect={(value)=>{
              setFieldsValue({route_name:value})
            }}
          >
            <Input placeholder="路由别名" />
          </AutoComplete>
      </Form.Item >

      {/* 操作反馈 */}
        <Form.Item label="操作反馈" name="notice_type" tooltip="指请求成功后的反馈，分为无反馈、Message、Notification、Dialog、Page">
          <Select placeholder="前端操作反馈" onSelect={value => setNoticeTypeId(Number(value))}>
            {noticeTypes.map((noticeType) => {
              return (
                <Select.Option key={noticeType.value} value={noticeType.value}>{noticeType.label}</Select.Option>
              )
            })}
          </Select>
        </Form.Item>
      <Form.Item
        label="成功消息"
        name="remind_msg"
        tooltip="当操作反馈不为静默模式时返回给前端的msg文字消息"
        rules={[{required:noticeTypeId!==0,message:'请输入操作成功后的提示消息'}]}
      >
        <Input placeholder="请输入操作成功后的提示消息" disabled={noticeTypeId===0}/>
      </Form.Item>
      {/* 响应类型 */}
        <Form.Item label="响应类型" name="response_type" tooltip="用于对响应进行限制，默认仅支持JSON、HTML、图片、数据流、下载">
          <Select placeholder="请求响应类型" value={props.id===0?0:props.actionData?.service_return_type}>
            {responseTypes.map((responseType) => {
              return (
                <Select.Option key={responseType.value}
                               value={responseType.value}>{responseType.label}</Select.Option>
              )
            })}
          </Select>
        </Form.Item>
      {/* 服务返回 */}
        <Form.Item label="服务返回" name="service_return_type" tooltip="指Service类的返回类型，会在生成代码时使用，通常也是请求的响应类型" initialValue={props.id === 0 ? 'mixed' : props.actionData?.service_return_type}>
          <AutoComplete
            allowClear
            options={serviceReturnTypes}
          >
            <Input placeholder="服务类返回类型，可输入完全类名称"/>
          </AutoComplete>
        </Form.Item>
      {/* 备注信息 */}
      <Form.Item
        label="备注信息"
        name="remark"
        tooltip="备注信息会在代码注释和前端展示"
      >
        <Input placeholder="备注信息会在代码注释和前端展示" />
      </Form.Item>
      {/* 访问权限 */}
      <Form.Item label="访问权限" tooltip="指当前方法的访问权限，登录是登录后访问，鉴权指需要特定角色权限访问">
        <Row gutter={20}>
          <Col span={8}>
            <Form.Item
              noStyle
              name="is_private"
              valuePropName="checked"
              initialValue
            >
              <Checkbox
                onChange={(e)=>{
                handleIsPrivateChange(e)
              }}>用户登录</Checkbox>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              noStyle
              name="is_need_permission"
              valuePropName="checked"
              initialValue
            >
              <Checkbox>角色鉴权</Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>

      {/* 生成选项 */}
      <Form.Item label="生成选项" tooltip="是否由系统生成响应的类和方法">
        <Row gutter={20}>
          <Col span={8}>
            <Form.Item
              noStyle
              name="is_create_logic"
              valuePropName="checked"
              initialValue
            >
              <Checkbox
                onChange={(e)=>{
                  handleGenerateChange(e)
                }}>生成逻辑层</Checkbox>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              noStyle
              name="is_create_service"
              valuePropName="checked"
              initialValue
            >
              <Checkbox>生成服务层</Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button loading={actionCreateSubmitting} size="middle" type="primary" htmlType="submit">确认提交</Button>
      </Form.Item>
    </Form>
  {resultModel()}
  </div>
  )
}

export default Index
