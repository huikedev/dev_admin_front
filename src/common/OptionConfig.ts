// 门面类型
export const facadeOption = [
  { id: 1, title: '公共服务门面' },
  { id: 2, title: '三方服务门面' },
  { id: 3, title: '缓存数据门面' },
  { id: 4, title: '其他类型门面' },
];

// 模型事件
export const modelEvents = [
  { name: 'after_read', title: '查询后' },
  { name: 'before_insert', title: '新增前' },
  { name: 'after_insert', title: '新增后' },
  { name: 'before_update', title: '更新前' },
  { name: 'after_update', title: '更新后' },
  { name: 'before_write', title: '写入前' },
  { name: 'after_write', title: '写入后' },
  { name: 'before_delete', title: '删除前' },
  { name: 'after_delete', title: '删除后' },
  { name: 'before_restore', title: '恢复前' },
  { name: 'after_restore', title: '恢复后' },
];


// 数据表字段类型
export const modelFieldTypes = [
  {
    name: 'number',
    title: '数字',
    children: [
      { name: 'tinyInteger', title: 'tinyInteger' },
      { name: 'integer', title: 'integer' },
      { name: 'bigInteger', title: 'bigInteger' },
      { name: 'float', title: 'float' },
      { name: 'decimal', title: 'decimal' },
    ],
  },
  {
    name: 'string',
    title: '文本',
    children: [
      { name: 'char', title: 'char' },
      { name: 'string', title: 'string(varchar)' },
      { name: 'mediumText', title: 'mediumText' },
      { name: 'text', title: 'text' },
      { name: 'longText', title: 'longText' },
    ],
  },
  {
    name: 'json',
    title: 'JSON',
    children: [
      { name: 'json', title: 'json' },
    ],
  },
  {
    name: 'dateTime',
    title: '日期与时间',
    children: [
      { name: 'date', title: 'date' },
      { name: 'time', title: 'time' },
      { name: 'dateTime', title: 'dateTime' },
      { name: 'timestamp', title: 'timestamp' },
    ],
  },

];

// 数据表索引类型
export const modelFiledIndexType = [
  { name: 'none', title: '无索引' },
  { name: 'unique', title: 'unique' },
  { name: 'normal', title: 'normal' },
  { name: 'fulltext', title: 'fulltext' },
];

export const modelBaseExtends = [
  { model_namespace: 'think\\Model', model_name: 'think\\Model' },
  { model_namespace: 'huike_base\\base\\BaseModel', model_name: 'huike_base\\base\\BaseModel' },
  { model_namespace: 'module_self', model_name: '使用模块定义的基类' },
];

// 模型关联类型
export const modelRelationsType = [
  { name: 'hasOne', title: '一对一（hasOne）' },
  { name: 'hasMany', title: '一对多（hasMany）' },
  { name: 'hasOneThrough', title: '远程一对一（hasOneThrough）' },
  { name: 'hasManyThrough', title: '远程一对多（hasManyThrough）' },
  { name: 'morphMany', title: '多态一对多（morphMany）' },
  { name: 'morphOne', title: '多态一对一（morphOne）' },
  { name: 'morphTo', title: '多态聚合（morphTo）' },
];

export const serviceReturnTypes = [
  {value:'mixed',label: '泛型（mixed）'},
  {value:'bool',label: '布尔（bool）'},
  {value:'int',label: '整型（int）'},
  {value:'float',label: '浮点（float）'},
  {value:'array',label: '数组（array）'},
  {value:'string',label: '字符串（string）'},
  {value:'paginator',label: '分页（Paginator）'},
  {value:'self',label: '类自身（self）'},
  {value:'model',label: '模型（Model）'},
  {value:'collection',label: '数据集（Collection）'},
  {value:'object',label: '对象（object）'},
]

export const noticeTypes = [
  {value:0,label: '静默模式'},
  {value:3,label: 'Message.Success'},
  {value:6,label: 'Notification.Success'},
  {value:9,label: 'Dialog.Success'},
  {value:12,label: 'Page.Success'},
];

export const responseTypes = [
  {value:1,label: 'JSON'},
  {value:2,label: 'HTML'},
  {value:3,label: 'JSONP'},
  {value:4,label: '图片'},
  {value:5,label: '数据流'},
  {value:6,label: '下载'},
  {value:7,label: '跳转'}
]

export const requestMethods = [
  {value:'GET',label: 'GET'},
  {value:'POST',label: 'POST'},
  {value:'PUT',label: 'PUT'},
  {value:'DELETE',label: 'DELETE'},
  {value:'PATCH',label: 'PATCH'},
  {value:'ANY',label: 'ANY'},
]

export const ActionTitleList = [
  {value:'列表',label: '列表'},
  {value:'首页',label: '首页'},
  {value:'新增',label: '新增'},
  {value:'修改',label: '修改'},
  {value:'删除',label: '删除'},
  {value:'详情',label: '详情'},
]
