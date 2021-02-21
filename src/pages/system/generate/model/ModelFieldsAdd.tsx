import React from "react";
import { useParams,history,useRequest,useModel } from "umi";
import {PageException, PageLoading,PageAlert} from "@/huikedev";
import { getModelRead} from "@/services/generate";
import {useForm} from "antd/es/form/Form";
import {FormListFieldData} from "antd/es/form/FormList";
import { Button, Card, Checkbox, Col, Form, Input, Row, Select, Space,Typography} from "antd";
import {modelFieldTypes, modelFiledIndexType} from "@/common/OptionConfig";
import {PlusOutlined} from "@ant-design/icons";
import {PageContainer} from "@ant-design/pro-layout";
import PathName from "@/common/PathName";

const {Text} = Typography
const fieldsLayout = {
  labelCol: {span: 2},
  wrapperCol: {span: 22},
};
const tailLayout = {
  wrapperCol: { span: 6,},
}

const UpdateTimeInitProperty: API.ModelFieldProperty = {
  name: 'update_time',
  type: 'integer',
  length: 11,
  decimal: 0,
  options: ['unsigned'],
  default_value: 0,
  field_remark: '最后更新时间',
}

const CreateTimeInitProperty: API.ModelFieldProperty = {
  name: 'create_time',
  type: 'integer',
  length: 11,
  decimal: 0,
  options: ['unsigned'],
  default_value: 0,
  field_remark: '创建时间',
}

const DeleteTimeInitProperty: API.ModelFieldProperty = {
  name: 'delete_time',
  type: 'integer',
  length: 11,
  decimal: 0,
  options: ['unsigned'],
  default_value: 0,
  field_remark: '软删除时间',
}

const PrimaryInitProperty: API.ModelFieldProperty = {
  name: 'id',
  type: 'integer',
  length: 11,
  decimal: 0,
  index_type: 'unique',
  options: ['primary', 'unsigned'],
  default_value: '',
  field_remark: '主键ID',
}

interface ModelFieldsAddFormType{
  primary:API.ModelFieldProperty[],
  model_fields:API.ModelFieldProperty[],
  timestamp_fields:API.ModelFieldProperty[]
}
const ModelFieldsAdd:React.FC = () => {
  const params = useParams<{id: any;}>()
  const {loading,data,error} = useRequest( ()=>{
    return getModelRead({id:params.id})
  })
  const {fieldAddSubmit,fieldAddSubmitting} = useModel('useModelFieldsAddModel',model => ({
    fieldAddSubmit:model.fieldAddSubmit,
    fieldAddSubmitting:model.fieldAddSubmitting
  }))
  const [form] = useForm()
  const { validateFields,getFieldsValue,setFieldsValue } = form;

  const onValidateForm = async () => {
    const values = await validateFields();

    await fieldAddSubmit({id:data.id,...values}).then(()=>{
      history.push(PathName.generate.model)
    })
  }

  if(error){
    return (<PageException title={error.message} status={500} />)
  }
  if(loading){
    return (<PageLoading />)
  }

  const handleFieldsTypeChange = (key:number,value:any)=>{
    const {model_fields} = getFieldsValue()
    switch (value){
      case 'tinyInteger':
        model_fields[key].length = 4
        break;
      case 'integer':
        model_fields[key].length = 11
        break;
      case 'bigInteger':
        model_fields[key].length = 20
        break;
      case 'float':
        model_fields[key].length = 0
        break;
      case 'decimal':
        model_fields[key].length = 8
        model_fields[key].decimal = 2
        break;
      case 'char':
        model_fields[key].length = 255
        break;
      case 'string':
        model_fields[key].length = 255
        break;
      default:
        model_fields[key].length = 0
    }
    setFieldsValue({
      model_fields
    })
  }
  const formInitData:ModelFieldsAddFormType = {
    primary:[],
    model_fields:[],
    timestamp_fields:[]
  }
  if(data.pk_name!==null){
    PrimaryInitProperty.name = data.pk_name
    formInitData.primary.push(PrimaryInitProperty)
  }else {
    formInitData.primary.push(PrimaryInitProperty)
  }
  if(data.is_delete_time){
    formInitData.timestamp_fields.push(DeleteTimeInitProperty)
  }
  if(data.is_update_time){
    formInitData.timestamp_fields.push(UpdateTimeInitProperty)
  }
  if(data.is_create_time){
    formInitData.timestamp_fields.push(CreateTimeInitProperty)
  }
  const buildFieldRow = (field:FormListFieldData,isPk:boolean = false, append:JSX.Element|null=null)=> {
    const disable = append===null
    return (
      <Row key={field.key}>
        <Col span={3}>
          <Form.Item
            {...field}
            name={[field.name, 'name']}
            fieldKey={[field.fieldKey, 'name']}
          >
            <Input placeholder="字段名" disabled={disable}/>
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item
            {...field}
            name={[field.name, 'type']}
            fieldKey={[field.fieldKey, 'type']}
          >
            <Select showSearch placeholder="字段类型" style={{width: '100%'}} disabled={disable} onChange={(value)=>{
              handleFieldsTypeChange(field.fieldKey,value)
            }}>
              {modelFieldTypes.map((group) => {
                return (<Select.OptGroup key={group.name} label={group.title}>
                  {group.children.map((fieldType) => {
                    return (
                      <Select.Option key={fieldType.name} value={fieldType.name}>{fieldType.title}</Select.Option>)
                  })}
                </Select.OptGroup>)
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>{
              if(typeof currentValues.model_fields[field.fieldKey]==='undefined'){
                return false;
              }
              if(typeof currentValues.model_fields[field.fieldKey].type ==='undefined'){
                return false;
              }
              if(typeof prevValues.model_fields[field.fieldKey]==='undefined'){
                return true;
              }
              if(typeof prevValues.model_fields[field.fieldKey].type ==='undefined'){
                return true;
              }
              return prevValues.model_fields[field.fieldKey].type !== currentValues.model_fields[field.fieldKey].type
            }  }
          >
            {() => {
              if(append===null){
                return (
                  <Form.Item
                    {...field}
                    name={[field.name, 'length']}
                    fieldKey={[field.fieldKey, 'length']}
                  >
                    <Input placeholder="字段长度" disabled />
                  </Form.Item>
                )
              }
              const fieldsValue = getFieldsValue()
              let fieldType = 'none'
              if(typeof fieldsValue.model_fields!=='undefined' && typeof fieldsValue.model_fields[field.fieldKey]!=='undefined'){
                fieldType = fieldsValue.model_fields[field.fieldKey].type || 'none'
              }

              if(['string','char','decimal'].indexOf(fieldType) > -1){
                return (
                  <Form.Item
                    {...field}
                    name={[field.name, 'length']}
                    fieldKey={[field.fieldKey, 'length']}
                  >
                    <Input placeholder="字段长度" />
                  </Form.Item>
                )
              }
              return (
                <Form.Item
                  {...field}
                  name={[field.name, 'length']}
                  fieldKey={[field.fieldKey, 'length']}
                >
                  <Input placeholder="字段长度" disabled />
                </Form.Item>
              )
            }}
          </Form.Item>
        </Col>
        <Col span={1}>
          <Form.Item
            {...field}
            name={[field.name, 'decimal']}
            fieldKey={[field.fieldKey, 'decimal']}
          >
            <Input placeholder="小数位长度" disabled={disable}/>
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item
            {...field}
            name={[field.name, 'index_type']}
            fieldKey={[field.fieldKey, 'index_type']}

          >
            <Select placeholder="索引类型" style={{width: '100%'}} disabled={disable}>
              {modelFiledIndexType.map((indexType) => {
                return (<Select.Option key={indexType.name}
                                       value={indexType.name}>{indexType.title}</Select.Option>)
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item
            {...field}
            name={[field.name, 'default_value']}
            fieldKey={[field.fieldKey, 'default_value']}
          >
            <Input placeholder="默认值" disabled={disable}/>
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item
            {...field}
            name={[field.name, 'field_remark']}
            fieldKey={[field.fieldKey, 'field_remark']}
          >
            <Input placeholder="字段注释" disabled={disable}/>
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item
            {...field}
            name={[field.name, 'options']}
            fieldKey={[field.fieldKey, 'options']}
          >
            <Checkbox.Group>
              {isPk
                ?
                <Checkbox value="primary" checked disabled>PRIMARY</Checkbox>
                :
                null
              }
              <Checkbox value="nullable" disabled={disable}>NULL</Checkbox>
              <Checkbox value="unsigned" disabled={disable}>非负</Checkbox>

            </Checkbox.Group>
          </Form.Item>
        </Col>
        {append}
      </Row>
    )
  }
  return (
    <PageContainer>
      <Card title={`添加字段:${data.model_full_name}`}>
        <Space direction="vertical" style={{width:'100%'}}>
          <PageAlert message={<div>
            <p>数据表生成通过think-migration完成，仅提供常用字段类型。字段长度以think-migration生成的字段长度为准，除特殊字段外无法指定</p>
            <p>若<Text code>char</Text>、<Text code>varchar</Text>类型需要设置空字符串的默认值，请在默认值填写<Text code>EMPTY STRING</Text></p>
          </div>} />
          <Form
            {...fieldsLayout}
            name="modelFields"
            form={form}
            layout="horizontal"
            initialValues={formInitData}
          >
            <Row style={{marginBottom:'15px',textAlign: 'center'}}>
              <Col span={3}>
                字段名
              </Col>
              <Col span={3}>
                字段类型
              </Col>
              <Col span={2}>
                长度
              </Col>
              <Col span={1}>
                小数位
              </Col>
              <Col span={3}>
                索引类型
              </Col>
              <Col span={2}>
                默认值
              </Col>
              <Col span={3}>
                字段注释
              </Col>
              <Col span={5}>
                其他属性
              </Col>
              <Col span={1}>
                操作
              </Col>
            </Row>
            {/* 主键字段 */}
            <Form.List name="primary">
              {(fields)=>(
                <>
                  {fields.map(field => (
                    buildFieldRow(field,true)
                  ))}
                </>
              )}
            </Form.List>
            {/* 自定义字段 */}
            <Form.List name="model_fields">
              {(fields, {add, remove}) => (
                <>
                  {fields.map(field => (
                    buildFieldRow(field,false,<Col span={1}>
                      <Button size="small" danger onClick={() => remove(field.name)}>删除</Button>
                    </Col>)
                  ))}
                  <Form.Item>
                    <Button danger type="dashed" onClick={() => add({decimal:0})} block icon={<PlusOutlined/>}>
                      添加字段
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            {/* 时间戳字段 */}
            {formInitData.timestamp_fields.length > 0
              ?
              <Form.List name="timestamp_fields">
                {(fields)=>(
                  <>
                    {fields.map(field => (
                      buildFieldRow(field,false)
                    ))}
                  </>
                )}
              </Form.List>
              :
              null
            }

            <Form.Item
              {...tailLayout}
            >
              <Space>
                <Button type="primary" loading={fieldAddSubmitting} onClick={onValidateForm}>
                  确认提交
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </PageContainer>)
}

export default ModelFieldsAdd
