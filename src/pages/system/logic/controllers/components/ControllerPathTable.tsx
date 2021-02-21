import React, { useState} from "react";
import {useAntdTable} from "ahooks";
import {ColumnsType} from "antd/es/table";
import {Button, Col,   Popover, Row, Space, Table,  Tooltip} from "antd";
import {EmptyText, ModulePopover,  SmartTime} from "@/huikedev";
import {AppstoreAddOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons";
import publicStyle from "@/assets/styles/index.less";
import {Link} from "umi";
import PathName from "@/common/PathName";
import {history} from "@@/core/history";
import {useModel} from "@@/plugin-model/useModel";
import PathDelete from "@/pages/system/logic/controllers/components/modal/PathDelete";
import PathEdit from "@/pages/system/logic/controllers/components/modal/PathEdit";

const ControllerPathTable: React.FC = () => {
  const [showEditModal,setShowEditModal] = useState(false)
  const [showDeleteModal,setShowDeleteModal] = useState(false)
  const [controllerPath,setControllerPath] = useState<API.ControllerPathItem|undefined>(undefined)
  const {
    fetchPathList,
  } = useModel('useControllerPathModel',model => ({
    fetchPathList:model.fetchPathList,
  }))
  const {tableProps, refresh} = useAntdTable(fetchPathList, {
    defaultPageSize: 10
  })

  const showPathDeleteModal = ()=>{
    if(typeof controllerPath === 'undefined' || !showDeleteModal){
      return null;
    }
    return <PathDelete
      onClose={()=>setShowDeleteModal(false)}
      dataItem={controllerPath}
      onSuccess={async ()=>{
        await refresh()
        setShowDeleteModal(false)
        }
      }
      visible={showDeleteModal}/>
  }

  const showPathEditModal = ()=>{
    if(typeof controllerPath === 'undefined' || !showEditModal){
      return null;
    }
    return <PathEdit
      onClose={()=>setShowEditModal(false)}
      dataItem={controllerPath}
      onSuccess={async ()=>{
        await refresh()
        setShowEditModal(false)
      }
      }
      visible={showEditModal}/>
  }

  const ControllerPathColumns: ColumnsType<API.ControllerPathItem> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '模块',
      dataIndex: 'module_title',
      key: 'module_title',
      align:'center',
      render: (res, record) => {
        if(record.module.extend_module_id > 0){
          return <Space>
            <ModulePopover key={record.id} module={record.module} />
            <Tooltip title="第三方模块"><AppstoreAddOutlined className={publicStyle.textRed} size={18} /></Tooltip>
          </Space>
        }
        return <ModulePopover key={record.id} module={record.module} />
      }
    },
    {
      title: '目录标题',
      dataIndex: 'controller_title',
      key: 'controller_title',
      align:'center',
    },
    {
      title: '目录名称',
      dataIndex: 'controller_name',
      key: 'controller_name',
      render: (res, record) => {
        return <Tooltip title={`app\\controller\\${record.module.module_name}\\${record.controller_name}`}>
          <span className={publicStyle.textLink}>{record.controller_name}</span>
        </Tooltip>
      }
    },
    {
      title: '路由别名',
      dataIndex: 'route_name',
      key: 'route_name',
      render: (res, record) => {
        if(record.module.bind_domain.length === 0){
          return <>{`${record.module.route_name}/${record.route_name}`}</>
        }
        if(record.route_name.length === 0){
          return <EmptyText title="未指定"/>
        }
        return <>{record.route_name}</>
      }
    }, {
      title: '控制器',
      dataIndex: 'actions',
      key: 'actions',
      align:'center',
      render: (res: any, record) => {
        return <Link to={{
          pathname:PathName.actions.list,
          search:`?controller_id=${record.id}`
        }}>
          {record.controllers.length > 0 ?
            <Popover
              overlayStyle={{ width:'400px'}}
              placement="top"
              title={`目录【${record.controller_name}】下的控制器`}
              content={<Space direction="vertical" style={{width:'100%'}}>
                {record.controllers.length > 0 && (record.controllers as Array<API.ControllerPathItem>).map((controller) => {
                  return <Row key={controller.controller_name}>
                    <Col span={10}>{controller.controller_name}</Col>
                    <Col span={14}>{controller.controller_title}</Col>
                  </Row>
                })}
              </Space>}>
              <span className={publicStyle.textLink}>{record.controllers.length}个</span>
            </Popover>
            :
            <EmptyText title="未同步"/>
          }
        </Link>

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
      align:'center',
      render:(res,record)=>{
        return <SmartTime unixTimeStamp={record.update_time} />
      }
    },
    {
      title: '管理',
      dataIndex: 'x',
      key: 'x',
      render:(res,record)=>{
        return (<Space>
          <Button
            className={publicStyle.btnOutline}
            onClick={()=>{
              setControllerPath(record)
              setShowEditModal(true)
            }}
            icon={<EditOutlined />}
          />

          <Button
            className={publicStyle.btnWarningOutline}
            icon={<DeleteOutlined />}
            onClick={()=>{
              setControllerPath(record)
              setShowDeleteModal(true)
            }}
          />
        </Space>)
      }
    }
  ]


  return (
    <Space direction="vertical" size={15} style={{width: '100%'}}>
      <Space size={10}>
        <Button
          type="primary"
          onClick={() => history.push({
            pathname:PathName.controllers.create,
            query:{type:'path'}
          }
        )}
        >添加目录</Button>
      </Space>

      <Table
        key="controllerList"
        columns={ControllerPathColumns}
        rowKey="id"
        {...tableProps}
        bordered
      />
      {showPathDeleteModal()}
      {showPathEditModal()}
    </Space>
  )
}

export default ControllerPathTable
