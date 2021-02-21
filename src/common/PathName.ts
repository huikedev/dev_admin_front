// 将routes里的path通过对象的方式调用 防止后期改动需要修改代码逻辑中的path
const PathName = {
  generate:{
    model:'/system/generate/model',
    modelCreate:'/system/generate/model/create',
    modelFieldsAdd:'/system/generate/model/fields_add',
    facade:'/system/generate/facade',
    facadeCreate:'/system/generate/facade/create'
  },
  modules:{
    list:'/system/logic/modules',
    create:'/system/logic/modules/create',
  },
  controllers:{
    list:'/system/logic/controllers',
    create:'/system/logic/controllers/create',
    sync:'/system/logic/controllers/sync'
  },
  actions:{
    list:'/system/logic/actions',
    create:'/system/logic/actions/create',
    sync:'/system/logic/actions/sync'
  }
}

export default PathName
