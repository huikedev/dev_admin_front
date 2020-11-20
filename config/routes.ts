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
    access: 'canAdmin',
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
    access: 'canAdmin',
    component: '../layouts/index',
    routes: [
      {
        path: '/generate/model',
        name: 'model',
        component: '../layouts/index',
        routes:[
          {
            path: '/generate/model/list',
            name: 'list',
            component: './generate/model/ModelList',
          },
          {
            path: '/generate/model/maker',
            name: 'maker',
            component: './generate/model/ModelMaker',
          },
        ]
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
