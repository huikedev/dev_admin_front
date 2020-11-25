import React from "react";
import {ModelCreateStateType} from "@/pages/generate/model/model";
import {Dispatch} from "@@/plugin-dva/connect";
import {Form, Row, Col, Input, Select, Checkbox, Button, Space} from "antd";
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
  const { validateFields,getFieldsValue } = form;
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
            <Select placeholder="字段类型" style={{width: '100%'}} disabled={isPk || append===null}>
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
        <Col span={1}>
          <Form.Item
            {...field}
            name={[field.name, 'length']}
            fieldKey={[field.fieldKey, 'length']}
          >
            <Input placeholder="字段长度" disabled={isPk || append===null}/>
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
        <Col span={3}>
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
            <Col span={1}>
              长度
            </Col>
            <Col span={1}>
              小数位
            </Col>
            <Col span={3}>
              索引类型
            </Col>
            <Col span={3}>
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
          <Form.Item name="is_create_model" valuePropName={data.is_create_model?'checked':''}>
            <Checkbox>创建ThinkPhp Model</Checkbox>
          </Form.Item>
          <Form.Item name="is_create_migration"  valuePropName={data.is_create_migration?'checked':''}>
            <Checkbox>创建数据库迁移文件</Checkbox>
          </Form.Item>
          <Form.Item name="is_create_table" valuePropName={data.is_create_table?'checked':''}>
            <Checkbox>创建数据表</Checkbox>
          </Form.Item>
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
      </div>)
}

export default connect(({ modelCreate }: { modelCreate: ModelCreateStateType }) => ({
  data: modelCreate.modelConfig,
}))(ModelFieldsForm)
