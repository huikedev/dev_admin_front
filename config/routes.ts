export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/system',
    name: 'system',
    icon: 'RobotOutlined',
    routes:[
      {
        path: '/system/generate',
        name: 'generate',
        icon: 'RobotOutlined',
        //access: 'canAdmin',
        component: '../layouts/index',
        routes: [
          {
            path: '/system/generate/model',
            name: 'model',
            component: './system/generate/model/ModelList',
          },
          {
            path: '/system/generate/model/create',
            name: 'model.create',
            hideInMenu:true,
            component: './system/generate/model/ModelCreate',
          },
          {
            path: '/system/generate/model/fields_add/:id',
            name: 'model.fields_add',
            hideInMenu:true,
            component: './system/generate/model/ModelFieldsAdd',
          },
          {
            path: '/system/generate/facade',
            name: 'facade',
            component: './system/generate/facade/FacadeList',
          },
          {
            path: '/system/generate/facade/create',
            name: 'facade.create',
            hideInMenu:true,
            component: './system/generate/facade/FacadeCreate',
          },
        ],
      },
      {
        path: '/system/logic',
        name: 'logic',
        routes:[
          {
            name: 'modules',
            path: '/system/logic/modules',
            component: './system/logic/modules/ModuleList',
          },
          {
            name: 'modules.create',
            path: '/system/logic/modules/create',
            hideInMenu: true,
            component: './system/logic/modules/ModuleCreate',
          },
          {
            name: 'controllers',
            path: '/system/logic/controllers',
            component: './system/logic/controllers/ControllerList',
            exact: true,
          },
          {
            name: 'controllers.create',
            path: '/system/logic/controllers/create',
            hideInMenu: true,
            component: './system/logic/controllers/ControllerCreate',
          },
          {
            name: 'controllers.sync',
            path: '/system/logic/controllers/sync',
            hideInMenu: true,
            component: './system/logic/controllers/ControllerSync',
          },
          {
            name: 'actions',
            path: '/system/logic/actions',
            component: './system/logic/actions/ActionList',
          },
          {
            name: 'actions.create',
            path: '/system/logic/actions/create',
            hideInMenu: true,
            component: './system/logic/actions/ActionCreate',
          },
          {
            name: 'actions.sync',
            path: '/system/logic/actions/sync',
            hideInMenu: true,
            component: './system/logic/actions/ActionSync',
          }
        ]
      },
      {
        path: '/system/developer',
        name: 'developer',
        routes: [
          {
            name: 'list',
            path: '/system/developer/list',
            component: './system/developer/DeveloperList',
          },
        ]
      }

    ]
  },

  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
