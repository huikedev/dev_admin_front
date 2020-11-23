// 将routes里的path通过对象的方式调用 防止后期改动需要修改代码逻辑中的path
const PathName = {
  generate:{
    model:'/generate/model',
    modelCreate:'/generate/model/create',
    facade:'/generate/facade',
    facadeCreate:'/generate/facade/create'
  }
}

export default PathName
