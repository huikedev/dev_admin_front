import React, { useState} from "react";
import {Checkbox, Col, Form, Input, Row, Select, Button, Space} from "antd";
import {modelBaseExtends} from "@/common/OptionConfig";
import {useRequest} from 'umi'
import lodash from 'lodash'
import {PageAlert, PageException, PageLoading} from "@/huikedev";
import {getExtendModules} from "@/services/logic";

const layout = {
  labelCol: {span: 2, offset: 2},
  wrapperCol: {span: 16},
};

const tailLayout = {
  wrapperCol: { offset: 4,span: 6,},
};

export interface ModelBaseFormState{
  id:number;
  model_full_name:string;
  model_name:string;
  table_name:string;
  pk_name:string;
  collection_name:string;
  remark:string;
  base_model_id:number;
  is_json_assoc:boolean;
  addon_fields:string[];
  is_create_model:boolean;
}

interface ModelBaseFormProps{
  data:ModelBaseFormState;
  onSubmit:(values:object)=>void;
  submitting:boolean;
}

const Index:React.FC<ModelBaseFormProps> = props => {
  const { data } = props;
  const {data:extendModules,loading:extendModulesLoading,error:extendModulesError}:{data:API.ModuleWithExtend[] | [],loading:boolean,error:Error | undefined} = useRequest(()=>getExtendModules())
  const [modelNamePrefix,setModelNamePrefix] = useState<string>('huike\\common\\model\\')
  const [form] = Form.useForm();
  const { validateFields } = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    props.onSubmit(values)
  }

  if (extendModulesError) {
    return <PageException title={extendModulesError.message} status={500} />;
  }
  if (extendModulesLoading) {
    return <PageLoading />;
  }

  const onNamespaceSelect = (value:number)=>{
    if(value>0){
      const key =lodash.findIndex(extendModules,(v)=>{return v.id === value})
      if(key > -1 && extendModules[key].extend_module!==null){
        // @ts-ignore
        setModelNamePrefix(`${extendModules[key].extend_module.root_namespace}\\common\\model\\`)
      }
    }else{
      setModelNamePrefix('huike\\common\\model\\')
    }

  }

  return (
    <Space  key="model_create" direction="vertical" size={20} style={{width: '100%'}}>
      <PageAlert message={<div>
        <p>由于PHP通过命名空间无法确定具体的路径，所以非app和huike命名空间前缀的模型需要指定模型存放的目录</p>
      </div>} />

    <Form
      {...layout}
      form={form}
      name="modelBase"
      layout="horizontal"
      size="large"
      initialValues={{...data}}
    >
      <Form.Item
        label="模型名称"
        style={{marginBottom:0}}
      >
        <Form.Item
          name="module_id"
          style={{ display: 'inline-block', width: 'calc(25% - 4px)'}}
          rules={[{ required: true, message: '请选择模型关联模块' }]}
        >
          <Select placeholder="关联模块" onSelect={value=>onNamespaceSelect(value as number)}>
            <Select.Option value="0">应用模型</Select.Option>
            {(extendModules as Array<API.ModuleWithExtend>).map((value)=>{
              return <Select.Option value={value.id}>{value.module_title}</Select.Option>
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="model_name"
          style={{ display: 'inline-block', width: 'calc(75% - 4px)', marginLeft: '8px' }}
          rules={[{ required: true, message: '请输入模型名称' }]}
        >
        <Input placeholder="请输入模型名称" addonBefore={modelNamePrefix} disabled={data.id>0}/>
        </Form.Item>
      </Form.Item>
      <Form.Item
        label="模型基类"
        name="base_model_id"
        rules={[{required: true, message: '请选择模型基类'}]}
      >
        <Select style={{width: '100%'}} disabled={data.id>0}>
          {modelBaseExtends.map((model: API.ModelSimpleListItem,index:number) => {
            return <Select.Option value={index}
                                  key={model.model_namespace}>{model.model_name}</Select.Option>
          })}
        </Select>
      </Form.Item>
      <Form.Item
        label="对应表名"
        name="table_name"
      >
        <Input placeholder="模型对应的表名，默认为模型名称的Snake命名"/>
      </Form.Item>
      <Form.Item
        label="主键名称"
        name="pk_name"
      >
        <Input placeholder="模型主键，默认为id"/>
      </Form.Item>
      <Form.Item
        label="数据库连接"
        name="collection_name"
      >
        <Input placeholder="模型的数据库连接，默认为database.default配置"/>
      </Form.Item>
      <Form.Item
        label="模型备注"
        name="remark"
      >
        <Input placeholder="请输入模型备注"/>
      </Form.Item>
      <Form.Item name="addon_fields" label="附加字段">
        <Checkbox.Group style={{width: '100%'}}>
          <Row>
            <Col span={6}>
              <Checkbox value="update_time" style={{lineHeight: '40px'}}>更新时间</Checkbox>
            </Col>
            <Col span={6}>
              <Checkbox value="create_time" style={{lineHeight: '40px'}}>创建时间</Checkbox>
            </Col>
            <Col span={6}>
              <Checkbox value="delete_time" style={{lineHeight: '40px'}}>软删除时间</Checkbox>
            </Col>
            <Col span={6}>
              <Checkbox value="creator_id" style={{lineHeight: '40px'}}>创建人</Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item name="is_json_assoc" label="JSON字段" valuePropName="checked">
        <Checkbox>自动转数组(默认为对象,开启此项会将Json数据转换为Array)</Checkbox>
      </Form.Item>
      {/* 创建模型选项 */}
      {
        data.id === 0
          ?
          <Form.Item name="is_create_model" label="生成选项" valuePropName="checked">
        <Checkbox>生成模型类(如模型类已存在则会删除原有模型重新生成)</Checkbox>
      </Form.Item>
          :
          null
      }

      <Form.Item
        {...tailLayout}
      >
        <Button loading={props.submitting}  type="primary" onClick={onValidateForm}>
          确认提交
        </Button>
      </Form.Item>
    </Form>
    </Space>
  );
}

export default Index
