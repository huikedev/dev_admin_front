import React from "react";
import {Checkbox, Col, Form, Input, Row, Select,Button} from "antd";
import {ModelCreateStateType} from "@/pages/generate/model/model";
import { connect, Dispatch } from 'umi';
import {modelBaseExtends} from "@/common/OptionConfig";

const layout = {
  labelCol: {span: 2, offset: 2},
  wrapperCol: {span: 12},
};

const tailLayout = {
  wrapperCol: { span: 6,},
};

interface ModelBaseFormProps {
  data: ModelCreateStateType['modelConfig'];
  simpleList:ModelCreateStateType['simpleList'];
  dispatch?: Dispatch;
}

const ModelBaseForm:React.FC<ModelBaseFormProps> = props => {
  const { dispatch, data } = props;
  const [form] = Form.useForm();
  const { validateFields } = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    if (dispatch) {
      dispatch({
        type: 'modelCreate/saveModelBaseForm',
        payload: values,
      });
      dispatch({
        type: 'modelCreate/saveCurrentStep',
        payload: 'fields',
      });
    }
  };
  const extendsList = modelBaseExtends.concat(props.simpleList)
  return (
    <Form
      {...layout}
      form={form}
      name="modelBase"
      layout="horizontal"
      size="large"
      initialValues={data}
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
        <Select style={{width: '100%'}}>
          {extendsList.map((model: API.ModelSimpleListItem) => {
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
      <Form.Item name="model_timestamp" label="自动时间戳">
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
      <Form.Item
        {...tailLayout}
      >
        <Button size="middle" type="primary" onClick={onValidateForm}>
          下一步
        </Button>
      </Form.Item>

    </Form>)
}

export default connect(({ modelCreate }: { modelCreate: ModelCreateStateType }) => ({
  data: modelCreate.modelConfig,
  simpleList:modelCreate.simpleList
}))(ModelBaseForm)
