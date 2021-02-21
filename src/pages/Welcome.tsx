import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {Card, Typography, Descriptions, Spin, Row, Col, Space, Alert} from 'antd';
import { useModel } from 'umi';
import styles from "@/components/RightContent/index.less";
import {SmartTime,AppLink} from "@/huikedev";
import AppConfig from "@/common/AppConfig";

const {Text} = Typography
const Welcome: React.FC<{}> = ()=>{
  const { initialState } = useModel('@@initialState');
  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );
  if (!initialState) {
    return loading;
  }
  const {currentUser} = initialState
  return (
    <PageContainer
      title={false}
      content={<div>
        <p style={{fontSize: '20px',
          lineHeight: '28px'}}>欢迎，{currentUser.username}@{currentUser.position_text}</p>
        <p>上次登录IP：{currentUser.last_login_ip}，上次登录时间：<SmartTime unixTimeStamp={currentUser.last_login_time} /></p>

      </div>}
    >
      <Row gutter={20}>
        <Col span={16}>
          <Card title="系统介绍">
            <p>
              现在你看到的是<Text type="danger">HuikeDev开发辅助后台</Text>，此后台系统是一个前后端分离项目，同时也是<Text type="danger">HuikeDev</Text>的一个演示项目。<Text type="danger">请注意这是一套开发辅助系统，服务于前后端开发人员，后续版本会提供更多的辅助功能来提升开发效率和规范逻辑代码。</Text>
            </p>
            <p>
              前端基于<AppLink href="https://beta-pro.ant.design/" target="_blank">ant.design pro v5</AppLink>开发而成，主要技术栈为<Text code>React</Text>、<Text code>TypeScript</Text>，前端脚手架为<AppLink href="https://umijs.org/" target="_blank">UmiJs</AppLink>。后端基于<Text code>ThinkPHP 6.0.*</Text>和<Text code>huikedev/huike_base</Text>开发而成。
            </p>
            <p>
              此项目前后端技术选型上都比较激进，需要有一定的前后端知识积累，对于初学者可以当成一个学习项目。前端更是采用了与<Text code>php</Text>搭配比较少的<Text code>react</Text>，并且抛弃了<Text code>class component</Text>。项目开始于2021年1月中旬左右，历时约一个月左右，后端大部分代码是本人几年开发工作中的积累，前端的hooks基本是现学的，所以不可避免的会有一些瑕疵在里面。
            </p>
            <p>写这样一个开源项目的初衷是规范业务开发。但在使用了一段时间的逻辑分层架构后发现各种目录、文件特别多，所以就萌发了开发一套辅助开发后台来减少新建、追加各种重复性工作的想法。目前来说，配合这套辅助开发后台，新建分层、追加分层方法、生成模型等工作减少了很多，业务开发也只需要聚焦在<Text code>service handler</Text>即可。</p>
            <p>最后，希望这个项目可以帮到你。</p>
            <Alert
              message={<div>
                注意：前端大量使用<Text code>react hooks</Text>，如果需要学习或进行二次开发，请配合<AppLink href="https://ahooks.js.org/zh-CN" target="_blank">UmiJs</AppLink>食用。
              </div>}
              type="warning"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="系统信息">
            <Descriptions column={1}>
              <Descriptions.Item label="项目名称"><Text code>HuikeDev开发辅助后台</Text></Descriptions.Item>
              <Descriptions.Item label="当前版本">
                {AppConfig.version}
              </Descriptions.Item>
              <Descriptions.Item label="文档地址">
                <AppLink href="https://huike.dev/" target="_blank">https://huike.dev/</AppLink>
              </Descriptions.Item>
              <Descriptions.Item label="仓库地址">
                <Space>
                  <AppLink href="https://github.com/huikedev" target="_blank">Github</AppLink>
                  <AppLink href="https://gitee.com/huikedev" target="_blank">Gitee</AppLink>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="QQ交流群">16117272</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  )
}
export default Welcome;
