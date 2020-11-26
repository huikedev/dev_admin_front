import React, {useEffect, useState} from "react";
import {ModelCreateStateType} from "@/pages/generate/model/model";
import {Dispatch} from "@@/plugin-dva/connect";
import {Form, Row, Col, Input, Select, Checkbox, Button, Space, Alert} from "antd";
import { modelFieldTypes, modelFiledIndexType} from "@/common/OptionConfig";
import { PlusOutlined} from '@ant-design/icons';
import {connect} from "umi";
import {FormListFieldData} from "antd/es/form/FormList";

const fieldsLayout = {
  labelCol: {span: 2},
  wrapperCol: {span: 22},
};
const tailLayout = {
  wrapperCol: { span: 6,},
}

type ModelFieldsFormProps = {
  data: ModelCreateStateType['modelConfig'];
  dispatch?: Dispatch;
}

const ModelFieldsForm : React.FC<ModelFieldsFormProps> = props => {
  const { dispatch, data } = props;
  const [form] = Form.useForm();

  const { validateFields,getFieldsValue,setFieldsValue } = form;

  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: 'modelCreate/saveModelFieldsForm',
        payload: {
          ...data,
          ...values,
        },
      });
      dispatch({
        type: 'modelCreate/saveCurrentStep',
        payload: 'base',
      });
    }
  };
  const onValidateForm = async () => {
    const values = await validateFields();
    if (dispatch) {
      dispatch({
        type: 'modelCreate/saveModelFieldsForm',
        payload: values,
      });
      dispatch({
        type: 'modelCreate/saveCurrentStep',
        payload: 'relations',
      });
    }
  };

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

  const buildFieldRow = (field:FormListFieldData, isPk = false,append:JSX.Element|null=null)=> {
    return (
      <Row key={field.key}>
        <Col span={3}>
          <Form.Item
            {...field}
            name={[field.name, 'name']}
            fieldKey={[field.fieldKey, 'name']}
          >
            <Input placeholder="字段名" disabled={isPk || append===null}/>
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item
            {...field}
            name={[field.name, 'type']}
            fieldKey={[field.fieldKey, 'type']}
          >
            <Select placeholder="字段类型" style={{width: '100%'}} disabled={isPk || append===null} onChange={(value)=>{
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
            <Input placeholder="小数位长度" disabled={isPk || append===null}/>
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item
            {...field}
            name={[field.name, 'index_type']}
            fieldKey={[field.fieldKey, 'index_type']}

          >
            <Select placeholder="索引类型" style={{width: '100%'}} disabled={isPk || append===null}>
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
            <Input placeholder="默认值" disabled={isPk || append===null}/>
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item
            {...field}
            name={[field.name, 'field_remark']}
            fieldKey={[field.fieldKey, 'field_remark']}
          >
            <Input placeholder="字段注释" disabled={isPk || append===null}/>
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
            <Checkbox value="nullable" disabled={append===null}>NULL</Checkbox>
            <Checkbox value="unsigned" disabled={isPk || append===null}>非负</Checkbox>

          </Checkbox.Group>
          </Form.Item>
        </Col>
        {append}
      </Row>
    )
  }

    return (
      <div>
        <Space direction="vertical" style={{width:'100%'}}>
          <Alert message="数据表生成通过think-migration完成，仅提供常用字段类型。字段长度以think-migration生成的字段长度为准，除特殊字段外无法指定" />
          <Form
            {...fieldsLayout}
            name="modelFields"
            form={form}
            layout="horizontal"
            initialValues={data}
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
            <Form.List name="primary">
              {(fields)=>(
                <>
                  {fields.map(field => (
                    buildFieldRow(field,true)
                  ))}
                </>
              )}
            </Form.List>

            <Form.List name="model_fields">
              {(fields, {add, remove}) => (
                <>
                  {fields.map(field => (
                    buildFieldRow(field,false,<Col span={1}>
                      <Button danger onClick={() => remove(field.name)}>删除</Button>
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
            {data.timestamp_fields.length > 0
              ?
              <Form.List name="timestamp_fields">
                {(fields)=>(
                  <>
                    {fields.map(field => (
                      buildFieldRow(field)
                    ))}
                  </>
                )}
              </Form.List>
              :
              null
            }

            <Form.Item name="is_json_assoc" valuePropName={data.is_json_assoc?'checked':''}>
              <Checkbox>JsonAssoc(如果有json字段开启此项会将Json数据转换为Array)</Checkbox>
            </Form.Item>
            <Space>
              <Form.Item name="is_create_model" valuePropName={data.is_create_model?'checked':''} style={{width:'180px'}}>
                <Checkbox>创建ThinkPhp Model</Checkbox>
              </Form.Item>
              <Form.Item name="is_create_migration"  valuePropName={data.is_create_migration?'checked':''}  style={{width:'180px'}}>
                <Checkbox>创建数据库迁移文件</Checkbox>
              </Form.Item>
              <Form.Item name="is_create_table" valuePropName={data.is_create_table?'checked':''}  style={{width:'180px'}}>
                <Checkbox disabled={!data.is_create_migration}>创建数据表</Checkbox>
              </Form.Item>
            </Space>

            <Form.Item
              {...tailLayout}
            >
              <Space>
                <Button type="primary" onClick={onValidateForm}>
                  下一步
                </Button>
                <Button onClick={onPrev} style={{ marginLeft: 8 }}>
                  上一步
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Space>

      </div>)
}

export default connect(({ modelCreate }: { modelCreate: ModelCreateStateType }) => ({
  data: modelCreate.modelConfig,
}))(ModelFieldsForm)
