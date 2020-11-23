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
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    //access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './ListTableList',
  },
  {
    path: '/generate',
    name: 'generate',
    icon: 'RobotOutlined',
    //access: 'canAdmin',
    component: '../layouts/index',
    routes: [
      {
        path: '/generate/model',
        name: 'model',
        component: './generate/model/ModelList',
      },
      {
        path: '/generate/model/create',
        name: 'model.create',
        hideInMenu:true,
        component: './generate/model/ModelCreate',
      },
      {
        path: '/generate/facade',
        name: 'facade',
        component: './generate/facade/FacadeList',
      },
      {
        path: '/generate/facade/create',
        name: 'facade.create',
        hideInMenu:true,
        component: './generate/facade/FacadeCreate',
      },
      {
        path: '/generate/logic',
        name: 'logic',
        component: './generate/logic/LogicList',
      },
      {
        path: '/generate/logic/create',
        name: 'logic.create',
        hideInMenu:true,
        component: './generate/logic/LogicCreate',
      },

    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
