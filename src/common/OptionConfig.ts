export const facadeOption = [
  { id: 1, title: '逻辑服务门面' },
  { id: 2, title: '公共服务门面' },
  { id: 3, title: '三方服务门面' },
];

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

export const modelFiledIndexType = [
  { name: 'none', title: '无索引' },
  { name: 'unique', title: 'unique' },
  { name: 'normal', title: 'normal' },
  { name: 'fulltext', title: 'fulltext' },
];

export const modelBaseExtends = [
  { model_namespace: 'huike\\base\\base\\BaseModel', model_name: 'BaseModel' },
  { model_namespace: 'think\\Model', model_name: 'think\\Model' },
];

export const modelRelationsType = [
  { name: 'hasOne', title: '一对一（hasOne）' },
  { name: 'hasMany', title: '一对多（hasMany）' },
  { name: 'hasOneThrough', title: '远程一对一（hasOneThrough）' },
  { name: 'hasManyThrough', title: '远程一对多（hasManyThrough）' },
  { name: 'morphMany', title: '多态一对多（morphMany）' },
  { name: 'morphOne', title: '多态一对一（morphOne）' },
  { name: 'morphTo', title: '多态聚合（morphTo）' },
];
