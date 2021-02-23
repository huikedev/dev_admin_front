import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;
const ItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};
export const serviceReturnTypes = [
  {
    value: 'mixed',
    label: (
      <div style={ItemStyle}>
        <span>任意类型</span>
        <span>mixed</span>
      </div>
    ),
  },
  {
    value: 'bool',
    label: (
      <div style={ItemStyle}>
        <span>布尔</span>
        <span>bool</span>
      </div>
    ),
  },
  {
    value: 'model',
    label: (
      <div style={ItemStyle}>
        <span>模型</span>
        <span>Model</span>
      </div>
    ),
  },
  {
    value: 'collection',
    label: (
      <div style={ItemStyle}>
        <span>数据集</span>
        <span>Collection</span>
      </div>
    ),
  },
  {
    value: 'paginator',
    label: (
      <div style={ItemStyle}>
        <span>分页</span>
        <span>Paginator</span>
      </div>
    ),
  },
  {
    value: 'array',
    label: (
      <div style={ItemStyle}>
        <span>数组</span>
        <span>array</span>
      </div>
    ),
  },
  {
    value: 'array_object',
    label: (
      <div style={ItemStyle}>
        <span>数组对象</span>
        <span>array_object</span>
      </div>
    ),
  },
  {
    value: 'int',
    label: (
      <div style={ItemStyle}>
        <span>整型</span>
        <span>int</span>
      </div>
    ),
  },
  {
    value: 'float',
    label: (
      <div style={ItemStyle}>
        <span>浮点</span>
        <span>float</span>
      </div>
    ),
  },
  {
    value: 'string',
    label: (
      <div style={ItemStyle}>
        <span>字符串</span>
        <span>string</span>
      </div>
    ),
  },
  {
    value: 'self',
    label: (
      <div style={ItemStyle}>
        <span>当前类</span>
        <span>self</span>
      </div>
    ),
  },

  {
    value: 'object',
    label: (
      <div style={ItemStyle}>
        <span>对象</span>
        <span>Object</span>
      </div>
    ),
  },
];
export const noticeTypes = [
  { value: 0, label: <Text>静默模式</Text> },
  { value: 6, label: <Text type="success">Notification.success</Text> },
  { value: 9, label: <Text type="success">Dialog.success</Text> },
  { value: 3, label: <Text type="success">Message.success</Text> },
  { value: 12, label: <Text type="success">Page.success</Text> },
];
export const SpeedActions = [
  {
    color: 'cyan',
    is_create: true,
    action_name: 'index',
    action_title: '首页',
    service_return_type: '',
    response_type: 'json',
    notice_type: 0,
    is_private: true,
    is_need_permission: true,
    remind_msg: '',
  },
  {
    color: 'purple',
    is_create: true,
    action_name: 'create',
    action_title: '新增',
    service_return_type: 'bool',
    response_type: 'json',
    notice_type: 6,
    is_private: true,
    is_need_permission: true,
    remind_msg: '',
  },
  {
    color: 'geekblue',
    is_create: true,
    action_name: 'edit',
    action_title: '修改',
    service_return_type: 'bool',
    response_type: 'json',
    notice_type: 6,
    is_private: true,
    is_need_permission: true,
    remind_msg: '',
  },
  {
    color: 'magenta',
    is_create: true,
    action_name: 'delete',
    action_title: '删除',
    service_return_type: 'bool',
    response_type: 'json',
    notice_type: 9,
    is_private: true,
    is_need_permission: true,
    remind_msg: '',
  },
  {
    color: 'green',
    is_create: true,
    action_name: 'read',
    action_title: '详情',
    response_type: 'json',
    notice_type: 0,
    service_return_type: '',
    is_private: true,
    is_need_permission: true,
    remind_msg: '',
  },
];

export const editLevels = [
  { value: 0, label: '任意使用者' },
  { value: 21, label: '模块开发者' },
];
