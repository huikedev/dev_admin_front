import React from "react";
import {PageContainer} from "@ant-design/pro-layout";
import {Steps, Form, Input, Select, Checkbox, Row, Col, Space, Button} from 'antd';
import publicStyles from '@/assets/styles/public/index.less'
import styles from '@/assets/styles/pages/ModelCreate.less'
import {GenerateRequest} from "@/services";
import {EmptyText, PageException, PageLoading} from "@/huikedev";
import {modelFieldTypes, modelFiledIndexType} from "@/common/OptionConfig";
import {FormInstance} from "antd/es/form";
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';

const {Step} = Steps;
const layout = {
  labelCol: {span: 2, offset: 2},
  wrapperCol: {span: 12},
};
const fieldsLayout = {
  labelCol: {span: 2},
  wrapperCol: {span: 22},
};
const tailLayout = {

  wrapperCol: {offset: 4, span: 6,},
};

export default class ModelCreate extends React.Component<any, any> {
  state = {
    isLoading: true,
    isError: false,
    errorMsg: '',
    currentStep: 0,
    data: {
      model_name: '',
      create_time: true,
      update_time: true,
      delete_time: true,
      json_assoc: false,
      json: [],
      fields: [],
      relations: [],
      events: {
        after_read: false,
        before_insert: false,
        after_insert: false,
        before_update: false,
        after_update: false,
        before_write: false,
        after_write: false,
        before_delete: false,
        after_delete: false,
        before_restore: false,
        after_restore: false
      }
    },
    modelSimpleList: []
  }

  private modelBaseForm = React.createRef<FormInstance>()
  private modelFieldsForm = React.createRef<FormInstance>()
  private modelRelationsForm = React.createRef<FormInstance>()

  async componentDidMount() {
    await this.getSimpleList()
  }

  async getSimpleList() {
    this.setState({
      isLoading: true,
      isError: false
    })
    const res = await GenerateRequest.modelSimpleList()
    if (res.success) {
      res.data.unshift(
        {model_namespace: 'huike\\base\\base\\BaseModel', model_name: 'BaseModel'},
        {model_namespace: 'think\\Model', model_name: 'think\\Model'}
      )
      this.setState({
        isLoading: false,
        modelSimpleList: res.data
      })
    } else {
      this.setState({
        isLoading: false,
        isError: true,
        errorMsg: res.errorMessage
      })
    }
  }

  dispatchStep() {
    const {currentStep} = this.state
    switch (currentStep) {
      case 1:
        return this.buildModelFields();
      case 2:
        return this.buildModelRelations();
      default:
        return this.buildModelBaseInfo();
    }
  }

  buildModelBaseInfo() {
    const {modelSimpleList} = this.state
    return (
      <Form
        {...layout}
        name="modelBase"
        ref={this.modelBaseForm}
        layout="horizontal"
        size="large"
      >
        <Form.Item
          label="模型名称"
          name="model_name"
          rules={[{required: true, message: '请输入模型名称'}]}
        >
          <Input placeholder="请输入模型名称" addonBefore={'huike\\common\\model\\'}/>
        </Form.Item>
        <Form.Item
          label="模型基类"
          name="model_extends"
          rules={[{required: true, message: '请选择模型基类'}]}
        >
          <Select style={{width: '100%'}} defaultValue="huike\base\base\BaseModel">
            {modelSimpleList.map((model: API.ModelSimpleListItem) => {
              return <Select.Option value={model.model_namespace}
                                    key={model.model_namespace}>{model.model_namespace}</Select.Option>
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="对应表名"
          name="model_table"
        >
          <Input placeholder="模型对应的表名，默认为模型名称的Snake命名"/>
        </Form.Item>
        <Form.Item
          label="主键名称"
          name="model_pk"
        >
          <Input placeholder="模型主键，默认为id"/>
        </Form.Item>
        <Form.Item
          label="数据库连接"
          name="model_connection"
        >
          <Input placeholder="模型的数据库连接，默认为database.default配置"/>
        </Form.Item>
        <Form.Item
          label="模型备注"
          name="model_remark"
        >
          <Input placeholder="请输入模型备注"/>
        </Form.Item>
        <Form.Item name="model_timestamp" label="自动时间戳" initialValue={['update_time', 'create_time']}>
          <Checkbox.Group style={{width: '100%'}}>
            <Row>
              <Col span={8}>
                <Checkbox value="update_time" style={{lineHeight: '40px'}}>更新时间</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="create_time" style={{lineHeight: '40px'}}>创建时间</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="delete_time" style={{lineHeight: '40px'}}>软删除时间</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>

      </Form>)
  }

  buildModelRelations() {

    return (<div>2222</div>)
  }

  parseDefaultFields(): { idConfig: API.ModelFieldProperty, timestampConfig: API.ModelFieldProperty[] | [] } {
    // 获取默认字段设置
    const idName = this.modelBaseForm.current?.getFieldValue('model_pk') || 'id'
    const idConfig: API.ModelFieldProperty = {
      name: idName,
      type: 'integer',
      isUnsigned: true,
      length: 11,
      decimal: 0,
      indexType: 'unique',
      isNullable: false
    }
    const modelTimestamp = this.modelBaseForm.current?.getFieldValue('model_timestamp')
    const updateTime = modelTimestamp instanceof Array && modelTimestamp.indexOf('update_time') > -1
    const createTime = modelTimestamp instanceof Array && modelTimestamp.indexOf('create_time') > -1
    const deleteTime = modelTimestamp instanceof Array && modelTimestamp.indexOf('delete_time') > -1
    const timestampConfig: API.ModelFieldProperty[] = []
    if (deleteTime) {
      timestampConfig.push({
        name: 'delete_time',
        type: 'integer',
        isUnsigned: true,
        length: 11,
        decimal: 0,
        isNullable: false,
        defaultValue: 0,
        fieldRemark: '软删除时间'
      })
    }
    if (updateTime) {
      timestampConfig.push({
        name: 'update_time',
        type: 'integer',
        isUnsigned: true,
        length: 11,
        decimal: 0,
        isNullable: false,
        defaultValue: 0,
        fieldRemark: '最后更新时间'
      })
    }
    if (createTime) {
      timestampConfig.push({
        name: 'create_time',
        type: 'integer',
        isUnsigned: true,
        length: 11,
        decimal: 0,
        isNullable: false,
        defaultValue: 0,
        fieldRemark: '创建时间'
      })
    }
    return {idConfig, timestampConfig}
  }

  buildFieldRow(fieldConfig: API.ModelFieldProperty,fieldListName:string, isPk = false) {
    return (
      <Row>
        <Col span={3}>
          <Form.Item
            name={[fieldListName, 'name']}
            fieldKey={[fieldListName, 'name']}
            initialValue={fieldConfig.name}
          >
            <Input placeholder="字段名" disabled={isPk}/>
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item
            name={[fieldListName, 'type']}
            fieldKey={[fieldListName, 'type']}
            initialValue={fieldConfig.type}
          >
            <Select defaultValue={fieldConfig.type} style={{width: '100%'}}>
              {modelFieldTypes.map((group) => {
                return (<Select.OptGroup label={group.title}>
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
            name={[fieldListName, 'length']}
            fieldKey={[fieldListName, 'length']}
            initialValue={fieldConfig.length}
          >
            <Input placeholder="字段长度"/>
          </Form.Item>
        </Col>
        <Col span={1}>
          <Form.Item
            name={[fieldListName, 'decimal']}
            fieldKey={[fieldListName, 'decimal']}
            initialValue={fieldConfig.decimal}
          >
            <Input placeholder="小数位长度"/>
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item
            name={[fieldListName, 'indexType']}
            fieldKey={[fieldListName, 'indexType']}
          >
            <Select defaultValue={fieldConfig.indexType ? fieldConfig.indexType : '索引类型'} style={{width: '100%'}} disabled={isPk}>
              {modelFiledIndexType.map((indexType) => {
                return (<Select.Option key={indexType.name}
                                       value={indexType.name}>{indexType.title}</Select.Option>)
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item
            name={[fieldListName, 'default_value']}
            fieldKey={[fieldListName, 'default_value']}
            initialValue={fieldConfig.defaultValue}
          >
            <Input placeholder="默认值" disabled={isPk}/>
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item
            name={[fieldListName, 'fieldRemark']}
            fieldKey={[fieldListName, 'fieldRemark']}
            initialValue={fieldConfig.fieldRemark}
          >
            <Input placeholder="字段注释"/>
          </Form.Item>
        </Col>
        <Col span={5}>
          <Checkbox.Group>
            <Checkbox value="nullable" disabled>NULL</Checkbox>
            <Checkbox value="unsigned" checked={fieldConfig.isUnsigned}>非负</Checkbox>
            {isPk
              ?
              <Checkbox value="primary" checked>PRIMARY</Checkbox>
              :
              null
            }
          </Checkbox.Group>
        </Col>
      </Row>
    )
  }

  buildModelFields() {
    const {idConfig, timestampConfig} = this.parseDefaultFields()
    return (
      <div>
        <Form
          {...fieldsLayout}
          name="modelFields"
          ref={this.modelFieldsForm}
          layout="horizontal"
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
          {this.buildFieldRow(idConfig,'id_config',true)}

          <Form.List name="model_fields">
            {(fields, {add, remove}) => (
              <>
                {fields.map(field => (
                  <Row key={field.key}>
                    <Col span={3}>
                      <Form.Item
                        {...field}
                        name={[field.name, 'name']}
                        fieldKey={[field.fieldKey, 'name']}
                        rules={[{required: true, message: '请输入字段名'}]}
                      >
                        <Input placeholder="字段名"/>
                      </Form.Item>
                    </Col>
                    <Col span={3}>
                      <Form.Item
                        {...field}
                        name={[field.name, 'type']}
                        fieldKey={[field.fieldKey, 'type']}
                        rules={[{required: true, message: '请选择字段类型'}]}
                      >
                        <Select defaultValue="选择类型" style={{width: '100%'}}>
                          {modelFieldTypes.map((group) => {
                            return (<Select.OptGroup label={group.title}>
                              {group.children.map((fieldType) => {
                                return (<Select.Option key={fieldType.name}
                                                       value={fieldType.name}>{fieldType.title}</Select.Option>)
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
                        rules={[{required: true, message: '请输入字段长度'}]}
                      >
                        <Input placeholder="长度" defaultValue={0}/>
                      </Form.Item>
                    </Col>
                    <Col span={1}>
                      <Form.Item
                        {...field}
                        name={[field.name, 'decimal']}
                        fieldKey={[field.fieldKey, 'decimal']}
                      >
                        <Input placeholder="小数位" defaultValue={0}/>
                      </Form.Item>
                    </Col>
                    <Col span={3}>
                      <Form.Item
                        {...field}
                        name={[field.name, 'index_type']}
                        fieldKey={[field.fieldKey, 'index_type']}
                      >
                        <Select defaultValue="索引类型" style={{width: '100%'}}>
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
                        <Input placeholder="默认值"/>
                      </Form.Item>
                    </Col>
                    <Col span={3}>
                      <Form.Item
                        {...field}
                        name={[field.name, 'field_remark']}
                        fieldKey={[field.fieldKey, 'field_remark']}
                      >
                        <Input placeholder="字段注释"/>
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item
                        {...field}
                        name={[field.name, 'options']}
                        fieldKey={[field.fieldKey, 'options']}
                      >
                        <Checkbox.Group>
                          <Checkbox value="nullable">NULL</Checkbox>
                          <Checkbox value="unsigned">非负</Checkbox>
                        </Checkbox.Group>
                      </Form.Item>
                    </Col>
                    <Col span={1}>
                      <Button danger onClick={() => remove(field.name)}>删除</Button>
                    </Col>

                  </Row>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                    添加字段
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          {timestampConfig.map((timeField: API.ModelFieldProperty)=>{
            return this.buildFieldRow(timeField,timeField.name)
          })}
          <Form.Item name="json_assoc">
            <Checkbox value="json_assoc">JsonAssoc(如果有json字段开启此项会将Json数据转换为Array)</Checkbox>
          </Form.Item>
        </Form>
      </div>)
  }

  buildStepper() {
    const {currentStep} = this.state
    return (
      <div style={{marginTop: '30px'}}>
            <Space className={publicStyles.flexEnd}>
              {currentStep > 0
                ?
                <Button onClick={() => this.stepPrev()} htmlType="button">上一步</Button>
                :
                null
              }
              {currentStep < 2
                ?
                <Button onClick={() => this.stepNext()} htmlType="button">下一步</Button>
                :
                null
              }
              <Button type="primary" onClick={() => this.finish()}>确认提交</Button>
            </Space>
      </div>)
  }

  stepPrev() {
    const {currentStep} = this.state
    const step = currentStep - 1 < 0 ? 0 : currentStep - 1
    this.setState({
      currentStep: step
    })
  }

  stepNext() {
    const {currentStep} = this.state
    const step = currentStep + 1 > 2 ? 2 : currentStep + 1
    this.setState({
      currentStep: step
    })
  }

  finish() {

  }

  buildContent() {
    const {isLoading, isError, errorMsg} = this.state

    if (isLoading) {
      return <PageLoading/>
    }

    if (isError) {
      return <PageException extra={errorMsg}/>
    }

    return (<div className={`${publicStyles.pageContent} ${styles.ModelCreate}`}>
      <Steps
        className={styles.stepTitleBox}
        current={this.state.currentStep} onChange={current => {
        this.setState({
          currentStep: current
        })
      }}>
        <Step title="基础信息"/>
        <Step title="模型字段"/>
        <Step title="模型关联"/>
      </Steps>
      <div className={styles.stepContent}>
        {this.dispatchStep()}
      </div>
      <div className={styles.stepper}>
        {this.buildStepper()}
      </div>
    </div>)
  }

  render() {

    return (
      <PageContainer>
        {this.buildContent()}
      </PageContainer>
    );
  }
}
