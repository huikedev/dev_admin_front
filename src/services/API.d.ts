declare namespace API {
  export interface CurrentUser {
    id?: number;
    avatar?: string;
    cellphone?: string;
    username?: string;
    nick_name?: string;
    full_name?: string;
    wechat?: string;
    qq?: string;
    access?: user | guest | admin;
    unreadCount?: number;
  }

  export interface LoginStateType {
    status?: ok | error;
    type?: string;
  }

  export interface NoticeIconData {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  }
  interface DefaultItem{
    index?:number;
  }
  interface Timestamp extends DefaultItem{
    update_time:number;
    create_time:number
  }

  interface TimestampWithSoftDelete extends Timestamp{
    delete_time:number;
  }

  interface ModelListItem{
    index?:number;
    id:number;
    module_id:number;
    model_name:string; // 模型名称
    model_full_name:string; // 完整命名空间
    base_model_id: number ;// 模型基类ID
    table_name:string;// 模型字段
    pk_name:any;// 模型属性
    connection_name:string; // 数据库连接
    remark:string; // 更新时间
    is_json_assoc:number ;
    is_delete_time:number;
    is_create_time:number;
    is_update_time:number;
    is_creator_id:number;
    migrate_file:string;
    seed_file:string;
    short_migrate_file:string;
    migrate_version:string;
    model_fields_count:number;
    update_time:number;
    model_extend_text:string;
    creator:DeveloperItem
  }

  interface ModelField{
    id:number;
    model_id:number;
    field_name:string;
    field_type:string;
    field_length:number;
    field_scale:number;
    field_index:string;
    default_value:{
      type:string;
      value:string;
    };
    field_remark:string | null,
    field_options:string[]
  }

  interface ModelSimpleListItem{
    index?:number;
    model_namespace:string;
    model_name:string;
  }

  interface ModelFieldProperty{
    name:string;
    type:string;
    length:number;
    decimal?:number;
    index_type?:string;
    default_value?:any;
    options?:string[];
    field_remark?:string;
  }

  interface FacadeListItem{
    index?:number;
    id:number;
    origin_class:string;
    facade_class:string;
    facade_title:string;
    short_origin_class:string;
    short_facade_class:string;
    facade_path: string;
    type_id:number;
    action_count:number;
    update_times:number;
    update_time:number;
    creator:DeveloperItem
  }

  interface ModuleItem extends TimestampWithSoftDelete{
    id:number;
    module_name:string;
    module_title:string;
    route_name:string;
    route_middleware:string[],
    bind_domain:string[]|[];
    extend_module_id:number;
  }
  interface ModuleWithExtend extends ModuleItem{
    extend_module:ExtendModuleItem | null;
    creator:DeveloperItem
  }


  interface ExtendModuleItem {
    id:number;
    root_path:string;
    root_namespace:string;
    root_base_exception:string;
    root_base_model:string;
    root_base_controller:string;
    root_base_logic:string;
  }

  interface RouteMiddlewareItem{
    name:string;
    full_name:string;
  }

  interface ControllerItem extends TimestampWithSoftDelete{
    id:number;
    controller_name:string;
    controller_title:string;
    module_id:number;
    route_name:string|null;
    created_by_huike:number;
    exception_key:string;
    exception_code:int;
    exception_msg:string;
    is_static_service:boolean;
  }

  interface ActionItem extends TimestampWithSoftDelete{
    id:number;
    action_name:string;
    action_title:string;
    controller_id:number;
    route_name:string;
    service_return_type:string;
    is_need_permission:boolean;
    notice_type:number;
    response_type:number;
    is_private:boolean;
    remark?:string;
    creator:DeveloperItem;
  }

  interface ControllerTableItem extends ControllerItem{
    module:ModuleItem;
    actions:ActionItemWithAppends[] | [];
    service_class:string;
    path_id:number;
    path:ControllerItem;
    creator:DeveloperItem;
  }
  // 控制器 包含关联 [module]
  interface ControllerWithModule extends ControllerItem{
    module:ModuleItem
  }
  // 逻辑方法 包含追加字段
  interface ActionItemWithAppends extends ActionItem{
    request_method_text:string;
    notice_type_text:string;
    response_type_text:string;
    service_return_type_text:string;
  }


  interface ActionTableItem extends ActionItemWithAppends{
    controller:ControllerWithModule;
  }

  interface UnSyncedControllerItem{
    index:number;
    name:string;
    full_name:string;
    action_count:number;
    module_title:string;
    module_name:string;
    bind_domain:string;
    module_route_name:string;
    path:string
  }

  interface UnSyncedActionItem{
    index:number,
    action_name:string,
    full_action_name:string,
    controller_id:number,
    controller_name:string,
    controller_title:string,
    bind_domain:string | null,
    controller_route_name:string,
    request_type?:string,
    notice_type?:number,
    response_type?:number,
    service_return_type?:string,
    is_private?:boolean,
    is_need_permission?:boolean,
    service_return_type_key?:string
  }

  interface SimpleItem{
    id:number;
    title:string;
    name:string;
  }
  // 模块简单列表
  interface ModuleSimpleItem extends SimpleItem{
    route:string;
    domain:string[]|[];
    extend:ExtendModule|null
  }

  interface ExtendModule{
    root_path:string;
    root_namespace:string;
    root_base_exception:string;
    root_base_model:string;
    root_base_controller:string;
    root_base_logic:string;
  }

  // 控制器简单列表
  interface ControllerSimpleItem extends SimpleItem{
    route:string;
    module_id:number;
    service_path:string | null
  }

  // 逻辑方法简单列表
  interface ActionSimpleItem extends SimpleItem{
    route:string;
  }

  interface ActionCreateResult{
    msg:string;
    status:string;
    actionType:string;
    class:string;
    location:string;
  }
  // 控制器路径 简单列表
  interface ControllerPathSimpleItem{
    id:number;
    controller_name:string;
    module_id:number;
    route_name:string;
    controller_title:string;
  }

  // 控制器路径
  interface ControllerPathItem extends TimestampWithSoftDelete{
    id:number;
    controller_name:string;
    module_id:number;
    route_name:string;
    controller_title:string;
    creator_id:number;
    creator:DeveloperItem;
    module:ModuleItem;
    controllers:ControllerItem[] | [];
  }

  interface SpeedCreateResult{
    name:string;
    status:'success' | 'error';
    result:string | {
      exception: ActionCreateResult;
      handler: ActionCreateResult;
      service: ActionCreateResult;
      logic: ActionCreateResult;
      controller: ActionCreateResult
    }
  }

  interface DeveloperItem {
    id:number;
    username:string;
    position_text:string;
    position_id:number;
    last_login_ip:string;
    login_ip:string;
    login_time:number;
    last_login_time:number;
    create_time:number;
    creator_id:number;
  }

  interface PositionItem{
    id:number;
    title:string;
  }

  interface DeveloperItemWithCreator extends DeveloperItem{
    creator:DeveloperItem
  }
}
