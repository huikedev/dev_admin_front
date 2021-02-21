import React, {ChangeEvent, useEffect, useState} from "react";
import {AutoComplete, Button, Checkbox, Form, Input, Select, Space, Typography} from "antd";
import {toSnake} from "@/helpers";
import {PageAlert} from "@/huikedev";
import {useRequest} from "@@/plugin-request/request";
import { queryCheckException, setControllerCreate} from "@/services/logic";
import {AppValidateType} from "@/common/AppTypes";
import {useForm} from "antd/es/form/Form";
import {history} from "@@/core/history";
import PathName from "@/common/PathName";
import lodash from "lodash";

const {Text} = Typography
const { Search } = Input
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 6, },
};

interface CreateFormProps {
  moduleList:API.ModuleSimpleItem[],
  pathList:API.ControllerPathSimpleItem[]
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const [selectedModule,setSelectedModule] = useState<API.ModuleSimpleItem|undefined>()
  const [selectedPath,setSelectedPath] = useState<API.ControllerPathSimpleItem|undefined>()
  const [currentPathList,setCurrentPathList] = useState<API.ControllerPathSimpleItem[]|[]>([])
  const [controller,setController] = useState<string>('')
  const [routePrefix,setRoutePrefix] = useState<string>('')

  // 提交表单
  const{run:submit,loading:submitting} = useRequest((params:object)=>setControllerCreate(params),{
    manual:true
  })
  const [codeValidate,setCodeValidate] = useState<AppValidateType>({msg:null})
  const [keyValidate,setKeyValidate] = useState<AppValidateType>({msg:null})
  // 控制器名称校验结果 用于检测控制器名是否符合规范
  const [checkControllerName,setCheckControllerName] = useState<AppValidateType>({msg:null})
  // 根据控制器名自动生成的路由列表
  const [routeSuggestion,setRouteSuggestion] =  useState<{label:string;value:string}[] | []>([])
  const {run:checkException,fetches:checkExceptionFetches,data:checkExceptionData} = useRequest((params:{type:'code'|'key';value:string|number})=>queryCheckException(params),{
    manual:true,
    debounceInterval:500,
    fetchKey:(p)=>p.type
  })

  useEffect(()=>{
    if(checkExceptionData && checkExceptionData.type ==='code'){
      const codeStatus = checkExceptionData.result === false ? 'error':'success'
      const codeMsg = checkExceptionData.result === false ? '基础异常码重复，请重新设置':<Text type="success">验证通过，可以使用！</Text>;
      setCodeValidate({msg:codeMsg,status:codeStatus})
    }
    if(checkExceptionData && checkExceptionData.type ==='key'){
      const keyStatus = checkExceptionData.result === false ? 'error':'success'
      const keyMsg = checkExceptionData.result === false ? '异常key重复，请重新设置':<Text type="success">验证通过，可以使用！</Text>;
      setKeyValidate({msg:keyMsg,status:keyStatus})
    }
  },[checkExceptionData])
  const [form] = useForm()
  useEffect(()=>{
    let routeName = ''
    let servicePath = 'huike/'
    if(selectedModule){
      if(selectedModule.extend !==null && selectedModule.extend.root_path.length > 0){
        servicePath = `${selectedModule.extend.root_path  }/service/`
      }else{
        servicePath +=`${selectedModule.name}/service/`
      }
      if(selectedModule.domain.length === 0){
        routeName +=`${selectedModule.route}/`
      }else{
        routeName += `http(s)://${selectedModule.domain[0]}/`
      }
    }
    if(selectedPath && selectedPath.id > 0){
        servicePath +=`${selectedPath.controller_name}/`
    }else{
      servicePath +='common/'
    }
    if(selectedPath && selectedPath.route_name.length > 0){
      routeName += `${selectedPath.route_name }/`

    }
    form.setFieldsValue({service_path:servicePath})
    setRoutePrefix(routeName)
    if(controller.length > 0){
      const routeList = [{
        label:controller,
        value:controller,
      }]
      routeList.push({
        label:toSnake(controller),
        value:toSnake(controller)
      })
      setRouteSuggestion(routeList)
    }

  },[selectedModule,selectedPath,controller])


  const { validateFields,setFieldsValue } = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    await submit(values).then(()=>{
      history.push(PathName.controllers.list)
    })
  }

  const onModuleSelect = (value:number)=>{
    const key = lodash.findIndex(props.moduleList,(v)=>{ return v.id === value})
    if(key > -1){
      const pathList = props.pathList.filter((v)=>{return v.module_id === value})
      setSelectedModule(props.moduleList[key]);
      setCurrentPathList(pathList)
    }
  }

  const onExceptionSearch = (type:'code'|'key',value:string)=>{
    if(type==='code'){
      if(Number(value) < 100 && Number(value) > -99){
        setCodeValidate({msg:(<Text type="danger">基础异常码必须大于100或小于-100</Text>),status:'error'})
        return;
      }

      const code:number = Math.floor(Number(value)/100)*100;
      setFieldsValue({exception_code:code})
      checkException({
        type:'code',
        value:code
      })
    }else{
      checkException({
        type:'key',
        value
      })
    }
  }

  const onPathSelect = (value:number) =>{
    const key = lodash.findIndex(currentPathList,(v)=>{ return v.id === value})
    if(key > -1){
      setSelectedPath(currentPathList[key])
    }
  }



  const handleControllerNameChange = (e:ChangeEvent<HTMLInputElement>)=>{
    const {value} = e.target
    const isCorrectControllerName = /^([A-Z][a-zA-Z]+)$/.test(e.target.value)
    if(!isCorrectControllerName){
      setCheckControllerName({status:"error",msg:'请按大驼峰命名法：如BigCamelCase'})
      return false;
    }
    setController(value)
    setCheckControllerName({status:"success",msg:(<Text type="success">控制器命名正确！</Text>)})
    return true
  }

  return (
      <Space key="controller_create" direction="vertical" size={20} style={{width:'100%'}}>
        <PageAlert closable message={<div>
          <p>若未指定控制器目录，则会生成一个对应模块的service目录下生成<Text code>common</Text>目录统一存放</p>
          <p><Text type="danger">添加控制后并不会实时生成控制器，而是仅在使用系统生成逻辑分层时才会生成控制器</Text></p>
          <p>异常Key和异常Code在提交前请查询是否唯一，建议使用<Text type="danger">模块名</Text>+<Text type="danger">空格</Text>+<Text type="danger">小写控制器名</Text>+<Text type="danger">空格</Text>+<Text type="danger">exception</Text>作为异常key</p>
        </div>} />
        <Form
          form={form}
          {...layout}
          layout="horizontal"
          size="large"
          name="controllerCreate"
          onFinish={onValidateForm}
          initialValues={{exception_msg:'系统错误，请稍候再试'}}
        >
          <Form.Item
            label="控制器路径"
            style={{marginBottom:0}}
          >
            <Form.Item
              name="module_id"
              rules={[{ required: true, message: '请选择关联模块' }]}
              style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
            >
              <Select placeholder="选择模块" onSelect={(value )=>onModuleSelect(value as number)
              }>
                {
                  props.moduleList.map((module)=>{
                    return <Select.Option value={module.id} key={module.name}>{module.title}【{module.name}】</Select.Option>
                  })
                }
              </Select>
            </Form.Item>
            <Form.Item name="path_id" rules={[{ required: true, message: '请选择控制器目录' }]} style={{ display: 'inline-block', width: 'calc(50% - 12px)',marginLeft:'24px' }}>
              <Select placeholder="选择控制器目录" onSelect={(value )=>onPathSelect(value as number)
              }>
                {
                  (currentPathList as Array<API.ControllerPathSimpleItem>).map((path)=>{
                    return <Select.Option value={path.id} key={String(path.id) + String(path.module_id)}>{path.controller_title}【{path.controller_name}】</Select.Option>
                  })
                }
              </Select>
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="控制器类名"
            name="controller_name"
            validateStatus={checkControllerName.status} help={checkControllerName.msg}
            hasFeedback
            tooltip="控制器类名请采用大驼峰命名规范命名"
            rules={[{ required: true, message: '请输入控制器类名' }]}
          >
            <Input placeholder="请输入控制器类名（大驼峰命名：OneTwo）" onChange={(e)=>handleControllerNameChange(e)}/>
          </Form.Item>

          <Form.Item
            label="控制器名称"
            name="controller_title"
            tooltip="控制器名称仅用于前端展示和代码注释中，方便记忆与管理，若留空则沿用控制器类名"
            rules={[{ required: true, message: '请输入控制器名称' }]}
          >
            <Input placeholder="请输入控制器名称（中文）" />
          </Form.Item>
          <Form.Item
            label="路由别名"
            name="route_name"
            tooltip="路由别名作用于访问路径，大小写敏感，若留空则沿用控制器类名"
            rules={[{ required: true, message: '请输入路由别名' }]}
          >
            <AutoComplete
              allowClear
              options={routeSuggestion}
              onSelect={(value)=>{
                setFieldsValue({route_name:value})
              }}
            >
              <Input addonBefore={routePrefix} placeholder="路由别名" />
            </AutoComplete>
          </Form.Item>
          <Form.Item
            label="服务代理模式"
            name="is_static_service"
            valuePropName="checked"
            tooltip="Service默认采用Facade代理模式，您也可以使用静态代理模式"
          >
            <Checkbox>使用静态代理</Checkbox>
          </Form.Item>
          <Form.Item
            label="Service目录"
            name="service_path"
            tooltip="Service目录用户对Service进行分类，一般按照业务来进行划分"
          >
            <Input disabled placeholder="Service所在目录" />
          </Form.Item>
          <Form.Item
            label="异常Key"
            name="exception_key"
            tooltip="异常Key用于对Service进行定位，异常Key关联异常码，便于对异常进行快速定位"
            help={keyValidate.msg}
            validateStatus={keyValidate.status}
            rules={[{ required: true, message: '请输入异常Key' }]}
          >
            <Search enterButton loading={typeof checkExceptionFetches.key !=='undefined' && checkExceptionFetches.key.loading}  placeholder="异常Key，建议模块+控制器名+exception" onSearch={value => onExceptionSearch('key',value)} />
          </Form.Item>
          <Form.Item
            label="基础异常码"
            name="exception_code"
            tooltip="基础异常码用于对业务异常码进行计算，基础异常码必须为整数，步进100"
            help={codeValidate.msg}
            validateStatus={codeValidate.status}
            rules={[{ required: true, message: '请输入基础异常码' }]}
          >
            <Search enterButton loading={typeof checkExceptionFetches.code !=='undefined' && checkExceptionFetches.code.loading}  placeholder="请设置基础异常码" onSearch={value => onExceptionSearch('code',value)} />
          </Form.Item>
          <Form.Item
            label="默认异常提示"
            name="exception_msg"
            tooltip="默认异常提示为当前异常的默认message，通常情况不会使用"
            rules={[{ required: true, message: '请输入默认异常提示' }]}
          >
            <Input placeholder="请输入默认异常提示exception_msg" />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" loading={submitting} htmlType="submit" block>
              确认生成
            </Button>
          </Form.Item>
        </Form>
      </Space>
  )
}

export default CreateForm
