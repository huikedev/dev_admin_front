import React, {useEffect, useState} from "react";
import {useModel,history  } from "umi";
import {useAntdTable} from "ahooks";
import {ColumnsType} from "antd/es/table";
import {ControllerPopover, ModulePopover, NoticeTypeText, RequestTagText} from "@/huikedev";
import {Button, Card, Space, Table, Tooltip,  Checkbox,Typography} from "antd";
import publicStyle from "@/assets/styles/index.less";
import {PageContainer} from "@ant-design/pro-layout";
import {getActionPath} from '@/helpers'
import PathName from "@/common/PathName";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import ActionAlertTips from './components/ActionAlertTips'
import ActionDelete from './components/modal/ActionDelete'
import ActionEdit from './components/modal/ActionEdit'

const { Text } = Typography
const ActionList : React.FC = ()=>{
  const [showEditModal,setShowEditModal] = useState(false)
  const [showDeleteModal,setShowDeleteModal] = useState(false)
  const [actionData,setActionData] = useState<API.ActionTableItem|undefined>()
  const {
    fetchActionList,
  } = useModel('useActionsModel',model => ({
    fetchActionList:model.fetchActionList,
  }))
  const {tableProps, refresh,run} = useAntdTable(fetchActionList, {
    defaultPageSize: 10,
    manual:true
  })



  useEffect(()=>{
    if(history.query && history.query.length > 0  ){
      run({current:1,pageSize:10,filters:history.query})
    }else{
      run( { current: 1, pageSize: 10 })
    }
  },[history])

  // 控制提示是否显示
  const tipsHide:boolean = false

  const showActionDeleteModal = ()=>{
    if(typeof actionData ==='undefined' || !showDeleteModal){
      return null;
    }
    return <ActionDelete
      dataItem={actionData as API.ActionTableItem}
      visible={showDeleteModal}
      onSuccess={async ()=>{
        await refresh()
        setShowDeleteModal(false)
      }
      }
      onClose={()=>setShowDeleteModal(false)} />
  }

  const showActionEditModal = ()=>{
    if(typeof actionData ==='undefined' || !showEditModal){
      return null;
    }
    return <ActionEdit
      dataItem={actionData as API.ActionTableItem}
      visible={showEditModal}
      onSuccess={async ()=>{
        await refresh()
        setShowEditModal(false)
      }
      }
      onClose={()=>setShowEditModal(false)} />
  }

  const ActionsColumns : ColumnsType<API.ActionTableItem> = [
    {
      title: 'ID',
      dataIndex: 'id',
      align:'center',
      key: 'id',
    },
    {
      title: '模块',
      dataIndex: 'module_title',
      key: 'module_title',
      align:'center',
      render: (res, record) => {
        return <ModulePopover key={record.id} module={record.controller.module}/>
      }
    },
    {
      title: '控制器',
      dataIndex: 'controller_title',
      align:'center',
      key: 'controller_title',
      render: (res, record) => {
        return <ControllerPopover key={record.id} controller={record.controller} />
      }
    },
    {
      title: '方法名称',
      dataIndex: 'action_title',
      align:'center',
      key: 'action_title',
    },
    {
      title: '方法名',
      dataIndex: 'action_name',
      align:'center',
      key: 'action_name',
      render:(res,record)=>{
        return `${record.action_name}`
      }
    },
    {
      title: '请求方式',
      dataIndex: 'request_method_text',
      align:'center',
      key: 'request_method_text',
      render:(res,record)=>{
        // @ts-ignore
        return <RequestTagText type={record.request_method_text}/>
      }
    },
    {
      title: '路由别名',
      dataIndex: 'route_name',
      align:'center',
      key: 'route_name',
      render:(res,record)=>{
        const actionRouteName =  getActionPath(record)
        return <Tooltip title={actionRouteName} placement="bottom">
          <Text copyable={{
            text: actionRouteName,
            icon: null,
            tooltips: (<span>复制路由PATH</span>)}}>{record.route_name}</Text>
        </Tooltip>
      }
    },

    {
      title: '响应类型',
      dataIndex: 'response_type_text',
      align:'center',
      key: 'response_type_text',
    },
    {
      title: '操作反馈',
      dataIndex: 'notice_type_text',
      align:'center',
      key: 'notice_type_text',
      render:(res,record)=>{
        // @ts-ignore
        return <NoticeTypeText type={record.notice_type_text}/>
      }
    },
    {
      title: 'Service返回',
      dataIndex: 'service_return_type',
      align:'center',
      key: 'service_return_type',
      render:(res,record)=>{
        return <Tooltip title={record.service_return_type}>
          <Button type="dashed">{record.service_return_type_text}</Button>
        </Tooltip>
      }
    },
    {
      title: '鉴权设置',
      dataIndex: 'is_private',
      align:'center',
      key: 'is_private',
      render:(res,record)=>{
        return <Space>
          <Checkbox key="is_private" checked={record.is_private}>登录</Checkbox>
          <Checkbox key="is_need_permission" checked={record.is_need_permission}>鉴权</Checkbox>
        </Space>
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
      title: '管理操作',
      dataIndex: 'x',
      key: 'x',
      render:(res,record)=>{
        return <Space>
          <Button
            key="edit"
            className={publicStyle.btnOutline}
            onClick={()=>{
              setActionData(record)
              setShowEditModal(true)
            }}
            icon={<EditOutlined />}
          />
          <Button
            key="delete"
            className={publicStyle.btnWarningOutline}
            icon={<DeleteOutlined />}
            onClick={()=>{
              setActionData(record)
              setShowDeleteModal(true)
            }}
          />
        </Space>
      }
    },
  ]



  return (
    <PageContainer>
      <Card>
        <Space direction="vertical" size={15} style={{width: '100%'}}>
          {/* 字段解释 */}
          <ActionAlertTips hide={tipsHide}/>
          <Space size={10}>
            <Button type="primary" onClick={() => history.push(PathName.actions.create)}>添加逻辑方法</Button>
            <Button className={publicStyle.btnWarning} type="primary"
                    onClick={() => history.push(PathName.actions.sync)}>同步逻辑方法</Button>
          </Space>

          <Table
            key="actionList"
            columns={ActionsColumns}
            rowKey="name"
            {...tableProps}
            bordered
          />
          {showActionDeleteModal()}
          {showActionEditModal()}
        </Space>
      </Card>
    </PageContainer>
  )
}

export default ActionList
