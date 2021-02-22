export default class Apis {
  public static base = {
    getControllers: 'base/getControllers',
    setController: 'base/setController',
  };

  public static generate = {
    modelList: 'generate/model/index',
    modelSimpleList: 'generate/model/simpleList',
    modelCreate: 'generate/model/create',
    modelDelete: 'generate/model/delete',
    modelRead: 'generate/model/read',
    modelEdit: 'generate/model/edit',
    getModelFields: 'generate/model/getFields',
    modelUpdateAnnotation: 'generate/model/updateAnnotation',
    modelSyncProperty: 'generate/model/syncProperty',
    modelSyncFields: 'generate/model/syncFields',
    facadeCreate: 'generate/facade/create',
    facadeRefresh: 'generate/facade/refresh',
    facadeDelete: 'generate/facade/delete',
    facadeList: 'generate/facade/index',
    migrateCreate: 'generate/migrate/create',
    migrateRun: 'generate/migrate/run',
  };

  public static migrate = {
    create: 'generate/migrate/create',
    run: 'generate/migrate/run',
    tableToMigration: 'generate/migrate/tableToMigration',
    tableToSeeds: 'generate/migrate/tableToSeeds',
  };

  public static facade = {
    updateServiceFacade: 'generate/facade/updateServiceFacade',
  };

  public static module = {
    index: 'system/modules/index',
    create: 'system/modules/create',
    edit: 'system/modules/edit',
    simpleList: 'system/modules/simpleList',
    extendModules: 'system/modules/extendModules',
    routeMiddlewares: 'system/modules/routeMiddlewares',
    refreshRoutes: 'system/modules/refreshRoutes',
    refreshException: 'system/modules/refreshException',
  };

  public static controllers = {
    index: 'system/controllers/index',
    create: 'system/controllers/create',
    edit: 'system/controllers/edit',
    delete: 'system/controllers/delete',
    unSynced: 'system/controllers/unSynced',
    simpleList: 'system/controllers/simpleList',
    checkException: 'system/controllers/checkException',
    sync: 'system/controllers/sync',
    pathList: 'system/controllers/pathList',
  };

  public static controllerPath = {
    simpleList: 'system/controller_path/simpleList',
    index: 'system/controller_path/index',
    create: 'system/controller_path/create',
    edit: 'system/controller_path/edit',
    delete: 'system/controller_path/delete',
  };

  public static actions = {
    index: 'system/actions/index',
    create: 'system/actions/create',
    edit: 'system/actions/edit',
    delete: 'system/actions/delete',
    unSynced: 'system/actions/unSynced',
    sync: 'system/actions/sync',
    speedCreate: 'system/actions/speedCreate',
  };

  public static user = {
    userInfo: 'user/getUserInfo',
    login: 'login/index',
    logout: 'user/logout',
  };

  public static developer = {
    index: 'developer/index',
    positionList: 'developer/positionList',
    update: 'developer/update',
    delete: 'developer/delete',
    create: 'developer/create',
  };
}
