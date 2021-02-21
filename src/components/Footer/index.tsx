import React from 'react';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="2021 Huike.Dev"
    links={[
      {
        key: 'HuikeDev',
        title: 'Huike.Dev',
        href: 'https://huike.dev',
        blankTarget: true,
      },
      {
        key: 'github',
        title: 'Github',
        href: 'https://github.com/huikedev/dev_admin',
        blankTarget: true,
      },
      {
        key: 'gitee',
        title: 'Gitee',
        href: 'https://gitee.com/huikedev/dev_admin',
        blankTarget: true,
      },
    ]}
  />
);
