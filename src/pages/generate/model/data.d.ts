interface ModelListItem{
  index?:number;
  id:number;
  model_name:string; // 模型名称
  model_path:string; // 模型路径
  model_namespace: string ;// 模型路径
  model_fields:any;// 模型字段
  model_property:any;// 模型属性
  model_relations:any; // 模型关联
  update_time:number; // 更新时间
}

interface FacadeListItem{
  index?:number;
  id:number;
  origin_class:string; // 模型名称
  facade_class:string; // 模型路径
  origin_path: string ;// 模型路径
  facade_path:any;// 模型字段
  type_id:number;// 模型属性
  update_times:number; // 模型关联
  update_time:number; // 更新时间
}
