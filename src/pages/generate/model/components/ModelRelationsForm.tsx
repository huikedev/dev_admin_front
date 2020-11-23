import React from "react";
import {ModelCreateStateType} from "@/pages/generate/model/model";
import {Dispatch} from "@@/plugin-dva/connect";
import {connect} from "umi";
import {Alert, Button, Col, Form, Input, Space} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {FormListFieldData} from "antd/es/form/FormList";

const fieldsLayout = {
  labelCol: {span: 2},
  wrapperCol: {span: 22},
};
const tailLayout = {
  wrapperCol: { span: 6,},
}

type ModelRelationsFormProps = {
  data: ModelCreateStateType['modelConfig'];
  fields:ModelCreateStateType['fields'];
  dispatch?: Dispatch;
  submitting?: boolean;
}



const ModelRelationsForm : React.FC<ModelRelationsFormProps> = props => {
  const { dispatch, data,simpleList,fields,submitting } = props;
  const [form] = Form.useForm();
  const { validateFields,getFieldsValue } = form;
  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: 'modelCreate/saveModelRelationsForm',
        payload: {
          ...data,
          ...values,
        },
      });
      dispatch({
        type: 'modelCreate/saveCurrentStep',
        payload: 'fields',
      });
    }
  };
  const onValidateForm = async () => {
    const values = await validateFields();
    if (dispatch) {
      dispatch({
        type: 'modelCreate/submitStepForm',
        payload: {...data,...values},
      });
    }
  };

  const buildFieldRow = (field:FormListFieldData,append:JSX.Element)=>{
    return (<Form.Item {...field}>
      <Input placeholder="关联方法名" />
    </Form.Item>)
  }

  return (
    <div>
      <Form
        {...fieldsLayout}
        name="modelRelations"
        form={form}
        layout="horizontal"
        initialValues={data}
      >
        {simpleList.length === 0
          ?
          <Alert message="未找到模型记录，请先创建模型" type="error" style={{marginBottom:'30px'}} />
          :
          <Form.List name="model_fields">
            {(fields, {add, remove}) => (
              <>
                {fields.map(field => (
                  buildFieldRow(field,<Col span={1}>
                    <Button danger onClick={() => remove(field.name)}>删除</Button>
                  </Col>)
                ))}
                <Form.Item>
                  <Button danger type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                    添加关联
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        }
        <Form.Item
          {...tailLayout}
        >
          <Space>
            <Button type="primary" onClick={onValidateForm} loading={submitting}>
              提交
            </Button>
            <Button onClick={onPrev} style={{ marginLeft: 8 }}>
              上一步
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default connect(({ modelCreate,loading }: { modelCreate: ModelCreateStateType;loading: {
    effects: { [key: string]: boolean };
  }; }) => ({
  data: modelCreate.modelConfig,
  fields:modelCreate.fields,
  simpleList:modelCreate.simpleList,
  submitting: loading.effects['modelCreate/submitStepForm'],
}))(ModelRelationsForm)
