import { Effect, Reducer } from 'umi';
import {GenerateRequest} from "@/services";

export interface ModelCreateStateType {
  current?: string;
  simpleList:[],
  fields:[],
  modelConfig: {
    model_name: string;
    model_extends: string;
    model_table?: string;
    model_pk?: string;
    model_connection?:string;
    model_remark?:string;
    model_timestamp:string[];
    primary:[API.ModelFieldProperty];
    model_fields:API.ModelFieldProperty[] | [];
    timestamp_fields:API.ModelFieldProperty[] | [];
    isJsonAssoc:boolean;
    relations:[]
  };
}

export interface ModelCreateModelType {
  namespace: string;
  state: ModelCreateStateType;
  effects: {
    submitStepForm: Effect;
  };
  reducers: {
    saveSimpleList:Reducer<ModelCreateStateType>;
    resetState:Reducer<ModelCreateStateType>;
    saveModelBaseForm:Reducer<ModelCreateStateType>;
    saveModelFieldsForm:Reducer<ModelCreateStateType>;
    saveModelRelationsForm: Reducer<ModelCreateStateType>;
    saveCurrentStep: Reducer<ModelCreateStateType>;
  };
}

const UpdateTimeInitProperty:API.ModelFieldProperty={
    name:'update_time',
    type:'integer',
    length:11,
    decimal:0,
    options:['unsigned'],
    defaultValue:0,
    fieldRemark:'最后更新时间',
  }

const CreateTimeInitProperty:API.ModelFieldProperty={
  name:'create_time',
  type:'integer',
  length:11,
  decimal:0,
  options:['unsigned'],
  defaultValue:0,
  fieldRemark:'创建时间',
}

const DeleteTimeInitProperty:API.ModelFieldProperty={
  name:'delete_time',
  type:'integer',
  length:11,
  decimal:0,
  options:['unsigned'],
  defaultValue:0,
  fieldRemark:'软删除时间',
}

const PrimaryInitProperty:API.ModelFieldProperty={
  name:'id',
  type:'integer',
  length:11,
  decimal:0,
  indexType:'unique',
  options:['primary','unsigned'],
  defaultValue:'',
  fieldRemark:'主键ID',
}

const ModelConfigInit = {
    model_name:'',
    model_timestamp:['update_time','create_time'],
    model_extends:'huike\\base\\base\\BaseModel',
    primary:[PrimaryInitProperty],
    timestamp_fields:[UpdateTimeInitProperty,CreateTimeInitProperty],
    model_fields:[],
    isJsonAssoc:false,
  relations:[]
  }


const Model: ModelCreateStateType = {
  namespace: 'modelCreate',

  state: {
    current: 'base',
    simpleList:[],
    fields:[],
    modelConfig:ModelConfigInit
  },

  effects: {
    *submitStepForm({ payload }, { call, put }) {
      const response = yield GenerateRequest.modelSimpleList();
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put({
        type: 'saveCurrentStep',
        payload: 'result',
      });
    }
  },

  reducers: {
    saveSimpleList(state, { payload }){
      return {
        ...state,
        simpleList: payload
      };
    },

    resetState(state, { payload }){
      return {
        ...state,
        modelConfig:ModelConfigInit
      };
    },

    saveCurrentStep(state, { payload }) {
      return {
        ...state,
        current: payload,
      };
    },

    saveModelBaseForm(state, { payload }){
      const {modelConfig} = state
      modelConfig.timestamp_fields = []
      // 软删除时间
      if(payload.model_timestamp.indexOf('delete_time') > -1){
        modelConfig.timestamp_fields.push(DeleteTimeInitProperty)
      }
      // 最后更新时间
      if(payload.model_timestamp.indexOf('update_time') > -1){
        modelConfig.timestamp_fields.push(UpdateTimeInitProperty)
      }
      // 创建时间
      if(payload.model_timestamp.indexOf('create_time') > -1){
        modelConfig.timestamp_fields.push(CreateTimeInitProperty)
      }

      modelConfig.primary[0].name = payload.model_pk || 'id'
      return {
        ...state,
        modelConfig: {
          ...(state as ModelCreateStateType).modelConfig,
          ...payload,
        },
      };
    },

    saveModelFieldsForm(state, { payload }) {
      const newFields = []
      newFields.push({name:state.modelConfig.primary[0].name,title:state.modelConfig.primary[0].name},)
      if(payload.model_fields && payload.model_fields instanceof Array && payload.model_fields.length > 0){
        payload.model_fields.map((modelField:API.ModelFieldProperty)=>{
          return newFields.push({name:modelField.name,title:modelField.name})
        })
      }

      return {
        ...state,
        fields:newFields,
        modelConfig: {
          ...(state as ModelCreateStateType).modelConfig,
          ...payload,
        },
      };
    },

    saveModelRelationsForm(state, { payload }) {

      return {
        ...state,
        modelConfig: {
          ...(state as ModelCreateStateType).modelConfig,
          ...payload,
        },
      };
    },
  },
};

export default Model;
