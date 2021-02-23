import * as React from 'react';

interface AppPaginator<ListTypeItem = any> {
  total: number;
  pageSize: number;
  current: number;
  last: number;
  list: ListTypeItem[] | [];
}

export interface AppResponseType<DataType = unknown> {
  success: boolean;
  data?: DataType | any;
  errorCode?: number;
  errorMessage?: string | null; // message display to user
  showType?: number;
  trace?: any;
  debug?: any;
}

export declare type RequestMethodType =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'ANY'
  | undefined;

export declare type NoticeTypeType =
  | '无前端反馈'
  | 'Message.Waring'
  | 'Message.Error'
  | 'Message.Success'
  | 'Notification.Waring'
  | 'Notification.Error'
  | 'Notification.Success'
  | 'Dialog.Waring'
  | 'Dialog.Error'
  | 'Dialog.Success'
  | 'Page.Waring'
  | 'Page.Error'
  | 'Page.Success'
  | undefined;

export interface AppBaseModelType {
  visible: boolean;
  onClose: () => void;
}
export interface AppEditModalType<DataItem> extends AppBaseModelType {
  dataItem: DataItem;
  onSuccess: () => void;
}

export interface AppSetModalType<DataItem> extends AppBaseModelType {
  dataItem?: DataItem;
  onSuccess: () => void;
}
export interface AppCreateModalType extends AppBaseModelType {
  onSubmit: (values: ItemActionType) => void;
  submitting?: boolean;
}

export interface AppDeleteModalType<DataItem> extends AppBaseModelType {
  dataItem: DataItem;
  onSuccess: () => void;
}

// post 提交时的参数type
export interface ItemActionType {
  id: number;
  [key: string]: any;
}

// 自定义验证

export interface AppValidateType {
  status?: 'success' | 'warning' | 'error' | 'validating';
  msg?: React.ReactNode | null;
}
