import React, {useEffect, useState} from "react";
import {useForm} from "antd/es/form/Form";
import { Form, Input,  Modal,Typography} from "antd";
import { useRequest } from 'umi'
import {queryCheckException} from "@/services/logic";
import {AppValidateType} from "@/common/AppTypes";

const {Text} = Typography
const { Search } = Input
interface ControllerEditProps{
  controller:API.ControllerTableItem;
  visible:boolean;
  onSubmit:(values:object)=>void;
  onClose:()=>void;
  submitting:boolean;
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 15 },
};



const ControllerEdit:React.FC<ControllerEditProps> = props => {
  const [form] = useForm()
  const [codeValidate,setCodeValidate] = useState<AppValidateType>({msg:null})
  const [keyValidate,setKeyValidate] = useState<AppValidateType>({msg:null})

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


  const { validateFields,setFieldsValue } = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    props.onSubmit({...values,id:props.controller.id})
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



  if(!props.visible){
    return <></>
  }


  return (
    <Modal
      width="50%"
      visible={props.visible}
      mask
      confirmLoading={props.submitting}
      title={`编辑${props.controller.path_id===0?'目录':'控制器'}【${props.controller.controller_name}】`}
      onCancel={() => {
        props.onClose();
      }}
      onOk={onValidateForm}
      maskClosable={false}
      destroyOnClose
    >
      <Form
        form={form}
        {...layout}
        layout="horizontal"
        name="controllerEdit"
        initialValues={{...props.controller,module_title:`${props.controller.module.module_title}【app/controller/${props.controller.module.module_name}】`}}
      >
        <Form.Item
          label="关联模块"
          name="module_title"
        >
          <Input disabled/>
        </Form.Item>
        <Form.Item
          label="控制器类名"
          name="controller_name"
        >
          <Input  disabled/>
        </Form.Item>
        <Form.Item
          label="控制器名称"
          name="controller_title"
          tooltip="控制器名称仅用于前端展示和代码注释中，方便记忆与管理，若留空则沿用控制器类名"
        >
          <Input placeholder="请输入控制器名称（中文）" />
        </Form.Item>
        <Form.Item
          label="路由别名"
          name="route_name"
          tooltip="路由别名作用于访问路径，大小写敏感，若留空则沿用控制器类名"
        >
          <Input placeholder="请输入路由别名（非数字开头字母或数字）" />
        </Form.Item>
        <Form.Item
          label="异常Key"
          name="exception_key"
          tooltip="异常Key用于对Service进行定位，异常Key关联异常码，便于对异常进行快速定位"
          help={keyValidate.msg}
          validateStatus={keyValidate.status}
        >
          <Search enterButton loading={typeof checkExceptionFetches.key !=='undefined' && checkExceptionFetches.key.loading}  placeholder="异常Key，建议模块+控制器名+exception" onSearch={value => onExceptionSearch('key',value)} disabled={props.controller.path_id === 0}/>
        </Form.Item>
        <Form.Item
          label="基础异常码"
          name="exception_code"
          tooltip="基础异常码用于对业务异常码进行计算，基础异常码必须为整数，步进100"
          help={codeValidate.msg}
          validateStatus={codeValidate.status}
        >
          <Search enterButton loading={typeof checkExceptionFetches.code !=='undefined' && checkExceptionFetches.code.loading}  placeholder="请设置基础异常码" onSearch={value => onExceptionSearch('code',value)} disabled={props.controller.path_id === 0} />
        </Form.Item>
        <Form.Item
          label="默认异常提示"
          name="exception_msg"
          tooltip="默认异常提示为当前异常的默认message，通常情况不会使用"
        >
          <Input placeholder="请输入默认异常提示exception_msg" disabled={props.controller.path_id === 0} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ControllerEdit;
