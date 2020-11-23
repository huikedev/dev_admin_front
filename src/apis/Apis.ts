export default class Apis{
  public static base = {
    getControllers:'base/getControllers',
    setController:'base/setController',
  }

  public static generate = {
    modelList:'generate/model/index',
    modelSimpleList:'generate/model/simpleList',
    facadeCreate:'generate/facade/create',
    facadeList:'generate/facade/index'
  }

  public static user = {
    userInfo:'user/getUserInfo'
  }

  public static login = {
    login:'login/index'
  }

}
