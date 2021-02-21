import React, {useEffect, useState} from "react";
import {useModel} from "@@/plugin-model/useModel";
import {useAntdTable} from "ahooks";
import {PageContainer} from "@ant-design/pro-layout";
import PathName from "@/common/PathName";
import {Button, Card, Descriptions, Popconfirm, Popover, Space, Table, Tooltip, Typography} from "antd";
import {history, Link} from "umi";
import {ColumnsType} from "antd/es/table";
import {isNotEmpty} from "@/helpers";
import {EmptyText,SmartTime,PageAlert} from "@/huikedev";
import publicStyle from '@/assets/styles/index.less'
import {ModuleListData} from "@/models/useModuleModel";
import {EditOutlined,RetweetOutlined,AppstoreAddOutlined} from "@ant-design/icons";
import ModuleEdit from "@/pages/system/logic/modules/components/modal/ModuleEdit";

const {Text} = Typography


const ModuleList: React.FC = () => {
  const {
    btnLock,
    result,
    fetchModuleList,
    generateRouteRule
  } = useModel('useModuleModel', model => ({
    btnLock: model.btnLock,
    result: model.result,
    fetchModuleList: model.fetchModuleList,
    generateRouteRule: model.generateRouteRule,
  }))

  const [showEditModal,setShowEditModal] = useState(false)
  const [moduleData,setModuleData] = useState<API.ModuleItem|null>(null)

  const {tableProps, refresh} = useAntdTable(fetchModuleList, {
    defaultPageSize: 10
  })
  useEffect(() => {
    if (result) {
      refresh()
    }
  }, [result])

  const ModuleColumns: ColumnsType<ModuleListData> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align:'center',
    },
    {
      title: '模块名称',
      dataIndex: 'module_title',
      key: 'module_title',
      align:'center',
      render:(res: any, record)=>{
        if(record.extend_module_id > 0){
          return <Space>
            <span>{record.module_title}</span>
            <Tooltip title="第三方模块"><AppstoreAddOutlined className={publicStyle.textBlue} size={18} /></Tooltip>
          </Space>
        }
        return <span>{record.module_title}</span>
      }
    },
    {
      title: '模块名称（英文）',
      dataIndex: 'module_name',
      key: 'module_name',
      align:'center',
    },
    {
      title: '路由别名',
      dataIndex: 'route_name',
      key: 'route_name',
    },
    {
      title: '控制器',
      dataIndex: 'controller_count',
      key: 'controller_count',
      align:'center',
      render: (res: any, record) => {
        if(record.controller_count < 0){
          return <EmptyText title="目录已删除" />
        }
        return <Link to="/">{record.controller_count}个</Link>
      }
    },
    {
      title: '域名绑定',
      dataIndex: 'bind_domain',
      key: 'bind_domain',
      render: (res: any, record) => {
        return isNotEmpty(record.bind_domain) ? record.bind_domain : <EmptyText title="未绑定"/>
      }
    },
    {
      title: '路由中间件',
      dataIndex: 'route_middleware',
      key: 'route_middleware',
      align:'center',
      render: (res: any, record) => {
        if (record.route_middleware.length > 0) {
          return <Popover
            placement="top"
            title={`模块【${record.module_title}】的路由中间件`}
            content={<div>
              {record.route_middleware.map((middleware) => {
                return <p key={middleware}><Text code>{middleware}</Text></p>
              })}
            </div>}>
            <span className={publicStyle.textLink}>{record.route_middleware.length}个</span>
          </Popover>
        }
        return <EmptyText title="未设置"/>
      }
    },
    {
      title: '第三方模块',
      dataIndex: 'root_namespace',
      key: 'root_namespace',
      align:'center',
      render: (res: any, record) => {
        if (record.extend_module_id > 0) {
          return <Popover
            placement="top"
            title={`模块【${record.module_title}】的路径与命名空间`}
            content={<div style={{width:'400px'}}>
              <Descriptions column={1}>
                <Descriptions.Item label="根命名空间"><Text code>{record.extend_module?.root_namespace}</Text></Descriptions.Item>
                <Descriptions.Item label="模块根路径"><Text code>{record.extend_module?.root_path}</Text></Descriptions.Item>
              </Descriptions>
            </div>}>
            <span className={publicStyle.textLink}>查看设置</span>
          </Popover>
        }
        return <EmptyText title="应用内模块"/>
      }
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
      render:(res:any,record)=>{
        return record.creator.username
      }
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      key: 'update_time',
      render: (res: any, record) => {
        return <SmartTime unixTimeStamp={record.update_time}/>
      }
    },
    {
      title: '模块管理',
      dataIndex: 'x',
      key: 'x',
      render: (res: any, record) => {
        return (
          <Space>
            <Button
              className={publicStyle.btnOutline}
              onClick={()=>{
                setModuleData(record)
                setShowEditModal(true)
              }}
              icon={<EditOutlined />}
            />
            <Popconfirm
              key="migrateRun"
              title={`确认生成【${record.module_title}】的路由规则?`}
              onConfirm={async () => {
                await generateRouteRule(record.id)
              }
              }
              okText="确认"
              cancelText="取消"
            >
              <Tooltip title="生成路由规则"><Button className={publicStyle.btnGenerateOutline} loading={btnLock} icon={<RetweetOutlined />} /></Tooltip>
            </Popconfirm>
          </Space>
        )
      }
    },
  ]

  const showModuleEditModal = ()=>{
    if(moduleData === null || !showEditModal){
      return null;
    }
    return <ModuleEdit
      dataItem={moduleData}
      visible={showEditModal}
      onSuccess={async ()=>{
        await refresh()
        setShowEditModal(false)
      }}
      onClose={()=>{setShowEditModal(false)}}
      />
  }

  return (
    <PageContainer>
      <Card>
        <Space direction="vertical" size={20} style={{width: '100%'}}>
          <PageAlert closable message={
            <p>生成路由功能会<Text type="danger">删除</Text>对应的模块目录下的<Text code>route.php</Text>文件并重新生成，为了性能考虑，请复制<Text
              code>route.php</Text>下的路由规则到<Text code>/route/app.php</Text></p>}
          />
          <Button type="primary" onClick={() => history.push(PathName.modules.create)}>添加模块</Button>
          <Table
            key="moduleList"
            columns={ModuleColumns}
            rowKey="id"
            {...tableProps}
          />
          {showModuleEditModal()}
        </Space>
      </Card>
    </PageContainer>
  );

}
export default ModuleList
