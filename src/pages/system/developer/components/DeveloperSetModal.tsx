import React, {useEffect, useState} from "react";
import {useRequest} from "umi";
import {getPositionList, setDeveloperCreate, setDeveloperUpdate} from "@/services/user";
import {useForm} from "antd/es/form/Form";
import {AppSetModalType} from "@/common/AppTypes";
import {PageAlert, PageException, PageLoading} from "@/huikedev";
import {Form, Input, Modal, Select, Space, Typography} from "antd";

const {Text} = Typography
interface DeveloperSetModalProps extends AppSetModalType<API.DeveloperItem>{

}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 15 },
};

const DeveloperSetModal: React.FC<DeveloperSetModalProps> = props => {
  const [btnLocking,setBtnLocking] = useState(false)
  const {data:positionList,loading,error} = useRequest(()=>getPositionList())
  const {run:developerCreate,loading:developerCreateRunning} = useRequest((params)=>setDeveloperCreate(params),{
    manual:true,
    debounceInterval:500,
    onSuccess:()=>props.onSuccess()
  })
  const {run:developerUpdate,loading:developerUpdateRunning} = useRequest((params)=>setDeveloperUpdate(params),{
    manual:true,
    debounceInterval:500,
    onSuccess:()=>props.onSuccess()
  })
  useEffect(()=>{
    if(developerCreateRunning || developerUpdateRunning){
      setBtnLocking(true)
    }
  },[developerCreateRunning,developerUpdateRunning])
  const [form] = useForm()
  const { validateFields } = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    console.log(props.dataItem)
    if(props.dataItem){
      developerUpdate({...values,id:props.dataItem.id}).then(()=>{
        setBtnLocking(false)
      })
    }else{
      developerCreate({...values,id:0}).then(()=>{
        setBtnLocking(false)
      })
    }

  }

  const isAdd = typeof props.dataItem === 'undefined'
  const buildContent = ()=>{
    if(!props.visible){
      return <></>
    }
    if(loading){
      return <PageLoading />
    }
    if(error){
      return <PageException title={error.message} status={500} />
    }
    return <Space direction="vertical" style={{width:'100%'}}>
      <PageAlert message={<div style={{color:'red'}}><p>岗位信息可在后端<Text code>config/huike_dev_admin.php</Text>中添加</p></div>} type="error"/>
      <Form
        form={form}
        {...layout}
        layout="horizontal"
        name="controllerDelete"
        initialValues={props.dataItem}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: isAdd, message: '请输入开发者用户名' }]}
        >
          <Input disabled={!isAdd} placeholder="请输入开发者用户名"/>
        </Form.Item>
        <Form.Item
          label="登录密码"
          name="password"
          rules={[{ required: isAdd, message: '请输入开发者密码' }]}
        >
          <Input placeholder="若不修改请留空"/>
        </Form.Item>
        <Form.Item
          label="所属岗位"
          name="position_id"
          rules={[{ required: true, message: '请选择开发者岗位' }]}
        >
          <Select placeholder="请选择开发者岗位">
            {(positionList as Array<API.PositionItem>).map((position)=>{
              return <Select.Option value={position.id} key={position.id}>{position.title}</Select.Option>
            })}
          </Select>
        </Form.Item>
      </Form>
    </Space>
  }
  return (
    <Modal
      width="40%"
      visible={props.visible}
      mask
      confirmLoading={btnLocking}
      title={props.dataItem ? `修改【${props.dataItem.username}】开发者信息`:'添加开发者'}
      onCancel={() => {
        props.onClose();
      }}
      onOk={onValidateForm}
      maskClosable={false}
      destroyOnClose
    >
      {buildContent()}
    </Modal>
  );
}

export default DeveloperSetModal
