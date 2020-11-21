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
    access?: 'user' | 'guest' | 'admin';
    unreadCount?: number;
  }

  export interface LoginStateType {
    status?: 'ok' | 'error';
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

  interface ModelListItem{
    model_name:string; // 模型名称
    model_path:string; // 模型路径
    model_namespace: string ;// 模型路径
    model_fields:[];// 模型字段
    model_property:any;// 模型属性
    model_relations:[]; // 模型关联
    update_time:number; // 更新时间
  }
}
